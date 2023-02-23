console.log("Javascript Loaded!")
const getNav = () =>{
  const navbar = document.getElementById("nav");
  if(!navbar) return
  navbar.innerHTML = `
  <header>
    <div>
      <a href="/"><h1><b>Custom Bubble Tea</b></h1></a>
    </div>
    <nav>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/search.html">Search</a></li>
        <li><a href="/aboutus.html">About Us</a></li>
        <li><a href="/login.html"><button type="button" class="btn btn-danger">Login</button></a></li>
      </ul>
    </nav>
  </header>
  `;
}

getNav();
// const button = (props) =>{
//     var opened = window.open("");
//     opened.document.write("<html><head><title>Detail</title></head><body>test</body></html>");
// }


const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const cardContainer = document.getElementById("cardContainer");
    // console.log(data);
    // console.log(data.bubble[0].name);
    if(!cardContainer) return
    for (let i = 0; i < data.bubble.length; i++) {
      const card = document.createElement("card");
      card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <a href="/${data.bubble[i].page}" style="width: 18rem; text-decoration: none; color: black">
                            <img src="${data.bubble[i].img_url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${data.bubble[i].name}</h5>
                            </div>
                        </a>
                    </div>`;
      cardContainer.appendChild(card);
    }
    // return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

const fetchOneData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    // console.log(data);

    const myid = document.getElementById("card");
    if(!myid) return
    const id = myid.getAttribute("card");

    // console.log(id);
    // console.log(data.bubble[id].img_url);
    myid.innerHTML = `
                <div>
                    <img src="${data.bubble[id].img_url}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"><b>Name: </b>${data.bubble[id].name}</h5>
                        <h5 class="card-title"><b>Description: </b>${data.bubble[id].description}</h5>
                        <h5 class="card-title"><b>Type: </b> ${data.bubble[id].type}</h5>
                        <h5 class="card-title"><b>Topping: </b>${data.bubble[id].topping}</h5>
                        <h5 class="card-title"><b>Rating: </b>${data.bubble[id].rating}</h5>
                    </div>
                </div>`;

    // return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchOneData()


const fetchOneCard = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    // console.log(data);
    // const cardContainer = document.getElementById("cardContainer");
    const cardid = document.getElementById("Eachcard");
    if(!cardid) return
    const id = cardid.getAttribute("cardid");

    console.log(id);
    // console.log(data.bubble[id].img_url);
    cardid.innerHTML = `
                <div>
                    <img src="${data.bubble[id].img_url}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"><b>Name: </b>${data.bubble[id].name}</h5>
                        <h5 class="card-title"><b>Type: </b> ${data.bubble[id].type}</h5>
                        <h5 class="card-title"><b>Topping: </b>${data.bubble[id].topping}</h5>
                        <h5 class="card-title"><b>Rating: </b>${data.bubble[id].rating}</h5>
                    </div>
                </div>`;

    // return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchOneCard()