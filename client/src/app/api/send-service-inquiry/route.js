import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.json();
  const { name, email, service, message } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Send notification email to admin
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: 'info@3rdshade.in',
      subject: 'New Service Inquiry',
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        Message: ${message}
      `,
      html: `
        <h2>Service Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting 3rdshade.in',
      text: `
        Dear ${name},

        Thank you for reaching out to 3rdshade.in. We have received your inquiry and our team will get back to you shortly.

        Here's a summary of your submission:
        Service: ${service}
        
        We appreciate your interest in our services.

        Best regards,
        Team 3rdshade.in
      `,
      html: `
        <h2>Thank you for contacting 3rdshade.in</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to 3rdshade.in. We have received your inquiry and our team will get back to you shortly.</p>
        <h3>Your submission details:</h3>
        <p><strong>Service:</strong> ${service}</p>
        <p>We appreciate your interest in our services.</p>
        <p>Best regards,<br>Team 3rdshade.in</p>
      `,
    });

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email', error: error.message }), { status: 500 });
  }
} 