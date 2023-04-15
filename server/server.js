const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

/* Config dotenv and router */
const router = express.Router();
app.use(router);
dotenv.config();

// This is needed for POST method
router.use(express.json());
router.use(express.urlencoded({extended: true}));

/* Connection to MySQL */
const mysql = require('mysql2');
const { log } = require('console');
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected DB: " + process.env.MYSQL_DATABASE);
}); 

router.get('/', (req, res) => {
    res.send("Hello world");
})

// insert
router.post('/insert', (req, res) => {
    let student = req.body.student

    if(!student) {
        return res.status(400).send({error: true, message: 'Please provide student information'})
    }

    connection.query("INSERT INTO personal_info SET ? ", student, (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New student has been added successfully'})
    })
})

// update
router.put('/update', (req, res) => {
    console.log(req.body.student);
    let student_id = req.body.student.StudentID;
    let student = req.body.student;

    if(!student_id || !student) {
        return res.status(400).send({error: true, message: 'Please provide student information'})
    }

    connection.query("UPDATE personal_info SET ? WHERE StudentID = ?", [student, student_id], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Student has been updated successfully'})
    })
})

// delete
router.delete('/delete', (req, res) => {
    let student_id = req.body.student.StudentID;
    if(!student_id) {
        return res.status(400).send({error: true, message: 'Please provide student information'})
    }
    connection.query("DELETE FROM personal_info WHERE StudentID = ?", [student_id], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Student has been deleted successfully'})
    })
})

// select
router.get('/selectchanom/:id', (req, res) => {
    let pID = req.params.id;

    if(!pID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("SELECT * FROM product WHERE pID = ?", [pID], (error, results) => {
        if(error) throw error;
        res.send(results)
    })

})

// select all
router.get('/selectchanom', (req, res) => {

    connection.query("SELECT * FROM product", (error, results) => {
        if(error) throw error;
        res.send(results);
        console.log("Sending product result");
    })

})

router.get('/selectadmin', (req, res) => {

    connection.query("SELECT * FROM administrator", (error, results) => {
        if(error) throw error;
        res.send(results)
        console.log("Sending admin result");
    })

})

app.listen(process.env.PORT, function() {
    console.log("Server listening on port: " + process.env.PORT);
});