import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

let configOptions={
    host: "smtp.gmail.com",
    service:"gmail",
    port: 486,
    secure: false, 
    auth: {
      user: 'stackclone1@gmail.com',
      pass: 'jdnfavarslzknhvl', 
     
}
,


    tls:{
        rejectUnauthorized:false
    }
    
}

function createTransporter(configOpn:any){
   
    return nodemailer.createTransport(configOpn)
}

export async function sendEmail(messageOptions:any){
    let transporter=createTransporter(configOptions)
    await transporter.sendMail(messageOptions,(err,response)=>{
        if (err) {
            console.error(err)
        }
        console.log(response);

    })

}