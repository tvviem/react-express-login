# Client technologies
  - vite build tool
    - js style, postcss, tailwindcss support UI beauty
  - react app with libs: react, react-dom, react-router-dom
  - lib other for react:
    - react-hot-toast: Smoking hot React Notifications. Lightweight, customizable and beautiful by default.
    - formik: Build forms in React, without the tears. Special: init fields, valid fields
  - axios: to make API requests

***

# Server technologies
  - express: for http server
  - cors: for sharing data between different domains
  - mongoose: to create and connect mongodb
  - mongodb-memory-server: create mongodb in memory for dev fasty 
  - multer: Middleware for handling `multipart/form-data`.
  - nodemon: to restart server each change your code (install devDependencies)
  - morgan: HTTP request logger middleware for node.js
  - bcrypt for hash password
  - jsonwebtoken for create JWT
  - otp-generator for generate OTP to reset password of user
  - nodemailer: for sending email from nodejs server
  - mailgen: to generates clean and responsive HTML e-mail (templates email) for sending transactional mail

***

# Notes:
  `openssl rand -base64 32` to create string secret for generate JWT
  Change CommonJS default nodejs into module style with adding below code in package.json
  `"type"="module"`
  You can change default server file index.js into other name which you want.
