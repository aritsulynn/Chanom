const express = require('express');
const path = require('path');
const port = 3030;
const app = express();
const axios = require('axios').default;     // used for Web Service (get data from server.js)
const { JSDOM } = require('jsdom');
const fs = require('fs');
const { log } = require('console');


const router = express.Router();
app.use(router);

// set the static file directory
app.use('/', express.static(path.join(__dirname,'/static')));
app.use('/detail/', express.static(path.join(__dirname,'/static')));

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

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    axios.get(`http://localhost:3000/selectchanom/${id}`, {responseType: 'json'})
        .then((response) => {
            console.log(response.data);
            const data = response.data;
            fs.readFile(path.join(__dirname, "/html/detail.html"), 'utf8', (err, html) => {
                if (err) {
                  throw err;
                }
                const dom = new JSDOM(html);
                const output = dom.window.document.getElementById('output');
                
                output.innerHTML = "";
                // add page content with the retrieved data
                output.innerHTML += `
                <div class="row">
                  <!-- Use Carousel to create preview images -->
                  <div class="col-5">
                    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="${data.pic1}"
                            class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                          <img
                            src="${data.pic2}"
                            class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                          <img src="${data.pic3}" class="d-block w-100">
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <!-- Product description -->
                  <div class="col" style="padding-left: 30px;">
                    <h1 style="font-size: 30px;">${data.pName}</h1>
                    <div class="star" style="padding-bottom: 10px;">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                    <p style="font-size: 22px;">${data.pType}</p>
                    <p style="font-size: 22px;">฿ ${data.price}</p>
                    <p style="font-size: 18px; text-align: justify;">"${data.pDescription}"
                    </p>
                    <a href="#" class="btn btn-outline-dark">Order now</a>
                    <a href="#" class="btn btn-outline-danger"><i class="bi bi-instagram"></i> View on Instagram</a>
                    <a href="#" class="btn btn-outline-primary"><i class="bi bi-twitter"></i> View on Twitter</a>
                  </div>
                </div>
                <div class="row" style="padding-top: 50px; padding-bottom: 30px;">
                  <h1 style="font-size: 30px;">You will also love</h1>
                </div>
                <div class="row">
                <div class="col">
                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-6">
                        <img
                          src="img/detail/card-chocolate.jpg"
                          class="img-fluid rounded-start">
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h5 class="card-title">Chocolate Bubble Milk Tea</h5>
                          <p class="card-text">Indulge in the rich and creamy taste of our chocolate bubble milk
                            tea! Made with premium tea leaves and blended ...</p>
                          <a class="btn btn-secondary" href="/detail/2">More Detail</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-6">
                        <img src="img/detail/card-matcha.jpeg" class="img-fluid rounded-start">
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h5 class="card-title">Matcha Bubble Green Tea</h5>
                          <p class="card-text">Experience the delicate and refreshing taste of our matcha bubble green tea! Made with premium
                            matcha ...</p>
                          <a class="btn btn-secondary" href="/detail/3">More Detail</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-6">
                        <img src="img/detail/card-oolong.avif" class="img-fluid rounded-start">
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h5 class="card-title">Oolong Bubble Milk Tea</h5>
                          <p class="card-text">Indulge in the smooth and mellow taste of our oolong bubble milk tea! Made with premium oolong tea
                            leaves ...</p>
                          <a class="btn btn-secondary" href="/detail/4">More Detail</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
                
                res.send(dom.serialize());  // sending the modified html file
            });
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