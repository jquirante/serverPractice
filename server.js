const express = require('express');
const webserver = express();

webserver.listen(3000, () => {
    console.log('listening on port 3000!');
})

webserver.use (express.static( __dirname + '/html'));

webserver.use('/generateNumber', (request, response) => {
    console.log('Request: ', request.query);
    console.log('generateNumber');

    const min = request.query.min;
    const max = request.query.max;
    const randomNumber = Math.floor(Math.random() * max);
    console.log('Min: ', min);
    console.log('Max: ', max);
    console.log('Rnadom Number: ', randomNumber);

})