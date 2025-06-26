import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const key_id = 'rzp_live_99PPQueghaL46m'; // Replace with your Razorpay key
const key_secret = 'gAgzpIAyBwwdpuoSZjyV86Vb'; // Replace with your Razorpay secret

const razorpay = new Razorpay({ key_id, key_secret });

export async function POST(request: NextRequest) {
  const { amount, currency, receipt } = await request.json();
  try {
    const order = await razorpay.orders.create({
     amount:50000, // amount in paise (e.g., 50000 for ₹500)
      currency:'INR',
      receipt:'test_receipt_1',
    });
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 