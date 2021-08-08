// Importing the dependencies | Importando as dependências
    const express = require("express");
    const path = require('path');
    const mysql = require("mysql");
    const dotenv = require('dotenv');


// changing where the environment variables will be stored by dotenv | definindo onde ficarão armazenadas as variáveis de ambiente pelo dotenv 
    dotenv.config({ path: './.env'});

// starting express | iniciando o express
    const app = express();

// making the connection to database | Fazendo a conexão com o banco de dados
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });

// setting the publicDirectory | configurando o diretório public
    const publicDirectory = path.join(__dirname, './public');
// setting where the express will search the public files || definindo onde o express buscará os arquivos públicos
    app.use(express.static(publicDirectory));

// setting the view engine | definindo o mecanismo de visualização
    app.set('view engine', 'hbs');

// verifying the connection to the db | verificando a conexão com o bd
    db.connect( (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log("MYSQL Connected...")
        }
    });

    // Creating the routes | Criando as rotas
    app.get("/", (req, res) => {
        // only for test: res.send("<h1> Home Page</h1>")

        res.render("index"); 
    });

    app.get("/", (req, res) => {
        // only for test: res.send("<h1> Home Page</h1>")

        res.render("index"); 
    });

    app.get("/home", (req, res) => {
        // only for test: res.send("<h1> Home Page</h1>")

        res.render("home"); 
    });

// verifying the connection to the server | verificando a conexão com o servidor
    app.listen(3000, () => {
        console.log("Server started on Port 3000");
    })