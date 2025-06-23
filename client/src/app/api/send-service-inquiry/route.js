import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, organization, email, services, callBooking } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465, // or 587
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let subject = "New Service Inquiry";
  let html = `
    <h2>Service Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Services:</strong> ${services && services.length ? services.join(", ") : "-"}</p>
  `;

  if (callBooking) {
    subject = "New Call Booking";
    html = `
      <h2>Call Booking Request</h2>
      <p><strong>Service:</strong> ${callBooking.service}</p>
      <p><strong>Date:</strong> ${callBooking.date}</p>
      <p><strong>Time:</strong> ${callBooking.time}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
  }

  const mailOptions = {
    from: `Service Inquiry <${process.env.SMTP_USER}>`,
    to: process.env.SERVICE_RECEIVER_EMAIL,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
} 