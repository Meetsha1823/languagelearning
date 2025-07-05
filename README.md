# 🌍 Language Learning Platform

A modern, interactive language learning platform built with React and Node.js, featuring user authentication, course management, blog system, and real-time notifications.

## ✨ Features

### 🎓 **Learning Features**
- **Multi-language Courses**: Spanish, French, German, Japanese, Mandarin, Italian, Russian, Arabic
- **Interactive Lessons**: Progress tracking and gamified learning experience
- **Course Management**: Purchase, track progress, and manage enrolled courses
- **Learning Dashboard**: Personalized learning experience for each user

### 📝 **Blog System**
- **Write Blogs**: Create and publish language learning blogs
- **Image Upload**: Support for featured images in blog posts
- **Categories**: Organize blogs by topics (Tips, Motivation, Apps, Science, Practice)
- **User Profiles**: View and manage your published blogs
- **Real-time Updates**: Instant blog publishing and updates

### 🔐 **User Management**
- **Authentication**: Secure signup and login system
- **User Profiles**: Personal dashboard with statistics
- **Progress Tracking**: Monitor learning progress across courses
- **Purchase History**: Track course purchases and access

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on all devices
- **Custom Notifications**: Beautiful notification system replacing browser alerts
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Modern Design**: Clean, professional interface

### 💳 **Payment Integration**
- **Razorpay Integration**: Secure payment processing
- **UPI Support**: QR code payment option
- **Multiple Payment Methods**: Cards, UPI, wallets, net banking

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### **Backend**
- **Node.js** - Server-side JavaScript
- **Express.js** - Web application framework
- **JSON File Storage** - Simple data persistence
- **CORS** - Cross-origin resource sharing

### **Payment**
- **Razorpay** - Payment gateway integration

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Meetsha1823/languagelearning.git
   cd languagelearning
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../myapp
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   ```

5. **Start the frontend development server**
   ```bash
   cd ../myapp
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
LL/
├── backend/                 # Backend server
│   ├── server.js           # Express server
│   ├── users.json          # User data storage
│   ├── blogs.json          # Blog data storage
│   └── package.json        # Backend dependencies
├── myapp/                  # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── hooks/          # Custom hooks
│   └── package.json        # Frontend dependencies
└── README.md              # Project documentation
```

## 🔧 API Endpoints

### **Authentication**
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/users` - Get all users

### **Courses**
- `GET /api/my-courses` - Get user's purchased courses
- `POST /api/purchase-course` - Purchase a course
- `GET /api/progress` - Get user's learning progress
- `POST /api/progress` - Update learning progress

### **Blogs**
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `DELETE /api/blogs/:id` - Delete blog

## 🎯 Key Features Explained

### **Blog System**
The blog system allows users to:
- Create blogs with title, summary, content, and images
- Categorize blogs for better organization
- View their blogs in the profile section
- Delete their own blogs
- Real-time updates across the platform

### **Notification System**
Replaces all browser alerts with:
- Custom styled notifications
- Different types (success, error, warning, info)
- Auto-dismiss functionality
- Manual close option
- Dark/light mode support

### **Profile Management**
Users can:
- View their learning statistics
- Manage their published blogs
- Track course progress
- Access purchase history

## 🎨 Customization

### **Adding New Languages**
1. Add course data to `courses` array in `Course.js`
2. Create corresponding learning pages
3. Update navigation and routing

### **Modifying Styling**
- Use Tailwind CSS classes for styling
- Modify theme colors in `tailwind.config.js`
- Update dark/light mode styles

### **Adding Features**
- Create new React components in `src/`
- Add API endpoints in `backend/server.js`
- Update routing in `App.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Meet Patel**
- GitHub: [@Meetsha1823](https://github.com/Meetsha1823)
- Project: [Language Learning Platform](https://github.com/Meetsha1823/languagelearning)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Lucide for beautiful icons
- Razorpay for payment integration

---

⭐ **Star this repository if you found it helpful!** 