const navbar = document.getElementById("nav");
navbar.innerHTML = `
    <nav style="display: flex; justify-content: space-around; margin-top: 15px;">
        <ul>
            <a href="/" style="text-decoration: none; color: black;"><h1>Custom Bubble tea</h1></a>
        </ul>
        <ul style="display: flex; flex-direction: row; justify-content: space-around;">
            <li><a href="/index.html">Home</a></li>
            <li><a href="/search.html">Search</a></li>
            <li><a href="/aboutus.html">About Us</a></li>
            <li><a href="/login.html"><button type="button" class="btn btn-primary">Login</button></a></li>
        </ul>
    </nav>
`;

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
                        <a href="/${data.bubble[i].page}" style="width: 18rem;">
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