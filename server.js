require('dotenv').config();

const app = require('./src/app');

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is running on port https://jobplus-backend.onrender.com:${port}`);
});