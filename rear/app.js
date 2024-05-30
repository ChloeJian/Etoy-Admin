// rear/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cateRoutes = require('./routes/cateRoutes');
const toyRoutes = require('./routes/toyRoutes');
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const brRoutes = require('./routes/brRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Etoy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/cate', cateRoutes);
app.use('/toy', toyRoutes);
app.use('/user', userRoutes);
app.use('/organization', organizationRoutes);
app.use('/br', brRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`服务器在端口 ${port} 上运行`);
});