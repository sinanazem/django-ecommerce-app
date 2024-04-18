// Sample data for the course categories
const categories = [
    { 
        id: "webDesign",
        categoryTitle: "Web Design",
        categoryImg: "/images/web-design.png",
        numCourses: 15,
        bgClass: "bg-primary bg-gradient",
},
    {
        id: "Development",
        categoryTitle: "Development",
        categoryImg: "/images/coding.png",
        numCourses: 15,
        bgClass: "bg-success bg-gradient",
     },
    // Add more course data as needed
    { 
        id: "Marketing",
        categoryTitle: "Marketing",
        categoryImg: "/images/marketing.jpg",
        numCourses: 15,
        bgClass: "bg-danger bg-gradient",
    },
    { 
        id: "Music",
        categoryTitle: "Music",
        categoryImg: "/fonts/home.svg",
        numCourses: 15,
        bgClass: "bg-info bg-gradient"
    },
    { 
        id: "IT",
        categoryTitle: "IT",
        categoryImg: "/images/technical-support.png",
        numCourses: 15,
        bgClass:"bg-danger bg-gradient"
    },
    { 
        id: "FITNESS",
        categoryTitle: "FITNESS",
        categoryImg: "/fonts/home.svg",
        numCourses: 15,
        bgClass:"bg-success bg-gradient"
    
    },
    { 
        id: "Finance",
        categoryTitle: "Finance",
        categoryImg: "/fonts/home.svg",
        numCourses: 15,
        bgClass:" bg-warning bg-gradient"
    },
    { 
        id: "Graphic Design",
        categoryTitle: "Graphic Design",
        categoryImg: "/images/illustration.png",
        numCourses: 15,
        bgClass:"bg-secondary bg-gradient"
    },
    { 
        id: "Accounting",
        categoryTitle: "Accounting",
        categoryImg: "/fonts/home.svg",
        numCourses: 15,
        bgClass:"bg-success bg-gradient"
    },
    { 
        id: "Translation",
        categoryTitle: "Translation",
        categoryImg: "/fonts/home.svg",
        numCourses: 15,
        bgClass:"bg-primary bg-gradient"
    },
  ];


  // Get the container div where the course categories will be appended
  const categoryContainer = document.getElementById("coursesCategory");

  // Function to create and append the course category elements
  function renderCourseCategories() {
    categories.forEach((category) => {
      const categoryHTML = `
        <div class="col-sm-6 col-md-4 col-xl-3">
          <div class="card card-body ${category.bgClass} bg-opacity-10 text-center position-relative btn-transition p-4">
            <!-- Image -->
            <div class="icon-xl bg-body mx-auto rounded-circle mb-3" filterCourses(category)>
              <img src="${category.categoryImg}" alt="Course Icon">
            </div>
            <!-- Title -->
            <h5 class="mb-2"><a href="#" class="stretched-link">${category.categoryTitle}</a></h5>
            <h6 class="mb-0">${category.numCourses} Courses</h6>
          </div>
        </div>
      `;

      // Append the course HTML to the container
      categoryContainer.insertAdjacentHTML('beforeend', categoryHTML);
    });
  }

  // Call the function to render the course categories
  renderCourseCategories();