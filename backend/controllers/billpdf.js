import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';

const generateBill = (paymentData, recipientEmail) => {
    const { amount, name, email, contact, address, razorpay_payment_id, razorpay_order_id } = paymentData;


    // ✅ Make sure the 'bills' folder exists
    if (!fs.existsSync('./bills')) {
        fs.mkdirSync('./bills');
    }

    const doc = new PDFDocument();

    const filePath = `./bills/bill_${razorpay_order_id}.pdf`; // Path where the bill will be saved

    doc.pipe(fs.createWriteStream(filePath));

    // Add bill content
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#0c2461').text('Shri Balaji Engineering', { align: 'center' });
    doc.moveDown(1);

    
    doc.fontSize(24).fillColor('#0a3d62').text('Invoice', { align: 'center' });
    doc.moveDown(1);

    // Order Details
    doc.fontSize(14).fillColor('#130f40').text(`Order ID: ${razorpay_order_id}`);
    doc.text(`Payment ID: ${razorpay_payment_id}`);
    doc.moveDown();

    // Customer Info
    doc.font('Helvetica-Bold').text('Customer Details:', { underline: true });
    doc.font('Helvetica').fillColor('#444').text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${contact}`);
    doc.text(`Address: ${address}`);
    doc.text(`Amount: ₹${amount}`);
    doc.moveDown();

    // Amount
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#e84118').text(`Total Paid: ₹${amount}`);
    doc.moveDown(2);

    // Bottom footer
    doc.fontSize(12).fillColor('#009432').text('Thank you for your order!', { align: 'center' });


    // doc.fontSize(12).text(`Order ID: ${razorpay_order_id}`);
    // doc.text(`Payment ID: ${razorpay_payment_id}`);
    // doc.text(`Name: ${name}`);
    // doc.text(`Email: ${email}`);
    // doc.text(`Phone: ${contact}`);
    // doc.text(`Address: ${address}`);
    // doc.text(`Amount: ₹${amount}`);

    // Finalize the PDF file
    doc.end();

    // Send email with PDF attachment
    sendEmailWithAttachment(filePath, recipientEmail);

    return filePath;
};

const sendEmailWithAttachment = (filePath, recipientEmail) => {
    // Create a transporter object using your email service (e.g., Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any email service (e.g., 'gmail', 'smtp.example.com', etc.)
        auth: {
            user: process.env.EMAIL, // Your email address
            pass: process.env.PASSWORD, // Your email password (or use OAuth2 for Gmail)
        },
    });

    // Set up email data
    const mailOptions = {
        from: process.env.EMAIL, // Sender's email address
        to: recipientEmail, // Recipient's email address
        subject: 'Invoice for Your Payment', // Email subject
        text: 'Please find your payment invoice attached.', // Email body text
        attachments: [
            {
                filename: `bill_${filePath.split('/').pop()}`, // Name of the PDF file
                path: filePath, // Path to the PDF file
            },
        ],
    };
    console.log(mailOptions);
    // Send the email with the attachment
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export { generateBill };
