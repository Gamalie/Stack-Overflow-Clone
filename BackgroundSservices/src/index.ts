import cron from 'node-cron'
import { sendWelcomeEmail ,sendResetEmail} from './EmailServices/welcomeEmail';


console.log('starting cron job');

cron.schedule('*/2 * * * * *', async () => {
    await sendWelcomeEmail()
    await sendResetEmail()
   
  }); 