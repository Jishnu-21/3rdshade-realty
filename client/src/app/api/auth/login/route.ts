import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = 'mongodb+srv://Jishnu:Beastgame_21@cluster0.2zycesu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
if (!uri) throw new Error('MONGODB_URI environment variable is not set');
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db(); // Use default DB from URI
    const users = db.collection('users');

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ message: 'Login successful', user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 