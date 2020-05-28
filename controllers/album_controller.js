/**
 * Author Controller
 */

const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_albums = await models.Album.fetchAll();

	res.send({
		status: 'success',
		data: {
			albums: all_albums
		}
	});
}

/**
 * Get a specific resource
 *
 * GET /:albumId
 */
const show = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId })
		.fetch({ withRelated: ['photos'] });

	res.send({
		status: 'success',
		data: {
			album,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Update a specific resource
 *
 * POST /:albumId
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
 * DELETE /:authorId
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
