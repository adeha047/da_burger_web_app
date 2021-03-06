var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = {id:req.params.id}
  console.log("this is my put method")

  console.log(req.params.id);
  console.log(req.body)

  burger.updateOne(
    {
      devoured: req.body.devoured
    }, 
    condition, 
    function (result) {
      console.log(result)
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    
});

router.delete("/api/burgers/:id", (req, res) => {
  // req.params --> we have req.params.id
  // req.body --> not needed
  burger.deleteOne({ id: req.params.id }, data => {
    // errs -> no error input
    // data handle it
    console.log(data);
    res.json(data);
  });
});




// Export routes for server.js to use.
module.exports = router;