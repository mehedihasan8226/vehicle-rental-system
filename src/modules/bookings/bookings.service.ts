import { pool } from "../../config/db"


const createBookings = async(payload: Record<string, unknown>)=>{

    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload


  const vehicles = await pool.query(
    `SELECT id, daily_rent_price, vehicle_name, availability_status FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );



await pool.query(
  `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
  ["booked", vehicle_id]
);



  // rent:
  const dailyRent = vehicles.rows[0].daily_rent_price;

  let vehicle = {
       vehicle_name: vehicles.rows[0].vehicle_name,
       daily_rent_price: vehicles.rows[0].daily_rent_price
  }

 
  const start:any = new Date(rent_start_date as string);
  const end: any = new Date(rent_end_date as string);
  const totalDays: any = (end - start) / (1000 * 60 * 60 * 24);


  const totalPrice = totalDays * dailyRent;


  const status = "active";


  const result = await pool.query(
    `INSERT INTO bookings(
        customer_id, vehicle_id,
        rent_start_date, rent_end_date,
        total_price, status
    ) VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      status
    ]
  );

  delete result.rows[0].created_at
  delete result.rows[0].updated_at

  let results = result.rows[0].vehicle = {
        ...result.rows[0],
        vehicle: vehicle
  }


  

      return results
}      



const getBookings = async(role: string, email: string)=>{
   const bookings = await pool.query(`SELECT * FROM bookings`)

     const vehicles = await pool.query(
    `SELECT id, daily_rent_price, vehicle_name, registration_number, type FROM vehicles`,
   
  );

     const users = await pool.query(
    `SELECT id, name, email, role FROM users`,
   
  );

 



 const bookingsWithCustomerAndVehicle = bookings.rows
 .filter(booking => role === "admin" || email === users.rows.find(u => u.id === booking.customer_id)?.email)
 .map(booking => {
    const vehicle = vehicles.rows.find(v => v.id === booking.vehicle_id);

    const user = users.rows.find(u => u.id === booking.customer_id);

    
       if(role === "admin"){
          return {
              ...booking,
              customer: {
                name: user?.name,
                email: user?.email
              },
              vehicle: {
                vehicle_name: vehicle?.vehicle_name,
                daily_rent_price: vehicle?.daily_rent_price
              }

            };
       }


               return {
              ...booking,

               vehicle: {
                vehicle_name: vehicle?.vehicle_name,
                registration_number: vehicle?.registration_number,
                type: vehicle?.type,
                
              }

           

            };

  
 
  });

  
  return bookingsWithCustomerAndVehicle;


}



const updateBookings = async( status:string, role:string, id:string)=>{
   const result =  await pool.query(`UPDATE bookings SET status=$1 WHERE id = $2 RETURNING *`, 
    [ status, id])


  console.log(result.rows[0].vehicle_id);
    

    let vehicleId = result.rows[0].vehicle_id


    if(role=="customer" && status=='cancelled'){
      await pool.query(
          `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
          ["available", vehicleId]
        );
      return result.rows[0]

    }



    let booking = result.rows[0]

   booking.vehicle = {
       availability_status: "available",

  }


    delete result.rows[0].created_at
    delete result.rows[0].updated_at

  
    
  if(role=="admin" && status=='returned'){
     await pool.query(
          `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
          ["available", vehicleId]
        );
    return booking

  }
  return ["wrong status code!"]
    
}


export const bookingsService = {
    createBookings,
    getBookings,
    updateBookings,

    

}