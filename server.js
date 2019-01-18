const express = require('express');
const app = express();
const fs = require('fs')
const { promisify } = require('util')
const trips = [];
// console.log(tripFileNames.length);



// tripFileNames.forEach(name => {
//     console.log(name);
//     fs.readFile('./resources/trips/' + name, (err, data) => {
//         if(err) console.error(err);
//         else {
//             // console.log(data.toString());
//         }
//     })
// })

app.get('/trips', (req, res) => {
    console.log('trip data requested!')
    // res.writeHead(200, {
    //     'Content-Type': 'text/plain',
    //     'Transfer-Encoding': 'chunked'
    // })

    


    

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
    



    // fs.readdir('./resources/trips', (err, data) => {
    //     if(err) console.error(err);
    //     else {
    //         const tripNames = data;
    //         tripNames.forEach(name => {
    //             // console.log(name);
    //             fs.readFileSync('resources/trips/'+name, 'utf-8', (err, data) => {
    //                 if(err) console.error(err);
    //                 else {
    //                     res.write(JSON.stringify(data))
    //                 }
    //             })
    //         })
    //         res.end();
    //     }
    // })

    // console.log(trips)
    // res.send(trips)
})

app.use('/', express.static('./dist'))

app.listen(3000, () => {
    console.log('Listening for GET requests on port 3000!')
})
