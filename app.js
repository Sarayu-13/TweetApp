const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

let posts = []; 


app.get("/", (req, res) => {
    res.render("layout", { content: "index", posts });
});

app.get("/new", (req, res) => {
    res.render("layout", { content: "new" });
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now().toString(), title, content });
    res.redirect("/");
});


app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render("layout", { content: "edit", post });
});


app.put("/posts/:id", (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id === req.params.id);
    post.title = title;
    post.content = content;
    res.redirect("/");
});


app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
