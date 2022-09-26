const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const usuarios = [];

// Listar todos os usuários
app.get("/usuarios", (_, res) => {
  res.send(usuarios);
});

// Cadastrar um novo usuário
app.post("/usuarios", (req, res) => {
  const emailAlreadyRegistered =
    usuarios.filter((usuario) => usuario.email === req.body.email.toLowerCase())
      .length !== 0;

  if (!emailAlreadyRegistered) {
    usuarios.push({
      id: uuidv4(),
      nome: req.body.nome,
      email: req.body.email.toLowerCase(),
    });

    res.status(201);
  } else {
    res.status(400).json({
      status: 400,
      title: "Ocorreu um erro de validação",
      message: "O e-mail informado já está em uso",
    });
  }

  res.end();
});

app.listen(3000, () => {
  console.log("Aplicação rodando...");
});