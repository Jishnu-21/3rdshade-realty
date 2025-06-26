import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.json();
  const { name = '', email = '', property = '', amount = '', payment_id = '' } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const adminSubject = `Payment Success${property ? ' - ' + property : ''}`;
  const userSubject = `Your payment for ${property || 'property'} is successful - 3rdshade.in`;
  const adminHtml = `
    <h2>Payment Successful</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Property:</strong> ${property}</p>
    <p><strong>Amount:</strong> ${amount}</p>
    <p><strong>Payment ID:</strong> ${payment_id}</p>
  `;
  const userHtml = `
    <h2>Payment Received</h2>
    <p>Dear ${name},</p>
    <p>Thank you for your payment for ${property || 'the property'}.</p>
    <h3>Payment details:</h3>
    <p><strong>Amount:</strong> ${amount}</p>
    <p><strong>Payment ID:</strong> ${payment_id}</p>
    <p>We will contact you soon with next steps.</p>
    <p>Best regards,<br>Team 3rdshade.in</p>
  `;

  try {
    // Send notification email to admin
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: 'info@3rdshade.in',
      subject: adminSubject,
      html: adminHtml,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: userSubject,
      html: userHtml,
    });

    return NextResponse.json({ message: 'Payment emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending payment email:', error);
    return NextResponse.json({ message: 'Error sending payment email', error: error.message }, { status: 500 });
  }
} 