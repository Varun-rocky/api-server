const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Load data
const dataPath = path.join(__dirname, '2019_Results.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Route to get details by state and optional constituency
app.get('/api/:state/:constituency?', (req, res) => {
  const state = req.params.state;
  const constituency = req.params.constituency;
  
  const stateData = data[state];
  if (!stateData) {
    return res.status(404).json({ error: 'State not found' });
  }
  
  if (constituency) {
    const constituencyData = stateData.filter(item => item.Constituency === constituency);
    if (constituencyData.length === 0) {
      return res.status(404).json({ error: 'Constituency not found' });
    }
    res.json(constituencyData);
  } else {
    res.json(stateData);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
