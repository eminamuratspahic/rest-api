const express = require('express');
const pokemonsRouter = require('./pokemons.router');
const fs = require('fs');

const app = express();

app.use(express.json());

app.use(pokemonsRouter);

app.listen(3000);
