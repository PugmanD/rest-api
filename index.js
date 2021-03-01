const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {pool} = require("./config");
const { get } = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
const getBooks = (req, res) => {
    pool.query('SELECT * FROM books', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);
    });
}
const addBook = (req, res) => {
    const {author, title} = req.body;
    pool.query(
        'INSERT INTO books (author, title) VALUES ($1, $2)',
        [author, title],
        (err) => {
            if(err){
                throw err;
            }
            res.status(201).json({status: "success", message: "Book added."});
        },
    )
}

app.route("/books").get(getBooks).post(addBook);
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening`);
})