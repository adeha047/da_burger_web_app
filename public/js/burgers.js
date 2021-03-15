// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
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
        let id = $(this).data("id");
        let devouredBurger = {
            devoured: 1
        }; 

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredBurger
        }).then(
          function() {
            console.log("Burger devoured");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

      $(".eatenburger").on("click", function(event) {
        
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