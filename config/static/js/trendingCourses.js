function createTrendingCardHTML(trending) {
    return ` 
    <div>
    <div class="card action-trigger-hover border bg-transparent">
      <img src="${trending.courseImage}" class="card-img-top" alt="course image">
      <div class="ribbon mt-3"><span>Free</span></div>
      <div class="card-body pb-0">
        <div class="d-flex justify-content-between mb-3">
          <span class="hstack gap-2">
            <a href="#" class="badge bg-primary bg-opacity-10 text-primary">${trending.courseCategory}</a>
            <a href="#" class="badge text-bg-dark">${trending.courseLevel}</a>
          </span>
          <a href="#" class="h6 fw-light mb-0"><i class="far fa-bookmark"></i></a>
        </div>
        <h5 class="card-title"><a href="#">${trending.courseTitle}</a></h5>
        <div class="d-flex justify-content-between mb-2">
          <div class="hstack gap-2">
            <p class="text-warning m-0">${trending.courseRating}<i class="fas fa-star text-warning ms-1"></i></p>
            <span class="small">(${trending.courseTotalStrength})</span>
          </div>
          <div class="hstack gap-2">
            <p class="h6 fw-light mb-0 m-0">${trending.courseTotalStrength}</p>
            <span class="small">(Student)</span>
          </div>
        </div>
        <div class="hstack gap-3">
          <span class="h6 fw-light mb-0"><i class="far fa-clock text-danger me-2"></i>${trending.courseTotalHours}h ${trending.courseTotalMin}m</span>
          <span class="h6 fw-light mb-0"><i class="fas fa-table text-orange me-2"></i>${trending.courseTotalLectures} lectures</span>
        </div>
      </div>
      <div class="card-footer pt-0 bg-transparent">
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <div class="avatar avatar-sm">
              <img class="avatar-img rounded-1" src="images/10.jpg" alt="avatar">
            </div>
            <p class="mb-0 ms-2"><a href="#" class="h6 fw-light mb-0">Larry Lawson</a></p>
          </div>
          <div>
            <h4 class="text-success mb-0 item-show">${trending.courseCurrentPrice}</h4>
            <a href="#" class="btn btn-sm btn-success-soft item-show-hover"><i class="fas fa-shopping-cart me-2"></i>Add to cart</a>
          </div>
        </div>
      </div>
      </div>
      </div>
    `;
  
  }
  
  // Assuming you have an array of trending courses called "trendingCourses"
  const trendingCourses = [
    {
        id: 1,
        courseImage: "../images/08.jpg",
        courseTitle: "Web Design",
        courseDescription: "Proposal indulged no do sociable he throwing settling.",
        courseHeading : [
           "Welcome to the Web Design Mastery Course Bundle - 12 Courses in 1 (Over 50 hours of content)",
          ],
      courseDetail: [
        "In this comprehensive and practical hands-on training, you will become a web design expert with this ultimate course bundle that includes 12 web design courses in 1!",
        "Whether you're a beginner looking to start a career in web design or an experienced designer wanting to expand your skill set, this course bundle covers everything you need to know to create stunning and user-friendly websites."
      ],
      courseHighlights: "Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites",
      courseBenefits : [
          {
              1: "Practical examples and exercises to reinforce learning",
              2: "Practical examples and exercises to reinforce ",
              3: "Practical examples and exercises to ",
              4: "Practical examples and exercises to reinforce learning",
              5: "Practical examples and exercises to reinforce learning",
              6: "Practical examples and exercises to reinforce learning",
              7: "Practical examples and exercises to reinforce learning",
              8: "Practical examples and exercises to reinforce learning",
  
          },
      ],
          
        
        courseRating: 5,
        courseCurrentPrice: 0,
        courseOldPrice: 250,
        courseCategory: "Web Design",
        courseTotalLectures: 15,
        courseTotalHours: 12,
        courseTotalMin: 54,
        coursePriceLevel: "free",
        courseLevel: "Beginner",
        courseTotalStrength: 5000,
        courseCertificate: "Yes",
        courseImagesVideos: [
          {
          title: "Introduction to Javascript",
           courseImages: "../courseImages/download.png",
           courseVideo: "/courseVideos/Introduction to JavaScript + Setup _ JavaScript Tutorial in Hindi #1.mp4",
          
          },
          ],
      },
      ,{
        id: 2,
        courseImage: "../images/08.jpg",
        courseTitle: "Web Design",
        courseDescription: "Proposal indulged no do sociable he throwing settling.",
        courseHeading : [
           "Welcome to the Web Design Mastery Course Bundle - 12 Courses in 1 (Over 50 hours of content)",
          ],
      courseDetail: [
        "In this comprehensive and practical hands-on training, you will become a web design expert with this ultimate course bundle that includes 12 web design courses in 1!",
        "Whether you're a beginner looking to start a career in web design or an experienced designer wanting to expand your skill set, this course bundle covers everything you need to know to create stunning and user-friendly websites."
      ],
      courseHighlights: "Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites",
      courseBenefits : [
          {
              1: "Practical examples and exercises to reinforce learning",
              2: "Practical examples and exercises to reinforce ",
              3: "Practical examples and exercises to ",
              4: "Practical examples and exercises to reinforce learning",
              5: "Practical examples and exercises to reinforce learning",
              6: "Practical examples and exercises to reinforce learning",
              7: "Practical examples and exercises to reinforce learning",
              8: "Practical examples and exercises to reinforce learning",
  
          },
      ],
          
        
        courseRating: 5,
        courseCurrentPrice: 250,
        courseOldPrice: 250,
        courseCategory: "Web Design",
        courseTotalLectures: 15,
        courseTotalHours: 12,
        courseTotalMin: 54,
        coursePriceLevel: "paid",
        courseLevel: "Beginner",
        courseTotalStrength: 5000,
        courseCertificate: "Yes",
        courseImagesVideos: [
            {
            title: "Introduction to Javascript",
             courseImages: "../courseImages/download.png",
             courseVideo: "/courseVideos/Introduction to JavaScript + Setup _ JavaScript Tutorial in Hindi #1.mp4",
            
            },
            ],
    },
    {
    id: 1,
    courseImage: "../images/08.jpg",
    courseTitle: "Web Design",
    courseDescription: "Proposal indulged no do sociable he throwing settling.",
    courseHeading : [
       "Welcome to the Web Design Mastery Course Bundle - 12 Courses in 1 (Over 50 hours of content)",
      ],
  courseDetail: [
    "In this comprehensive and practical hands-on training, you will become a web design expert with this ultimate course bundle that includes 12 web design courses in 1!",
    "Whether you're a beginner looking to start a career in web design or an experienced designer wanting to expand your skill set, this course bundle covers everything you need to know to create stunning and user-friendly websites."
  ],
  courseHighlights: "Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites Gain a deep understanding of web design principles Learn wireframing, prototyping, and responsive design Master color theory and create visually captivating websites",
  courseBenefits : [
      {
          1: "Practical examples and exercises to reinforce learning",
          2: "Practical examples and exercises to reinforce ",
          3: "Practical examples and exercises to ",
          4: "Practical examples and exercises to reinforce learning",
          5: "Practical examples and exercises to reinforce learning",
          6: "Practical examples and exercises to reinforce learning",
          7: "Practical examples and exercises to reinforce learning",
          8: "Practical examples and exercises to reinforce learning",

      },
  ],
      
    
    courseRating: 5,
    courseCurrentPrice: 0,
    courseOldPrice: 250,
    courseCategory: "Web Design",
    courseTotalLectures: 15,
    courseTotalHours: 12,
    courseTotalMin: 54,
    coursePriceLevel: "free",
    courseLevel: "Beginner",
    courseTotalStrength: 5000,
    courseCertificate: "Yes",
    courseImagesVideos: [
      {
      title: "Introduction to Javascript",
       courseImages: "../courseImages/download.png",
       courseVideo: "/courseVideos/Introduction to JavaScript + Setup _ JavaScript Tutorial in Hindi #1.mp4",
      
      },
      ],
  },
    // Add more trending course objects as needed
  ];
  

// Function to render the trending course cards into the "trendingCourses" container
function renderTrendingCourses() {
    const trendingCoursesContainer = document.getElementById("trendingCourses");
    let cardsHTML = "";
  
    // Loop through each trending course and generate its card HTML
    trendingCourses.forEach((trendingCourse) => {
      const cardHTML = createTrendingCardHTML(trendingCourse);
      cardsHTML += cardHTML;
    });
  
    // Add all the generated HTML content to the container
    trendingCoursesContainer.insertAdjacentHTML("beforeend", cardsHTML);
  }
  
  // Call the function to render the trending course cards when needed
  renderTrendingCourses();
  
  
  
  
  
  
  