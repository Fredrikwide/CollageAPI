/**
 * User Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

const createPhotoRules = [
    body('title').isLength({ min: 3 }).custom(async value => {
        const user = await new models.User({ title: value }).fetch({ require: false });
        if (user) {
            return Promise.reject('Username already exists.');
        }

        return Promise.resolve();
    }),
    body('title').isLength({ min: 3 }),
    body('comment').optional().isLength({ min: 2 }),
    body('album_id').isLength({ min: 1 }).isInt(),
];

const updatePhotoRules = [
    body('title').isLength({ min: 3 }),
    body('comment').optional().isLength({ min: 2 }),
    body('album_id').isLength({ min: 1 }).isInt(),
];

module.exports = {
    createPhotoRules,
    updatePhotoRules,
}
