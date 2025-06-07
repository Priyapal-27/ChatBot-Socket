import express from 'express';
const router = express.Router();

// Define your REST API routes here
// Example:
router.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

export default router;
