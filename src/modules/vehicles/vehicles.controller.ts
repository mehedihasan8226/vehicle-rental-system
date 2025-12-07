
import { Request, Response } from "express"


import { vehiclesService } from "./vehicles.service"



const createVehicles  = async(req: Request, res: Response)=>{


  try{
    const result =  await vehiclesService.createVehicles(req.body)
      if(result.rows.length===0){
      res.status(404).json({
      success: false,
       message: "Vehicle Not found!",
    })
     }
     else{
      res.status(201).json({
    success: true,
    message: "Vehicle created successfully",
    data: result.rows[0]
  })

     }
    

  }catch(err: any){
    res.status(500).json({
    success: false,
    message: err.message
  })
  } 
}



const getVehicles = async(req: Request, res: Response)=>{

  try {
    const result = await vehiclesService.getVehicles()
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      results: result.rows
    })
    
  } catch (err:any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      })
  }
}


const getSingleVehicles = async(req: Request, res: Response)=>{

  try {
    const result = await vehiclesService.getSingleVehicles(req.params.vehicleId as string)
    if(result.rows.length === 0){
      res.status(404).json({
      success: false,
       message: "Vehicles Not found!",
     

    })
    }else{
       res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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



const updateVehicles =  async(req: Request, res: Response)=>{
    const {vehicle_name, registration_number, daily_rent_price} = req.body;
    
  try {
    const result = await vehiclesService.updateVehicles(vehicle_name, registration_number, daily_rent_price, req.params.vehicleId as string)
    if(result.rows.length === 0){
      res.status(404).json({
      success: false,
       message: "Vehicles Not found!",
     

    })
    }else{
       res.status(200).json({
      success: true,
      message: "Vehicles Updated successfully",
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


const deleteVehicles = async(req: Request, res: Response)=>{

  try {
    const result = await vehiclesService.deleteVehicles(req.params.vehicleId!)
    if(result.rowCount === 0){
      res.status(404).json({
      success: false,
       message: "Vehicles Not found!",
     

    })
    }else{
       res.status(200).json({
      success: true,
      message: "Vehicles Deleted successfully",
      data: null

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




export const vehiclesController = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles


}