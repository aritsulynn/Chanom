const express = require('express');
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

/* ------------------ Product web services ----------------------- */

// Select a product based on pID
// method: get
// Test case #1
// URL: http://localhost:3000/selectchanom/1
// Test case #2
// URL: http://localhost:3000/selectchanom/2
router.get('/selectchanom/:id', (req, res) => {
    let pID = req.params.id;

    if(!pID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("SELECT * FROM product WHERE pID = ?", [pID], (error, results) => {
        if(error) throw error;
        res.json(results[0]);
        console.log(`Sending product result of pID = ${pID}`);
    })
})

// search product (4 criterias)
// method: post
// URL: http://localhost:3000/searchchanom
// body: raw JSON
// Test case #0 (no criteria search)
// {
//     "pName": "",
//     "pType": "",
//     "topping": "",
//     "rating": ""
// }
// Test case #1 (search by name)
// {
//     "pName": "Classic Bubble",
//     "pType": "",
//     "topping": "",
//     "rating": ""
// }
// Test case #2 (search by type)
// {
//     "pName": "",
//     "pType": "Bubble Milk Tea",
//     "topping": "",
//     "rating": ""
// }
// Test case #3 (search by topping)
// {
//     "pName": "",
//     "pType": "",
//     "topping": "Black Pearl",
//     "rating": ""
// }
// Test case #4 (search by rating)
// {
//     "pName": "",
//     "pType": "",
//     "topping": "",
//     "rating": "5"
// }
// Test case #5 (combination of categories)
// {
//     "pName": "",
//     "pType": "Bubble Milk Tea",
//     "topping": "Brown Sugar",
//     "rating": "5"
// }
// Test case #6 (combination of categories)
// {
//     "pName": "Taro",
//     "pType": "Bubble Milk Tea",
//     "topping": "",
//     "rating": ""
// }
router.post('/searchchanom', (req, res) => {
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
        console.log(`${results.length} search result(s) found`);
        return res.json(results);
    });
});

// Insert a product
// method: post
// URL: http://localhost:3000/insertchanom
// body: raw JSON
// Test case #1
// {
//     "pName": "Oreo Milk Tea",
//     "pType": "Bubble Milk Tea",
//     "topping": "Black Pearl",
//     "rating": 5,
//     "pDescription" : "The best oreo drink you will ever get to drink!!",
//     "pic1" : "https://www.sunglowkitchen.com/wp-content/uploads/2022/12/cookies-and-cream-oreo-boba-tea-9.jpg",
//     "pic2" : "https://thelittlestcrumb.com/wp-content/uploads/oreo-milk-tea-featured-image-1.jpg",
//     "pic3" : "https://images.squarespace-cdn.com/content/v1/5e8840afd65f745da4030ca8/1616648671297-LW0OFQOWLIRCYIYPWWLO/National-Oreo-Day-Social-Media-Posts---March-6-1.jpg",
//     "price": 65
// }
// Test case #2
// {
//     "pName": "Jasmine Bubble Tea",
//     "pType": "Bubble Milk Tea",
//     "topping": "Black Pearl",
//     "rating": 4,
//     "pDescription" : "The best Jasmine tea in town. You will never find one better!!",
//     "pic1" : "https://cdn.shopify.com/s/files/1/0645/1401/articles/20220404225443-untitled-1-932321_1280x.jpg?v=1660336156",
//     "pic2" : "https://yourcoffeeandtea.com/wp-content/uploads/2021/05/Jasmine-Milk-Tea.jpg",
//     "pic3" : "https://theclassybaker.com/wp-content/uploads/2022/05/jasmine-milk-tea-11.jpg",
//     "price": 60
// }
router.post('/insertchanom', (req, res) => {
    let data = req.body;

    if(!data) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }

    connection.query(`INSERT INTO product SET ? `, data, (error, results) => {
        if(error) throw error;
        console.log("Inserting a product");
        return res.send({error: false, data: results.affectedRows, message: 'New product has been added successfully'})
    })

})

// Update a product based on pID
// method: put
// Test case #1
// URL: http://localhost:3000/updatechanom/1
// body: raw JSON
// {
//     "pName": "Classic Bubble Milk Tea (Special Offer!)",
//     "pType": "Bubble Milk Tea",
//     "topping": "Grass Jelly",
//     "rating": 5,
//     "pDescription" : "The best Bubble tea in town. You will never find one better!!",
//     "pic1" : "https://drive.google.com/uc?export=view&id=108iRXvoO25WyWhpmzpqOFhj7iMx8tOlv",
//     "pic2" : "https://drive.google.com/uc?export=view&id=1RyXXeWrmu6W2ZfF7ZLzpMIU5wEPypsz5",
//     "pic3" : "https://drive.google.com/uc?export=view&id=1Sx5t_ldu7ELiiLpOWrG9-4UFgcs-bcKj",
//     "price": 50
// }
// Test case #2
// URL: http://localhost:3000/updatechanom/2
// body: raw JSON
// {
//     "pName": "Chocolate Milk Brown Sugar",
//     "pType": "Bubble Milk",
//     "topping": "Brown Sugar",
//     "rating": 5,
//     "pDescription" : "The best chocolate drink in town. You will never find one better!!",
//     "pic1" : "https://drive.google.com/uc?export=view&id=1DgjSclqKldXjVF1n0MpeksyiC6e_a0k3",
//     "pic2" : "https://drive.google.com/uc?export=view&id=1vEG_yn6NccFrDGmqZ-9WNbPs4r75pjAg",
//     "pic3" : "https://drive.google.com/uc?export=view&id=1Jnh8uMgCIHRC4gTarR1rgu17bnj4IyFI",
//     "price": 65
// }
router.put('/updatechanom/:id', (req, res) => {
    let pID = req.params.id;
    let product = req.body;

    if(!pID || !product) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("UPDATE product SET ? WHERE pID = ?", [product, pID], (error, results) => {
        if(error) throw error;
        console.log(`Updating product pID = ${pID}`);
        return res.send({error: false, data: results.affectedRows, message: 'Product has been updated successfully'})
    })
})

// Delete a product based on pID
// method: delete
// Test case #1
// URL: http://localhost:3000/deletechanom/1
// Test case #2
// URL: http://localhost:3000/deletechanom/2
router.delete('/deletechanom/:id', (req, res) => {
    let pID = req.params.id;
    if(!pID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("DELETE FROM product WHERE pID = ?", [pID], (error, results) => {
        if(error) throw error;
        console.log(`Deleting product pID = ${pID}`);
        return res.send({error: false, data: results.affectedRows, message: 'Product has been deleted successfully'})
    })
})

/* ------------------ Administrator web services ----------------------- */

// Authentication (for login)
// method: post
// URL: http://localhost:3000/authenticate
// body: raw JSON
// Test case #1 (correct username, password)
// {
//     "username": "ict",
//     "password": "ict555"
// }
// Test case #2 (incorrect username, password)
// {
//     "username": "acb",
//     "password": "superBoss555"
// }
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const pass_word = req.body.password;

    if(!username || !pass_word) {
        return res.status(400).send({error: true, message: 'Please provide admin information'})
    }
    connection.query("SELECT username, pass_word FROM administrator", (error, results) => {
        if(error) throw error;
        for(var i = 0; i < results.length; i++) {
            if(results[i].username === username && results[i].pass_word === pass_word) {
                console.log("Authentication: match");
                return res.json({"status": "match", "code": 1});    // send status pass(1) back if match
            }
        }
        console.log("Authentication: no match");
        return res.json({"status": "no match", "code": 0});    // send fail(0) if username and password does not match
    })
})

// Select an admin based on aID
// method: get
// Test case #1
// URL: http://localhost:3000/selectadmin/1
// Test case #2
// URL: http://localhost:3000/selectadmin/2
router.get('/selectadmin/:id', (req, res) => {
    let aID = req.params.id;

    if(!aID) {
        return res.status(400).send({error: true, message: 'Please provide admin information'})
    }
    connection.query("SELECT * FROM administrator WHERE aID = ?", [aID], (error, results) => {
        if(error) throw error;
        res.json(results[0]);
        console.log("Sending admin result");
    })
})

// Search admin
// method: post
// URL: http://localhost:3000/searchadmin
// body: raw JSON
// Test case #0 (no criteria search)
// {
//     "username": "",
//     "fname": "",
//     "lname": ""
// }
// Test case #1 (search by username)
// {
//     "username": "ict",
//     "fname": "",
//     "lname": ""
// }
// Test case #2 (search by fname)
// {
//     "username": "",
//     "fname": "anna",
//     "lname": ""
// }
// Test case #3 (search by lname)
// {
//     "username": "",
//     "fname": "",
//     "lname": "harn"
// }
// Test case #4 (Combination of criterias)
// {
//     "username": "",
//     "fname": "anna",
//     "lname": "robert"
// }
// Test case #5 (Combination of criterias)
// {
//     "username": "i",
//     "fname": "ict",
//     "lname": "use"
// }
router.post('/searchadmin', (req, res) => {
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
        console.log(`${results.length} search result(s) found`);
        return res.json(results);
    });
});

// Insert an admin
// method: post
// URL: http://localhost:3000/insertadmin
// body: raw JSON
// Test case #1
// {
//     "username": "ictTest1",
//     "pass_word": "ict123",
//     "fname": "Lionel",
//     "lname": "Messinho",
//     "birthdate": "1987-06-24",
//     "email": "testEmail@mail.com"
// }
// Test case #2
// {
//     "username": "iLoveCoding123",
//     "pass_word": "cryInSide555",
//     "fname": "Robert",
//     "lname": "Dupont",
//     "birthdate": "2001-06-04",
//     "email": "robert@myMail.com"
// }
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

// Update an admin based on aID
// method: put
// Test case #1
// URL: http://localhost:3000/updateadmin/1
// body: raw JSON
// {
//     "username": "KcnpEarth",
//     "pass_word": "test5564",
//     "fname": "Kritchanapat",
//     "lname": "Junju",
//     "birthdate": "2001-06-10",
//     "email": "Kritchanapat@mail.com"
// }
// Test case #2
// URL: http://localhost:3000/updateadmin/2
// body: raw JSON
// {
//     "username": "Thitiwut",
//     "pass_word": "boss5074",
//     "fname": "Thitiwut",
//     "lname": "Harn",
//     "birthdate": "2001-06-04",
//     "email": "thitiwutmcpeakz@gmail.com"
// }
router.put('/updateadmin/:id', (req, res) => {
    let aID = req.params.id;
    let admin = req.body;

    if(!aID || !admin) {
        return res.status(400).send({error: true, message: 'Please provide admin information'})
    }
    connection.query("UPDATE administrator SET ? WHERE aID = ?", [admin, aID], (error, results) => {
        if(error) throw error;
        console.log(`Updating admin aID = ${aID}`);
        return res.send({error: false, data: results.affectedRows, message: 'Admin has been updated successfully'})
    })
})

// Delete an admin based on aID
// method: delete
// Test case #1
// URL: http://localhost:3000/deleteadmin/1
// Test case #2
// URL: http://localhost:3000/deleteadmin/2
router.delete('/deleteadmin/:id', (req, res) => {
    let aID = req.params.id;
    if(!aID) {
        return res.status(400).send({error: true, message: 'Please provide product information'})
    }
    connection.query("DELETE FROM administrator WHERE aID = ?", [aID], (error, results) => {
        if(error) throw error;
        console.log(`Deleting admin aID = ${aID}`);
        return res.send({error: false, data: results.affectedRows, message: 'Admin has been deleted successfully'})
    })
})

app.listen(process.env.PORT, function() {
    console.log("Server listening on port: " + process.env.PORT);
});