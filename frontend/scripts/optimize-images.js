/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const QUALITY = 80;
const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;

// Statistiques
let totalImages = 0;
let processedImages = 0;
let totalSizeBefore = 0;
let totalSizeAfter = 0;

const getFileSize = (filePath) => {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const optimizeImage = async (inputPath, outputPath) => {
  try {
    const stats = fs.statSync(inputPath);
    const sizeBefore = stats.size;
    
    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: QUALITY,
        effort: 6
      })
      .toFile(outputPath);
    
    const sizeAfter = getFileSize(outputPath);
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${formatBytes(sizeBefore)} → ${formatBytes(sizeAfter)} (-${reduction}%)`);
    
    totalSizeBefore += sizeBefore;
    totalSizeAfter += sizeAfter;
    processedImages++;
    
    return { success: true, sizeBefore, sizeAfter };
  } catch (error) {
    console.error(`❌ Erreur avec ${inputPath}:`, error.message);
    return { success: false, error };
  }
};

const processDirectory = async (dirPath) => {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await processDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.avif'].includes(ext)) {
          totalImages++;
          const outputPath = fullPath.replace(ext, '.webp');
          await optimizeImage(fullPath, outputPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Erreur dans le dossier ${dirPath}:`, error.message);
  }
};

const main = async () => {
  console.log('🚀 Début de l\'optimisation des images...\n');
  
  const imagesDir = path.join(__dirname, '../public/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Dossier images non trouvé:', imagesDir);
    return;
  }
  
  const startTime = Date.now();
  
  try {
    await processDirectory(imagesDir);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    
    console.log('\n📊 Résultats:');
    console.log(`📁 Images traitées: ${processedImages}/${totalImages}`);
    console.log(`💾 Taille totale avant: ${formatBytes(totalSizeBefore)}`);
    console.log(`💾 Taille totale après: ${formatBytes(totalSizeAfter)}`);
    console.log(`📉 Réduction: ${((totalSizeBefore - totalSizeAfter) / totalSizeBefore * 100).toFixed(1)}%`);
    console.log(`⏱️  Temps: ${duration}s`);
    
    if (totalSizeAfter > 50 * 1024 * 1024) {
      console.log('\n⚠️  ATTENTION: La taille totale dépasse encore 50 MB!');
      console.log('💡 Suggestions:');
      console.log('   - Réduire QUALITY à 70');
      console.log('   - Réduire MAX_WIDTH/MAX_HEIGHT');
      console.log('   - Supprimer les images non utilisées');
    } else {
      console.log('\n✅ Parfait! Taille sous les 50 MB pour Vercel.');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
};

main().catch(console.error); 