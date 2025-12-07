import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import config from './config'
import { userRouter } from './modules/users/users.routes'
import initDB from './config/db'
import { vehiclesRouter } from './modules/vehicles/vehicles.routes'
import { bookingsRouter } from './modules/bookings/bookings.routes'
import { authRouter } from './modules/auth/auth.routes'



const app = express()
const port = config.port

app.use(express.json())

initDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


// auth:
app.use('/api/v1/auth',authRouter)


// users:
app.use('/api/v1/users',userRouter)

//vehicles:
app.use('/api/v1/vehicles',vehiclesRouter)

//bookings:
app.use('/api/v1/bookings',bookingsRouter)



//Not found:
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.listen(port, () => {
  console.log(`Vehicle Rental System app listening on port ${port}`)
})
