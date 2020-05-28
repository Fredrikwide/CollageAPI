const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation_rules/profile');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get resource's photos */
router.get('/photos', profileController.getPhotos);

/*get resource's albums */
router.get('/albums', profileController.getAlbums);


/* Add a book to this user's collection */
router.post('/photos', profileValidationRules.addPhotoRules, profileController.addPhoto);

/* Add an album to this users collage */
router.post('/albums', profileValidationRules.addPhotoRules, profileController.addAlbum);

/* Update a specific resource */
router.put('/', profileValidationRules.updateProfileRules, profileController.updateProfile);

module.exports = router;
