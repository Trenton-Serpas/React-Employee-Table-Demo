const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// put your DB info here!
let connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect((err) => {
    if (err) {
      console.error(err.stack);
      return;
    }
});

app.listen(3000, () => {
    console.log('MySQL Connection is listening on port 3000!');
});

// fetch names for login validation
app.get('/employees/login', (req, res) => {
    connection.query('SELECT * FROM Employee_Login', (error, results) => {
        if (error) { throw error; }
        return res.send({ error: false, data: results, message: 'LOGIN EMPLOYEE' });
    });
});

// fetch names for list page
app.get('/employees/list', (req, res) => {
    connection.query('SELECT * FROM Employee ORDER BY FIRST_NAME', (error, results) => {
        if (error) { throw error; }
        return res.send({ error: false, data: results, message: 'LIST EMPLOYEE' });
    });
});

// fetch a single entry for editing
app.get('/employees/byID/:id', (req, res) => {
    connection.query("SELECT * FROM Employee where id= '" + req.params.id + "'", (error, results) => {
        if (error) { throw error; }
        return res.send({ error: false, data: results, message: 'ID EMPLOYEE'})
    })
});

// post a single entry for adding
app.post('/employees/add', (req, res) => {
    const employee = req.body;
    connection.query(
        'INSERT INTO Employee (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIP,CELL_PHONE,HOME_PHONE,EMAIL) VALUES (?,?,?,?,?,?,?,?,?)',
        [employee.firstName,employee.lastName,employee.address,employee.city,employee.state,employee.zip,employee.homePhone,employee.cellPhone,employee.email,employee.id],
        (error, results) => {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'ADD EMPLOYEE' });
        }
    );
});

// put a single entry for editing
app.put('/employees/edit', (req, res) => {
    const employee = req.body;
    connection.query(
        'UPDATE Employee SET FIRST_NAME=?,LAST_NAME=?,ADDRESS=?,CITY=?,STATE=?,ZIP=?,CELL_PHONE=?,HOME_PHONE=?,EMAIL=? WHERE ID=?',
        [employee.firstName,employee.lastName,employee.address,employee.city,employee.state,employee.zip,employee.homePhone,employee.cellPhone,employee.email,employee.id],
        (error, results) => {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'EDIT EMPLOYEE' });
        }
    );
});