import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    interests: [String],
    skills: [String],
    roadmap: [{ title: String, duration: String }],
    resources: [{ title: String, url: String }],
    salary: { min: Number, max: Number },
    companies: [String],
    exams: [String],
    expect: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Career', careerSchema);