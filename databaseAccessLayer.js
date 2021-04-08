const database = include('/databaseConnection');

function getAllRestaurants(callback) {
  let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant";
  database.query(sqlQuery, (err, results, fields) => {
    if (err) {
      callback(err, null);
    }
    else {
      console.log(sqlQuery);
      console.log(results);
      callback(null, results);
    }
  });
};

const passwordPepper = "SeCretPeppa4MySal+";
function addRestaurant(postData, callback) {
  let sqlInsertSalt = "INSERT INTO restaurant (name, description) VALUES (:restaurant_name, :description);";
  let params = {
    restaurant_name: postData.restaurant_name,
    description: postData.description
  };
  console.log(sqlInsertSalt);
  database.query(sqlInsertSalt, params, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteRestaurant(restaurantId, callback) {
  let sqlDeleteRestaurant = "DELETE FROM restaurant WHERE restaurant_id = :restaurantID";
  let params = {
    restaurantID: restaurantId
  };
  console.log(sqlDeleteRestaurant);
  database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    }
    else {
      console.log(results);
      callback(null, results);
    }
  });
}

function getReviews(restaurantId, callback) {
  let sqlGetReviews = "SELECT details, reviewer_name, rating FROM review WHERE restaurant_id = :restaurantID";
  let params = {
    restaurantID: restaurantId
  }
  database.query(sqlGetReviews, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    }
    else {
      console.log(sqlGetReviews);
      console.log(results);
      callback(null, results);
    }
  });
}

module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant, getReviews };
