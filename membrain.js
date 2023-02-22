
const navbar = document.getElementById('nav')
let p = document.createElement('p')
p.innerHTML = (`
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
`)
navbar.appendChild(p)


