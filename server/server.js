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

// select
router.get('/selectchanom/:id', (req, res) => {
    let pID = req.params.id;

    if(!pID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("SELECT * FROM product WHERE pID = ?", [pID], (error, results) => {
        if(error) throw error;
        res.json(results[0]);
        console.log("Sending product result");
    })
})

// select all
router.get('/selectchanom', (req, res) => {

    connection.query("SELECT * FROM product", (error, results) => {
        if(error) throw error;
        res.json(results);
        console.log("Sending product result");
    })

})

router.post('/insertchanom', (req, res) => {
    let data = req.body;

    if(!data) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }

    connection.query(`INSERT INTO product SET ? `, data, (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New product has been added successfully'})
    })

})

router.delete('/deletechanom/:id', (req, res) => {
    let pID = req.params.id;
    if(!pID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("DELETE FROM product WHERE pID = ?", [pID], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Product has been deleted successfully'})
    })
})

router.put('/updatechanom/:id', (req, res) => {
    let pID = req.params.id;
    let product = req.body;

    if(!pID || !product) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("UPDATE product SET ? WHERE pID = ?", [product, pID], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Product has been updated successfully'})
    })
})

// search product (4 criterias)
router.post('/searchchanom', (req, res) => {
    console.log(req.body);
    let pName = req.body.pName;
    let pType = req.body.pType;
    let topping = req.body.topping;
    let rating = req.body.rating;
    
    let queryParams = [];
    let queryString = 'SELECT * FROM product';

    // check if each query attribute has a value or not
    if (pName) {
        queryParams.push(`pName LIKE '%${pName}%'`);
    }

    if (pType) {
        queryParams.push(`pType = '${pType}'`);
    }

    if (topping) {
        queryParams.push(`topping = '${topping}'`);
    }

    if (rating) {
        queryParams.push(`rating = ${rating}`);
    }

    if (queryParams.length > 0) {
        queryString += ` WHERE ${queryParams.join(' AND ')}`;
    }

    connection.query(queryString, (error, results) => {
        if (error) throw error;
        return res.json(results);
    });
});


router.get('/selectadmin', (req, res) => {

    connection.query("SELECT * FROM administrator", (error, results) => {
        if(error) throw error;
        res.send(results)
        console.log("Sending admin result");
    })
})

router.get('/selectadmin/:id', (req, res) => {
    let aID = req.params.id;

    if(!aID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("SELECT * FROM administrator WHERE aID = ?", [aID], (error, results) => {
        if(error) throw error;
        res.json(results[0]);
        console.log("Sending product result");
    })
})

router.post('/insertadmin', (req, res) => {
    let data = req.body;

    if(!data) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }

    connection.query(`INSERT INTO administrator SET ? `, data, (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New admin has been added successfully'})
    })

})

router.delete('/deleteadmin/:id', (req, res) => {
    let aID = req.params.id;
    if(!aID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("DELETE FROM administrator WHERE aID = ?", [aID], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Admin has been deleted successfully'})
    })
})

router.put('/updateadmin/:id', (req, res) => {
    let aID = req.params.id;
    let admin = req.body;

    if(!aID || !admin) {
        return res.status(400).send({error: true, message: 'Please provide admin information'})
    }
    connection.query("UPDATE administrator SET ? WHERE aID = ?", [admin, aID], (error, results) => {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Admin has been updated successfully'})
    })
})

router.post('/searchadmin', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let fname = req.body.fname;
    let lname = req.body.lname;
    
    let queryParams = [];
    let queryString = 'SELECT * FROM administrator';

    // check if each query attribute has a value or not
    if (username) {
        queryParams.push(`username LIKE '%${username}%'`);      // add more to the query string if any
    }

    if (fname) {
        queryParams.push(`fname LIKE '%${fname}%'`);
    }

    if (lname) {
        queryParams.push(`lname LIKE '%${lname}%'`);
    }

    if (queryParams.length > 0) {
        queryString += ` WHERE ${queryParams.join(' AND ')}`;
    }

    connection.query(queryString, (error, results) => {
        if (error) throw error;
        return res.json(results);
    });
});

app.listen(process.env.PORT, function() {
    console.log("Server listening on port: " + process.env.PORT);
});