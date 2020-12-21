const express = require('express');
// Express router
const router = express.Router();
//Blog Controller
const blogController = require('../controllers/blogController');



// Homepage
router.get('/', blogController.blog_index);
// create page with form 
router.get('/create', blogController.blog_create);
// single blog 
router.get('/:id', blogController.blog_details);
//delete a blog 
router.delete('/:id', blogController.blog_delete);

// ********************POST Request to create blog post*********************** 
router.post('/', blogController.blog_create_post);


module.exports = router;