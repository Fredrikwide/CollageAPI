/**
 * Book Controller
 */

const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_photos = await models.Photo.fetchAll();

	res.send({
		status: 'success',
		data: {
			photos: all_photos
		}
	});
}

/**
 * Get a specific resource
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	const photo = await models.Photo.fetchById(req.params.photoId, { withRelated: ['album'] });

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = async (req, res) => {

	try {

		const photo = await new models.Photo(req.body).save()

		console.log(req.body)

		res.status(200).send({
			status: 'success',
			message: 'photo added'
		});

	}
	catch{
		res.status(500).send({
			status: 'error',
			message: error.message
		})
	}



}

/**
 * Update a specific resource
 *
 * POST /:bookId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific resource
 *
 * DELETE /:bookId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
