const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { port } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
