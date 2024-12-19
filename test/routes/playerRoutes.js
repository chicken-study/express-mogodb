const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

// 获取玩家信息和游戏得分历史记录
router.get('/player/:id', async (req, res) => {
  const playerId = req.params.id;
  const database = await db.connect();
  const collection = database.collection('players');
  const player = await collection.findOne({ id: playerId });
  if (player) {
    res.json({
      player: {
        name: player.name,
        username: player.username
        // 其他玩家信息字段
      },
      scores: player.scores
    });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// 保存玩家游戏分数
router.post('/player/:id/score', async (req, res) => {
  const playerId = req.params.id;
  const score = req.body.score;
  const database = await db.connect();
  const collection = database.collection('players');
  const result = await collection.updateOne(
    { id: playerId },
    { $push: { scores: score } }
  );
  if (result.modifiedCount > 0) {
    res.json({ message: 'Score saved successfully' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

module.exports = router;
