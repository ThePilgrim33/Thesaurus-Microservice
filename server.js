const express = require('express');
const app = express();
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));

app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs')
  });

app.get('/result', (req, res) => {
    var word = req.query.word;
    const synParams = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
        headers: {
          'X-RapidAPI-Key': process.env['API_KEY'],
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };

      const defParams = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
        headers: {
          'X-RapidAPI-Key': process.env['API_KEY'],
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };
      
      axios.request(synParams).then(function (response) {
          var data = response.data;
          res.render('result.ejs', {
            data: data.synonyms
          });
      }).catch(function (error) {
          console.error(error);
      });
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })