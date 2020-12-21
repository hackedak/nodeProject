// blog index, blog details, blog create get, blog create post, blog delete 
// Blog modal
const Blog = require('../modals/blog');

// blog index
const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})                     // descending order
    .then((result) =>{
        res.render('index', {'title': 'All Blogs', blogPosts: result});     //passed as agrument to index page 

    })
    .catch((err) => console.log(err))
};

// blog details
const blog_details = (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => res.render('details', {blog: result, 'title': 'Blog Details'}))
    .catch(err => res.status(404).render('error', {title: 'Blog not found'}));
};

// blog create get
const blog_create = (req, res) =>{
    res.render('create', {'title': 'create blog'} );
};

// blog create post
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);                //instance of Blog module with body part of post request passed as parameter
    blog.save()                                     // save function : mongodb
    .then((result) => res.redirect('/blogs'))
    .catch((err) => console.log(err));
};

// blog delete
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect:'/blogs'});
    })
    .catch(err => console.log(err));
};


// export
module.exports = {
    blog_index,
    blog_details,
    blog_create,
    blog_create_post,
    blog_delete
}