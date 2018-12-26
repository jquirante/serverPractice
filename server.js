const mysql = require('mysql');
const mysql_creds = require('./mysql_creds');
const db = mysql.createConnection(mysql_creds);

const express = require('express');
const webserver = express();

webserver.listen(3500, () => {
    console.log('listening on port 3500!');
})

webserver.use (express.static( __dirname + '/html' ));

function generateID(length = 10) {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = '';

    while (code.length < length) {
        let randomIndex = Math.floor(Math.random() * letters.length);
        let randomLetter = letters[randomIndex];

        code+=randomLetter;
    }

    return code;
}

function generateRandomNumber(min=0, max=10, whole=true) {
    let number = Math.random() * (max-min+1) + min;
    if (whole) {
        return Math.floor(number);
    }
    return number;
}

webserver.get('/generateNumber', (request, response) => {
    console.log('Request: ', request.query);
    console.log('generateNumber');

    const min = request.query.min;
    const max = request.query.max;
    const uniqueID = generateID();
    const randomNumber = generateRandomNumber(min,max);
    console.log('Min: ', min);
    console.log('Max: ', max);
    console.log('Random Number: ', randomNumber);
    db.connect( () => {
        console.log('test connection');
        const query = "INSERT INTO `currentNumber` SET `number`="+randomNumber+", numberCode='"+uniqueID+"'";

        db.query(query, (error) => {
            if (!error) {
                const output = {
                    success: true,
                    code: uniqueID,
                }
                response.send(output)
            } else {
                response.send({
                    success: false,
                    error
                })
            }
        })
    })

    

})