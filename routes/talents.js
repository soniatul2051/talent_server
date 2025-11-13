import express from 'express';
import Talent from '../models/Talent.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;
    
    if (!name || !email || !experience) {
      return res.status(400).json({ message: 'Name, email and experience are required' });
    }

    const talent = new Talent({
      name,
      email,
      skills: Array.isArray(skills) ? skills : [skills].filter(Boolean),
      experience: parseInt(experience)
    });

    const savedTalent = await talent.save();
    res.status(201).json(savedTalent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { skill } = req.query;
    let filter = {};

    if (skill) {
      filter.skills = { $in: [new RegExp(skill, 'i')] };
    }

    const talents = await Talent.find(filter).sort({ createdAt: -1 });
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;