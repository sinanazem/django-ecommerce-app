

// Dark Mode
const storedTheme = localStorage.getItem('theme')

const getPreferredTheme = () => {
    if (storedTheme) {
        return storedTheme
    };
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};

const setTheme = function(theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    };
};

setTheme(getPreferredTheme())

window.addEventListener('DOMContentLoaded', () => {
    var el = document.querySelector('.theme-icon-active');
    if (el != 'undefined' && el != null) {
        const showActiveTheme = theme => {
            const activeThemeIcon = document.querySelector('.theme-icon-active use')
            const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
            const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use').getAttribute('href')

            document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
                element.classList.remove('active')
            });

            btnToActive.classList.add('active')
            activeThemeIcon.setAttribute('href', svgOfActiveBtn)
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (storedTheme !== 'light' || storedTheme !== 'dark') {
                setTheme(getPreferredTheme())
            }
        });

        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    localStorage.setItem('theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                });
            });

    };
});

// Dark Mode end Here


// Courses Rendering on index page and filter according to category

function filterCourses(category) {
    let filteredCourses = courses.filter(function(course) {
        return course.courseCategory === category;
    });

    let courseList = "";

    filteredCourses.forEach(function(course) {
        courseList += `
	       <div class="col-sm-6 col-lg-4 col-xl-4 course " data-course-id="${course.id}">
			  <div class="card shadow h-100 ">
			  <div class="card action-trigger-hover bg-transparent">
				<a class="course-link" href="course-detail.html" >
				  <img src="${course.courseImage}" class="card-img-top" alt="${course.courseTitle}">
				</a>
				<div class="card-body pb-0">
				  <div class="d-flex justify-content-between mb-2">
					<a href="#"  class="badge bg-success bg-opacity-10 text-success">${course.courseLevel}</a>
					<i class="heart-icon far fa-heart" data-course-id="${course.id}" onclick="addToWishlist(${course.id})"></i>
			    </div>
				  <h5 class="card-title fw-normal">
				  <a class="course-link" href="course-detail.html?id=${course.id}">${course.courseTitle}</a>
				  </h5>				
				  <p class="text-truncate-2 mb-2">${course.courseDescription}</p>
				  <ul class="list-inline mb-0">
					${generateRatingStars(course.courseRating)}
				  </ul>
				</div>
				<div class="card-footer pt-0 pb-3">
				<div class="d-flex justify-content-between">
					<span class="h6 fw-light mb-0"><i class="far fa-clock text-danger me-2"></i>${course.courseTotalHours + "h"} ${course.courseTotalMin + "m"}</span>
					<span class="h6 fw-light mb-0"><i class="fas fa-table text-orange me-2"></i>${course.courseTotalLectures + " Lectures"}</span>
				  </div>
				  <hr>
				  <!-- Avatar and Price -->
				  <div class="d-flex justify-content-between align-items-center">
					  <!-- Avatar -->
					  <div class="d-flex align-items-center">
						  <div class="avatar avatar-sm">
							  <img class="avatar-img rounded-1" src="images/10.jpg" alt="avatar">
						  </div>
						  <p class="mb-0 ms-2"><a href="#" class="h6 fw-light mb-0">Larry Lawson</a></p>
					  </div>
					  <!-- Price -->
					  <div>
					  <h4 class="text-success mb-0 item-show">${"$" + course.courseCurrentPrice}</h4>
					  <button class="btn btn-sm btn-success-soft item-show-hover" data-course-id="${course.id}" onclick="addToCart(${course.id})"><i class="fas fa-shopping-cart me-2"></i>Add to cart</button>
					  </div>
				  </div
			  </div>
				</div>
				</div>
			</div>
			</div>`;

        let courseContainer = document.getElementById("courseContainer");
        courseContainer.innerHTML = courseList;
    });

	updateHeartIconState();
};






  
 
  
// Wishlist Function


//   End here

// // Initialize cart count from local storage or default to 0
var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
var cartCountElement = document.getElementById("cartCount");
cartCountElement.textContent = cartCount;

// Add the course to the cart
function addToCart(courseId) {
  var course = courses.find(function(course) {
    return course.id === courseId;
  });

  if (course) {
    // Perform the necessary actions to add the course to the cart
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(course);
    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount++;
    cartCountElement.textContent = cartCount;
    localStorage.setItem("cartCount", cartCount); 

    // Update the cart display
    var cartList = document.getElementById("cart-list");
    var cartItemHTML = `
      <div class="row p-3 g-2 cart-item" data-course-id="${course.id}">
        <div class="col-3">
          <img class="rounded-2 product-image" src="${course.courseImage}" alt="avatar">
        </div>
        <div class="col-9">
          <div class="d-flex justify-content-between">
            <h6 class="m-0">${course.courseTitle}</h6>
            <a class="remove-btn small text-primary-hover" onclick="removeFromCart(event, '${course.id}')"><i class="bi bi-x-lg"></i></a>
          </div>
          <div>
            <h4 class="text-success pt-2 fs-5 mb-0 item-show">${"$" + course.courseCurrentPrice}</h4>
          </div>
        </div>
      </div>
    `;
    cartList.insertAdjacentHTML("beforeend", cartItemHTML);
  }
}

// Retrieve cart items from localStorage and display them in the cart-list div
var cart = JSON.parse(localStorage.getItem("cart")) || [];
var cartList = document.getElementById("cart-list");

function displayCartItems() {
  // Clear the existing cart items
  cartList.innerHTML = "";

  // Iterate over the cart items and generate HTML for each item
  cart.forEach(function(course) {
    var cartItemHTML = `
      <div class="row p-3 g-2 cart-item" data-course-id="${course.id}">
        <div class="col-3">
          <img class="rounded-2 product-image" src="${course.courseImage}" alt="avatar">
        </div>
        <div class="col-9">
          <div class="d-flex justify-content-between">
            <h6 class="m-0">${course.courseTitle}</h6>
            <a class="remove-btn small text-primary-hover" onclick="removeFromCart(event, '${course.id}')"><i class="bi bi-x-lg"></i></a>
          </div>
          <div>
            <h4 class="text-success pt-2 fs-5 mb-0 item-show">${"$" + course.courseCurrentPrice}</h4>
          </div>
        </div>
      </div>
    `;
    cartList.insertAdjacentHTML("beforeend", cartItemHTML);
  });
}

// Initial display of cart items
displayCartItems();

// Remove the course from the cart
function removeFromCart(event, courseId) {
  event.preventDefault();

  // Remove the course from the cart array
  var updatedCart = cart.filter(function(course) {
    return course.id !== courseId;
  });

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Update the cart count
  cartCount = updatedCart.length;
  cartCountElement.textContent = cartCount;

  // Remove the cart item from the display
  var cartItem = event.target.closest(".cart-item");
  cartItem.remove();

  // Update the cart variable with the updated cart
  cart = updatedCart;
};

//   Add to cart function end here

  

// this event listner activeate the selected category and 
// if it's your first time on the webiste then i'll redirect to the web design category

document.addEventListener("DOMContentLoaded", function() {
	// Retrieve the selected category from local storage
	const selectedCategory = localStorage.getItem("selectedCategory");
  
	// Get the category buttons
	const categoryButtons = document.getElementsByClassName("category-btn");
  
	// Function to handle category button click
	function handleCategoryClick(category) {
	  // Remove the "active" class from all category buttons
	  Array.from(categoryButtons).forEach((btn) => {
		btn.classList.remove("active");
	  });
  
	  // Add the "active" class to the clicked button
	  this.classList.add("active");
  
	  // Call the filterCourses function with the selected category
	  filterCourses(category);
  
	  // Store the selected category in local storage
	  localStorage.setItem("selectedCategory", category);
	}
  
	// Add click event listeners to category buttons
	Array.from(categoryButtons).forEach((btn) => {
	  const category = btn.dataset.category;
	  btn.addEventListener("click", handleCategoryClick.bind(btn, category));
	});
  
	// Check if a category is stored
	if (selectedCategory) {
	  // Find the button corresponding to the stored category
	  const button = Array.from(categoryButtons).find(
		(btn) => btn.dataset.category === selectedCategory
	  );
  
	  // If found, trigger a click event on the button
	  if (button) {
		button.click();
	  }
	} else {
	  // If no category is stored, default to "Web Design" and trigger a click event
	  const defaultCategory = "Web Design";
	  const defaultButton = Array.from(categoryButtons).find(
		(btn) => btn.dataset.category === defaultCategory
	  );
  
	  if (defaultButton) {
		defaultButton.click();
	  }
	}
  });
  
// end here
//    Course list end here
//   Heart function end here
//   Course detail function start here
// Function to generate video thumbnail

  
// Course Detail fetching start here

function fetchCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const course = courses.find((course) => course.id === parseInt(courseId));
    const courseDetailContainer = document.getElementById("courseDetailContainer");

    if (course) {
        const courseDetailHTML = `
	  <div class="row py-5" data-course-id="${course.id}">
	  <div class="col-lg-8">
		<!-- Badge -->
		<h6 class="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">${course.courseCategory}</h6>
		<!-- Title -->
		<h1>${course.courseTitle}</h1>
		<p>${course.courseDescription}</p>
		<!-- Content -->
		<ul class="list-inline mb-0">
		  <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
			${generateRatingStars(course.courseRating)}
		  </li>
		  <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
			<i class="fas fa-user-graduate text-orange me-2"></i>
			12k Enrolled
		  </li>
		  <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
			${course.courseLevel}
		  </li>
		  <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
			<i class="bi bi-patch-exclamation-fill text-danger me-2"></i>
			Last updated 09/2021
		  </li>
		  <li class="list-inline-item h6 mb-0">
			<i class="fas fa-globe text-info me-2"></i>
			English
		  </li>
		</ul>
	  </div>
	</div>
  </div>
</section>
	  <!-- =======================
	  Page intro END -->
				  <!-- =======================
	  Page content START -->
				  <section class="pb-0 py-lg-5">
					  <div class="container">
						  <div class="row">
							  <!-- Main content START -->
							  <div class="col-lg-8">
								  <div class="card shadow rounded-2 p-0">
									  <!-- Tabs START -->
									  <div class="card-header border-bottom px-4 py-3">
										  <ul class="nav nav-pills nav-tabs-line py-0" id="course-pills-tab" role="tablist">
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">Overview</button>
											  </li>
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">Curriculum</button>
											  </li>
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">Instructor</button>
											  </li>
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-4" type="button" role="tab" aria-controls="course-pills-4" aria-selected="false">Reviews</button>
											  </li>
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0" id="course-pills-tab-5" data-bs-toggle="pill" data-bs-target="#course-pills-5" type="button" role="tab" aria-controls="course-pills-5" aria-selected="false">FAQs </button>
											  </li>
											  <!-- Tab item -->
											  <li class="nav-item me-2 me-sm-4" role="presentation">
												  <button class="nav-link mb-2 mb-md-0" id="course-pills-tab-6" data-bs-toggle="pill" data-bs-target="#course-pills-6" type="button" role="tab" aria-controls="course-pills-6" aria-selected="false">Comment</button>
											  </li>
										  </ul>
									  </div>
									  <!-- Tabs END -->
									  <!-- Tab contents START -->
									  <div class="card-body p-4">
										  <div class="tab-content pt-2" id="course-pills-tabContent">
											  <!-- Content START -->
											  <div class="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
												  <!-- Course detail START -->
												  <h5 class="mb-3">Course Description</h5>
												  <p class="mb-3"> ${course.courseHeading}												  </p>
												  <p class="mb-3"> ${course.courseDetail}
												  </p>
												  <p class="mb-3">
												  </p>
												  <p class="mb-0"></p>
												  <!-- List content -->
												  <h5 class="mt-4">What you’ll learn</h5>
												  <ul class="list-group list-group-borderless mb-3" id="courseBenefits">
												  </ul>
												  <p class="mb-0">${course.courseHighlights}</p>
												  <!-- Course detail END -->
											  </div>
											  <!-- Content END -->
											  <!-- Content START -->
											  <div class="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
												  <!-- Course accordion START -->
												  <div class="accordion accordion-icon accordion-bg-light" id="accordionExample2">
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-1">
															  <button class="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
																  Introduction of Digital Marketing 
													  <span class="small ms-0 ms-sm-2">(3 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-1" class="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Introduction</span>
																	  </div>
																	  <p class="mb-0">2m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">What is Digital Marketing What is Digital Marketing</span>
																	  </div>
																	  <p class="mb-0 text-truncate">15m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Type of Digital Marketing</span>
																	  </div>
																	  <p class="mb-0">18m 10s</p>
																  </div>
															  </div>
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-2">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
																  Customer Life cycle
													  <span class="small ms-0 ms-sm-2">(4 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-2" class="accordion-collapse collapse" aria-labelledby="heading-2" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">What is Digital Marketing</span>
																	  </div>
																	  <p class="mb-0">11m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">15 Tips for Writing Magnetic Headlines</span>
																	  </div>
																	  <p class="mb-0 text-truncate">25m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">How to Write Like Your Customers Talk</span>
																	  </div>
																	  <p class="mb-0">11m 30s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <div>
																			  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#exampleModal">
																				  <i class="fas fa-play me-0"></i>
																			  </a>
																		  </div>
																		  <div class="row g-sm-0 align-items-center">
																			  <div class="col-sm-6">
																				  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">How to Flip Features Into Benefits</span>
																			  </div>
																			  <div class="col-sm-6">
																				  <span class="badge text-bg-orange ms-2 ms-md-0">
																					  <i class="fas fa-lock fa-fw me-1"></i>
																					  Premium
																				  </span>
																			  </div>
																		  </div>
																	  </div>
																	  <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">35m 30s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-5">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
																  What is Search Engine Optimization(SEO) 
													  <span class="small ms-0 ms-sm-2">(10 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-5" class="accordion-collapse collapse" aria-labelledby="heading-5" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Introduction</span>
																	  </div>
																	  <p class="mb-0">1m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Overview of SEO</span>
																	  </div>
																	  <p class="mb-0 text-truncate">11m 03s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">How to SEO Optimise Your Homepage</span>
																	  </div>
																	  <p class="mb-0">15m 00s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">How to SEO Optimise Your Homepage</span>
																	  </div>
																	  <p class="mb-0">15m 00s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">How to Write Title Tags Search Engines Love</span>
																	  </div>
																	  <p class="mb-0">25m 30s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">SEO Keyword Planning</span>
																	  </div>
																	  <p class="mb-0">18m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">eCommerce SEO</span>
																	  </div>
																	  <p class="mb-0">28m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Internal and External Links</span>
																	  </div>
																	  <p class="mb-0">45m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Mobile SEO</span>
																	  </div>
																	  <p class="mb-0">8m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Off-page SEO</span>
																	  </div>
																	  <p class="mb-0">18m 10s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Measuring SEO Effectiveness</span>
																	  </div>
																	  <p class="mb-0">35m 10s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-6">
															  <button class="accordion-button fw-bold collapsed rounded d-block d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-6" aria-expanded="false" aria-controls="collapse-6">
																  Facebook ADS 
													  <span class="small ms-0 ms-sm-2">(3 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-6" class="accordion-collapse collapse" aria-labelledby="heading-6" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Introduction</span>
																	  </div>
																	  <p class="mb-0">1m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Creating Facebook Pages</span>
																	  </div>
																	  <p class="mb-0 text-truncate">25m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Facebook Page Custom URL</span>
																	  </div>
																	  <p class="mb-0">11m 30s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-7">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-7" aria-expanded="false" aria-controls="collapse-7">
																  YouTube Marketing 
													  <span class="small ms-0 ms-sm-2">(5 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-7" class="accordion-collapse collapse" aria-labelledby="heading-7" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Video Flow</span>
																	  </div>
																	  <p class="mb-0">25m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Webmaster Tool</span>
																	  </div>
																	  <p class="mb-0 text-truncate">15m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Featured Contents on Channel</span>
																	  </div>
																	  <p class="mb-0">32m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <div>
																			  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#exampleModal">
																				  <i class="fas fa-play me-0"></i>
																			  </a>
																		  </div>
																		  <div class="row g-sm-0 align-items-center">
																			  <div class="col-sm-6">
																				  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">Managing Comments</span>
																			  </div>
																			  <div class="col-sm-6">
																				  <span class="badge text-bg-orange ms-2 ms-md-0">
																					  <i class="fas fa-lock fa-fw me-1"></i>
																					  Premium
																				  </span>
																			  </div>
																		  </div>
																	  </div>
																	  <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">20m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <div>
																			  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#exampleModal">
																				  <i class="fas fa-play me-0"></i>
																			  </a>
																		  </div>
																		  <div class="row g-sm-0 align-items-center">
																			  <div class="col-sm-6">
																				  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">Channel Analytics</span>
																			  </div>
																			  <div class="col-sm-6">
																				  <span class="badge text-bg-orange ms-2 ms-md-0">
																					  <i class="fas fa-lock fa-fw me-1"></i>
																					  Premium
																				  </span>
																			  </div>
																		  </div>
																	  </div>
																	  <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">18m 20s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-8">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-8" aria-expanded="false" aria-controls="collapse-8">
																  Why SEO 
													  <span class="small ms-0 ms-sm-2">(8 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-8" class="accordion-collapse collapse" aria-labelledby="heading-8" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Understanding SEO</span>
																	  </div>
																	  <p class="mb-0">20m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">On-Page SEO</span>
																	  </div>
																	  <p class="mb-0 text-truncate">15m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Local SEO</span>
																	  </div>
																	  <p class="mb-0">16m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Measuring SEO Effectiveness</span>
																	  </div>
																	  <p class="mb-0">12m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <div>
																			  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#exampleModal">
																				  <i class="fas fa-play me-0"></i>
																			  </a>
																		  </div>
																		  <div class="row g-sm-0 align-items-center">
																			  <div class="col-sm-6">
																				  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">Keywords in Blog and Articles</span>
																			  </div>
																			  <div class="col-sm-6">
																				  <span class="badge text-bg-orange ms-2 ms-md-0">
																					  <i class="fas fa-lock fa-fw me-1"></i>
																					  Premium
																				  </span>
																			  </div>
																		  </div>
																	  </div>
																	  <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">15m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <div>
																			  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#exampleModal">
																				  <i class="fas fa-play me-0"></i>
																			  </a>
																		  </div>
																		  <div class="row g-sm-0 align-items-center">
																			  <div class="col-sm-6">
																				  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">SEO Keyword Planning</span>
																			  </div>
																			  <div class="col-sm-6">
																				  <span class="badge text-bg-orange ms-2 ms-md-0">
																					  <i class="fas fa-lock fa-fw me-1"></i>
																					  Premium
																				  </span>
																			  </div>
																		  </div>
																	  </div>
																	  <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">36m 12s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-3">
														  <h6 class="accordion-header font-base" id="heading-9">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-9" aria-expanded="false" aria-controls="collapse-9">
																  Google tag manager  
													  <span class="small ms-0 ms-sm-2">(4 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-9" class="accordion-collapse collapse" aria-labelledby="heading-9" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">G+ Pages Ranks Higher</span>
																	  </div>
																	  <p class="mb-0">13m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Adding Contact Links</span>
																	  </div>
																	  <p class="mb-0 text-truncate">7m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Google Hangouts</span>
																	  </div>
																	  <p class="mb-0">12m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Google Local Business</span>
																	  </div>
																	  <p class="mb-0 text-truncate">7m 20s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item mb-0">
														  <h6 class="accordion-header font-base" id="heading-10">
															  <button class="accordion-button fw-bold collapsed rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-10" aria-expanded="false" aria-controls="collapse-10">
																  Integration with Website 
													  <span class="small ms-0 ms-sm-2">(3 Lectures)</span>
															  </button>
														  </h6>
														  <div id="collapse-10" class="accordion-collapse collapse" aria-labelledby="heading-10" data-bs-parent="#accordionExample2">
															  <!-- Accordion body START -->
															  <div class="accordion-body mt-3">
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Creating LinkedIn Account</span>
																	  </div>
																	  <p class="mb-0 text-truncate">13m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">Advance Searching</span>
																	  </div>
																	  <p class="mb-0">31m 20s</p>
																  </div>
																  <hr>
																  <!-- Divider -->
																  <!-- Course lecture -->
																  <div class="d-flex justify-content-between align-items-center">
																	  <div class="position-relative d-flex align-items-center">
																		  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
																			  <i class="fas fa-play me-0"></i>
																		  </a>
																		  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">LinkedIn Mobile App</span>
																	  </div>
																	  <p class="mb-0 text-truncate">25m 20s</p>
																  </div>
															  </div>
															  <!-- Accordion body END -->
														  </div>
													  </div>
												  </div>
												  <!-- Course accordion END -->
											  </div>
											  <!-- Content END -->
											  <!-- Content START -->
											  <div class="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
												  <!-- Card START -->
												  <div class="card mb-0 mb-md-4">
													  <div class="row g-0 align-items-center">
														  <div class="col-md-5">
															  <!-- Image -->
															  <img src="../images/01.jpg" class="img-fluid rounded-3" alt="instructor-image">
														  </div>
														  <div class="col-md-7">
															  <!-- Card body -->
															  <div class="card-body">
																  <!-- Title -->
																  <h3 class="card-title mb-0">Louis Ferguson</h3>
																  <p class="mb-2">Instructor of Marketing</p>
																  <!-- Social button -->
																  <ul class="list-inline mb-3">
																	  <li class="list-inline-item me-3">
																		  <a href="#" class="fs-5 text-twitter">
																			  <i class="fab fa-twitter-square"></i>
																		  </a>
																	  </li>
																	  <li class="list-inline-item me-3">
																		  <a href="#" class="fs-5 text-instagram">
																			  <i class="fab fa-instagram-square"></i>
																		  </a>
																	  </li>
																	  <li class="list-inline-item me-3">
																		  <a href="#" class="fs-5 text-facebook">
																			  <i class="fab fa-facebook-square"></i>
																		  </a>
																	  </li>
																	  <li class="list-inline-item me-3">
																		  <a href="#" class="fs-5 text-linkedin">
																			  <i class="fab fa-linkedin"></i>
																		  </a>
																	  </li>
																	  <li class="list-inline-item">
																		  <a href="#" class="fs-5 text-youtube">
																			  <i class="fab fa-youtube-square"></i>
																		  </a>
																	  </li>
																  </ul>
																  <!-- Info -->
																  <ul class="list-inline">
																	  <li class="list-inline-item">
																		  <div class="d-flex align-items-center me-3 mb-2">
																			  <span class="icon-md bg-orange bg-opacity-10 text-orange rounded-circle">
																				  <i class="fas fa-user-graduate"></i>
																			  </span>
																			  <span class="h6 fw-light mb-0 ms-2">9.1k</span>
																		  </div>
																	  </li>
																	  <li class="list-inline-item">
																		  <div class="d-flex align-items-center me-3 mb-2">
																			  <span class="icon-md bg-warning bg-opacity-15 text-warning rounded-circle">
																				  <i class="fas fa-star"></i>
																			  </span>
																			  <span class="h6 fw-light mb-0 ms-2">4.5</span>
																		  </div>
																	  </li>
																	  <li class="list-inline-item">
																		  <div class="d-flex align-items-center me-3 mb-2">
																			  <span class="icon-md bg-danger bg-opacity-10 text-danger rounded-circle">
																				  <i class="fas fa-play"></i>
																			  </span>
																			  <span class="h6 fw-light mb-0 ms-2">29 Courses</span>
																		  </div>
																	  </li>
																	  <li class="list-inline-item">
																		  <div class="d-flex align-items-center me-3 mb-2">
																			  <span class="icon-md bg-info bg-opacity-10 text-info rounded-circle">
																				  <i class="fas fa-comment-dots"></i>
																			  </span>
																			  <span class="h6 fw-light mb-0 ms-2">205</span>
																		  </div>
																	  </li>
																  </ul>
															  </div>
														  </div>
													  </div>
												  </div>
												  <!-- Card END -->
												  <!-- Instructor info -->
												  <h5 class="mb-3">About Instructor</h5>
												  <p class="mb-3">Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashboard see frankness objection abilities. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed of add screened rendered six say his striking confined. </p>
												  <p class="mb-3">As it so contrasted oh estimating instrument. Size like body someone had. Are conduct viewing boy minutes warrant the expense? Tolerably behavior may admit daughters offending her ask own. Praise effect wishes change way and any wanted.</p>
												  <!-- Email address -->
												  <div class="col-12">
													  <ul class="list-group list-group-borderless mb-0">
														  <li class="list-group-item pb-0">
															  Mail ID:<a href="#" class="ms-2">hello@email.com</a>
														  </li>
														  <li class="list-group-item pb-0">
															  Web:<a href="#" class="ms-2">https://eduport.com</a>
														  </li>
													  </ul>
												  </div>
											  </div>
											  <!-- Content END -->
											  <!-- Content START -->
											  <div class="tab-pane fade" id="course-pills-4" role="tabpanel" aria-labelledby="course-pills-tab-4">
												  <!-- Review START -->
												  <div class="row mb-4">
													  <h5 class="mb-4">Our Student Reviews</h5>
													  <!-- Rating info -->
													  <div class="col-md-4 mb-3 mb-md-0">
														  <div class="text-center">
															  <!-- Info -->
															  <h2 class="mb-0">${course.courseRating}</h2>
															  <!-- Star -->
															  <ul class="list-inline mb-0">
															  ${generateRatingStars(course.courseRating)} 
															  </ul>
														  </div>
													  </div>
													  <!-- Progress-bar and star -->
													  <div class="col-md-8">
														  <div class="row align-items-center">
															  <!-- Progress bar and Rating -->
															  <div class="col-6 col-sm-8">
																  <!-- Progress item -->
																  <div class="progress progress-sm bg-warning bg-opacity-15">
																	  <div class="progress-bar bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
																  </div>
															  </div>
															  <div class="col-6 col-sm-4">
																  <!-- Star item -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Progress bar and Rating -->
															  <div class="col-6 col-sm-8">
																  <!-- Progress item -->
																  <div class="progress progress-sm bg-warning bg-opacity-15">
																	  <div class="progress-bar bg-warning" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
																  </div>
															  </div>
															  <div class="col-6 col-sm-4">
																  <!-- Star item -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Progress bar and Rating -->
															  <div class="col-6 col-sm-8">
																  <!-- Progress item -->
																  <div class="progress progress-sm bg-warning bg-opacity-15">
																	  <div class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
																  </div>
															  </div>
															  <div class="col-6 col-sm-4">
																  <!-- Star item -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Progress bar and Rating -->
															  <div class="col-6 col-sm-8">
																  <!-- Progress item -->
																  <div class="progress progress-sm bg-warning bg-opacity-15">
																	  <div class="progress-bar bg-warning" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
																  </div>
															  </div>
															  <div class="col-6 col-sm-4">
																  <!-- Star item -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Progress bar and Rating -->
															  <div class="col-6 col-sm-8">
																  <!-- Progress item -->
																  <div class="progress progress-sm bg-warning bg-opacity-15">
																	  <div class="progress-bar bg-warning" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
																  </div>
															  </div>
															  <div class="col-6 col-sm-4">
																  <!-- Star item -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0 small">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0 small">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
														  </div>
													  </div>
												  </div>
												  <!-- Review END -->
												  <!-- Student review START -->
												  <div class="row">
													  <!-- Review item START -->
													  <div class="d-md-flex my-4">
														  <!-- Avatar -->
														  <div class="avatar avatar-xl me-4 flex-shrink-0">
															  <img class="avatar-img rounded-circle" src="images/09.jpg" alt="avatar">
														  </div>
														  <!-- Text -->
														  <div>
															  <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
																  <h5 class="me-3 mb-0">Jacqueline Miller</h5>
																  <!-- Review star -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Info -->
															  <p class="small mb-2">2 days ago</p>
															  <p class="mb-2">Perceived end knowledge certainly day sweetness why cordially. Ask a quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance. </p>
															  <!-- Like and dislike button -->
															  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
																  <!-- Like button -->
																  <input type="radio" class="btn-check" name="btnradio" id="btnradio1">
																  <label class="btn btn-outline-light btn-sm mb-0" for="btnradio1">
																	  <i class="far fa-thumbs-up me-1"></i>
																	  25
																  </label>
																  <!-- Dislike button -->
																  <input type="radio" class="btn-check" name="btnradio" id="btnradio2">
																  <label class="btn btn-outline-light btn-sm mb-0" for="btnradio2">
																	  <i class="far fa-thumbs-down me-1"></i>
																	  2
																  </label>
															  </div>
														  </div>
													  </div>
													  <!-- Comment children level 1 -->
													  <div class="d-md-flex mb-4 ps-4 ps-md-5">
														  <!-- Avatar -->
														  <div class="avatar avatar-lg me-4 flex-shrink-0">
															  <img class="avatar-img rounded-circle" src="images/02.jpg" alt="avatar">
														  </div>
														  <!-- Text -->
														  <div>
															  <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
																  <h5 class="me-3 mb-0">Louis Ferguson</h5>
															  </div>
															  <!-- Info -->
															  <p class="small mb-2">1 days ago</p>
															  <p class="mb-2">Water timed folly right aware if oh truth. Imprudence attachment him for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything.</p>
														  </div>
													  </div>
													  <!-- Divider -->
													  <hr>
													  <!-- Review item END -->
													  <!-- Review item START -->
													  <div class="d-md-flex my-4">
														  <!-- Avatar -->
														  <div class="avatar avatar-xl me-4 flex-shrink-0">
															  <img class="avatar-img rounded-circle" src="images/07.jpg" alt="avatar">
														  </div>
														  <!-- Text -->
														  <div>
															  <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
																  <h5 class="me-3 mb-0">Dennis Barrett</h5>
																  <!-- Review star -->
																  <ul class="list-inline mb-0">
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="fas fa-star text-warning"></i>
																	  </li>
																	  <li class="list-inline-item me-0">
																		  <i class="far fa-star text-warning"></i>
																	  </li>
																  </ul>
															  </div>
															  <!-- Info -->
															  <p class="small mb-2">2 days ago</p>
															  <p class="mb-2">Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance. </p>
															  <!-- Like and dislike button -->
															  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
																  <!-- Like button -->
																  <input type="radio" class="btn-check" name="btnradio" id="btnradio3">
																  <label class="btn btn-outline-light btn-sm mb-0" for="btnradio3">
																	  <i class="far fa-thumbs-up me-1"></i>
																	  25
																  </label>
																  <!-- Dislike button -->
																  <input type="radio" class="btn-check" name="btnradio" id="btnradio4">
																  <label class="btn btn-outline-light btn-sm mb-0" for="btnradio4">
																	  <i class="far fa-thumbs-down me-1"></i>
																	  2
																  </label>
															  </div>
														  </div>
													  </div>
													  <!-- Review item END -->
													  <!-- Divider -->
													  <hr>
												  </div>
												  <!-- Student review END -->
												  <!-- Leave Review START -->
												  <div class="mt-2">
													  <h5 class="mb-4">Leave a Review</h5>
													  <form class="row g-3">
														  <!-- Name -->
														  <div class="col-md-6 bg-light-input">
															  <input type="text" class="form-control" id="inputtext" placeholder="Name" aria-label="First name">
														  </div>
														  <!-- Email -->
														  <div class="col-md-6 bg-light-input">
															  <input type="email" class="form-control" placeholder="Email" id="inputEmail4">
														  </div>
														  <!-- Rating -->
														  <div class="col-12 bg-light-input">
															  <select id="inputState2" class="form-select js-choice">
																  <option selected="">★★★★★ (5/5)</option>
																  <option>★★★★☆ (4/5)</option>
																  <option>★★★☆☆ (3/5)</option>
																  <option>★★☆☆☆ (2/5)</option>
																  <option>★☆☆☆☆ (1/5)</option>
															  </select>
														  </div>
														  <!-- Message -->
														  <div class="col-12 bg-light-input">
															  <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Your review" rows="3"></textarea>
														  </div>
														  <!-- Button -->
														  <div class="col-12">
															  <button type="submit" class="btn btn-primary mb-0">Post Review</button>
														  </div>
													  </form>
												  </div>
												  <!-- Leave Review END -->
											  </div>
											  <!-- Content END -->
											  <!-- Content START -->
											  <div class="tab-pane fade" id="course-pills-5" role="tabpanel" aria-labelledby="course-pills-tab-5">
												  <!-- Title -->
												  <h5 class="mb-3">Frequently Asked Questions</h5>
												  <!-- Accordion START -->
												  <div class="accordion accordion-flush" id="accordionExample">
													  <!-- Item -->
													  <div class="accordion-item">
														  <h2 class="accordion-header" id="headingOne">
															  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
																  <span class="text-secondary fw-bold me-3">01</span>
																  <span class="h6 mb-0">How Digital Marketing Work?</span>
															  </button>
														  </h2>
														  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
															  <div class="accordion-body pt-0">Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed. 
												  </div>
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item">
														  <h2 class="accordion-header" id="headingTwo">
															  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
																  <span class="text-secondary fw-bold me-3">02</span>
																  <span class="h6 mb-0">What is SEO?</span>
															  </button>
														  </h2>
														  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
															  <div class="accordion-body pt-0">
																  Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer.
													  <p class="mt-2">Person she control of to beginnings view looked eyes Than continues its and because and given and shown creating curiously to more in are man were smaller by we instead the these sighed Avoid in the sufficient me real man longer of his how her for countries to brains warned notch important Finds be to the of on the increased explain noise of power deep asking contribution this live of suppliers goals bit separated poured sort several the was organization the if relations go work after mechanic But we've area wasn't everything needs of and doctor where would.</p>
																  Go he prisoners And mountains in just switching city steps Might rung line what Mr Bulk; Was or between towards the have phase were its world my samples are the was royal he luxury the about trying And on he to my enough is was the remember a although lead in were through serving their assistant fame day have for its after would cheek dull have what in go feedback assignment Her of a any help if the a of semantics is rational overhauls following in from our hazardous and used more he themselves the parents up just regulatory.
												  
															  </div>
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item">
														  <h2 class="accordion-header" id="headingThree">
															  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
																  <span class="text-secondary fw-bold me-3">03</span>
																  <span class="h6 mb-0">Who should join this course?</span>
															  </button>
														  </h2>
														  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
															  <div class="accordion-body pt-0">
																  Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. <strong>Subjects he prospect elegance followed no overcame</strong>
																  possible it on. 
												  
															  </div>
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item">
														  <h2 class="accordion-header" id="headingFour">
															  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																  <span class="text-secondary fw-bold me-3">04</span>
																  <span class="h6 mb-0">What are the T &C for this program?</span>
															  </button>
														  </h2>
														  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
															  <div class="accordion-body pt-0">Night signs creeping yielding green Seasons together man green fruitful make fish behold earth unto you'll lights living moving sea open for fish day multiply tree good female god had fruitful of creature fill shall don't day fourth lesser he the isn't let multiply may Creeping earth under was You're without which image stars in Own creeping night of wherein Heaven years their he over doesn't whose won't kind seasons light Won't that fish him whose won't also it dominion heaven fruitful Whales created And likeness doesn't that Years without divided saying morning creeping hath you'll seas cattle in multiply under together in us said above dry tree herb saw living darkness without have won't for i behold meat brought winged Moving living second beast Over fish place beast image very him evening Thing they're fruit together forth day Seed lights Land creature together Multiply waters form brought.
												  </div>
														  </div>
													  </div>
													  <!-- Item -->
													  <div class="accordion-item">
														  <h2 class="accordion-header" id="headingFive">
															  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
																  <span class="text-secondary fw-bold me-3">05</span>
																  <span class="h6 mb-0">What certificates will I be received for this program?</span>
															  </button>
														  </h2>
														  <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
															  <div class="accordion-body pt-0">Smile spoke total few great had never their too Amongst moments do in arrived at my replied Fat weddings servants but man believed prospect Companions understood is as especially pianoforte connection introduced Nay newspaper can sportsman are admitting gentleman belonging his Is oppose no he summer lovers twenty in Not his difficulty boisterous surrounded bed Seems folly if in given scale Sex contented dependent conveying advantage. 
												  </div>
														  </div>
													  </div>
												  </div>
												  <!-- Accordion END -->
											  </div>
											  <!-- Content END -->
											  <!-- Content START -->
											  <div class="tab-pane fade" id="course-pills-6" role="tabpanel" aria-labelledby="course-pills-tab-6">
												  <!-- Review START -->
												  <div class="row">
													  <div class="col-12">
														  <h5 class="mb-4">Ask Your Question</h5>
														  <!-- Comment box -->
														  <div class="d-flex mb-4">
															  <!-- Avatar -->
															  <div class="avatar avatar-sm flex-shrink-0 me-2">
																  <a href="#">
																	  <img class="avatar-img rounded-circle" src="images/09.jpg" alt="">
																  </a>
															  </div>
															  <form class="w-100 d-flex">
																  <textarea class="one form-control pe-4 bg-light" id="autoheighttextarea" rows="1" placeholder="Add a comment..."></textarea>
																  <button class="btn btn-primary ms-2 mb-0" type="button">Post</button>
															  </form>
														  </div>
														  <!-- Comment item START -->
														  <div class="border p-2 p-sm-4 rounded-3 mb-4">
															  <ul class="list-unstyled mb-0">
																  <li class="comment-item">
																	  <div class="d-flex mb-3">
																		  <!-- Avatar -->
																		  <div class="avatar avatar-sm flex-shrink-0">
																			  <a href="#">
																				  <img class="avatar-img rounded-circle" src="images/05.jpg" alt="">
																			  </a>
																		  </div>
																		  <div class="ms-2">
																			  <!-- Comment by -->
																			  <div class="bg-light p-3 rounded">
																				  <div class="d-flex justify-content-center">
																					  <div class="me-2">
																						  <h6 class="mb-1 lead fw-bold">
																							  <a href="#!">Frances Guerrero </a>
																						  </h6>
																						  <p class="h6 mb-0">Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection?</p>
																					  </div>
																					  <small>5hr</small>
																				  </div>
																			  </div>
																			  <!-- Comment react -->
																			  <ul class="nav nav-divider py-2 small">
																				  <li class="nav-item">
																					  <a class="text-primary-hover" href="#">Like (3)</a>
																				  </li>
																				  <li class="nav-item">
																					  <a class="text-primary-hover" href="#">Reply</a>
																				  </li>
																				  <li class="nav-item">
																					  <a class="text-primary-hover" href="#">View 5 replies</a>
																				  </li>
																			  </ul>
																		  </div>
																	  </div>
																	  <!-- Comment item nested START -->
																	  <ul class="list-unstyled ms-4">
																		  <!-- Comment item START -->
																		  <li class="comment-item">
																			  <div class="d-flex">
																				  <!-- Avatar -->
																				  <div class="avatar avatar-xs flex-shrink-0">
																					  <a href="#">
																						  <img class="avatar-img rounded-circle" src="images/06.jpg" alt="">
																					  </a>
																				  </div>
																				  <!-- Comment by -->
																				  <div class="ms-2">
																					  <div class="bg-light p-3 rounded">
																						  <div class="d-flex justify-content-center">
																							  <div class="me-2">
																								  <h6 class="mb-1  lead fw-bold">
																									  <a href="#">Lori Stevens </a>
																								  </h6>
																								  <p class=" mb-0">See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive. Domestic had but Drawings offended yet answered Jennings perceive.</p>
																							  </div>
																							  <small>2hr</small>
																						  </div>
																					  </div>
																					  <!-- Comment react -->
																					  <ul class="nav nav-divider py-2 small">
																						  <li class="nav-item">
																							  <a class="text-primary-hover" href="#!">Like (5)</a>
																						  </li>
																						  <li class="nav-item">
																							  <a class="text-primary-hover" href="#!">Reply</a>
																						  </li>
																					  </ul>
																				  </div>
																			  </div>
																		  </li>
																		  <!-- Comment item END -->
																	  </ul>
																	  <!-- Comment item nested END -->
																  </li>
															  </ul>
														  </div>
														  <!-- Comment item END -->
														  <!-- Comment item START -->
														  <div class="border p-2 p-sm-4 rounded-3">
															  <ul class="list-unstyled mb-0">
																  <li class="comment-item">
																	  <div class="d-flex">
																		  <!-- Avatar -->
																		  <div class="avatar avatar-sm flex-shrink-0">
																			  <a href="#">
																				  <img class="avatar-img rounded-circle" src="images/02.jpg" alt="">
																			  </a>
																		  </div>
																		  <div class="ms-2">
																			  <!-- Comment by -->
																			  <div class="bg-light p-3 rounded">
																				  <div class="d-flex justify-content-center">
																					  <div class="me-2">
																						  <h6 class="mb-1 lead fw-bold">
																							  <a href="#!">Louis Ferguson </a>
																						  </h6>
																						  <p class="h6 mb-0">Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection?</p>
																					  </div>
																					  <small>5hr</small>
																				  </div>
																			  </div>
																			  <!-- Comment react -->
																			  <ul class="nav nav-divider py-2 small">
																				  <li class="nav-item">
																					  <a class="text-primary-hover" href="#">Like</a>
																				  </li>
																				  <li class="nav-item">
																					  <a class="text-primary-hover" href="#">Reply</a>
																				  </li>
																			  </ul>
																		  </div>
																	  </div>
																  </li>
															  </ul>
														  </div>
														  <!-- Comment item END -->
													  </div>
												  </div>
											  </div>
											  <!-- Content END -->
										  </div>
									  </div>
									  <!-- Tab contents END -->
								  </div>
							  </div>
							  <!-- Main content END -->
							  <!-- Right sidebar START -->
							  <div class="col-lg-4 pt-5 pt-lg-0">
								  <div class="row mb-5 mb-lg-0">
									  <div class="col-md-6 col-lg-12">
										  <!-- Video START -->
										  <div class="card shadow p-2 mb-4 z-index-9">
										  <div class="overflow-hidden rounded-3">
											<img src="${course.courseImagesVideos[0].courseImages}" id="courseImage" class="card-img" alt="course image">
											<!-- Overlay -->
											<div class="bg-overlay bg-dark opacity-6"></div>
											<div class="card-img-overlay d-flex align-items-start flex-column p-3">
											  <!-- Video button and link -->
											  <div class="m-auto" id="video">
												<a href="course-video-player.html?id=${course.id}" class="btn btn-lg text-danger btn-round btn-white-shadow mb-0" data-glightbox="" data-gallery="course-video">
												  <i class="fas fa-play"></i>
												</a>
											  </div>
											</div>
										  </div>
										</div>
											  <!-- Card body -->
											  <div class="card-body px-3">
												  <!-- Info -->
												  <div class="d-flex justify-content-between align-items-center">
													  <!-- Price and time -->
													  <div>
														  <div class="d-flex align-items-center">
															  <h3 class="fw-bold mb-0 me-2">${"$" + course.courseCurrentPrice}</h3>
															  <span class="text-decoration-line-through mb-0 me-2">${"$" + course.courseOldPrice}</span>
															  <span class="badge text-bg-orange mb-0">60% off</span>
														  </div>
														  <p class="mb-0 text-danger">
															  <i class="fas fa-stopwatch me-2"></i>
															  5 days left at this price
														  </p>
													  </div>
													  <!-- Share button with dropdown -->
													  <div class="dropdown">
														  <!-- Share button -->
														  <a href="#" class="btn btn-sm btn-light rounded small" role="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
															  <i class="fas fa-fw fa-share-alt"></i>
														  </a>
														  <!-- dropdown button -->
														  <ul class="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
															  <li>
																  <a class="dropdown-item" href="#">
																	  <i class="fab fa-twitter-square me-2"></i>
																	  Twitter
																  </a>
															  </li>
															  <li>
																  <a class="dropdown-item" href="#">
																	  <i class="fab fa-facebook-square me-2"></i>
																	  Facebook
																  </a>
															  </li>
															  <li>
																  <a class="dropdown-item" href="#">
																	  <i class="fab fa-linkedin me-2"></i>
																	  LinkedIn
																  </a>
															  </li>
															  <li>
																  <a class="dropdown-item" href="#">
																	  <i class="fas fa-copy me-2"></i>
																	  Copy link
																  </a>
															  </li>
														  </ul>
													  </div>
												  </div>
												  <!-- Buttons -->
												  <div class="mt-3 d-sm-flex justify-content-sm-between">
													  <a href="#" class="btn btn-outline-primary mb-0">Free trial</a>
													  <a href="checkout.html " class="btn btn-success mb-0" data-course-id="${course.id}" onclick="addToCart(${course.id})">Buy course</a>
												  </div>
											  </div>
										  </div>
										  <!-- Video END -->
										  <!-- Course info START -->
										  <div class="card card-body shadow p-4 mb-4">
											  <!-- Title -->
											  <h4 class="mb-3">This course includes</h4>
											  <ul class="list-group list-group-borderless">
												  <li class="list-group-item d-flex justify-content-between align-items-center">
													  <span class="h6 fw-light mb-0">
														  <i class="fas fa-fw fa-book-open text-primary"></i>
														  Lectures
													  </span>
													  <span>${course.courseTotalLectures}</span>
												  </li>
												  <li class="list-group-item d-flex justify-content-between align-items-center">
													  <span class="h6 fw-light mb-0">
														  <i class="fas fa-fw fa-clock text-primary"></i>
														  Duration
													  </span>
													  <span>${course.courseTotalHours + "h"} ${course.courseTotalMin + "m"}</span>
												  </li>
												  <li class="list-group-item d-flex justify-content-between align-items-center">
													  <span class="h6 fw-light mb-0">
														  <i class="fas fa-fw fa-signal text-primary"></i>
														  Skills
													  </span>
													  <span>${course.courseLevel}</span>
												  </li>
												  
												  
												  <li class="list-group-item d-flex justify-content-between align-items-center">
													  <span class="h6 fw-light mb-0">
														  <i class="fas fa-fw fa-medal text-primary"></i>
														  Certificate
													  </span>
													  <span>${course.courseCertificate}</span>
												  </li>
											  </ul>
										  </div>
										  <!-- Course info END -->
									  </div>
									  <div class="col-md-6 col-lg-12">
										  <!-- Recently Viewed START -->
										  <div class="card card-body shadow p-4 mb-4">
											  <!-- Title -->
											  <h4 class="mb-3">Recently Viewed</h4>
											  <!-- Course item START -->
											  <div class="row gx-3 mb-3">
												  <!-- Image -->
												  <div class="col-4">
													  <img class="rounded" src="images/12.jpg" alt="">
												  </div>
												  <!-- Info -->
												  <div class="col-8">
													  <h6 class="mb-0">
														  <a href="#">Fundamentals of Business Analysis</a>
													  </h6>
													  <ul class="list-group list-group-borderless mt-1 d-flex justify-content-between">
														  <li class="list-group-item px-0 d-flex justify-content-between">
															  <span class="text-success">$130</span>
															  <span class="h6 fw-light">
																  4.5<i class="fas fa-star text-warning ms-1"></i>
															  </span>
														  </li>
													  </ul>
												  </div>
											  </div>
											  <!-- Course item END -->
											  <!-- Course item START -->
											  <div class="row gx-3">
												  <!-- Image -->
												  <div class="col-4">
													  <img class="rounded" src="images/12.jpg" alt="">
												  </div>
												  <!-- Info -->
												  <div class="col-8">
													  <h6 class="mb-0">
														  <a href="#">The Complete Video Production Bootcamp</a>
													  </h6>
													  <ul class="list-group list-group-borderless mt-1 d-flex justify-content-between">
														  <li class="list-group-item px-0 d-flex justify-content-between">
															  <span class="text-success">$150</span>
															  <span class="h6 fw-light">
																  4.0<i class="fas fa-star text-warning ms-1"></i>
															  </span>
														  </li>
													  </ul>
												  </div>
											  </div>
											  <!-- Course item END -->
										  </div>
										  <!-- Recently Viewed END -->
										  <!-- Tags START -->
										  <!-- <div class="card card-body shadow p-4">
	<h4 class="mb-3">Popular Tags</h4>
	<ul class="list-inline mb-0">
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">blog</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">business</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">theme</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">bootstrap</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">data science</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">web development</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">tips</a>
		</li>
		<li class="list-inline-item">
			<a class="btn btn-outline-light btn-sm" href="#">machine learning</a>
		</li>
	</ul>
</div> -->

										  <!-- Tags END -->
									  </div>
								  </div>
								  <!-- Row End -->
							  </div>
							  <!-- Right sidebar END -->
						  </div>
						  </div>
	  `;

	  courseDetailContainer.innerHTML = courseDetailHTML;

	} else {
	  courseDetailContainer.innerHTML = "<p>Course not found!</p>";
	}
  }
  
  // Check if the current page is the course detail page
  if (window.location.pathname === "/course-detail.html") {
	fetchCourseDetails();
  } else {
	filterCourses(category);
  }
// Generate HTML for course benefits
var courseBenefitsHTML = Object.values(courses[0].courseBenefits[0]).map(function(benefit) {
	return `
	  <li class="list-group-item h6 fw-light d-flex mb-0">
		<i class="fas fa-check-circle text-success me-2"></i>
		${benefit}
	  </li>
	`;
  }).join("");
  
  // Insert course benefits HTML into the desired element on the page
  var courseBenefitsContainer = document.getElementById("courseBenefits");
  courseBenefitsContainer.innerHTML = courseBenefitsHTML;

//   End Here

//start here

const video = document.getElementById('video');
video.addEventListener('loadeddata', generateThumbnail);

function generateThumbnail() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = thumbnailDataUrl;

  document.body.appendChild(thumbnailImg);
}
//end here



function generateRatingStars(rating) {
    let ratingHtml = "";
    const fullStar = '<i class="fas fa-star text-warning"></i>';
    const halfStar = '<i class="fas fa-star-half-alt text-warning"></i>';
    const emptyStar = '<i class="far fa-star text-warning"></i>';

    // Calculate the number of full stars
    const fullStars = Math.floor(rating);
    // Check if there's a half star
    const hasHalfStar = rating - fullStars >= 0.5;

    // Generate the full stars
    for (let i = 0; i < fullStars; i++) {
        ratingHtml += `<li class="list-inline-item me-0 small">${fullStar}</li>`;
    }

    // Generate the half star if applicable
    if (hasHalfStar) {
        ratingHtml += `<li class="list-inline-item me-0 small">${halfStar}</li>`;
    }

    // Generate the empty stars to fill the remaining space
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        ratingHtml += `<li class="list-inline-item me-0 small">${emptyStar}</li>`;
    }

    return ratingHtml;
};

//   End Here

  
  

	// // Function to update the trending courses content
	// function updateTrendingCourses() {
	//   // Clear the container
	//   trendingCoursesContainer.innerHTML = '';
  
	//   // Generate HTML for each course and append to the container
	//   courses.forEach(function(course) {
	// 	const courseHTML = generateCourseHTML(course);
	// 	const courseElement = document.createElement('div');
	// 	courseElement.innerHTML = courseHTML;
	// 	trendingCoursesContainer.appendChild(courseElement);
  
	// 	// Add click event listener to the heart icon
	// 	const heartIcon = courseElement.querySelector('.far.fa-heart');
	// 	heartIcon.addEventListener('click', function() {
	// 	  // Add the selected course to the trending courses array
	// 	  courses.push(course);
  
	// 	  // Update the trending courses content
	// 	  updateTrendingCourses();
	// 	});
	//   });
	// }
  
	// Initial update of trending courses
  


// //   Add to Cart function

//  // Remove the course from the cart
 function removeFromCart(event, courseId) {
	event.preventDefault();

	// Remove the course from the cart
	cart = cart.filter(function(course) {
	  return course.id !== courseId;
	});

	// Update the cart in local storage
	localStorage.setItem("cart", JSON.stringify(cart));

	// Update the cart count
	cartCount = cart.length;
	cartCountElement.textContent = cartCount;

	// Remove the cart item from the display
	var cartItem = event.target.closest("#cartItems");
	cartItem.remove();
  }

//   Add to cart function end here


