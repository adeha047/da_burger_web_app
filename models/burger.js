// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

let burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays
  insertOne: function(cols, vals, cb) {
    // console.log(cols, vals)
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  
  deleteOne: function(condition, cb){
    orm.deleteOne("burgers", condition, res => cb(res));
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;