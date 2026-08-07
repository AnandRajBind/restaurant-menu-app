import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { User } from '../src/models/user.model.js';
import { ROLES } from '../src/constants/roles.js';

// Setup ES module __dirname equivalent and load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    // 1. Establish database connection
    await connectDB();

    // 2. Check if an Admin user already exists in the system
    const existingAdmin = await User.findOne({
      $or: [{ role: ROLES.ADMIN }, { email: 'admin@gmail.com' }],
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      await disconnectDB();
      process.exit(0);
    }

    // 3. Create initial System Administrator account (Password is automatically hashed via User schema pre-save hook)
    await User.create({
      name: 'System Administrator',
      email: 'admin@gmail.com',
      password: 'Admin@123',
      role: ROLES.ADMIN,
    });

    console.log('Admin created successfully.');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error(`Error creating initial Admin: ${error.message}`);
    await disconnectDB();
    process.exit(1);
  }
};

seedAdmin();
