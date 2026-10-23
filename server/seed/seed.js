import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile } from 'node:fs/promises';
import { connectDB } from '../config/db.js';
import Career from '../models/Career.js';

async function seed() {
  await connectDB();

  const raw = await readFile(new URL('./careers.json', import.meta.url), 'utf-8');
  const careers = JSON.parse(raw);

  await Career.deleteMany({});
  await Career.insertMany(careers);

  console.log(`Seeded ${careers.length} careers`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});