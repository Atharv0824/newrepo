# Future Forge - Student Counselling Web App

A modern, responsive web application for student counselling and college recommendations.

## Features

### 🎯 Core Features
- **User Authentication**: Secure login/signup system with form validation
- **Student Dashboard**: Personalized dashboard with progress tracking
- **Multi-step Profile Form**: Comprehensive student information collection
- **College Recommendations**: Smart college matching based on student profile
- **Filtering & Sorting**: Advanced filtering options for college search

### 🎨 UI/UX Highlights
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Fully responsive design for all device sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **Intuitive Navigation**: Clear sidebar navigation and breadcrumb trails
- **Accessibility**: Proper semantic HTML and keyboard navigation

### 🛠️ Technical Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Authentication**: Custom authentication context with localStorage

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── layout/             # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   └── sections/           # Page sections
│       ├── HeroSection.jsx
│       ├── LoginForm.jsx
│       ├── SignupForm.jsx
│       └── CollegeCard.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── Dashboard.jsx
│   ├── StudentInfoForm.jsx
│   └── Recommendations.jsx
├── context/
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd future-forge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Authentication System
The app uses a custom authentication context that:
- Manages user state across the application
- Handles login/signup functionality
- Provides protected routes
- Persists user data in localStorage

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Flexible grid layouts
- Adaptive components for different screen sizes
- Touch-friendly interface elements

### Form Validation
- Real-time validation feedback
- Comprehensive error handling
- User-friendly error messages
- Prevents form submission with invalid data

## Design System

### Color Palette
- **Primary**: Indigo/Purple gradient (#6366f1 → #8b5cf6)
- **Secondary**: Teal (#0d9488)
- **Background**: Light gray gradients
- **Text**: Dark gray (#1f2937) and white

### Typography
- **Font Family**: Inter (with system font fallback)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: Responsive text sizing

### Spacing
- Consistent spacing using Tailwind's spacing scale
- 4px base unit (1rem = 16px)
- Responsive padding and margins

## Future Enhancements

### Planned Features
- [ ] Backend API integration
- [ ] Real college database
- [ ] Advanced matching algorithms
- [ ] Student progress tracking
- [ ] Application management system
- [ ] Career assessment tools
- [ ] Mobile app version

### Technical Improvements
- [ ] TypeScript integration
- [ ] Unit testing with Jest
- [ ] End-to-end testing with Cypress
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] PWA capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based UI library
- [Vite](https://vitejs.dev/) for the fast build tool
- [Heroicons](https://heroicons.com/) for the icon set