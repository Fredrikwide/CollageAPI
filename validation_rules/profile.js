/**
 * Profile Validation Rules
 */

const { body } = require('express-validator');
const { Photo } = require('../models');

const addPhotoRules = [
	body('photo_id').custom(value => Photo.fetchById(value)),
];

const updateProfileRules = [
	body('password').optional().isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

module.exports = {
	addPhotoRules,
	updateProfileRules,
}
