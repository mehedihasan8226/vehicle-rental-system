
import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (email: string, password: string)=>{
    
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,
        [email]
    )
    if(result.rows.length === 0){
         throw new Error("User not found");
    }

  
    const user = result.rows[0]

    const match = await bcrypt.compare(password, user.password)

    if(!match){
         throw new Error("Invalid password");
    }


    const token = jwt.sign({name: user.name, email: user.email, role: user.role},config.jwtsecret as string,{
        expiresIn: "7D"
    } )

    delete user.password
    
    return {token, user}
}



const createUser = async(payload: Record<string, unknown>)=>{

    const {name, email, password, phone,role} = payload

      const lowerEmail = (email as string).toLowerCase();

    let passLengthCheck = password as string
    
    if(passLengthCheck.length < 6){
        throw new Error("Password need min 6 characters.")
     
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`
        INSERT INTO users(name, email, password, phone, role) 
        VALUES($1, $2, $3, $4, $5) RETURNING *
      `, [name, lowerEmail, hashedPassword, phone, role])


     delete result.rows[0].password
      return result
}      



export const authServices = {
    loginUser,
    createUser
}