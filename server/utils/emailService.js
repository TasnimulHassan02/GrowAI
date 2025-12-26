import dotenv from 'dotenv';
dotenv.config();

// Email service using external API (Resend)

const sendEmail = async (to, subject, htmlContent, textContent) => {
  try {
    // Option 1: Using Resend (recommended for simplicity)
    if (process.env.EMAIL_SERVICE === 'resend' && process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend'); 
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      
      const { data, error } = await resendClient.emails.send({
        from: process.env.EMAIL_FROM,
        to: "tasnimulhassan02@gmail.com",
        subject: subject,
        html: htmlContent,
        text: textContent || htmlContent.replace(/<[^>]*>/g, ''),
      });

      if (error) {
        console.error('Resend email error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    }

    // Fallback: Log email (for development)
    console.log('📧 Email would be sent:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Content:', textContent || htmlContent);
    
    return { success: true, mock: true };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error: error.message };
  }
};

export const sendNotificationEmail = async (userEmail, userName, notification) => {
  const { type, title, message } = notification;
  
  let subject = title;
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GrowAI Notification</h1>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>Hello ${userName},</p>
          <p>${message}</p>
          <p>Best regards,<br>The GrowAI Team</p>
        </div>
        <div class="footer">
          <p>This is an automated notification from GrowAI. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `Hello ${userName},\n\n${message}\n\nBest regards,\nThe GrowAI Team`;

  return await sendEmail(userEmail, subject, htmlContent, textContent);
};

export default sendEmail;

