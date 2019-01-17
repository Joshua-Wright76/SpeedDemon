const express = require('express');
const app = express();
const fs = require('fs')

const trips = fs.readdirSync('./resources/trips');

app.get('/trips', (req, res) => {
    console.log('trip data requested!')
    res.json(trips)
})

app.use('/', express.static('./dist'))

app.listen(3000, () => {
    console.log('Listening for GET requests on port 3001!')
})
