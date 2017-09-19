const express = require('express');
const path = require('path');
const app = express();
const index = require('./routes/index.js');



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));



app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', index);




app.listen(3000, () => {
  console.log('Listening on port 3000');
});
