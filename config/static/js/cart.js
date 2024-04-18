  // Retrieve cart items from localStorage and display them in the cart-list div
	  // Retrieve cart items from local storage
     // Retrieve cart items from local storage
     document.addEventListener("DOMContentLoaded", function() {

     var cart = JSON.parse(localStorage.getItem("cart")) || [];

     // Initialize cart count from the cart array length
     var cartCount = cart.length;
     var cartCountElement = document.getElementById("cartCount");
     cartCountElement.textContent = cartCount;
     
     // Update the cart items display
     var detailCartList = document.getElementById("detail-cart-list");
     detailCartList.innerHTML = generateCartItemsHTML(cart);




      // Function to generate HTML for cart items
     function generateCartItemsHTML(cartItems) {
         return cartItems.map(function(course) {
           return `
           <tr>
           <!-- Course item -->
           <td>
               <div class="d-lg-flex align-items-center">
                   <!-- Image -->
                   <div class="w-100px w-md-80px mb-2 mb-md-0">
                       <img src="${course.courseImage}" class="rounded" alt="">
                   </div>
                   <!-- Title -->
                   <h6 class="mb-0 ms-lg-3 mt-2 mt-lg-0">
                       <a href="#">${course.courseDescription}</a>
                   </h6>
               </div>
           </td>
           <!-- Amount item -->
           <td class="text-center">
               <h5 class="text-success mb-0">${"$" + course.courseCurrentPrice}</h5>
           </td>
           <!-- Action item -->
           <td>
               
               <button class="btn btn-sm btn-danger-soft px-2 mb-0" onclick="removeFromCart(${course.id})">
                   <i class="fas fa-fw fa-times" ></i>
               </button>
           </td>
         </tr>
           `;
         }).join("");
       }
       
     
           // Get the cart list container element
           var detailCartList = document.getElementById("detail-cart-list");
           
           // Generate HTML for cart items
           var cartItemsHTML = cart.map(function(course) {
             return `
             <tr>
             <!-- Course item -->
             <td>
                 <div class="d-lg-flex align-items-center">
                     <!-- Image -->
                     <div class="w-100px w-md-80px mb-2 mb-md-0">
                         <img src="${course.courseImage}" class="rounded" alt="">
                     </div>
                     <!-- Title -->
                     <h6 class="mb-0 ms-lg-3 mt-2 mt-lg-0">
                         <a href="#">${course.courseDescription}</a>
                     </h6>
                 </div>
             </td>
             <!-- Amount item -->
             <td class="text-center">
                 <h5 class="text-success mb-0">${"$" + course.courseCurrentPrice}</h5>
             </td>
             <!-- Action item -->
             <td>
                 
                 <button class="btn btn-sm btn-danger-soft px-2 mb-0" onclick="removeFromCart(${course.id})">
                     <i class="fas fa-fw fa-times" ></i>
                 </button>
             </td>
           </tr>
             `;
           }).join("");
           
           // Display the cart items
           detailCartList.innerHTML = cartItemsHTML;
     
       
     
     
     
         //   Remove the item from the cart
    
     
     
      
     
     
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
         detailCartList.innerHTML = generateCartItemsHTML(cart);
       }
     
     
     
     
      });