import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import { sqlConfig } from '../config'
import { sendEmail } from '../Helpers/sendMail'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

export interface Users{
    User_id:number,
    Name:string,
    Email:string,
    Password:string,
    Picture:string,
    Username:string,
    Title:string,
    About_me:string,
    Is_delete:number,
    Role:string,
    Answer_id:string
}


export const sendWelcomeEmail= async ()=>{
    const pool= await mssql.connect(sqlConfig)
    

    const users:Users[]= await (await pool.request().execute('getallWithoutSentEmails')).recordset
    // console.log(users);

    for (let user of users){
   
        ejs.renderFile('Templates/welcome.ejs',{name:user.Name},async(err,html)=>{
            
            // console.log(html);

            try {
                let messageOptions={
                    from:process.env.EMAIL , 
                    to: user.Email, 
                    subject: "Welcome Email", 
                   
                    html
                }
                // console.log(html);
                
                await sendEmail(messageOptions)

                await pool.request().query(`UPDATE Users SET email_sent=1 where User_id='${user.User_id}'`)
            } catch (error:any) {
                
            }
        })
    }

}

export const sendResetEmail= async ()=>{
    const pool= await mssql.connect(sqlConfig)

    const users:Users[]= await (await pool.request().execute(`getEmailsOfUserApprovedAnswer`)).recordset
    // console.log(users);

    for (let user of users){
       
        ejs.renderFile('Templates/approvedEmail.ejs',{name:user.Name},async(err,html)=>{
            

            console.log(user);

            //send email
            try {
                let messageOptions={
                    from:process.env.EMAIL , // sender address
                    to: user.Email, // list of receivers
                    subject: "Congratulations Your Answer Has Been Approved", // Subject line
                    html
                }
                // console.log(html);
                
                await sendEmail(messageOptions)
                await pool.request().query(`UPDATE Answers
                SET email_sent = 1
                WHERE Answer_id = '${user.Answer_id}'`)


            } catch (error:any) {
                
            }

        })
       

    }


}

