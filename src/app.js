//Acessa ao banco de dados

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const userSchema = require("../src/models/user");



// Conectar com o banco 
mongoose.connect(
    process.env.MONGODB_URI
).then(()=> console.log('Connected to MongoFB Atlas'))
.catch((error)=>console.error(error));


//Função cadastrar

function cadastrar(){
    let nome = $('#name').val()
    let autor = $('#autor').val()
    let data = $('#publicacao').val()

    console.log('Funcionando');

    $.ajax(
        {
            type: 'POST',
            url: `http://localhost:3000/livro`,
            data: JSON.stringify({
                "nome": nome,
                "autor": autor,
                "data": data
            }),
            contentType: 'application/json',
            success: function (resposta) {
                
            }
        }
    );
  
}

// // Inserindo dados
app.post('/livro', (req, res) =>{
    const user = userSchema(req.body)
    user
    .save()
    .then(
        function (ret) {
            res.json(
                {
                    status: 'OK',
                    dadosEnviados: req.body
                }
            )
            res.redirect('/livro/busca')
        }
    );

});

// Listando os livros
function listar() {
    $.ajax(
        {
            type: 'GET',
            url: `http://localhost:3000/livro/busca`,
            success: function (resposta) {
                
                for (let i = 0; i < resposta.resultados.length; i++) {
                    $('#tbnome').append(`${resposta.resultados[i].nome}<br>`);
                    $('#tbautor').append(`${resposta.resultados[i].autor}<br>`);
                    $('#tbdata').append(` ${resposta.resultados[i].data}<br>`);
                }
                
            },
            error: function (resposta) {
                alert(`Não tem livros!`);
            }
        }
    );
}



//Buscando dados do livro
app.get(
    '/livro/busca',
    function (req, res) {
        userSchema
            .find(req.params)
            .then(
            (data)=> {
                res.json(
                    {
                        status: 'OK',
                        resultados: data
                    }
                );
                
            }
        );

    }
);



//Conectar o sevidor web
app.listen(
    port,
    function () {
        console.log('Servidor web funcionando');
    }
);