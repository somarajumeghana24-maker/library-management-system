const API = "http://localhost:8080/books";

async function loadBooks() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((b) => {
        const li = document.createElement("li");
        li.innerHTML = `${b.title} - ${b.author} <button onclick="deleteBook(${b.id})">Delete</button>`;
        list.appendChild(li);
    });
}

async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (!title || !author) {
        alert("Please enter both title and author");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            author: author,
            available: true
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";

    loadBooks();
}

async function deleteBook(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}

loadBooks();