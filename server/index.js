const express = require('express');
const compression = require('compression');
const cache = require('express-cache-controller');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cache({maxAge: 31536000}));
app.use(express.json());
app.use(compression());
app.use(express.static('client'));
app.use(cors());

app.get('/tripAdvisor/:id/gallery', (req, res) => {
  fetch(`http://13.52.101.132/tripAdvisor/${req.params.id}/gallery`)
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.get('/api/trip/:id/price', (req, res) => {
  const { id } = req.params;
  fetch(`http://3.23.167.116/api/trip/${id}/price`)
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.get('/api/trip/:id/calendar/?', (req, res) => {
  const { id } = req.params;
  const { startdate, adults } = req.query;

  fetch(`http://3.23.167.116/api/trip/${id}/calendar/?startdate=${startdate}&enddate=${startdate}&adults=${adults}`)
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.get('/tour', (req, res) => {
  fetch('http://54.190.52.239/tour')
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.get('/reviews', (req, res) => {
  fetch('http://3.12.90.50:3000/reviews')
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.put('/reviews', ({body: { _id }}, res) => { // nested destructuring
  fetch('http://3.12.90.50:3000/reviews', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ _id })
  })
  .then(res => res.json())
  .then(data => res.send(data));
});

app.listen(2400, () => console.log('Proxy Server Listening to Requests on Port 2400...'));