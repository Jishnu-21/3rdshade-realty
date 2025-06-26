import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = 'mongodb+srv://Jishnu:Beastgame_21@cluster0.2zycesu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
if (!uri) throw new Error('MONGODB_URI environment variable is not set');
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db(); // Use default DB from URI
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    const result = await users.insertOne(user);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    (userWithoutPassword as any)._id = result.insertedId;

    return NextResponse.json({ message: 'User registered successfully', user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 