
// This is a browser-compatible implementation that mimics MongoDB functionality
// In a real app, you would use an API endpoint or a backend service like Supabase

// In-memory storage for users
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Save users to localStorage when modified
const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

export async function connectToMongoDB() {
  console.log("Mock MongoDB connection established");
  return {
    collection: (name: string) => ({
      findOne: async (query: any) => {
        if (name === "users") {
          return users.find((user: any) => user.email === query.email) || null;
        }
        return null;
      },
      insertOne: async (doc: any) => {
        if (name === "users") {
          const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const newUser = { _id: id, ...doc };
          users.push(newUser);
          saveUsers();
          return { insertedId: id };
        }
        return { insertedId: null };
      }
    })
  };
}

export async function registerUser(email: string, password: string, name: string) {
  // Check if user already exists
  const existingUser = users.find((user: any) => user.email === email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  
  // In a real app, you'd hash the password here
  const hashedPassword = password; // For demo purposes only
  
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newUser = { 
    _id: id,
    email,
    password: hashedPassword,
    name,
    createdAt: new Date()
  };
  
  users.push(newUser);
  saveUsers();
  
  return { success: true, userId: id.toString() };
}

export async function authenticateUser(email: string, password: string) {
  const user = users.find((user: any) => user.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // In a real app, you'd compare hashed passwords
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  
  return {
    success: true,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    }
  };
}

// Initialize with some test users if needed
if (users.length === 0) {
  const testUser = {
    _id: 'test123',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    createdAt: new Date()
  };
  users.push(testUser);
  saveUsers();
  console.log('Created test user: test@example.com / password123');
}
