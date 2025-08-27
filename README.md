#  🔐 OTP-Based Authentication System (Email + SMS)

This project is a secure and modern **OTP-based authentication system** built with Node.js, Express, and MySQL. It allows users to sign up, log in via **email OTP**, and reset their password using **SMS OTP**. It also includes **rate limiting**, form validation, and a clean folder structure.


## 💻 Features

✅ User Sign-Up with phone number  
✅ Password Reset with **SMS OTP**  
✅ Rate limiting with cooldown timer (stored in DB)  
✅ Secure password hashing using bcrypt  
✅ Modular and clean folder structure  
✅ Frontend form validations  
✅ OTP and user data stored securely in MySQL  
✅ Cooldown timer displayed on frontend


## 🛠️ Technologies Used

- HTML, CSS, JavaScript
- Node.js, Express.js
- MySQL (using `mysql2/promise`)
- bcrypt (for password hashing)
- Nodemailer (for email OTP)
- API Integration for sending OTP (Twilio)
- Dotenv (.env configuration)


## 📂 Project Structure
```bash
Project1/
├── controllers/
│ ├── authController.js
│ └── otpController.js
├── database/
│ └── db.js
├── node_modules/
├── public/
│ ├── login.html
│ ├── login.css
│ ├── signup.html
│ ├── signup.css
│ ├── file.js <-- All combined frontend logic here
├── routes/
│ └── authRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## 🚀 How to Run

1. **Clone the repo**:

   ```bash
   git clone https://github.com/nitinrawat2040/Project1.git
   cd Project1
   ```


2. Install dependencies:
   npm install



3. Set environment variables in .env:
```env
📦 MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=your_database_name

🌐 Server Port
SERVER_PORT=5000

🔐 JWT Secret
JWT_SECRET=your_jwt_secret_key

📧 Nodemailer Email OTP (for Login)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

📲 Twilio SMS Config (for OTP password reset)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_ACCOUNT_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
TWILIO_VERIFICATION_SERVICE_SID=your_twilio_verification_sid
```


5. Run the app:
   node server.js


6. Open http://localhost:5000 in your browser.
