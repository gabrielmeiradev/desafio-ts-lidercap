const express = require('express');
const controller = require('./controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', controller);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do desafio Lidercap! Use /api/users/[id] para acessar os dados.');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
