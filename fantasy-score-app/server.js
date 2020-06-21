//##############################
//#################### Server.js Variablen und Requirements
//##############################
const SERVER_PORT = 8080;

var express = require('express');
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');

var bodyParser = require('body-parser');
const { response } = require('express');
var app = express();
var index;

//##############################
//#################### aktuelles Datum
//##############################
var pad = function(num) { return ('00'+num).slice(-2) };
var date;
date = new Date();
date = date.getUTCFullYear()        + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate())       + ' ';



//##############################
//#################### Pool, Listen, Definitionen, Use
//##############################
app.use(cors());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/dist/fantasy-score-app')));

app.get('/', function(req, res)
{
    res.sendFile('index.html', {root:__dirname+'/dist/fantasy-score-app'});
});

//Datenbank auf Hochschulserver
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







//##############################
//##############################
//#################### Sortierung nach Diensten (siehe Ordner 'services')
//#################### und innerhalb nach 'get', 'post', 'put'
//##############################
//##############################






//##############################
//#################### auth.service.ts
//##############################

//#################### get

//#################### post

//#################### put






//##############################
//#################### bonus.service.ts
//##############################

//#################### get

//getBonusprogramme()
app.get('/bonusprogramme', function(req, res) {
  pool.query('SELECT *, b.benutzername as aeltersterName FROM bonusprogramm bo JOIN buerger b ON bo.aeltesterID = b.id_buerger', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getBonusprogrammeVonKategorie()
app.get('/kategorie/bonusprogramme', function(req, res) {
  const kategorieID = req.query.kategorieID;
  const sql = 'SELECT *, b.benutzername as aeltersterName FROM bonusprogramm bo JOIN buerger b ON bo.aeltesterID = b.id_buerger WHERE kategorieID = ?;';
  const value = [kategorieID];
    pool.query(sql, value,
      function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//getErstellteBonusprogramme()
//getSelbstErstellteBonusprogramme()
app.get('/dashboard/erstellte-bonusprogramme', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT bp.id_bonusprogramm, bp.titel, bp.nachricht, bp.punkte_in_kategorie, k.bezeichnung FROM bonusprogramm bp, kategorie k WHERE k.id_kategorie = bp.kategorieID AND aeltesterID = ?;';
  const value = [buergerID];
    pool.query(sql, value,
      function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

//getBonusprogrammeLike()
app.get('/bonusprogramme/suche', function(req, res) {
  const searchInput = '%'+req.query.suche.trim()+'%';
  console.log(searchInput);
  const sql = "SELECT *, b.benutzername as aeltersterName FROM bonusprogramm bo JOIN buerger b ON bo.aeltesterID = b.id_buerger WHERE titel LIKE ? OR nachricht LIKE ?;";
  const value = [searchInput, searchInput]; // 2 mal searchInput!!!
    pool.query(sql, value,
      function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//getBonusprogrammeVonNutzer()
app.get('/bonusprogramme/nutzer', function(req, res) {
  const buerger = req.query.buerger;
  const sql = "SELECT distinct bo.id_bonusprogramm, bo.titel, bo.nachricht, k.bezeichnung AS kategorieName FROM bonusprogramm bo"
  + " JOIN kategorie k ON k.id_kategorie = bo.kategorieID"
  + " WHERE (SELECT sum(tu.wert) AS kategorieScore FROM taetigkeit tae"
  + " JOIN tugend tu ON tae.tugendID = tu.id_tugend"
  + " JOIN bonusprogramm b ON b.kategorieID = tu.kategorieID"
  + " WHERE tu.kategorieID = b.kategorieID AND tae.tugendhafterID = ?"
  + " AND tae.erfuellteWdh = tu.benoetigteWdh) >= bo.punkte_in_kategorie;";
  const value = [buerger];
  pool.query(sql, value, 
    function(error, results, fields) {
      if (error) throw error
      res.send(results);
    });
});

//getBonusprogrammByID()
app.get('/bonusByID', function (req, res) {
  const bonusprogrammID = req.query.bonusprogrammID;
  const sql = 'SELECT b.id_bonusprogramm, b.titel, b.nachricht, b.punkte_in_kategorie, b.kategorieID, k.bezeichnung FROM bonusprogramm b  JOIN kategorie k ON b.kategorieID = k.id_kategorie WHERE id_bonusprogramm = ?';
  const value = [bonusprogrammID];
  pool.query(sql, value,
    function (error, results, fields) {
          if (error) throw error;
          res.send(results);
  });
});

//#################### post

//addBonusprogramm
app.post('/newBonusprogramm', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = "INSERT INTO bonusprogramm (titel, nachricht, punkte_in_kategorie, aeltesterID, kategorieID) " +
    "VALUES (?, ?, ?, ?, ?)";
  const values = [request.body.titel, request.body.nachricht, request.body.punkte_in_kategorie, request.body.aeltesterID, request.body.kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//#################### put

//updateBonusprogramm
app.put('/dashboard/bearbeite-bonusprogramm', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = " UPDATE bonusprogramm SET titel=?,  nachricht=?, punkte_in_kategorie=?, kategorieID=? WHERE id_bonusprogramm = ?;";
  const values = [request.body.titel, request.body.nachricht, request.body.punkte_in_kategorie, request.body.kategorieID, request.body.id_bonusprogramm];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});






//##############################
//#################### buerger.service.ts
//##############################

//#################### get

//getBuerger()
app.get('/buerger', function (req, res) {
  pool.query('SELECT * FROM buerger', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getBestenliste()
app.get('/bestenliste', function (req, res) {
  pool.query('SELECT benutzername, social_score FROM buerger b JOIN hat_social_score hss ON b.id_buerger = hss.tugendhafterID ORDER BY social_score DESC limit 10', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getAeltester()
app.get('/aeltester', function (req, res) {
  pool.query('SELECT * FROM buerger Where typ = "aeltester"', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//#################### post

//getBuergerByLoginData()
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

//getBuergerByBenutzername()
app.post('/nutzer/name', function (request, response) {
  const benutzername = request.body.benutzername;
  const sql = "SELECT * FROM buerger WHERE benutzername=?";
  const values = [benutzername];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//addBuerger()
app.post('/nutzer/registrieren', function (request, response) {
  console.log("In server.js -> post /nutzer/registrieren");
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

//newSocialScoreAnlegen()
app.post('/nutzer/socialScoreEintrag', function(request, response) {
  console.log("In server.js -> post /nutzer/socialScoreEintrag");
  console.log('request body: ');
  console.dir(request.body);
  const tugendhafterID = request.body.tugendhafterID;
  console.log(tugendhafterID);
  const sql = "INSERT INTO hat_social_score (tugendhafterID, social_score)" +
    "VALUES (? , 0)";
    const values = [tugendhafterID];
  pool.query(sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//#################### put

//unlockTugendhafter()
app.put('/nutzer/unlockTugendhafter', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = " UPDATE buerger SET typ='Tugendhafter' WHERE id_buerger=?;";
  const values = [request.body.id_buerger];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});






//##############################
//#################### dienst.service.ts
//##############################

//#################### get

//getDienste()
app.get('/dienste', function (req, res) {
  pool.query('SELECT d.*, b.benutzername as tugendhafterName FROM dienstangebot d JOIN buerger b ON d.tugendhafterID = b.id_buerger',
  function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getDienstByID()
app.get('/dienst', function (req, res) {
  console.log(req.query.dienstID);
  const dienstID = req.query.dienstID;
  pool.query('SELECT *, b.benutzername as tugendhafterName FROM dienstangebot d JOIN buerger b ON d.tugendhafterID = b.id_buerger WHERE id_dienstangebot=?', [dienstID],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//getDiensteInKategorie()
app.get('/kategorie/dienste', function (request, response) {
  console.log(request.query);
  console.log(request.params);
  const kategorieID = request.query.kategorieID;
  const sql = "SELECT *, b.benutzername as tugendhafterName FROM dienstangebot d JOIN buerger b ON d.tugendhafterID = b.id_buerger WHERE kategorieID=?";
  const values = [kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      console.log(request.query);
      if (error) throw error;
      response.send(results);
    });
});

//getDiensteLike()
app.get('/dienste/suche', function (req, res) {
  const searchInput = '%'+req.query.suche.trim()+'%';
  const sql = "SELECT *, b.benutzername as tugendhafterName FROM dienstangebot d JOIN buerger b ON d.tugendhafterID = b.id_buerger WHERE name LIKE ? OR beschreibung LIKE ?;";
  const value = [searchInput, searchInput];
  pool.query(sql, value,
    function(error, results, fields) {
      if(error) throw error;
      res.send(results);
    });
});

//getAngeboteneDienste()
app.get('/dashboard/angebotene-dienste', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT da.id_dienstangebot, da.name, da.beschreibung, k.bezeichnung AS kategorieTitel FROM dienstangebot da, kategorie k WHERE da.tugendhafterID = ? AND k.id_kategorie = da.kategorieID';
  const value = [buergerID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

//getErledigteDienste()
app.get('/dashboard/erledigte-dienste', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT da.name, da.beschreibung, b.benutzername AS suchenderName, dv.id_dienstvertrag, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND da.tugendhafterID = ? AND dv.datum > ? ';
  const value = [buergerID, date+""];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//getGeplanteDienste()
app.get('/dashboard/geplante-dienste', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT da.name, b.benutzername AS suchenderName, dv.datum, da.beschreibung, dv.id_dienstvertrag FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND dv.suchenderID = b.id_buerger AND dv.status = "bestätigt" AND da.tugendhafterID = ? AND dv.datum < ? ';
  const value = [buergerID, date+""];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);

  });
});

//getGebuchteDienste()
app.get('/dashboard/gebuchte-dienste', function (req, res) {
const buergerID = req.query.buergerID;
const sql = 'SELECT da.name, da.beschreibung, b.benutzername AS tugendhafterName, dv.datum, dv.id_dienstvertrag FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND da.tugendhafterID = b.id_buerger AND dv.status = "bestätigt" AND dv.suchenderID = ? AND dv.datum < ?';
const value = [buergerID, date+""];
pool.query(sql, value,
   function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getAngefragteDienste()
app.get('/dashboard/angefragte-dienste', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT da.name, da.beschreibung, b.benutzername AS tugendhafterName, dv.datum FROM dienstangebot da, dienstvertrag dv, buerger b WHERE da.id_dienstangebot = dv.dienstID AND da.tugendhafterID = b.id_buerger AND dv.status = "angefragt" AND dv.suchenderID = ? AND dv.datum < ?';
  const value = [buergerID, date+""];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//getAnfragenAnTugendhaften()
app.get('/anfragenAnTugendhafter', function(req, res) {
  const buergerID = req.query.buergerID;
  const sql = "SELECT da.name, da.beschreibung, dv.datum, b.benutzername AS suchenderName, dv.id_dienstvertrag FROM buerger b, dienstangebot da, dienstvertrag dv WHERE da.tugendhafterID = ? AND da.id_dienstangebot = dv.dienstID AND b.id_buerger = dv.suchenderID AND dv.status = 'angefragt';";
  const value = [buergerID];
  pool.query(sql, value,
    function (error, results, fields) {

      if (error) throw error;
      res.send(results);
  });
});

//#################### post

//createDiensvertrag()
app.post('/newDienstVertrag', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const dienstID = request.body.dienstID;
  const suchenderID = request.body.suchenderID;
  const datum = request.body.datum;
  const status = 'angefragt';
  const suchenderGelesen = 0;
  const sql = "INSERT INTO dienstvertrag (dienstID, suchenderID, datum, status, suchenderGelesen) " +
    "VALUES (?, ?, ?, ?, ?)";
  const values = [dienstID, suchenderID, datum, status, suchenderGelesen];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});


//addDienst()
app.post('/newDienst', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = "INSERT INTO dienstangebot (name, beschreibung, tugendhafterID, kategorieID) " +
    "VALUES (?, ?, ?, ?)";
  const values = [request.body.name, request.body.beschreibung, request.body.tugendhafterID, request.body.kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//#################### put

//updateDienst()
app.put('/dashboard/bearbeite-dienst', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = " UPDATE dienstangebot SET name=?, beschreibung=?, kategorieID=? WHERE id_dienstangebot=?;";
  const values = [request.body.name, request.body.beschreibung, request.body.kategorieID, request.body.id_dienstangebot];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//bestaetigeVertrag()
app.put('/updateDienstvertrag', function (request, response) {
  const dienstID = request.body.dienstID;
  const status = request.body.status;
  /* console.log('DIENSTVERTRAG: request body: ');
  console.log(dienstID);
  console.log(status); */
  const sql = "UPDATE dienstvertrag dv SET status = ? WHERE dv.id_dienstvertrag = ?";
  const values = [status, dienstID];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});






//##############################
//#################### do-update.service.ts
//##############################

//#################### get

//#################### post

//#################### put






//##############################
//#################### kategorie.service.ts
//##############################

//#################### get

//getKategorien()
app.get('/kategorie', function (req, res) {
  pool.query('SELECT * FROM kategorie', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//#################### post

//#################### put






//##############################
//#################### message.service.ts
//##############################

//#################### get

//#################### post

//#################### put






//##############################
//#################### taetigkeit.service.ts
//##############################

//#################### get

//getTaetigkeitByUserID()
app.get('/dashboard/todo-tugenden', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT tae.id_taetigkeit, tu.name AS tugend_name, tae.erfuellteWdh, tu.benoetigteWdh, tu.wert AS tugend_wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh<tu.benoetigteWdh AND tae.tugendhafterID=?';
  const value = [buergerID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

//getTaetigkeitByTugendIdVonNutzer()
app.get('/taetigkeit/nutzer/tugend', function(req, res) {
  const tugendId = req.query.tugendId;
  const buergerId = req.query.buergerId;
  const sql = "SELECT * FROM taetigkeit ta JOIN tugend tu ON tu.id_tugend = ta.tugendId WHERE ta.tugendhafterId = ? AND ta.tugendId = ?  AND ta.erfuellteWdh != tu.benoetigteWdh";
  const value = [buergerId, tugendId];
  pool.query(sql, value, 
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//#################### post

//increaseErfuellteWdhTaetigkeit()
app.post('/dashboard/set-erfuellte-wdh-taetigkeit', function (req, res) {
  const sql = "UPDATE taetigkeit SET erfuellteWdh=? WHERE id_taetigkeit=?";
  const value = [req.body.erfuellteWdh, req.body.id_taetigkeit];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

//#################### put






//##############################
//#################### tugend.service.ts
//##############################

//#################### get

//getTugenden()
app.get('/tugend', function (req, res) {
  pool.query('SELECT *, b.benutzername as aeltesterName FROM tugend t JOIN buerger b ON t.aeltesterID = b.id_buerger', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getTugendByID()
app.get('/tugendByID', function (req, res) {
  const tugendID = req.query.tugendID;
  const sql = 'SELECT id_tugend, name, beschreibung, wert, benoetigteWdh,  kategorieID, bezeichnung AS kategorieTitel FROM tugend JOIN kategorie ON kategorieID=id_kategorie WHERE id_tugend = ?';
  const value = [tugendID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
}); 

//getTugendenLike()
app.get('/tugenden/suche', function ( req, res) {
  const suchInput = '%'+req.query.suche.trim()+'%';
  const sql = "SELECT *, b.benutzername as aeltesterName FROM tugend t JOIN buerger b ON t.aeltesterID = b.id_buerger WHERE name LIKE ? OR beschreibung LIKE ?;";
  const value = [suchInput, suchInput];
  pool.query(sql, value, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//getErfuellteTugenden()
app.get('/dashboard/erfuellte-tugenden', function (req, res) {
  const buergerID = req.query.buergerID;
  const sql = 'SELECT tu.name, tu.wert FROM taetigkeit tae, tugend tu WHERE tae.tugendID = tu.id_tugend AND tae.erfuellteWdh = tu.benoetigteWdh AND tae.tugendhafterID=?';
  const value = [buergerID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

//getTugendVonKategorie()
app.get('/kategorie/tugenden', function (request, response) {
  const kategorieID = request.query.kategorieID;
  const sql = "SELECT *, b.benutzername as aeltesterName FROM tugend t JOIN buerger b ON t.aeltesterID=b.id_buerger WHERE kategorieID=?";
  const values = [kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      console.log(request.query);
      if (error) throw error;
      response.send(results);
    });
});

//getErstellteTugenden()
app.get('/dashboard/erstellte-tugenden', function (req, res) {
  const aeltesterID = req.query.aeltesterID;
  const sql = 'SELECT id_tugend, name, beschreibung, wert, benoetigteWdh,  kategorieID, bezeichnung AS kategorieTitel FROM tugend JOIN kategorie ON kategorieID=id_kategorie WHERE aeltesterID = ?';
  const value = [aeltesterID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//#################### post

//planeTugend()
app.post('/newTaetigkeit', function (req, res) {
  const erfuellteWdh = 0;
  const tugendID = req.body.tugendID;
  const tugendhafterID = req.body.tugendhafterID;
  const sql = "INSERT INTO taetigkeit (erfuellteWdh, tugendID, tugendhafterID) " +
    "VALUES (?, ?, ?)";
  const value = [erfuellteWdh, tugendID, tugendhafterID];
  pool.query(sql, value,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);

    });
});


//addTugend()
app.post('/newTugend', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = "INSERT INTO tugend (name, beschreibung, wert, benoetigteWdh, aeltesterID, kategorieID) " +
    "VALUES (?, ?, ?, ?, ?, ?)";
  const values = [request.body.name, request.body.beschreibung, request.body.wert, request.body.benoetigteWdh, request.body.aeltesterID, request.body.kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});

//#################### put

//updateTugend()
app.put('/dashboard/bearbeite-tugend', function (request, response) {
  console.log('request body: ');
  console.dir(request.body);
  const sql = " UPDATE tugend SET name=?,  beschreibung=?, wert=?, benoetigteWdh=?, kategorieID=? WHERE id_tugend=?;";
  const values = [request.body.name, request.body.beschreibung, request.body.wert, request.body.benoetigteWdh, request.body.kategorieID, request.body.id_tugend];
  //[name, beschreibung, wert, benoetigteWdh, kategorieID, id_tugend];
  pool.query( sql, values,
    function (error, results, fields) {
      if (error) throw error;
      response.send(results);
    });
});



 



















































/*app.get('/p/:tagId', function(req, res) {
  res.send("tagId is set to " + req.params.tagId);
});*/
//TODO: url in /tugenden?kategorieID=3 umändern -> request.query
app.get('/tugenden', function (request, response) {
  console.log(request.query);
  console.log('Tugend request body: ');
   //requerst.params
  console.log(request.params);
  const kategorieID = request.query.kategorieID;

  const sql = "SELECT *, b.benutzername as aeltersterName FROM tugend t JOIN buerger b ON t.aeltesterID = b.id_buerger  WHERE kategorieID=?";
  const values = [kategorieID];
  pool.query( sql, values,
    function (error, results, fields) {
      console.log(request.query);
      if (error) throw error;
      response.send(results);

    });
});


/*app.get('/p/:tagId', function(req, res) {
  res.send("tagId is set to " + req.params.tagId);
});*/
//TODO: url in /tugenden?kategorieID=3 umändern -> request.query
 



    

