import { Router } from "express";
import { useController } from "./users.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.contrant";

const router = Router()

router.get('/',auth(Roles.Admin), useController.getUser)
router.put('/:userId', auth(Roles.Admin,Roles.Customer), useController.updateUser)
router.delete('/:userId', auth(Roles.Admin), useController.deleteUser)



export const userRouter = router