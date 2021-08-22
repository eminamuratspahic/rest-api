const { v1: uuidv1 } = require('uuid');
const { Request, Response, NextFunction, request } = require('express');

let pokemons = [];

/**
 * Responds with all the plants from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getPokemons(req, res, next) {
	res.json(pokemons);
};

/**
 * Responds with the requested plant or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOnePokemon = (req, res, next) => {
	const { id } = req.params;

	const pokemon = pokemons.find((pokemon) => pokemon.id == id);
	if (!pokemon) {
		res.status(404).json(`Pokemon with ${id} was not found`);
	} else {
		res.status(200).json(pokemon);
	}
};

function addPokemon(req, res, next) {
	const pokemon = { ...req.body, id: uuidv1() };
	pokemons.push(pokemon);
	res.json(pokemon);
};

/**
 * Responds with all the plants from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function editPokemon(req, res, next) {
	const { id } = req.params;

	const pokemon = pokemons.find((pokemon) => pokemon.id == id);
	if (!pokemon) {
		res.status(404).json(`Pokemon with ${id} was not found`);
	} else {
		pokemon.specie = req.body.specie;
		pokemon.height = req.body.height;
		pokemon.description = req.body.description;
		pokemon.hp = req.body.hp;
		res.status(200).json(pokemon);
	}
};

/**
 * Responds with all the plants from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function deletePokemon(req, res, next) {
	const { id } = req.params;

	const deleted = pokemons.find((pokemon) => pokemon.id == id);
	if (deleted) {
		pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
		res.status(200).json(deleted);
	} else {
		res.status(404).json(deleted);
	}
};

module.exports = {
	getPokemons,
	getOnePokemon,
	addPokemon,
	editPokemon,
	deletePokemon
};
