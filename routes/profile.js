const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get resource's books */
router.get('/photos', profileController.getPhotos);

/*get resource's albums */
router.get('/albums', profileController.getAlbum);


/* Add a book to this user's collection */
router.post('/photos', profileValidationRules.addPhotoRules, profileController.addPhoto);

/* Update a specific resource */
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;
