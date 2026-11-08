// Show pages

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "dashboard") {
        displayMyBlogs();
    }

    if (pageId === "home") {
        displayHomeBlogs();
    }
}


// Register

function register() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Email already registered");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    showPage("login");
}


// Login

function login() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user =>
        user.email === email && user.password === password
    );

    if (user) {

        localStorage.setItem("currentUser", JSON.stringify(user));

        document.getElementById("username").innerText = user.name;

        alert("Login successful!");

        showPage("dashboard");

    } else {

        alert("Invalid email or password");

    }
}


// Create Blog

function createBlog() {

    let title = document.getElementById("blogTitle").value;
    let content = document.getElementById("blogContent").value;

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        showPage("login");
        return;
    }

    if (!title || !content) {
        alert("Please enter title and content");
        return;
    }

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.push({
        title: title,
        content: content,
        author: user.name,
        email: user.email
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog published successfully!");

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogContent").value = "";

    showPage("dashboard");
}


// Display My Blogs

function displayMyBlogs() {

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        showPage("login");
        return;
    }

    document.getElementById("username").innerText = user.name;

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    let myBlogs = blogs.filter(blog => blog.email === user.email);

    let container = document.getElementById("myBlogs");

    container.innerHTML = "";

    myBlogs.forEach(blog => {

        container.innerHTML += `
            <div class="blog-card">
                <h3>${escapeHTML(blog.title)}</h3>
                <p>${escapeHTML(blog.content)}</p>
                <small>By ${escapeHTML(blog.author)}</small>
            </div>
        `;

    });

    if (myBlogs.length === 0) {
        container.innerHTML = "<p>No blogs created yet.</p>";
    }
}


// Display Home Blogs

function displayHomeBlogs() {

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    let container = document.getElementById("homeBlogs");

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `
            <div class="blog-card">
                <h3>${escapeHTML(blog.title)}</h3>
                <p>${escapeHTML(blog.content)}</p>
                <small>By ${escapeHTML(blog.author)}</small>
            </div>
        `;

    });

    if (blogs.length === 0) {
        container.innerHTML = "<p>No blogs available yet.</p>";
    }
}


// Escape HTML content

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// Logout

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    showPage("home");
}


// Initial page

showPage("home");