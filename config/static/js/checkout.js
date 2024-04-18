var cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize cart count from the cart array length
var cartCount = cart.length;
var cartCountElement = document.getElementById("cartCount");
cartCountElement.textContent = cartCount;

// Update the cart items display
var checkoutList = document.getElementById("checkout-list");
checkoutList.innerHTML = generateCartItemsHTML(cart);

      // Get the cart list container element
      var checkoutList = document.getElementById("checkout-list");
      
      // Generate HTML for cart items
      var checkoutItemsHTML = cart.map(function(course) {
        return `
        <!-- Image -->
        <div class="col-sm-4">
            <img class="rounded" src="${course.courseImage}" alt="">
        </div>
        <!-- Info -->
        <div class="col-sm-8">
            <h6 class="mb-0">
                <a href="#">${course.courseDescription}</a>
            </h6>
            <!-- Info -->
            <div class="d-flex justify-content-between align-items-center mt-3">
                <!-- Price -->
                <span class="text-success">${"$" + course.courseCurrentPrice}</span>
                <!-- Remove and edit button -->
                <div class="text-primary-hover">
                <a  class="text-body me-2" onclick="removeFromCart(${course.id})">
                <i class="bi bi-trash me-1"></i>
                        Remove
                    </a>
                </div>
            </div>
        </div>
        `;
      }).join("");
      
      // Display the cart items
      checkoutList.innerHTML = checkoutItemsHTML;

  



    //   Remove the item from the cart
// Function to generate HTML for cart items
function generateCartItemsHTML(checkoutItems) {
    return checkoutItems.map(function(course) {
      return `
      <!-- Image -->
      <div class="col-sm-4">
          <img class="rounded" src="${course.courseImage}" alt="">
      </div>
      <!-- Info -->
      <div class="col-sm-8">
          <h6 class="mb-0">
              <a href="#">${course.courseDescription}</a>
          </h6>
          <!-- Info -->
          <div class="d-flex justify-content-between align-items-center mt-3">
              <!-- Price -->
              <span class="text-success">${"$" + course.courseCurrentPrice}</span>
              <!-- Remove and edit button -->
              <div class="text-primary-hover">
                  <a  class="text-body me-2" onclick="removeFromCart(${course.id})">
                      <i class="bi bi-trash me-1"></i>
                      Remove
                  </a>
              </div>
          </div>
      </div>
      `;
    }).join("");
  }


    // Function to remove a course from the cart
    function removeFromCart(courseId) {
        // Remove the course from the cart array
        cart = cart.filter(function(course) {
          return course.id !== courseId;
        });
      
        // Update the cart array in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
      
        // Update the cart count
        cartCount = cart.length;
        cartCountElement.textContent = cartCount;
      
        // Update the cart items display
        checkoutList.innerHTML = generateCartItemsHTML(cart);
      }
    