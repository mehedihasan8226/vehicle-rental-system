import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.contrant";



const router = Router()

router.post('/',auth(Roles.Admin,Roles.Customer), bookingsController.createBookings)
router.get('/',auth(Roles.Admin,Roles.Customer), bookingsController.getBookings)
router.put('/:bookingId',auth(Roles.Admin,Roles.Customer), bookingsController.updateBookings)



export const bookingsRouter = router