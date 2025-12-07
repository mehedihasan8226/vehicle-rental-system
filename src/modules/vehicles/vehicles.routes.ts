import { Router } from "express";

import { vehiclesController } from "./vehicles.controller";
import { Roles } from "../auth/auth.contrant";
import auth from "../../middleware/auth";

const router = Router()

router.post('/',auth(Roles.Admin), vehiclesController.createVehicles)
router.get('/', vehiclesController.getVehicles)
router.get('/:vehicleId', vehiclesController.getSingleVehicles)
router.put('/:vehicleId',auth(Roles.Admin), vehiclesController.updateVehicles)
router.delete('/:vehicleId',auth(Roles.Admin), vehiclesController.deleteVehicles)



export const vehiclesRouter = router