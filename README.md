Features
User Signup & Login: Users can sign up with their details (email, password, etc.) and login to their accounts.
Fetch LeetCode User Data: Fetch user statistics like submission count and rank from LeetCode.
Rank Updates: Users can update their competitive programming platform ranks (LeetCode, Codeforces, Codechef).
Forgot Password & OTP: Forgot password functionality with OTP-based verification.
Platform Username Management: Users can insert or update usernames for platforms like LeetCode, Codeforces, and Codechef.
User Data: Retrieve user data including name, email, and platform usernames.
College-specific Ranking: Get the rank comparison among users within the same college for different platforms.
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Password Hashing: bcryptjs
GraphQL: Fetching user data from LeetCode via GraphQL API.
Email Service: Nodemailer (for OTP-based password reset)
Environment Variables: dotenv



API Endpoints
User Authentication
POST /api/user/login: Login a user with email and password.
POST /api/user/signup: Sign up a new user.
POST /api/user/forgotPass: Send OTP for password reset.
PUT /api/user/resetPass: Reset the password using the reset token.
PUT /api/user/changePassword: Verify OTP and change password.
User Data & Rank Management
GET /api/user/leetcode/:username: Fetch LeetCode user statistics using GraphQL.
GET /api/user/userdata: Get the authenticated user's data.
GET /api/user/chefuser: Get the authenticated user's CodeChef username.
GET /api/user/forcesuser: Get the authenticated user's Codeforces username.
GET /api/user/leetuser: Get the authenticated user's LeetCode username.
GET /api/user/college-rank/:username/:college: Get the rank comparison for a user within their college for multiple platforms.
Platform Username Management
POST /api/user/insertuser: Insert usernames for LeetCode, Codeforces, and Codechef for the logged-in user.
PUT /api/user/updateUser: Update usernames and other user details.
