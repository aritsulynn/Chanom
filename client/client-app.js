const express = require('express');
const path = require('path');
const port = 3030;
const app = express();
const axios = require('axios').default;     // used for WS

const router = express.Router();
app.use(router);

// set the static file directory
app.use('/', express.static(path.join(__dirname,'/static')));

// This is needed for POST method
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
    console.log("Request at /");
    res.status(200).send("Hello World! in plain text");
})

router.get('/home', (req, res) => {
    console.log("Request at /home");
    res.status(200).sendFile(path.join(__dirname,"/html/home.html"))
})

router.get('/search', (req, res) => {
    console.log("Request at /search");
    res.status(200).sendFile(path.join(__dirname,"/html/search.html"))
})

router.get('/login', (req, res) => {
    console.log("Request at /signin");
    res.status(200).sendFile(path.join(__dirname,"/html/login.html"))
})

router.get('/aboutus', (req, res) => {
    console.log("Request at /aboutus");
    res.status(200).sendFile(path.join(__dirname,"/html/aboutus.html"))
})

router.get('/pManage', (req, res) => {
    console.log("Request at /pManage");
    res.status(200).sendFile(path.join(__dirname,"/html/pManage.html"))
})

router.get('/uManage', (req, res) => {
    console.log("Request at /uManage");
    res.status(200).sendFile(path.join(__dirname,"/html/uManage.html"))
})

router.get('/detail1', (req, res) => {
    console.log("Request at /detail1");
    res.status(200).sendFile(path.join(__dirname,"/html/detail1.html"))
})

router.get('/detail2', (req, res) => {
    console.log("Request at /detail2");
    res.status(200).sendFile(path.join(__dirname,"/html/detail2.html"))
})

router.get('/detail3', (req, res) => {
    console.log("Request at /detail3");
    res.status(200).sendFile(path.join(__dirname,"/html/detail3.html"))
})

router.get('/detail4', (req, res) => {
    console.log("Request at /detail4");
    res.status(200).sendFile(path.join(__dirname,"/html/detail4.html"))
})

router.get('/detail5', (req, res) => {
    console.log("Request at /detail5");
    res.status(200).sendFile(path.join(__dirname,"/html/detail5.html"))
})

// try using axios to pull data from the database
router.get('/test', (req, res) => {
    axios.get('http://localhost:3000/selectadmin', {responseType: 'json'})
    .then((res) => {
        console.log(res.data);
    })
})

// unspecified path
/*router.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("Error")
})*/

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
})