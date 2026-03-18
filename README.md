MovieFlix: Enterprise-Grade Movie Rental Ecosystem

MovieFlix is a sophisticated, full-stack digital commerce platform engineered to manage the end-to-end lifecycle of movie rentals. This project demonstrates high-level proficiency in the MERN stack, focusing on secure architectural patterns, data integrity through database transactions, and automated business logic.

Technical Architecture
Backend (Robust & Scalable)
Environment: Node.js & Express.js.
Database: MongoDB with Mongoose ODM for structured data modeling.
Security: Implementation of JSON Web Tokens (JWT) for stateless authentication and Bcryptjs for secure credential encryption.
Middleware: Custom error handling and authentication layers to ensure system resilience and protected resource access.

Frontend (Modern & Responsive)
Framework: React 19 utilizing functional components and specialized hooks.
Styling: Tailwind CSS 4 for a highly performant, utility-first responsive design.
State Management: React Context API for centralized authentication and user session persistence.
Networking: Axios for optimized asynchronous API communication and interceptor-based error management.

Strategic Features & Implementation
1. Atomic Transaction Management
To solve the critical challenge of "overselling" inventory, I implemented MongoDB Sessions and Transactions in the rental workflow. This ensures that creating a rental record and decrementing movie stock are treated as a single atomic unit; if one fails, the entire operation rolls back to maintain 100% data consistency.
2. Automated Lifecycle & Expiry Logic
Designed a self-managing rental system where each transaction is assigned a 7-day expiration period. The backend dynamically validates the expiryDate against the current timestamp during data retrieval, automatically transitioning statuses from "Rented" to "Expired" without manual intervention.
3. Granular Role-Based Access Control (RBAC)
The system differentiates between standard users and administrative accounts:
Users: Can browse catalogs, manage personal carts, and track rental history.
Admins: Equipped with a comprehensive dashboard to monitor global rentals, manage inventory levels, and oversee user activity.

Project Directory Structure
movieflix/
├── backend/
│   ├── controllers/    # Specialized logic for Users, Movies, and Rentals
│   ├── middleware/     # Secure Auth & global Error handling
│   ├── models/         # Schema definitions with built-in validation
│   └── routes/         # RESTful API entry points
└── frontend/
    ├── src/
    │   ├── components/ # Modular UI components (Navbar, ProtectedRoutes)
    │   ├── pages/      # View-specific logic (AdminDashboard, MyRentals)
    │   └── context/    # Global Auth state management


Deployment & Configuration
Backend Setup
Clone & Install:
Bash
cd backend && npm install


Environment Configuration: Create a .env file in the backend root:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key

Launch:
Bash
npm start


Frontend Setup
Install:
Bash
cd frontend && npm install


Launch:
Bash
npm start


Key API Specifications
Method,Endpoint,Access,Description
POST,/api/users/login,Public,Authenticates user and issues JWT.
GET,/api/movies,Public,Retrieves all active movie listings.
POST,/api/rentals,User,Initiates a rental transaction with stock check.
GET,/api/rentals/all,Admin,Fetches global rental logs with user details.

