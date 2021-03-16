// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("click")
  
      var newBurger= {
        burger_name: $("#newBurger").val().trim(),
      devoured: 0 
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".eatburger").on("click", function(event) {
      event.preventDefault();
        let id = $(this).data("id");
        let devouredBurger = $(this).data("devouredBurger");
        // let devouredState = {
        //     devoured: 1
        // }; 
        let devouredState = {
          devoured: devouredBurger
        };
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredState
        }).then(function() {
            console.log("Burger devoured");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

      $(".delete-button").on("click", function(event) {
        event.preventDefault();
        
        let id = $(this).data("id");
    

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
  });