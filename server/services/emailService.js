// This is a placeholder email service.
// In production, you should use a proper email service like SendGrid, Mailgun, etc.

const nodemailer = require('nodemailer');

// Email configuration
const getTransporter = () => {
  // For production, use environment variables
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // For development, create a test account with Ethereal
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount().then(account => {
      console.log('Created test email account:', account.user);
      
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      
      resolve(transporter);
    }).catch(error => {
      console.error('Failed to create test email account:', error);
      reject(error);
    });
  });
};

const sendContactNotification = async (contactData) => {
  try {
    // Get email transporter
    const transporter = await getTransporter();
    
    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${contactData.company}</p>
      <h3>Message:</h3>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Thor Signia Website" <noreply@thorsignia.in>',
      to: process.env.EMAIL_TO || 'info@thorsignia.in', // Change to your notification email
      subject: `New Contact Form Submission: ${contactData.name} from ${contactData.company}`,
      html: emailContent
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // For development with Ethereal, log the preview URL
    if (info.messageId && process.env.NODE_ENV !== 'production') {
      console.log('Email preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Create a backup of form submissions to JSON file (as Vercel has read-only filesystem, 
// this will only work in development environment)
const backupSubmission = (contactData) => {
  // Only run in non-Vercel environments where filesystem is writable
  if (process.env.VERCEL === '1') {
    return Promise.resolve({ success: false, reason: 'Vercel environment - skipping file backup' });
  }
  
  const fs = require('fs');
  const path = require('path');
  const backupDir = path.join(__dirname, '../data');
  const backupFile = path.join(backupDir, 'contact_submissions.json');
  
  return new Promise((resolve) => {
    try {
      // Create backup directory if it doesn't exist
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      // Add timestamp
      const submissionWithTimestamp = {
        ...contactData,
        timestamp: new Date().toISOString()
      };
      
      // Read existing data or create empty array
      let submissions = [];
      if (fs.existsSync(backupFile)) {
        const data = fs.readFileSync(backupFile, 'utf8');
        submissions = JSON.parse(data);
      }
      
      // Add new submission and write back to file
      submissions.push(submissionWithTimestamp);
      fs.writeFileSync(backupFile, JSON.stringify(submissions, null, 2), 'utf8');
      
      console.log('Backup saved to:', backupFile);
      resolve({ success: true });
    } catch (error) {
      console.error('Failed to backup submission:', error);
      resolve({ success: false, error: error.message });
    }
  });
};

module.exports = {
  sendContactNotification,
  backupSubmission
}; 