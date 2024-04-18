// Function to filter the courses based on category and search keyword
function filterCourses(category, searchKeyword) {
  if (category === 'all') {
      // Show all courses
      filteredCourses = courses;
  } else {
      // Filter courses by category
      filteredCourses = courses.filter(function (course) {
          return course.courseCategory.toLowerCase() === category.toLowerCase();
      });
  }

  // Filter courses by search keyword
  if (searchKeyword) {
      filteredCourses = filteredCourses.filter(function (course) {
          return course.courseTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              course.courseCategory.toLowerCase().includes(searchKeyword.toLowerCase());
      });
  }

  // Save the filtered courses to local storage
  localStorage.setItem('filteredCourses', JSON.stringify(filteredCourses));
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('currentCategory', category);

  // Redirect to course-grid.html
  window.location.href = 'course-grid.html';
}

// Attach event listener to the search form
var searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var searchInput = document.getElementById('searchInput');
  var searchKeyword = searchInput.value;
  var selectedCategory = localStorage.getItem('currentCategory') || 'all';

  filterCourses(selectedCategory, searchKeyword);
});