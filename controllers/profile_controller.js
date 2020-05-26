/**
 * Profile Controller
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models');

/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}

	// send (parts of) user profile to requester
	res.send({
		status: 'success',
		data: {
			user: {
				username: user.get('username'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	});
}

/**
 * Get the authenticated user's Photos
 *
 * GET /Photos
 */
const getPhotos = async (req, res) => {
	// query db for user and eager load the Photos relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'photos' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's Photos
	const photos = user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
}


/* get Albums */

const getAlbums = async (req, res) => {
	// query db for user and eager load the Photos relation
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's Photos
	const albums = user.related('albums');

	res.send({
		status: 'success',
		data: {
			albums,
		},
	});
}




/**
 * Add a Photo to the authenticated user's collection
 *
 * POST /Photos
 * {
 *   "Photo_id": 4
 * }
 */
const addPhoto = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add Photo to profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		// 1. get Photo to attach
		const Photo = await Photo.fetchById(req.body.Photo_id);

		// 2. attach Photo to user (create a row in Photos_users for this Photo and user)

		// 2.1. fetch User model
		const user = await User.fetchById(req.user.data.id);

		// 2.2. on User model, call attach() on the Photos() relation and pass the Photo model
		const result = await user.Photos().attach(Photo);

		// 2.3. Profit?
		res.status(201).send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add Photo to profile.',
		});
		throw error;
	}
}




/* add album */


const addAlbum = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add album to profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		// 1. get Photo to attach
		const Album = await Album.fetchById(req.body.Album_id);

		// 2. attach Photo to user (create a row in Photos_users for this Photo and user)

		// 2.1. fetch User model
		const user = await User.fetchById(req.user.data.id);

		// 2.2. on User model, call attach() on the Photos() relation and pass the Photo model
		const result = await user.Albums().attach(Album);

		// 2.3. Profit?
		res.status(201).send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add Album to profile.',
		});
		throw error;
	}
}

/**
 * Update the authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {
	// query db for user
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Update profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// if request contains password, hash it
	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds)
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		await user.save(validData);
		res.sendStatus(204); // Successfully processed request but returned no content

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating profile.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	getAlbums,
	addAlbum,
	getPhotos,
	addPhoto,
	updateProfile,
}
