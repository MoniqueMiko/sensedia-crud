const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para ler JSON do corpo das requisições
app.use(express.json());

// Banco de dados em memória
let usuarios = [];
let idAtual = 1;

// Rota: Criar um novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, idade, profissao } = req.body;
  // Validação básica
  if (!nome || !idade || !profissao) {
    return res.status(400).json({ erro: 'Campos nome, idade e profissao são obrigatórios' });
  }

  const novoUsuario = {
    id: idAtual++,
    nome,
    idade,
    profissao,
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Rota: edita um novo usuário
app.put('/usuarios/:id', (req, res) => {
  const { nome, idade, profissao } = req.body;
  
  // Validação básica
  if (!nome || !idade || !profissao) {
    return res.status(400).json({ erro: 'Campos nome, idade e profissao são obrigatórios' });
  }

  usuarios[Number(req.params.id) - 1] = { id: Number(req.params.id), nome: nome, idade: idade, profissao: profissao }
  res.status(201).json(usuarios[Number(req.params.id) - 1]);
});

// Rota: Listar todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/show/:id', (req, res) => {
  res.json(usuarios[Number(req.params.id) - 1]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
