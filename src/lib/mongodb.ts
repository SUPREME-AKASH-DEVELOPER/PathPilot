
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://akashlakhwan2329:49ni5xCmw2Yl3GgZ@urbanroots.qm1xgx4.mongodb.net/";
const client = new MongoClient(uri);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("pathpilot");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function registerUser(email: string, password: string, name: string) {
  const db = await connectToMongoDB();
  const usersCollection = db.collection("users");
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  
  // Hash password would go here in production
  const hashedPassword = password; // In production, use bcrypt or similar
  
  const result = await usersCollection.insertOne({
    email,
    password: hashedPassword,
    name,
    createdAt: new Date()
  });
  
  return { success: true, userId: result.insertedId };
}

export async function authenticateUser(email: string, password: string) {
  const db = await connectToMongoDB();
  const usersCollection = db.collection("users");
  
  const user = await usersCollection.findOne({ email });
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // In production, compare hashed passwords
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  
  return {
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  };
}
