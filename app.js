const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const urlEncodedParser = bodyParser.urlencoded({extended:false});

// blogs
const blogs = [];
// about
const aboutContent = "My name is Utkarsh Saxena. I'm gonna fuck your girl"
// contact
const contactContent = "Reach me at saxenautkarsh0@gmail.com OR +91 8171505570"

// configure website to use ejs templates
app.set('view engine', 'ejs');

// send static files
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
  res.render('home', {blogs: blogs});
});

app.get('/about', (req, res) => {
  res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', {contactContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/posts/:title', (req, res, next) => {
  const title = _.lowerCase(req.params.title);
  blogs.forEach((blog) => {
    blogTitle = _.lowerCase(blog.title);
    if(title === blogTitle) {
      res.render('blog', {blog: blog});
      return;
    }
  });
});

app.post('/compose', urlEncodedParser, (req, res) => {
  const blog = {title: req.body.title, content: req.body.content, location: _.kebabCase(req.body.title)};
  blogs.push(blog);
  res.redirect('/');
});

app.use((req, res) => {
  res.send('Something broke');
});

app.listen(3000, () => {
  console.log('Server active at port 3000');
});
