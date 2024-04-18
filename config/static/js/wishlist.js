// Function to display wishlist items
function displayWishlistItems() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistContainer = document.getElementById('wishlistCourses');
  wishlistContainer.innerHTML = ''; // Clear the previous wishlist content

  for (const course of wishlist) {
    wishlistContainer.innerHTML += `
    
      <!-- Card item START -->
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="card shadow">
          <!-- Image -->
          <img src="${course.courseImage}" class="card-img-top" alt="course image">
          <div class="card-body pb-0">
            <!-- Badge and favorite -->
            <div class="d-flex justify-content-between mb-2">
              <a href="#" class="badge bg-success bg-opacity-10 text-success">${course.courseLevel}</a>
              <a href="#" class="text-danger remove-button" onclick="removeFromWishlist(${course.id})">

              
              <i class="fas fa-heart" data-course-id="${course.id}"></i>
            </a>
            
            </div>
            <!-- Title -->
            <h5 class="card-title fw-normal"><a href="#">${course.courseTitle}</a></h5>
            <p class="mb-2 text-truncate-2">${course.courseDescription}</p>
            <!-- Rating star -->
            <ul class="list-inline mb-0">
              ${generateRatingStars(course.courseRating)}
            </ul>
          </div>
          <!-- Card footer -->
          <div class="card-footer pt-0 pb-3">
            <hr>
            <div class="d-flex justify-content-between">
              <span class="h6 fw-light mb-0"><i class="far fa-clock text-danger me-2"></i>${course.courseTotalHours + "h"} ${course.courseTotalMin + "m"}</span>
              <span class="h6 fw-light mb-0"><i class="fas fa-table text-orange me-2"></i>${course.courseTotalLectures + " Lectures"}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Card item END -->
    `;
  }

  // Call the updateHeartIconState to update the heart icon states
  // Update the wishlist count directly from local storage
  const wishlistCount = wishlist.length;
  localStorage.setItem("wishlistCount", wishlistCount);
}
// Function to remove a specific course from the wishlist
function removeFromWishlist(courseId) {
  var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Find the index of the course in the wishlist array
  var index = wishlist.findIndex(function(item) {
    return item.id === courseId;
  });

  if (index !== -1) {
    // Remove the course from the wishlist array
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update the wishlist items display
    displayWishlistItems();
  }
}












function removeAllFromWishlist() {
  // Clear the local storage for the wishlist and wishlist count
  localStorage.removeItem("wishlist");
  localStorage.removeItem("wishlistCount");

  // Update the wishlist count and wishlist container on the page
  wishlistCount = 0;
  wishlistCountElement.textContent = wishlistCount;
  wishlistContainer.innerHTML = '';
}

// Call the displayWishlistItems function on the Wishlist page
document.addEventListener("DOMContentLoaded", function() {
  displayWishlistItems();

  // Add event listener to the remove buttons
  const removeButtons = document.getElementsByClassName('remove-button');
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    const courseId = removeButton.dataset.courseId;

    removeButton.addEventListener('click', function() {
      removeFromWishlist(courseId);
    });
  }

  // Add event listener to the Remove All button
  const removeAllButton = document.getElementById('removeAllButton');
  removeAllButton.addEventListener('click', function() {
    removeAllFromWishlist();
  });
});

