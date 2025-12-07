
import { Request, Response } from "express"
import { pool } from "../../config/db"
import { userService } from "./users.service"






const getUser = async(req: Request, res: Response)=>{

  try {
    const result = await userService.getUser()
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows
    })
    
  } catch (err:any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      })
  }
}


const updateUser =  async(req: Request, res: Response)=>{
    const {name, email,phone, role} = req.body;

    let userRole = req.user!.role
    let userEmail = req.user!.email

    
    
  try {
    const result = await userService.updateUser(name, email, phone, role, userEmail, userRole, req.params.userId as string)
    if(result.rows.length === 0){
      res.status(404).json({
      success: false,
       message: "User Not found!",
     

    })
    }else{
       res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: result.rows[0]

    })

    }
   
    
  } catch (err:any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      })
  }
}


const deleteUser = async(req: Request, res: Response)=>{

  try {
    const result = await userService.deleteUser(req.params.userId!)
    if(result.rowCount === 0){
      res.status(404).json({
      success: false,
       message: "User Not found!",
     

    })
    }else{
       res.status(200).json({
      success: true,
      message: "User Deleted successfully",

    })

    }
   
    
  } catch (err:any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      })
  }
}




export const useController = {

    getUser,
    updateUser,
    deleteUser


}