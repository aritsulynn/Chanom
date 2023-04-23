const express = require("express");
const session = require("express-session");
const path = require("path");
const port = 3030;
const app = express();
const axios = require("axios").default;
const { JSDOM } = require("jsdom");
const fs = require("fs");

const router = express.Router();

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(router);

// set the static file directory (for CSS/Images)
app.use("/", express.static(path.join(__dirname, "/static")));
app.use("/detail", express.static(path.join(__dirname, "/static")));
app.use("/pManage", express.static(path.join(__dirname, "/static")));
app.use("/uManage", express.static(path.join(__dirname, "/static")));

// This is needed for POST method
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  console.log("Request at /login");
  res.status(200).sendFile(path.join(__dirname, "/html/login.html"));
});

router.post("/login-submit", (req, res) => {
  console.log("Request at /login-submit");
  console.log(
    `Log in with username: ${req.body.username} password: ${req.body.password}`
  );

  axios
    .post(`http://localhost:3000/authenticate`, req.body)
    .then((response) => {
      const code = response.data.code;
      if (code === 1) {
        console.log("Login successful!");
        req.session.user = req.body.username; // set session
        res.redirect("/home");
      } else {
        console.log("Wrong username or password.");
        fs.readFile(
          path.join(__dirname, "/html/login.html"),
          "utf8",
          (err, html) => {
            if (err) {
              throw err;
            }
            const dom = new JSDOM(html);
            const warning =
              dom.window.document.getElementById("incorrect-warning");

            warning.innerHTML = "Incorrect username or password";
            res.send(dom.serialize()); // sending the modified html file
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/aboutus", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  console.log("Request at /aboutus");
  res.status(200).sendFile(path.join(__dirname, "/html/aboutus.html"));
});

router.get("/home", (req, res) => {
  console.log("Request at /home");
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  axios
    .post(`http://localhost:3000/searchchanom`, {}, { responseType: "json" })
    .then((response) => {
      const data = response.data;

      // load the html file then add 5 recommended products from the database
      fs.readFile(
        path.join(__dirname, "/html/home.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("recommend");

          output.innerHTML = ``;

          var child = `<div class="container-fluid"><div class="row" style="padding: 50px;">`;

          var toDisplay; // the number of products to display on the page
          if (data.length >= 5) {
            toDisplay = 5;
          } else {
            toDisplay = data.length;
          } // if there are more than 5 products, display just 5

          for (var i = 0; i < toDisplay; i++) {
            child += `<div class="col">
            <!-- Use card to display each drink items -->
            <div class="card">  
              <img src="${data[i].pic1}" class="card-img-top"/>
              <div class="card-body">
                <h5 class="card-title">${data[i].pName}</h5>
                <p class="card-text">
                  Our original classic ${data[i].pName}
                </p>
                <a href="/detail/${data[i].pID}" class="btn btn-secondary">More Detail</a>
                <!-- .btn adds button style to the <a> tag -->
                <!-- .btn-secondary is the secondary color from Bootstrap making our button grey -->
              </div>
            </div>
          </div>`;
          }

          // add page content with the retrieved data
          output.innerHTML += child + "</div>";
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/logout", (req, res) => {
  delete req.session.user; // delete the session user
  res.redirect("/login"); // get the user back to login page
});

// get detail page for each product ID
router.get("/detail/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  } // users need to login first before going to this page
  const id = req.params.id;
  axios
    .get(`http://localhost:3000/selectchanom/${id}`, { responseType: "json" })
    .then((response) => {
      console.log(response.data);
      const data = response.data;
      fs.readFile(
        path.join(__dirname, "/html/detail.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("output");

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
                    <p style="font-size: 22px;">Rating: ${data.rating} / 5</p>
                    <p style="font-size: 22px;">${data.pType}</p>
                    <p style="font-size: 22px;">Available Topping: ${data.topping}</p>
                    <p style="font-size: 22px;">฿ ${data.price}</p>
                    <p style="font-size: 18px; text-align: justify;">"${data.pDescription}"
                    </p>
                    <a href="#" class="btn btn-outline-dark">Order now</a>
                    <a href="#" class="btn btn-outline-danger"><i class="bi bi-instagram"></i> View on Instagram</a>
                    <a href="#" class="btn btn-outline-primary"><i class="bi bi-twitter"></i> View on Twitter</a>
                  </div>
                `;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// get search page for product
router.get("/pSearch", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  console.log("Request at /search");
  axios
    .post(`http://localhost:3000/searchchanom`, { responseType: "json" })
    .then((response) => {
      const data = response.data;

      fs.readFile(
        path.join(__dirname, "/html/pSearch.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("searchResult");

          output.innerHTML = "";
          var child = `<div style="display: flex; flex-wrap: wrap; padding-left:100px; padding-right: 100px; padding-bottom: 50px">`;
          for (var i = 0; i < data.length; i++) {
            child += `
          <!-- Use card to display search results -->
          <div class="card" style="width: 15rem; margin: 10px">
            <img
              src="${data[i].pic1}"
              class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${data[i].pName}</h5>
              <p style="font-size: 18px;">${data[i].pType}</p>
              <p style="font-size: 18px;">Topping: ${data[i].topping}</p>
              <p style="font-size: 18px;">Rating: ${data[i].rating}/5</p>
              <a href="/detail/${data[i].pID}" class="btn btn-secondary">More Detail</a>
            </div>
          </div>
      `;
          }
          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// search function for product
router.post("/pSearch-submit", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var query = req.body;
  console.log(query);
  axios
    .post(`http://localhost:3000/searchchanom`, query) // We need to use post instead of get because axios seems to be unable to send data along with get
    .then((response) => {
      const data = response.data;

      fs.readFile(
        path.join(__dirname, "/html/pSearch.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("searchResult");

          output.innerHTML = "";
          var child = `<div style="display: flex; flex-wrap: wrap; padding-left:100px; padding-right: 100px; padding-bottom: 50px">`;
          if (data == "") {
            // in case search not found
            child = `<h1 style="text-align: center; padding: 50px;">No results found</h1>`;
          }
          for (var i in data) {
            child += `
              <!-- Use card to display search results -->
              <div class="card" style="width: 15rem; margin: 10px">
                <img
                  src="${data[i].pic1}"
                  class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${data[i].pName}</h5>
                  <p style="font-size: 18px;">${data[i].pType}</p>
                  <p style="font-size: 18px;">${data[i].topping}</p>
                  <p style="font-size: 18px;">Rating: ${data[i].rating}/5</p>
                  <a href="/detail/${data[i].pID}" class="btn btn-secondary">More Detail</a>
                </div>
              </div>
          `;
          }
          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// product management page
router.get("/pManage", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  console.log("Request at /pManage");
  axios
    .post(`http://localhost:3000/searchchanom`, { responseType: "json" }) // get all product results
    .then((response) => {
      const data = response.data;
      //console.log(data);

      fs.readFile(
        path.join(__dirname, "/html/pManage.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("pTable");

          output.innerHTML = "";
          var child = `<table class="table table-striped table-borderless "> 
          <thead class="thead-dark">
            <tr>
              <th scope="col">pID</th>
              <th scope="col">Drink Name</th>
              <th scope="col">Drink Type</th>
              <th scope="col">Topping</th>
              <th scope="col">Rating</th>
              <th scope="col">Price (THB)</th>
              <th scope="col"></th>
              <th scope="col"></th>   <!-- empty header column for edit/remove button -->
            </tr>
          </thead>
          <tbody>`;

          for (var i in data) {
            child += `<tr>
            <th scope="row">${data[i].pID}</th>
            <td><a href="/detail/${data[i].pID}" style="">${data[i].pName}</a></td>
            <td>${data[i].pType}</td>
            <td>${data[i].topping}</td>
            <td>${data[i].rating}</td>
            <td>${data[i].price}</td>
            <!-- The last two column of each row will be used to modify and delete a product -->
            <td><a href=/pManage/edit/${data[i].pID}><i class="bi bi-pencil-square" style="background-color: transparent;"></i></a></td>
            <td><a href="/product-delete/${data[i].pID}"><i class="bi bi-trash3-fill" style="background-color: transparent; color: red;"></i></a></td>
          </tr>`;
          }

          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// insert product into the database
router.post("/product-insert", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var data = req.body;
  console.log(data);

  axios.post("http://localhost:3000/insertchanom", data).then((response) => {
    //console.log(response);
    res.redirect("/pManage");
  });
});

// delete a product based on product ID
router.get("/product-delete/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  axios.delete(`http://localhost:3000/deletechanom/${id}`).then((response) => {
    res.redirect("/pManage");
  });
});

// get an edit page for each product
router.get("/pManage/edit/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  axios
    .get(`http://localhost:3000/selectchanom/${id}`, { responseType: "json" })
    .then((response) => {
      console.log(response.data);
      const data = response.data;

      fs.readFile(
        path.join(__dirname, "/html/pEdit.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("output");
          const form = dom.window.document.getElementById("inputForm");

          form.innerHTML += `<form action="/product-update/${data.pID}" method="POST">  <!-- A form for administrators to edit a product -->
      <h1>Editing a product</h1>
      <label for="product-input">Drink Name:</label>
      <input type="text" placeholder="Name" value="${data.pName}" id="drinkName" name="pName" required> <br>
      <label for="product-input">Type:</label> <br>
      <input type="radio" name="pType" value="Bubble Milk Tea" id="drinkType" required> Bubble Milk Tea<br>
      <input type="radio" name="pType" value="Bubble Milk" id="drinkType" required> Bubble Milk <br>
      <input type="radio" name="pType" value="Fruit Yoghurt Frappe" id="drinkType" required> Fruit Yoghurt Frappe <br> <br>
      <label for="product-input">Topping:</label> <br>
      <input type="radio" name="topping" value="Black Pearl" id="drinkType"> Black Pearl<br>
      <input type="radio" name="topping" value="Grass Jelly" id="drinkType"> Grass Jelly <br>
      <input type="radio" name="topping" value="Brown Sugar" id="drinkType"> Brown Sugar <br> <br>
      <label for="product-input">Rating:</label> 
      <input type="number" placeholder="Rating" min="1" max="5" value="${data.rating}" name="rating" id="drinkRating" required> stars <br>                       
      <label for="product-input">Description:</label>
      <textarea required name="pDescription" placeholder="Description">${data.pDescription}</textarea><br>
      <label for="product-input">Image URLs:</label>
      <input type="text" required style="height: fit-content;" name="pic1" placeholder="Image 1" value="${data.pic1}"> <br>
      <input type="text" required style="height: fit-content;" name="pic2" placeholder="Image 2" value="${data.pic2}"> <br>
      <input type="text" required style="height: fit-content;" name="pic3" placeholder="Image 3" value="${data.pic3}"> <br>
      <label for="product-input">Price:</label> 
      <input type="number" placeholder="Price" name="price" id="drinkPrice" required value="${data.price}"> Baht <br>
      <button type="submit">Confirm</button>
      <a href="/pManage" class="cancel">Cancel</a>
  </form>`;

          output.innerHTML = "";
          var child = `<div class="col" style="padding: 30px;">
      <h1 style="font-size: 30px; text-align: left;">${data.pName}</h1>
      <p style="font-size: 22px;">Rating: ${data.rating} / 5</p>
      <p style="font-size: 22px;">${data.pType}</p>
      <p style="font-size: 22px;">฿ ${data.price}</p>
      <p style="font-size: 22px;">Topping: ${data.topping}</p>
      <p style="font-size: 18px; text-align: justify;">"${data.pDescription}"</p>
      <img src="${data.pic1}" style="width: 250px; height: 175px; border-radius: 10px;">
      <img src="${data.pic2}" style="width: 250px; height: 175px; border-radius: 10px;">
      <img src="${data.pic3}" style="width: 250px; height: 175px; border-radius: 10px;"> <br><br>
      <p style="font-size: 18px;">Image 1: ${data.pic1}</p>
      <p style="font-size: 18px;">Image 2: ${data.pic2}</p>
      <p style="font-size: 18px;">Image 3: ${data.pic3}</p>
    </div>
  </div>`;

          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// update a product based on product ID
router.post("/product-update/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var pID = req.params.id;
  var data = req.body;
  console.log(data);

  axios
    .put(`http://localhost:3000/updatechanom/${pID}`, data)
    .then((response) => {
      //console.log(response);
      res.redirect("/pManage");
    });
});

// get search page for admin data
router.get("/uSearch", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  console.log("Request at /search");
  axios
    .post(`http://localhost:3000/searchadmin`, { responseType: "json" })
    .then((response) => {
      const data = response.data;

      fs.readFile(
        path.join(__dirname, "/html/uSearch.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("searchResult");

          output.innerHTML = "";
          var child = `<table class="table table-striped table-borderless "> 
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Birthdate</th>
          <th scope="col">email</th>
          <th scope="col"></th>
          <th scope="col"></th>   <!-- empty header column for edit/remove button -->
        </tr>
      </thead>
      <tbody>`;
          var toDisplay; // the number of products to display on the page
          if (data.length >= 5) {
            toDisplay = 5;
          } else {
            toDisplay = data.length;
          } // if there are more than 5 products, display just 5
          for (var i = 0; i < toDisplay; i++) {
            child += `
        <tr>
        <th scope="row">${data[i].aID}</th>
        <th scope="row">${data[i].username}</th>
        <td>${data[i].pass_word}</td>
        <td>${data[i].fname}</td>
        <td>${data[i].lname}</td>
        <td>${data[i].birthdate}</td>
        <td>${data[i].email}</td>
        <td><a href=/uManage/edit/${data[i].aID}><i class="bi bi-pencil-square" style="background-color: transparent;"></i></a></td>
        <td><a href="/admin-delete/${data[i].aID}"><i class="bi bi-trash3-fill" style="background-color: transparent; color: red;"></i></a></td>
      </tr>
      `;
          }
          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// search function for admin data
router.post("/uSearch-submit", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var query = req.body;
  console.log(query);

  axios.post(`http://localhost:3000/searchadmin`, query).then((response) => {
    const data = response.data;

    fs.readFile(
      path.join(__dirname, "/html/uSearch.html"),
      "utf8",
      (err, html) => {
        if (err) {
          throw err;
        }
        const dom = new JSDOM(html);
        const output = dom.window.document.getElementById("searchResult");

        output.innerHTML = "";
        var child = `<table class="table table-striped table-borderless "> 
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Birthdate</th>
              <th scope="col">email</th>
              <th scope="col"></th>
              <th scope="col"></th>   <!-- empty header column for edit/remove button -->
            </tr>
          </thead>
          <tbody>`;
        if (data == "") {
          // in case search not found
          child = `<h1 style="text-align: center; padding: 50px;">No results found</h1>`;
        }
        for (var i in data) {
          child += `
            <tr>
            <th scope="row">${data[i].aID}</th>
            <th scope="row">${data[i].username}</th>
            <td>${data[i].pass_word}</td>
            <td>${data[i].fname}</td>
            <td>${data[i].lname}</td>
            <td>${data[i].birthdate}</td>
            <td>${data[i].email}</td>
            <td><a href=/uManage/edit/${data[i].aID}><i class="bi bi-pencil-square" style="background-color: transparent;"></i></a></td>
            <td><a href="/admin-delete/${data[i].aID}"><i class="bi bi-trash3-fill" style="background-color: transparent; color: red;"></i></a></td>
            </tr>
          `;
        }
        // add page content with the retrieved data
        output.innerHTML += child;
        res.send(dom.serialize()); // sending the modified html file
      }
    );
  });
});

// product management page
router.get("/uManage", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  console.log("Request at /uManage");
  axios
    .post(`http://localhost:3000/searchadmin`, { responseType: "json" })
    .then((response) => {
      const data = response.data;
      //console.log(data);

      fs.readFile(
        path.join(__dirname, "/html/uManage.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("uTable");

          output.innerHTML = "";
          var child = `<table class="table table-striped table-borderless "> 
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Birthdate</th>
              <th scope="col">email</th>
              <th scope="col"></th>
              <th scope="col"></th>   <!-- empty header column for edit/remove button -->
            </tr>
          </thead>
          <tbody>`;

          for (var i in data) {
            child += `<tr>
            <th scope="row">${data[i].aID}</th>
            <th scope="row">${data[i].username}</th>
            <td>${data[i].pass_word}</td>
            <td>${data[i].fname}</td>
            <td>${data[i].lname}</td>
            <td>${data[i].birthdate}</td>
            <td>${data[i].email}</td>
            <!-- The last two column of each row will be used to modify and delete a product -->
            <td><a href=/uManage/edit/${data[i].aID}><i class="bi bi-pencil-square" style="background-color: transparent;"></i></a></td>
            <td><a href="/admin-delete/${data[i].aID}"><i class="bi bi-trash3-fill" style="background-color: transparent; color: red;"></i></a></td>
          </tr>`;
          }

          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// insert admin into the database
router.post("/admin-insert", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var data = req.body;
  console.log(data);

  axios.post("http://localhost:3000/insertadmin", data).then((response) => {
    //console.log(response);
    res.redirect("/uManage");
  });
});

// delete an admin based on aID
router.get("/admin-delete/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  axios.delete(`http://localhost:3000/deleteadmin/${id}`).then((response) => {
    res.redirect("/uManage");
  });
});

// get an edit page for each admin account
router.get("/uManage/edit/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  axios
    .get(`http://localhost:3000/selectadmin/${id}`, { responseType: "json" })
    .then((response) => {
      console.log(response.data);
      const data = response.data;

      fs.readFile(
        path.join(__dirname, "/html/uEdit.html"),
        "utf8",
        (err, html) => {
          if (err) {
            throw err;
          }
          const dom = new JSDOM(html);
          const output = dom.window.document.getElementById("output");
          const form = dom.window.document.getElementById("inputForm");

          form.innerHTML += `<form action="/admin-update/${data.aID}" method="POST" style="padding-left: 10px;">  <!-- A form for administrators to add a product -->
      <h1>Edit an administrator</h1>
      <label for="product-input">Username: </label>
      <input type="text" value="${data.username}" placeholder="Username" id="username" name="username" required> <br>
      <label for="product-input">Password: </label>
      <input type="text" value="${data.pass_word}" placeholder="Password" id="password" name="pass_word" required> <br>
      <label for="product-input">First Name: </label>
      <input type="text" value="${data.fname}" placeholder="First Name" id="firstname" name="fname" required> <br>
      <label for="product-input" >Last Name: </label>
      <input type="text" value="${data.lname}" placeholder="Last Name" id="lastname" name="lname" required> <br>
      <label for="product-input">Birthdate: </label>
      <input type="date" value="" style="width: 250px" id="DOB" name="birthdate" required> <br><br>
      <label for="product-input">Email: </label> 
      <input type="email" value="${data.email}" placeholder="Email" id="email" name="email" required> <br>
      <button type="submit">Confirm</button>
      <a href="/uManage" class="cancel">Cancel</a>
  </form>`;

          output.innerHTML = "";
          var child = `<div class="col" style="padding: 30px;">
  <h1 style="font-size: 30px; text-align: left;">Current Data</h1> <br>
  <p style="font-size: 22px;">Username: ${data.username}</p>
  <p style="font-size: 22px;">Password: ${data.pass_word}</p>
  <p style="font-size: 22px;">First Name: ${data.fname}</p>
  <p style="font-size: 22px;">Last Name: ${data.lname}</p>
  <p style="font-size: 22px;">Birthdate: ${data.birthdate}</p>
  <p style="font-size: 22px;">Email: ${data.email}</p>
</div>
</div>`;

          // add page content with the retrieved data
          output.innerHTML += child;
          res.send(dom.serialize()); // sending the modified html file
        }
      );
    });
});

// update an admin based on aID
router.post("/admin-update/:id", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  var aID = req.params.id;
  var data = req.body;
  console.log(data);
  axios
    .put(`http://localhost:3000/updateadmin/${aID}`, data)
    .then((response) => {
      //console.log(response);
      res.redirect("/uManage");
    });
});

// External public API to get an ideal weight according to the height
router.post("/getweight", (req, res) => {
  // console.log("button click", req.body.weight);

  if (req.body.gender === "") return;
  const options = {
    method: "GET",
    url: "https://fitness-calculator.p.rapidapi.com/idealweight",
    params: {
      gender: req.body.gender,
      height: parseInt(req.body.height),
    },
    headers: {
      "X-RapidAPI-Key": "ec16420a96msh55f10f896eb4a5dp1ae895jsnabb435fbb8b6",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    },
  };

  axios.request(options).then((response) => {
    console.log(response.data);
    const data = response.data.data;
    console.log(data);
    fs.readFile(
      path.join(__dirname, "/html/aboutus.html"),
      "utf8",
      (err, html) => {
        if (err) {
          throw err;
        }
        const dom = new JSDOM(html);
        const output = dom.window.document.getElementById("weight_text");

        output.innerHTML = "";
        // add page content with the retrieved data
        output.innerHTML += `
                <div>
                  <p>Hamwi: ${data["Hamwi"]}
                  Devine: ${data["Devine"]}
                  Miller: ${data["Miller"]}
                  Robinson: ${data["Robinson"]}</p>
                </div>
                `;
        res.send(dom.serialize()); // sending the modified html file
      }
    );
  });
});

// unspecified path
app.get("*", function (req, res) {
  console.log("404");
  res.status(404).sendFile(path.join(__dirname, "/html/error.html"));
});

app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
