## Project Name :  Vehicle Rental System
## Live URL: https://vehiclerentalsystem-sigma.vercel.app


##  Features

###  Vehicles
- Add, retrieve, single retrieve, update, delete vehicles  
- Track vehicle availability status  
- View vehicle details including daily rent price  

###  Users
- Get and manage customer accounts  
- Update customer information  
- View customer profiles  

###  Bookings
- Create, GEt, and Update  new vehicle bookings  
- Handle rental start & end dates  
- Auto-calculate total rental cost  
- Manage vehicle return process  

###  Authentication
- Secure login and Singup system
- Role-based access control (Admin & Customer)  
- Admin can manage vehicles, customers, and bookings  
- Customers can view and manage their own bookings  


## Technology Stack:
<li>Node.js + TypeScript </li>
<li>Express.js (web framework)</li>
<li>PostgreSQL (database)</li>
<li>bcrypt (password hashing)</li>
<li>jsonwebtoken (JWT authentication)</li>



## ⚙️ Setup & Usage Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name

## Install Dependencies
npm install

## Configure Environment Variables
PORT=5000
CONNECTION_STRING=your_database_connection_string
JWT_SECRET=your_jwt_secret_key

## Start the Server:
npm run dev      # for development
npm run build       # for production

## Access the API:
http://localhost:5000
https://vehiclerentalsystem-sigma.vercel.app

### Use tools like Postman, Thunder Client, or cURL to test API routes.



---

#  API Endpoints

```markdown
##  Auth Routes
- **POST** `/api/v1/auth/signin`
- **POST** `/api/v1/auth/signup`

##  User Routes
- **GET** `/api/v1/users` (Admin)
- **PUT** `/api/v1/users/:userId` (Admin + Customer)
- **DELETE** `/api/v1/users/:userId` (Admin)

##  Vehicle Routes
- **POST** `/api/v1/vehicles` (Admin)
- **GET** `/api/v1/vehicles`
- **GET** `/api/v1/vehicles/:vehicleId`
- **PUT** `/api/v1/vehicles/:vehicleId` (Admin)
- **DELETE** `/api/v1/vehicles/:vehicleId` (Admin)

##  Booking Routes
- **POST** `/api/v1/bookings` (Admin + Customer)
- **GET** `/api/v1/bookings` (Admin + Customer)
- **PUT** `/api/v1/bookings/:bookingId` (Admin + Customer)


















