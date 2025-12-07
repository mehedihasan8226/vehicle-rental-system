
import { Request, Response } from "express"
import { bookingsService } from "./bookings.service"
import { pool } from "../../config/db";




const createBookings  = async(req: Request, res: Response)=>{

  try{
    const result =  await bookingsService.createBookings(req.body)
       
    res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: result
  })

  }catch(err: any){
    res.status(500).json({
    success: false,
    message: err.message
  })
  } 
}



const getBookings = async(req: Request, res: Response)=>{

  
  let role: any = req.user!.role
  let email : any  = req.user!.email

  
  let message = role === "Admin"? "Bookings retrieved successfully" : "Your bookings retrieved successfully"

  try {
    const result = await bookingsService.getBookings(role, email)
    res.status(200).json({
      success: true,
      message: message,
      data: result
    })
    
  } catch (err:any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      })
  }
}


const updateBookings =  async(req: Request, res: Response)=>{
    const { status} = req.body;

  let role = req.user!.role

    
    
  try {
    const result = await bookingsService.updateBookings(status, role, req.params.bookingId as string)
   

    if(result.length===0){
      res.status(404).json({
      success: false,
       message: "Bookings Not found!",
    })
     }
     else{
       res.status(200).json({
      success: true,
      message: "Bookings Updated successfully",
      data: result

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






export const bookingsController = {
    createBookings,
    getBookings,
    updateBookings,



}