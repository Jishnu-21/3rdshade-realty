import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.json();
  const { type = 'enquiry', name = '', email = '', phone = '', address = '', property = '', service = '', message = '', contactMethod = '', inIndia = '', country = '', visitType = '', date = '', time = '', buyTimeline = '' } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let adminSubject = 'New Service Inquiry';
  let userSubject = 'Thank you for contacting 3rdshade.in';
  let adminHtml = '';
  let userHtml = '';

  if (type === 'paynow') {
    adminSubject = `New Pay Now Submission${property ? ' - ' + property : ''}`;
    userSubject = `Thank you for your interest in ${property || 'our property'} - 3rdshade.in`;
    adminHtml = `
      <h2>Pay Now Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Property:</strong> ${property}</p>
    `;
    userHtml = `
      <h2>Thank you for your interest in ${property || 'our property'}</h2>
      <p>Dear ${name},</p>
      <p>We have received your details and will contact you soon.</p>
      <h3>Your submission details:</h3>
      <p><strong>Property:</strong> ${property}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p>Best regards,<br>Team 3rdshade.in</p>
    `;
  } else if (type === 'call') {
    adminSubject = `New Call Booking${property ? ' - ' + property : ''}`;
    userSubject = `Your call booking with 3rdshade.in`;
    adminHtml = `
      <h2>Call Booking</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Timezone:</strong> ${data.timezone || ''}</p>
      <p><strong>Property:</strong> ${property}</p>
    `;
    userHtml = `
      <h2>Your call booking is received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for booking a call with us. We will contact you at your chosen time.</p>
      <h3>Booking details:</h3>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Timezone:</strong> ${data.timezone || ''}</p>
      <p><strong>Property:</strong> ${property}</p>
      <p>Best regards,<br>Team 3rdshade.in</p>
    `;
  } else {
    // enquiry or service enquiry
    adminSubject = `New Property Enquiry${property ? ' - ' + property : ''}`;
    userSubject = `Thank you for your enquiry at 3rdshade.in`;
    let servicesHtml = '';
    if (Array.isArray(data.services) && data.services.length > 0) {
      servicesHtml = `<p><strong>Selected Services:</strong></p><ul>` + data.services.map(s => `<li>${s}</li>`).join('') + `</ul>`;
    }
    adminHtml = `
      <h2>Property/Service Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${servicesHtml}
      <p><strong>Contact Method:</strong> ${contactMethod}</p>
      <p><strong>In India:</strong> ${inIndia}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Visit Type:</strong> ${visitType}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Buy Timeline:</strong> ${buyTimeline}</p>
      <p><strong>Property:</strong> ${property}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    userHtml = `
      <h2>Thank you for your enquiry</h2>
      <p>Dear ${name},</p>
      <p>We have received your enquiry and will get back to you soon.</p>
      <h3>Your submission details:</h3>
      ${servicesHtml}
      <p><strong>Property:</strong> ${property}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Contact Method:</strong> ${contactMethod}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Visit Type:</strong> ${visitType}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Buy Timeline:</strong> ${buyTimeline}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Best regards,<br>Team 3rdshade.in</p>
    `;
  }

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

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
} 