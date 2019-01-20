const express = require('express');
const app = express();
const fs = require('fs')
const { promisify } = require('util')

app.get('/trips', (req, res) => {
    console.log('trip data requested!')

    const fileNames = fs.readdirSync('./resources/trips');
    const allTrips = [];
    let tripData = [];

    const readFile = promisify(fs.readFile);

    fileNames.forEach(name => {
        allTrips.push(readFile('./resources/trips/'+name, 'utf8'))
    })

    allTrips.forEach(trip => {
        // console.log(trip);
        trip.then( data => {
            const result = JSON.parse(data)
            tripData.push(result)
        })
    })

    Promise.all(allTrips)
        .then(() => {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Transfer-Encoding': 'chunked'
            });

            tripData = JSON.stringify(tripData)
            // res.write(tripData);
            tripData = tripData.match(/.{1,3000}/g)
            tripData.forEach(chunk => {
                res.write(chunk)
                // console.log(chunk)
            })
            console.log('Stream ended')
            res.end()
        })
})

app.use('/', express.static('./dist'))

app.listen(3000, () => {
    console.log('Listening for GET requests on port 3000!')
})
