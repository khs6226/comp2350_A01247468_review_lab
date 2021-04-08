const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', (req, res) => {
  console.log("page hit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render('error', { message: 'Error connecting to MySQL' });
      console.log("Error connecting to mysql");
      console.log(err);
    }
    else {

      dbModel.getAllRestaurants((err, result) => {
        if (err) {
          res.render('error', { message: 'Error reading from MySQL' });
          console.log("Error reading from mysql");
          console.log(err);
        }
        else { //success
          res.render('index', { allRestaurants: result });

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });
      dbConnection.release();
    }
  });
});

router.get('/deleteRestaurant', (req, res) => {
  console.log("delete restaurant");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render('error', { message: 'Error connecting to MySQL' });
      console.log("Error connecting to mysql");
      console.log(err);
    }
    else {
      console.log('req.query', req.query.id);
      let restaurantId = req.query.id;
      if (restaurantId) {
        dbModel.deleteRestaurant(restaurantId, (err, result) => {
          if (err) {
            res.redirect(`/showReviews?id=${restaurantId}`);
            // res.render('error', { message: 'Error writing to MySQL' });
            // console.log("Error writing to mysql");
            // console.log(err);
          }
          else { //success
            res.redirect("/");
            //Output the results of the query to the Heroku Logs
            console.log(result);
          }
        });
      }
      else {
        res.render('error', { message: 'Error on Delete' });
      }
      dbConnection.release();
    }
  });
});


router.get('/showReviews', (req, res) => {
  console.log("page hit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render('error', { message: 'Error connecting to MySQL' });
      console.log("Error connecting to mysql");
      console.log(err);
    }
    else {
      let restaurantId = req.query.id;
      dbModel.getReviews(restaurantId, (err, result) => {
        if (err) {
          res.render('error', { message: 'Error reading from MySQL' });
          console.log("Error reading from mysql");
          console.log(err);
        }
        else { //success
          res.render('review', { reviews: result });

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });
      dbConnection.release();
    }
  });
});


router.post('/addRestaurant', (req, res) => {
  console.log("form submit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render('error', { message: 'Error connecting to MySQL' });
      console.log("Error connecting to mysql");
      console.log(err);
    }
    else {
      console.log(req.body);
      dbModel.addRestaurant(req.body, (err, result) => {
        if (err) {
          res.render('error', { message: 'Error writing to MySQL' });
          console.log("Error writing to mysql");
          console.log(err);
        }
        else { //success
          res.redirect("/");
          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });
      dbConnection.release();
    }
  });
});

module.exports = router;
