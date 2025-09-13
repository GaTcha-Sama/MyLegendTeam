/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const removeOriginalImages = (dirPath) => {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      removeOriginalImages(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.avif'].includes(ext)) {
        const webpPath = fullPath.replace(ext, '.webp');
        if (fs.existsSync(webpPath)) {
          fs.unlinkSync(fullPath);
          console.log(`️  Supprimé: ${item}`);
        }
      }
    }
  }
};

const main = () => {
  console.log('🧹 Nettoyage des images originales...\n');
  
  const imagesDir = path.join(__dirname, '../public/images');
  removeOriginalImages(imagesDir);
  
  console.log('\n✅ Nettoyage terminé!');
};

main(); 