# MyLegendTeam 🏉⚽🏀🏒

A modern web application for building dream teams across multiple sports disciplines. Currently focused on rugby with plans to expand to football, basketball, ice hockey, and handball.

## ✨ Features

### Core Functionality
- **Drag & Drop Team Builder**: Intuitive interface for creating formations using drag and drop
- **Multi-Sport Support**: Currently supports rugby with infrastructure for football, basketball, hockey, and handball
- **Player Database**: Extensive database of 1000+ professional athletes with photos, stats, and team information
- **Formation Management**: Save, load, and manage multiple team formations
- **Advanced Filtering**: Filter players by nationality, position, team, and active/retired/legendary status
- **Authentication System**: Registration, login, and Google OAuth authentication
- **User Management**: User profiles with personalized team saving

### Rugby-Specific Features
- **15+8 Formation**: Full rugby team with 15 starters and 8 substitutes
- **Position-Specific Slots**: Accurate rugby positions with proper numbering (1-23)
- **Team & Nationality Support**: Players from major rugby nations and clubs

### Advanced Features
- **Legendary Player Limit System**: Maximum 5 legendary players per team with confirmation modal
- **Smart Search**: Search by first/last name with combined filters
- **Nationality Groups**: Grouped nationalities by regions (Europe, Americas, etc.)
- **Position Validation**: Automatic position/player compatibility verification
- **Image Management**: Automatic image optimization with fallbacks

### User Experience
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Local Storage**: Teams are automatically saved to browser storage
- **Real-time Updates**: Instant feedback and validation
- **Multilingual Interface**: French and English support
- **SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, and structured data

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React DnD** - Drag and drop functionality
- **React Country Flag** - Flag display
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Lightweight database
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Passport.js** - OAuth authentication
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **Image Optimization Scripts** - Automatic image optimization

## 🗄️ Database

### Structure
- **Players**: 1000+ players with photos, positions, teams, and legendary status
- **Teams**: Complete team database by sport
- **Nationalities**: Flag and country code support
- **Positions**: Sport-specific positions
- **Users**: User account management with authentication

### Data Features
- **Automatic Import**: Python scripts for Excel import
- **User Backup**: User data preservation during updates
- **Image Optimization**: Image optimization and cleanup scripts
- **Fallbacks**: Default images for loading errors

## 🔧 Scripts and Tools

### Development Scripts
- `npm run dev` - Development mode start
- `npm run build` - Production build
- `npm run optimize-images` - Image optimization
- `npm run cleanup-images` - Image cleanup
- `npm run prepare-images` - Complete image preparation

### Backend Scripts
- `npm run start` - Server start
- `npm run dev` - Development mode with nodemon
- `./updatedatabase.sh` - Database update

## 🌐 Deployment

### Frontend (Vercel)
- Automatic deployment from GitHub
- Image optimization with Sharp
- Next.js production configuration

### Backend (Render)
- Automatic deployment from GitHub
- Persistent SQLite database
- Secure environment variables

## 📱 Mobile Features

- **Responsive Design**: Automatic adaptation to all screen sizes
- **Touch-Friendly**: Interface optimized for touch devices
- **Performance**: Fast loading and smooth animations
- **PWA Ready**: Ready for progressive web app features

## 🔒 Security

- **JWT Authentication**: Secure tokens for authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Protection against DDoS attacks
- **CORS Configured**: Control of authorized origins
- **Helmet**: HTTP security headers
- **Google OAuth 2.0**: Authentication Google
