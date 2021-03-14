const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";


// 3. Create an `orm.js` file inside `config` directory.

// * Import (require) `connection.js` into `orm.js`

// * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//   * `selectAll()`
//   * `insertOne()`
//   * `updateOne()`

// * Export the ORM object in `module.exports`.
  

// Export the orm object for the model (cat.js).
module.exports = orm;
