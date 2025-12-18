import { User } from '../types';

// NOTE: Browsers cannot connect directly to MySQL (TCP Port 3306).
// This technically requires a backend server. 
// Since we cannot run local files, we use a robust LocalStorage simulation 
// that mimics a database exactly for this demo.

const USERS_TABLE_KEY = 'steelhead_users';
const CURRENT_USER_KEY = 'steelhead_current_session';

interface DBUser extends User {
  passwordHash: string;
}

// Simulate network latency for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async register(name: string, email: string, password: string): Promise<User> {
    await delay(800);

    const usersRaw = localStorage.getItem(USERS_TABLE_KEY);
    const users: DBUser[] = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.find(u => u.email === email)) {
      throw new Error('User already exists with this email.');
    }

    const newUser: DBUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
      passwordHash: btoa(password), // Simple encoding for demo
    };

    users.push(newUser);
    localStorage.setItem(USERS_TABLE_KEY, JSON.stringify(users));
    
    // Auto login
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  async login(email: string, password: string): Promise<User> {
    await delay(800);

    const usersRaw = localStorage.getItem(USERS_TABLE_KEY);
    const users: DBUser[] = usersRaw ? JSON.parse(usersRaw) : [];

    // Check credentials against our "Database"
    const user = users.find(u => u.email === email && u.passwordHash === btoa(password));
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem(CURRENT_USER_KEY);
    return session ? JSON.parse(session) : null;
  }
};