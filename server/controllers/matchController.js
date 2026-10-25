import Career from '../models/Career.js';

const INTEREST_WEIGHT = 3;
const SKILL_WEIGHT = 2;

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export async function matchCareers(req, res) {
  const { stage, interests, skills } = req.body;

  if (typeof stage !== 'string' || !isStringArray(interests) || !isStringArray(skills)) {
    return res.status(400).json({ message: 'stage, interests and skills are required' });
  }

  const myInterests = new Set(interests);
  const mySkills = new Set(skills);

  const careers = await Career.find().select('title slug category summary salary interests skills');

  const results = careers
    .map((career) => {
      const matchedInterests = career.interests.filter((id) => myInterests.has(id));
      const matchedSkills = career.skills.filter((id) => mySkills.has(id));

      const score =
        matchedInterests.length * INTEREST_WEIGHT + matchedSkills.length * SKILL_WEIGHT;
      const maxScore =
        career.interests.length * INTEREST_WEIGHT + career.skills.length * SKILL_WEIGHT;

      return {
        title: career.title,
        slug: career.slug,
        category: career.category,
        summary: career.summary,
        salary: career.salary,
        matchPercent: maxScore ? Math.round((score / maxScore) * 100) : 0,
        matchedInterests,
        matchedSkills,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent || b.score - a.score);

  res.json(results);
}