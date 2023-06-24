import sql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}




// import nodemailer from 'nodemailer'

// let emailConfiig ={
//                 host: "smtp.gmail.email",
//                 service:'gmail',
//                 port: 587,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                 user: 'stackclone1@gmail.com', // a new account i created for dummy email
//                 pass: 'aggwjtqplsnulrct'
//             } // generated gmail password


// }

// let message ={
//     from:'stackclone268@gmail.com',
//     to: "briannjeri9@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello Brian,welcome to Stack Clone</b>", // html body
// }


// async function sendEmail(messageOp:any){

//     let transporter = nodemailer.createTransport(emailConfiig)
//     await transporter.sendMail(messageOp)

// }

// sendEmail(message)
// console.log(message)
