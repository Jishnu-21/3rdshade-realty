import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const key_id = 'rzp_live_99PPQueghaL46m'; // Your Razorpay key
const key_secret = 'gAgzpIAyBwwdpuoSZjyV86Vb'; // Your Razorpay secret

const razorpay = new Razorpay({ key_id, key_secret });

export async function POST(request: NextRequest) {
  const { amount, name, email, phone, currency } = await request.json();
  try {
    const paymentLink = await razorpay.paymentLink.create({
      amount,
      currency: currency || 'INR',
      customer: {
        name,
        email,
        contact: phone,
      },
      notify: { sms: true, email: true },
      callback_url: 'https://3rdshade-realty.vercel.app/payment-success',
      callback_method: 'get',
    });
    return NextResponse.json({ url: paymentLink.short_url });
  } catch (error: any) {
    console.error('Razorpay payment link error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 