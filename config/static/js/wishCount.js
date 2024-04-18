// Function to update heart icon state based on local storage
function updateHeartIconState() {
	const heartIcons = document.getElementsByClassName('heart-icon');
  
	for (let i = 0; i < heartIcons.length; i++) {
	  const heartIcon = heartIcons[i];
	  const courseId = heartIcon.dataset.courseId;
  
	  const storedState = localStorage.getItem(`heartIconState-${courseId}`);
	  if (storedState === 'true') {
		heartIcon.classList.add('fas', 'text-danger');
	  } else {
		heartIcon.classList.remove('fas', 'text-danger');
	  }
  
	  heartIcon.addEventListener('click', function() {
		this.classList.toggle('fas');
		this.classList.toggle('text-danger');
  
		const currentState = this.classList.contains('fas');
		localStorage.setItem(`heartIconState-${courseId}`, currentState);
	  });
	}
  }
  
  // Initialize wishlist count from local storage or default to 0
var wishlistCount = parseInt(localStorage.getItem("wishlistCount")) || 0;
var wishlistCountElement = document.getElementById("wishlistCount");
wishlistCountElement.textContent = wishlistCount;

  function addToWishlist(courseId) {
	var course = courses.find(function(course) {
	  return course.id === courseId;
	});
  
	if (course) {
	  // Retrieve the wishlist from local storage
	  var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
	  // Check if the course is already in the wishlist
	  var isCourseInWishlist = wishlist.some(function(item) {
		return item.id === courseId;
	  });
  
	  if (!isCourseInWishlist) {
		// Perform the necessary actions to add the course to the wishlist
		wishlist.push(course);
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
  
		// Increment the wishlist count
		wishlistCount++;
		wishlistCountElement.textContent = wishlistCount;
		localStorage.setItem("wishlistCount", wishlistCount);
  
		// Call the displayWishlistItems function to update the wishlist items display
		displayWishlistItems();
	  }
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
  
    // Add event listener to the remove button
    const removeButton = document.getElementById('removeButton');
    removeButton.addEventListener('click', function() {
      removeAllFromWishlist();
    });
  });