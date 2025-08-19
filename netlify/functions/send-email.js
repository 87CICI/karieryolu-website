const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log('Function triggered:', event.httpMethod);
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Parsing request body');
    const data = JSON.parse(event.body);
    const { name, email, phone, serviceType, message } = data;

    console.log('Received data:', { name, email, serviceType });

    // Validate required fields
    if (!name || !email || !serviceType || !message) {
      console.log('Missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, service type and message are required' })
      };
    }

    console.log('Creating email transporter');
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'ildescihan@gmail.com',
        pass: process.env.EMAIL_PASS || 'qpxc zvnm thpr qtlb'
      }
    });

    console.log('Email transporter created');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ildescihan@gmail.com',
      to: process.env.BUSINESS_EMAIL || 'ildescihan@gmail.com',
      subject: `Neue Anfrage von ${name} - KarierYolu`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Neue Anfrage - KarierYolu</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Kontaktdaten:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            <p><strong>Gewünschter Service:</strong> ${serviceType}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>Wir werden uns schnellstmöglich bei Ihnen melden.</p>
          
          <p>Mit freundlichen Grüßen,<br>
          Ihr KarierYolu Team</p>
        </div>
      `
    };

    console.log('Sending email...');
    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        messageId: result.messageId
      })
    };

  } catch (error) {
    console.error('Error in function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        details: error.message,
        stack: error.stack
      })
    };
  }
};
