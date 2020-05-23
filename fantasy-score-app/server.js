//server.js
    const SERVER_PORT = 8080;

    var express = require('express');
    var path = require('path');
    var mysql = require('mysql');
    var cors = require('cors');

    var app = express();
    var index;
    app.use(cors());
    

    app.use(express.static(path.join(__dirname, '/dist/fantasy-score-app'))); //'/dist'

    app.get('/', function(req, res)
    {
        res.sendFile('index.html', {root:__dirname+'/dist/fantasy-score-app'}); //'/dist'
    });

    const pool = mysql.createPool({
        host: "195.37.176.178",
        port: "20133",
        user: "Gruppe4",
        password: ',O64*.dnm/yKH%BpvJcNqq~k"WX\\O:kJ',
        database: "20_Gruppe4_DB"
    });

    var server = app.listen(SERVER_PORT, function (){
        let host = server.address().address,
            port = server.address().port;

            console.log("Fantasy app listening at http://%s:%s", host, port)
    });

    app.get('/buerger', function (req, res) {

        pool.query('SELECT * FROM buerger', function (error, results, fields) {
          if (error) throw error;
          res.send(results);
      
        });
    });

    app.get('/kategorie', function (req, res) {

        pool.query('SELECT * FROM kategorie', function (error, results, fields) {
          if (error) throw error;
          res.send(results);

      });
    });

    app.get('/bestenliste', function (req, res) {

        pool.query('SELECT benutzername, social_score FROM buerger b JOIN hat_social_score hss ON b.id_buerger = hss.tugendhafterID ORDER BY social_score DESC limit 10', function (error, results, fields) {

          if (error) throw error;
          res.send(results);
      
        });
    });


    app.get('/dashboard/erfuellte-tugenden', function (req, res) {

        pool.query('SELECT tu.name, tu.wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh = tu.benoetigteWdh AND tae.tugendhafterID=8', function (error, results, fields) {

          if (error) throw error;
          res.send(results);
      
        });
    });

    app.get('/dashboard/todo-tugenden', function (req, res) {

        pool.query('SELECT tu.name, tae.erfuellteWdh, tu.benoetigteWdh, tu.wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh<tu.benoetigteWdh AND tae.tugendhafterID=8 ', function (error, results, fields) {


    
    app.get('/aeltester', function (req, res) {

        pool.query('SELECT * FROM buerger Where typ = "aeltester"', function (error, results, fields) {
          if (error) throw error;
          res.send(results);
      
        });
    });