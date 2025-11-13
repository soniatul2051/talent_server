import express from 'express';
import Talent from '../models/Talent.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;
    
    if (!name || !email || !experience) {
      return res.status(400).json({ 
        message: 'Name, email and experience are required' 
      });
    }

    if (typeof experience !== 'number' || experience < 0) {
      return res.status(400).json({ 
        message: 'Experience must be a positive number' 
      });
    }

    const talent = new Talent({
      name: name.trim(),
      email: email.trim(),
      skills: Array.isArray(skills) ? skills : [skills].filter(Boolean),
      experience: experience
    });

    const savedTalent = await talent.save();
    res.status(201).json(savedTalent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already exists' 
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: messages.join(', ') 
      });
    }
    res.status(500).json({ 
      message: 'Server error occurred' 
    });
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
    res.status(500).json({ 
      message: 'Failed to fetch talents' 
    });
  }
});

export default router;