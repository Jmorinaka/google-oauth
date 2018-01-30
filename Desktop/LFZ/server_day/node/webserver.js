const express = require('express');
const path = require('path');
const ws = express();
ws.use( express.static( path.join(__dirname, 'html') ));

ws.get('/formHandler.js', function(req , res ){
    let number = parseFloat(req.query.number);
    let squareRoot = Math.sqrt(number);
    let output = {
        originalNumber: number,
        squareRoot: squareRoot
    };
    const jsonify = JSON.stringify;

    let json_output = jsonify(output);

    res.send(json_output);

});

ws.listen(3000, function(){
    console.log('server started');
});