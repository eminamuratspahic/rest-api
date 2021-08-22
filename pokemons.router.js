const express = require('express');
const { getPokemons, getOnePokemon, addPokemon, editPokemon, deletePokemon } = require('./pokemons.controllers');

const router = express.Router();

router.get('/api/pokemons', getPokemons);
router.get('/api/pokemons/:id', getOnePokemon);
router.post('/api/pokemons', addPokemon);
router.put('/api/pokemons/:id', editPokemon);
router.delete('/api/pokemons/:id', deletePokemon);

module.exports = router;
