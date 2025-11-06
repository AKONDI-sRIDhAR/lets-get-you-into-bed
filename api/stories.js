// pages/api/stories.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create a new story (for n8n uploads)
    try {
      const { title, content, imageUrl } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content required' });
      }
      const story = await prisma.story.create({
        data: { 
          title, 
          content, 
          imageUrl: imageUrl || null 
        },
      });
      res.status(201).json({ success: true, story });
    } catch (error) {
      console.error('Create Error:', error);
      res.status(500).json({ error: 'Failed to create story', details: error.message });
    }
  } else if (req.method === 'GET') {
    // Fetch all stories, newest first (for frontend)
    try {
      const stories = await prisma.story.findMany({ 
        orderBy: { date: 'desc' } 
      });
      res.status(200).json({ stories });
    } catch (error) {
      console.error('Fetch Error:', error);
      res.status(500).json({ error: 'Failed to fetch stories' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}