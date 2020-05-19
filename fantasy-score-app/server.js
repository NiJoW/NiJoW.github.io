//server.js

    var express = require('express');
    var app = express();
    var path = require('path');
    var mysql = require('mysql');

    app.use(express.static(path.join(__dirname, '/dist/fantasy-score-app'))); //'/dist'

    app.get('/', function(req, res)
    {
        res.sendFile('index.html', {root:__dirname+'/dist/fantasy-score-app'}); //'/dist'
    });

    app.get('/buerger/', function(req, res){
        var con = mysql.createConnection({
            host: "195.37.176.178",
            port: "20133",
            user: "Gruppe4",
            password: ',O64*.dnm/yKH%BpvJcNqq~k"WX\\O:kJ',
            database: "20_Gruppe4_DB"
        });

        con.connect(function(err)
        {
            if(err) throw err;
            console.log("connected");

            con.query("SELECT * FROM buerger", function(err, result)
            {
                if(err) throw err;
                res.send(result);
            });


            con.end();

        });
    });

    app.listen(8080, function(){
        console.log("App listening to Port 8080");
    });