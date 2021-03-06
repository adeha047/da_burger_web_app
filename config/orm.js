const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";


// 3. Create an `orm.js` file inside `config` directory.

// * Import (require) `connection.js` into `orm.js`

// * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
function printQuestionMarks(num) {
    let arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
}
//   * `selectAll()`

let orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    //   * `insertOne()`

    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    //   * `updateOne()`
    // updateOne: function (table, objColVals, condition, cb) {
    //     var queryString = "UPDATE " + table;

    //     queryString += " SET ";
    //     queryString += objToSql(objColVals);
    //     queryString += " WHERE ";
    //     queryString += condition;

    //     console.log(queryString);
    //     connection.query(queryString, function (err, result) {
    //         if (err) {
    //             throw err;
    //         }

    //         cb(result);
    //     });
    // },

    updateOne: function(table1, values, filters, cb){
        let query = "UPDATE ?? SET ? WHERE ?";
    
        connection.query(query, [table1, values, filters], (err, result) => {
          if(err) {
            throw err;
          }
          cb(result);
        });
      
    },
   



    //deleteOne()
    // deleteOne: function (table, condition, cb) {
    //     var queryString = "DELETE FROM " + table;
    //     queryString += " WHERE ";
    //     queryString += condition;
    
    //     console.log(queryString);
    
    //     connection.query(queryString, function(err, result) {
    //         if (err) {
    //             throw err
    //         }
    //         cb(result);
    //     });
    // }

    deleteOne: function(table1, filters, cb){
        let query = "DELETE FROM ?? WHERE ?";
    
        connection.query(query, [table1, filters], (err, result) => {
          if(err) {
            throw err;
          }
          cb(result);
        });
      
    }
};




// * Export the ORM object in `module.exports`.


// Export the orm object for the model (burger.js).
module.exports = orm;
