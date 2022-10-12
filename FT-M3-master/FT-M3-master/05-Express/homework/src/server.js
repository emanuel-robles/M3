// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let id = 1;

let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests


server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } else{
        const post = {
            id,
            author,
            title,
            contents
        }
        posts.push(post);
        id++;
        res.json(post);
    }
});

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;

    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } else{
        const post = {
            id,
            author,
            title,
            contents
        }
        posts.push(post);
        id++;
        res.json(post);
    }
});

server.get('/posts', (req, res) => {
    const { term } = req.query; // ?title=termino&
    if(term){
        let escogidos = posts.filter(post => post.title.includes(term) || post.contents.includes(term));
        res.json(escogidos);
    } else {
        res.json(posts);
    }
});

server.get('/posts/:author', (req, res) => {
    const { author } = req.params;
    let escogidos = posts.filter(post => post.author === author);
    if(escogidos.length > 0) res.json(escogidos);
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
});

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;
    let escogidos = posts.filter(post => post.author === author && post.title === title);

    if(escogidos.length > 0) res.json(escogidos);
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
});

server.put('/posts', (req, res) => {
    const {id, title, contents } = req.body;

    if(!id || !title || !contents){
        res.status(STATUS_USER_ERROR).json( {error: "No se recibieron los parámetros necesarios para modificar el Post"});
    };
    let post = posts.find(post => post.id === id);

    if(!post){
        res.status(STATUS_USER_ERROR).json( {error: "No existe un post correspondiente con ese id"})
    } else{
        post.title = title;
        post.contents = contents;

        res.json(post);
    }
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;

    if(!id){
        res.status(STATUS_USER_ERROR).json({error: "No enviaron el id"})
    }
    let post = posts.find(post => post.id === id);

    if(!post){
        res.status(STATUS_USER_ERROR).json({error: "No existe un post con ese id"})
    } else{
        posts = posts.filter(post => post.id !== id);
        res.json({success: true});
    }
});

server.delete('/author', (req, res) => {
    const { author } = req.body;
    if(!author){
        res.status(STATUS_USER_ERROR).json({error: "No enviaron el author"})
    }
    let authorPosts = posts.filter(post => post.author === author);//tienen el mismo autor

    if(authorPosts.length){
        posts = posts.filter(post => post.author !== author); //los que quedan en el arreglo
        res.json(authorPosts);
    } else {
        res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
});

module.exports = { posts, server };

