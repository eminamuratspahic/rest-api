const { v1: uuidv1 } = require('uuid');
const { Request, Response, NextFunction, } = require('express');
const fs = require('fs');

/**
 * Responds with all the pokemons from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getPokemons(req, res, next) {
	fs.readFile('pokemons.json', 'utf-8', (err, data) => {
		if (err) {
			res.status(404);
		}
		const dataArray = JSON.parse(data);
		res.json(dataArray);
	});
}

/**
 * Responds with the requested pokemon or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOnePokemon = (req, res, next) => {
	const { id } = req.params;

	fs.readFile('pokemons.json', 'utf-8', (err, data) => {
		if (err) {
			res.status(500).json('Couldnt read file');
			return;
		}
		const dataArray = JSON.parse(data);
		const findIndex = dataArray.find((pokemon) => pokemon.id == id);
		if (!findIndex) {
			console.log(findIndex);
			res.status(404).json(`Pokemon with ${id} was not found`);
		} else {
			res.status(200).json(findIndex);
		}
	});
};

function addPokemon(req, res, next) {
	const pokemon = { ...req.body, id: uuidv1() };

	fs.readFile('pokemons.json', 'utf-8', (err, data) => {
		if (err) {
			res.status(500).json('Couldnt read file');
			return;
		}
		const dataArray = JSON.parse(data);
		dataArray.push(pokemon);
		fs.writeFile('pokemons.json', JSON.stringify(dataArray, null, 2), (err) => {
			if (err) {
				res.status(500).json('Couldnt write file');
				return;
			}
			res.status(201).json(pokemon);
		});
	});
}

/**
 * Responds with all the pokemons from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function editPokemon(req, res, next) {
	const { id } = req.params;

	fs.readFile('pokemons.json', 'utf-8', (err, data) => {
		if (err) {
			res.status(500).json('Couldnt read file');
			return;
		}
		let dataArray = JSON.parse(data);
		const pokemon = dataArray.find((pokemon) => pokemon.id == id);
		if (!pokemon) {
			res.status(404).json(`Pokemon with ${id} was not found`);
		} else {
			pokemon.specie = req.body.specie;
			pokemon.height = req.body.height;
			pokemon.description = req.body.description;
			pokemon.hp = req.body.hp;
		}
		fs.writeFile('pokemons.json', JSON.stringify(dataArray, null, 2), (err) => {
			if (err) {
				res.status(500).json('Couldnt write file');
				return;
			}
			res.status(201).json(pokemon);
		});
	});
}

/**
 * Responds with deleting pokemon from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function deletePokemon(req, res, next) {
	const { id } = req.params;
	const pokemon = { ...req.body };

	fs.readFile('pokemons.json', 'utf-8', (err, data) => {
		if (err) {
			res.status(500).json('Couldnt read file');
			return;
		}
		let dataArray = JSON.parse(data);
		const deleted = dataArray.find((pokemon) => pokemon.id == id);
		if (!deleted) {
			res.status(404).json(`Pokemon with ${id} was not found`);
		} else {
			dataArray = dataArray.filter((pokemon) => pokemon.id !== id);
		}
		fs.writeFile('pokemons.json', JSON.stringify(dataArray, null, 2), (err) => {
			if (err) {
				res.status(500).json('Couldnt write file');
				return;
			}
		});
	});
}

module.exports = {
	getPokemons,
	getOnePokemon,
	addPokemon,
	editPokemon,
	deletePokemon
};
