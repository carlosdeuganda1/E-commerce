# 🛍️ E-Commerce Website - Full Stack Project

## 📋 Project Overview

A complete, production-ready e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates real-world e-commerce functionality including product management, user authentication, shopping cart, order processing, and payment integration.

## 🚀 Features

### For Customers
- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Password reset functionality
  - Profile management

- **Product Browsing**
  - Browse products with pagination
  - Advanced search functionality
  - Category filtering
  - Price range filtering
  - Sort by relevance, price, rating, newest

- **Shopping Experience**
  - Add/remove items from cart
  - Update quantities
  - Save items to wishlist
  - Product reviews and ratings
  - Recently viewed products

- **Order Management**
  - Place orders with multiple payment options
  - Track order status
  - View order history
  - Cancel orders
  - Download invoices

- **Responsive Design**
  - Mobile-first approach
  - Works on all devices
  - Touch-friendly interface

### For Admins
- **Dashboard**
  - Sales analytics and charts
  - Revenue tracking
  - Popular products overview
  - User activity monitoring

- **Product Management**
  - Add new products
  - Edit existing products
  - Delete products
  - Manage inventory
  - Bulk product import/export

- **Order Management**
  - View all orders
  - Update order status
  - Process refunds
  - Generate shipping labels

- **User Management**
  - View all users
  - Manage user roles
  - Block/unblock users

## 🛠️ Technology Stack

### Frontend
```
- React 18
- React Router v6
- Redux Toolkit (State Management)
- Tailwind CSS / Material-UI
- Axios (HTTP Client)
- Formik + Yup (Form Validation)
- React Hook Form
- React Query (Data Fetching)
- Stripe.js / Razorpay SDK
```

### Backend
```
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)
- Stripe / Razorpay (Payment)
- Nodemailer (Email)
- Multer (File Upload)
- Express Validator
- Winston (Logging)
```

### DevOps & Tools
```
- Git & GitHub
- Docker (Containerization)
- AWS S3 / Cloudinary (Image Storage)
- Redis (Caching)
- Nginx (Reverse Proxy)
- PM2 (Process Management)
```

## 📁 Project Structure

```
ecommerce-platform/
├── client/                          # Frontend React Application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                     # API services
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── orders.js
│   │   │   └── users.js
│   │   ├── components/              # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductFilter.jsx
│   │   │   │   └── ProductSearch.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── CartSummary.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ProductForm.jsx
│   │   │       └── OrderManagement.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── redux/                 # Redux store
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── orderSlice.js
│   │   │   └── hooks.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── styles/                # Global styles
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── setupTests.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── server/                         # Backend Application
│   ├── src/
│   │   ├── config/                # Configuration files
│   │   │   ├── database.js
│   │   │   ├── passport.js
│   │   │   ├── cloudinary.js
│   │   │   └── stripe.js
│   │   ├── models/                # Database models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Order.js
│   │   │   ├── Review.js
│   │   │   └── Wishlist.js
│   │   ├── controllers/           # Business logic
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   ├── userController.js
│   │   │   └── paymentController.js
│   │   ├── routes/                # API routes
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── orders.js
│   │   │   ├── users.js
│   │   │   └── payments.js
│   │   ├── middleware/            # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── upload.js
│   │   │   └── validation.js
│   │   ├── services/              # Business services
│   │   │   ├── emailService.js
│   │   │   ├── paymentService.js
│   │   │   └── inventoryService.js
│   │   ├── utils/                 # Utilities
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── logger.js
│   │   └── server.js              # Entry point
│   ├── package.json
│   ├── .env
│   └── Dockerfile
│
├── docker-compose.yml             # Docker setup
├── .gitignore
├── README.md                      # Documentation
└── LICENSE
```

## 📦 Database Schema

### User Model
```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Product Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  images: [{
    url: String,
    alt: String
  }],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  specifications: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Order Model
```javascript
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: String,
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### Step 2: Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Frontend Setup
```bash
cd ../client
npm install
```

Create `.env` file in client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### Step 4: Running the Application

#### Development Mode
```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm start
```

#### Production Mode
```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
serve -s build
```

### Docker Setup
```bash
docker-compose up --build
```

## 🚀 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/forgot-password  - Request password reset
POST   /api/auth/reset-password   - Reset password
GET    /api/auth/verify     - Verify email
```

### Products
```
GET    /api/products         - Get all products
GET    /api/products/:id     - Get single product
POST   /api/products         - Create product (Admin)
PUT    /api/products/:id     - Update product (Admin)
DELETE /api/products/:id     - Delete product (Admin)
GET    /api/products/search  - Search products
GET    /api/products/category/:category - Get products by category
```

### Cart & Orders
```
GET    /api/cart            - Get user cart
POST   /api/cart            - Add to cart
PUT    /api/cart/:id        - Update cart item
DELETE /api/cart/:id        - Remove from cart

POST   /api/orders          - Create order
GET    /api/orders          - Get user orders
GET    /api/orders/:id      - Get order details
PUT    /api/orders/:id/status - Update order status (Admin)
```

### Payments
```
POST   /api/payments/create-payment  - Create payment intent
POST   /api/payments/webhook         - Stripe webhook handler
```

### Reviews
```
POST   /api/products/:id/reviews  - Add review
GET    /api/products/:id/reviews  - Get product reviews
```

### Admin
```
GET    /api/admin/stats          - Get dashboard stats
GET    /api/admin/users          - Get all users
PUT    /api/admin/users/:id/role - Update user role
```

## 🔒 Security Features

- **Authentication**: JWT with refresh tokens
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Express validator
- **XSS Protection**: Sanitized user input
- **Rate Limiting**: Prevent brute force attacks
- **Helmet**: Secure HTTP headers
- **CORS**: Properly configured
- **Data Encryption**: Sensitive data encrypted at rest

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach and supports:
- Responsive grid layouts
- Touch-friendly interactions
- Mobile-optimized navigation
- Adaptable images and typography

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Deploy to Vercel (Frontend)
```bash
cd client
npm run build
vercel --prod
```

### Deploy to Render (Backend)
```bash
cd server
npm start
```

### Deploy to MongoDB Atlas
```bash
# Update MONGODB_URI in .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stripe for payment processing
- MongoDB for database
- React team for the amazing framework
- All open-source contributors

## 📞 Support

For support, email support@yourapp.com or join our Slack channel.

---

## 🎯 Key Learning Outcomes

By building this project, you'll master:

1. **Full-Stack Development**: Complete MERN stack implementation
2. **Authentication**: JWT, OAuth, password hashing
3. **Payment Integration**: Stripe/Razorpay APIs
4. **State Management**: Redux Toolkit
5. **REST API Design**: CRUD operations, pagination, filtering
6. **Database Design**: MongoDB schemas, relationships
7. **Security**: Best practices for web applications
8. **Deployment**: Production deployment on cloud platforms
9. **Testing**: Unit, integration, and E2E testing
10. **Documentation**: API documentation, README files

---

**Happy Coding! 🚀**

*Double Tap ❤️ For More*
