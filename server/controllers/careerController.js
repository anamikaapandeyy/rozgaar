import Career from '../models/Career.js';

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function getCareers(req, res) {
  const { q, category } = req.query;
  const filter = {};

  if (typeof category === 'string' && category) {
    filter.category = category;
  }

  if (typeof q === 'string' && q) {
    const regex = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ title: regex }, { summary: regex }];
  }

  const careers = await Career.find(filter)
    .select('title slug category summary salary')
    .sort('title');

  res.json(careers);
}

export async function getCareerBySlug(req, res) {
  const career = await Career.findOne({ slug: req.params.slug });

  if (!career) {
    return res.status(404).json({ message: 'Career not found' });
  }

  res.json(career);
}