//server.js
    const SERVER_PORT = 8080;

    var express = require('express');
    var path = require('path');
    var mysql = require('mysql');
    var cors = require('cors');

    var bodyParser = require('body-parser')
    var app = express();
    var index;
    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())


    app.use(express.static(path.join(__dirname, '/dist/fantasy-score-app'))); //'/dist'

    app.get('/', function(req, res)
    {
        res.sendFile('index.html', {root:__dirname+'/dist/fantasy-score-app'}); //'/dist'
    });

    //db on hochschul server
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

//#######################################################################################
//##################################Buerger##############################################
//#######################################################################################

    app.get('/buerger', function (req, res) {

        pool.query('SELECT * FROM buerger', function (error, results, fields) {
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

app.get('/aeltester', function (req, res) {

  pool.query('SELECT * FROM buerger Where typ = "aeltester"', function (error, results, fields) {
    if (error) throw error;
    res.send(results);

  });
});

//#######################################################################################
//##################################Kategorie############################################
//#######################################################################################

app.get('/kategorie', function (req, res) {

  pool.query('SELECT * FROM kategorie', function (error, results, fields) {
    if (error) throw error;
    res.send(results);

  });
});

//#######################################################################################
//##################################Dashboard############################################
//#######################################################################################


//##################################Tugenden#############################################

    app.get('/dashboard/erfuellte-tugenden', function (req, res) {

        pool.query('SELECT tu.name, tu.wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh = tu.benoetigteWdh AND tae.tugendhafterID=8', function (error, results, fields) {

          if (error) throw error;
          res.send(results);

        });
    });

    app.get('/dashboard/todo-tugenden', function (req, res) {

        pool.query('SELECT tu.name, tae.erfuellteWdh, tu.benoetigteWdh, tu.wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh<tu.benoetigteWdh AND tae.tugendhafterID=8 ', function (error, results, fields) {

          if (error) throw error;
          res.send(results);

        });
    });

    app.post('/tugend', function (request, response) {
      console.log('request body: ');
      console.dir(request.body);

      const name = request.body.name;
      const beschreibung = request.body.beschreibung;
      const wert = request.body.wert;
      const benoetigteWdh = request.body.benoetigteWdh;
      const aeltesterID = 7;
      const kategorieID = request.body.kategorieID;

      const sql = "INSERT INTO tugend (name, beschreibung, wert, benoetigteWdh, aeltesterID, kategorieID) " +
        "VALUES (?, ?, ?, ?, ?, ?)";
      const values = [name, beschreibung, wert, benoetigteWdh, aeltesterID, kategorieID];
      pool.query( sql, values,
        function (error, results, fields) {
          if (error) throw error;
          response.send(results);

        });
    });

    //##################################Dienste##############################################

      app.get('/dashboard/angebotene-dienste', function (req, res) {

        pool.query('SELECT da.name, da.beschreibung FROM dienstangebot da WHERE da.tugendhafterID = 8', function (error, results, fields) {

          if (error) throw error;
          res.send(results);

        });
    });

      app.get('/dashboard/erledigte-dienste', function (req, res) {

        pool.query('SELECT da.name, da.beschreibung, b.benutzername, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND da.tugendhafterID = 8 AND dv.datum > "2020-05-08" ', function (error, results, fields) {

          if (error) throw error;
          res.send(results);

        });
    });

    app.get('/dashboard/geplante-dienste', function (req, res) {

      pool.query('SELECT da.name, b.benutzername, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND da.tugendhafterID = 8 AND dv.datum < "2020-05-08" ', function (error, results, fields) {

        if (error) throw error;
        res.send(results);

      });
    });

    app.get('/dashboard/gebuchte-dienste', function (req, res) {

      pool.query('SELECT da.name, da.beschreibung, b.benutzername, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND dv.suchenderID = 16 AND dv.datum < "2020-05-08" ', function (error, results, fields) {
        
        if (error) throw error;
        res.send(results);
      });
    });

    app.get('/dashboard/angefragte-dienste', function (req, res) {

      pool.query('SELECT da.name, da.beschreibung, b.benutzername, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND dv.suchenderID = 16 AND dv.datum < "2020-05-08"', function (error, results, fields) {
        
        if (error) throw error;
        res.send(results);
      });
    });
    



//#######################################################################################
//##################################Login################################################
//#######################################################################################



    app.post('/nutzer/login', function (request, response) {
      const benutzername = request.body.benutzername;
      const passwort = request.body.passwort;

      const sql = "SELECT * FROM buerger WHERE  benutzername=? AND passwort=?";
      const values = [benutzername, passwort];
      pool.query( sql, values,
        function (error, results, fields) {
          if (error) throw error;
          response.send(results);

        });
    });

    app.post('/nutzer/name', function (request, response) {
      const benutzername = request.body.benutzername;

      const sql = "SELECT * FROM buerger WHERE  benutzername=?";
      const values = [benutzername];
      pool.query( sql, values,
        function (error, results, fields) {
          if (error) throw error;
          response.send(results);

        });
    });

    app.post('/nutzer/registrieren', function (request, response) {
      console.log('request body: ');
      console.dir(request.body);

      const benutzername = request.body.benutzername;
      const passwort = request.body.passwort;
      const email_adresse = request.body.email_adresse;
      const typ = request.body.typ;

      const sql = "INSERT INTO buerger (benutzername, passwort, email_adresse, typ) " +
        "VALUES (?, ?, ?, ?)";
      const values = [benutzername, passwort, email_adresse, typ];
      pool.query( sql, values,
        function (error, results, fields) {
          if (error) throw error;
          response.send(results);

        });
    });
