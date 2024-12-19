const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/gameScores', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 定义玩家分数数据模型
const ScoreSchema = new mongoose.Schema({
  player: String,
  score: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model('Score', ScoreSchema);

const app = express();

// 设置静态文件目录
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// 设置 bodyParser 解析 JSON 请求体
app.use(bodyParser.json());

// 获取玩家得分历史记录的路由
app.get('/scores/:player', async (req, res) => {
  try {
    const scores = await Score.find({ player: req.params.player });
    res.json(scores);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 保存玩家得分到数据库的路由
app.post('/scores', async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).send(score);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
