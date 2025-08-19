const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // You can change this to your preferred email service
        auth: {
            user: process.env.EMAIL_USER || 'karieryolu@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Helper function to get service type text
const getServiceTypeText = (serviceType) => {
    const serviceTypes = {
        'cv': 'CV Optimierung',
        'linkedin': 'LinkedIn Profil',
        'coaching': 'Bewerbungscoaching',
        'package': 'Komplettpaket'
    };
    return serviceTypes[serviceType] || serviceType;
};

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, serviceType, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !serviceType || !message) {
            return res.status(400).json({
                success: false,
                message: 'Bitte füllen Sie alle Pflichtfelder aus.'
            });
        }
        
        // Create transporter
        const transporter = createTransporter();
        
        // Email content for you (the business owner)
        const businessEmailContent = `
            <h2>Neue Karriereberatungs-Anfrage von KarierYolu Website</h2>
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #333; margin-top: 0;">Kontaktinformationen</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>E-Mail:</strong> ${email}</p>
                    <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
                </div>
                
                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #333; margin-top: 0;">Service-Details</h3>
                    <p><strong>Gewünschter Service:</strong> ${getServiceTypeText(serviceType)}</p>
                </div>
                
                <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #333; margin-top: 0;">Nachricht</h3>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Diese Anfrage wurde über die KarierYolu Website gesendet.</strong></p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                        Zeitpunkt: ${new Date().toLocaleString('de-DE')}
                    </p>
                </div>
            </div>
        `;
        
        // Email content for the customer (confirmation)
        const customerEmailContent = `
            <h2>Vielen Dank für Ihre Anfrage!</h2>
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <p>Liebe/r ${name},</p>
                
                <p>vielen Dank für Ihr Interesse an unserer Karriereberatung! Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #333; margin-top: 0;">Ihre Anfrage im Überblick:</h3>
                    <p><strong>Gewünschter Service:</strong> ${getServiceTypeText(serviceType)}</p>
                </div>
                
                <p>Wir werden uns schnellstmöglich bei Ihnen melden.</p>
                
                <p>Mit freundlichen Grüßen,<br>
                Ihr KarierYolu Team</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        KarierYolu - Ihr Partner für eine erfolgreiche Karriere in Deutschland
                    </p>
                </div>
            </div>
        `;
        
        // Send email to business owner
        const businessEmail = await transporter.sendMail({
            from: process.env.EMAIL_USER || 'karieryolu@gmail.com',
            to: process.env.BUSINESS_EMAIL || 'karieryolu@gmail.com', // Your business email
            subject: `Neue Karriereberatungs-Anfrage von ${name}`,
            html: businessEmailContent,
            replyTo: email
        });
        
        // Send confirmation email to customer
        const customerEmail = await transporter.sendMail({
            from: process.env.EMAIL_USER || 'karieryolu@gmail.com',
            to: email,
            subject: 'Vielen Dank für Ihre Anfrage - KarierYolu',
            html: customerEmailContent
        });
        
        // Send both emails
        await Promise.all([businessEmail, customerEmail]);
        
        console.log(`New career consultation inquiry from ${name} (${email}) for ${getServiceTypeText(serviceType)}`);
        
        res.json({
            success: true,
            message: 'Ihre Nachricht wurde erfolgreich gesendet!'
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`KarierYolu server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the website`);
    console.log('Make sure to set up your email credentials in the .env file');
});

module.exports = app;

