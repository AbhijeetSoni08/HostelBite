# HostelBite 🍔

HostelBite is a comprehensive hostel mess and student management web application designed to streamline administrative tasks, student attendance, payments, and staff management.

## 🚀 Features

### For Students:
- **QR Code Attendance:** Easily mark attendance for meals (Breakfast, Lunch, Snacks, Dinner) by scanning a dynamic QR code.
- **Invoices & Payments:** View generated fee invoices and securely pay them via Razorpay integration.
- **Payment History:** Keep track of all pending and completed payments.
- **Feedback & Complaints:** Submit feedback or complaints directly to the management.
- **Notifications:** Receive real-time announcements from the administration.

### For Admin/Management:
- **Student Management:** Add, update, and remove student profiles.
- **Staff Management:** Maintain staff details and generate monthly salary slips.
- **Invoicing:** Generate automated fee invoices for students.
- **Attendance Tracking:** Generate dynamic QR codes to verify and track student attendance at the mess.
- **Notifications:** Broadcast messages to individual students, specific groups, or everyone.
- **Menu Management:** Update daily food menus for the students to see.

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) (Create React App / Vite)
- [React Router](https://reactrouter.com/) for navigation
- [Tailwind CSS](https://tailwindcss.com/) for modern, responsive UI styling
- [Lucide React](https://lucide.dev/) for clean and consistent icons
- [Axios](https://axios-http.com/) for HTTP requests

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) as the relational database
- [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt) for secure authentication
- [Razorpay API](https://razorpay.com/) for payment gateway integration
- [Nodemailer](https://nodemailer.com/) for sending email notifications
- [QRCode](https://www.npmjs.com/package/qrcode) for dynamic attendance code generation

## ⚙️ Local Setup and Installation

### Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v14 or above)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)

### 1. Clone the Repository
```bash
git clone https://github.com/AbhijeetSoni08/HostelBite.git
cd HostelBite
```

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the MySQL Database:
   - Create a database in MySQL (e.g., `hostelbite_db`).
   - Import any provided `.sql` schema files (if available) to set up the necessary tables (Students, Staff, Attendance, Invoices, etc.).
4. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=hostelbite_db
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   
   # Razorpay Configuration (For Payments)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the project root directory (or `src` folder, depending on structure).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### 4. Running Both Concurrently
Alternatively, you can run both the frontend and backend servers at the same time from the root directory using:
```bash
npm run dev
```
*(This uses the `concurrently` package defined in `package.json`)*

## 📂 Project Structure

```
HostelBite/
├── backend/                   # Express backend server
│   ├── config/                # Database and third-party API configurations
│   ├── controllers/           # API request handlers (Auth, Admin, Student, Staff)
│   ├── routes/                # Express API routes
│   └── index.js               # Entry point for backend
├── public/                    # Static assets
└── src/                       # React frontend source code
    ├── components/            # Reusable UI components
    │   ├── admin/             # Admin dashboard components
    │   ├── common/            # Common/Shared elements (Navbar, ProtectedRoute)
    │   ├── management/        # Staff/Management components
    │   └── student/           # Student facing components (ScanQR, TrackPayment)
    ├── App.jsx                # Main React router setup
    └── index.js               # React DOM rendering entry point
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).