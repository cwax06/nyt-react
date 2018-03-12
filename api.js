var mongoose = require('mongoose');
var articleSchema = require('./models/article');
var axios = require('axios');

var Article = mongoose.model('Article', articleSchema);


module.exports = function(app) {
  // app is the express app
  app.get('/api/articles', function(req, res) {
    Article.find({}, function (err, articles) {
      res.json(articles);
    });
  });

  app.post('/api/articles', function(req, res) {
    Article.create({ 
      title: req.body.title, 
      date: Date.now(),
      url: req.body.url,
      notes: ''
    }, function (err, article) {
      if (!err) {
        // saved!
        res.json(article);
      }
    });
  });

  app.post('/api/articles/:id/update', function(req, res) {
    console.log('update', req.params.id, req.body.params.notes);
    Article.update({
      _id: req.params.id
    },
      {
        $set: {
          notes: req.body.params.notes
        }
    },
    function(article) {
      res.json(article);
    });
  });

  app.delete('/api/articles/:id', function(req, res) {
    console.log(req.params.id);
    Article.findByIdAndRemove(req.params.id, (err, article) => {  
      // As always, handle any potential errors:
      if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
      const response = {
          message: "Article successfully deleted",
          id: article._id
      };
      return res.json(response);
    });
  });

  //Search NYT
  app.post('/api/nytsearch', function(req, res) {
    var API_KEY = process.env.NYTAPIKEY;
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", 
    {
      params: {
        'api-key': API_KEY,
        q: req.body.search,
        begin_date: req.body.startYear,
        end_date: req.body.endYear 
      }
    })
    .then(response => {
      console.log(response.data);
      res.json(response.data.response.docs);
    })
    .catch(error => {
      console.log(error);
      res.json({error: 'there was an error'});
    });
  });
}