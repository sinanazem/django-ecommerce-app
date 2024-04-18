


    function renderVideo(selectedVideo) {
        const coursesVideoContainer = document.getElementById("courseVideo");
      
        // Create the video HTML content using template literals
        const videoHTML = `
          <div class="overflow-hidden fullscreen-video w-100" data-course-id="${selectedVideo[1].id}">
            <!-- Full screen video START -->
            <div class="video-player rounded-3">
              <video crossorigin="anonymous" playsinline poster="${selectedVideo[1].introImage}" controls>
                <source src="${selectedVideo[1].introVideo}" type="video/mp4" size="360">
                <source src="${selectedVideo[1].introVideo}" type="video/mp4" size="720">
                <source src="${selectedVideo[1].introVideo}" type="video/mp4" size="1080">
                <!-- Caption files -->
                <track kind="captions" label="English" srclang="en" src="${selectedVideo[1].introVideo}" default>
                <track kind="captions" label="French" srclang="fr" src="${selectedVideo[1].introVideo}">
              </video>
            </div>
            <!-- Full screen video END -->
            <!-- Plyr resources and browser polyfills are specified in the pen settings -->
          </div>
          <!-- Page content START -->
          <div class="justify-content-end position-relative">
            <!-- Collapse button START -->
            <button class="navbar-toggler btn btn-white mt-4 plyr-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
              <span class="navbar-toggler-animation">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
                            <!-- Collapse button END -->
                            <!-- Collapse body START -->
                            <div class="collapse collapse-horizontal" id="collapseWidthExample">
                                <div class="card vh-100 overflow-auto rounded-0 w-280px w-sm-400px">
                                    <!-- Title -->
                                    <div class="card-header bg-light rounded-0">
                                        <h1 class="mt-2 fs-5">${selectedVideo[1].introTitle}</h1>
                                        <h6 class="mb-0 fw-normal">
                                            <a href="#"> ${"By " + selectedVideo[1].courseCreator}</a>
                                        </h6>
                                    </div>
                                    <!-- Course content START -->
                                    <div class="card-body">
                                        <div class="d-sm-flex justify-content-sm-between">
                                            <h5>Course content</h5>
                                            <!-- Button -->
                                            <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#Notemodal">
                                                <i class="bi fa-fw bi-pencil-square me-2"></i>
                                                Add note
								
                                            </button>
                                        </div>
                                        <hr>
                                        <!-- Divider -->
                                        <!-- Course START -->
                                        <div class="row">
                                            <div class="col-12">
                                                <!-- Accordion START -->
                                                <div class="accordion accordion-flush-light accordion-flush" id="accordionExample">
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingOne">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <span class="mb-0 fw-bold">${selectedVideo[0].courseList[0].heading1}</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div>
                                                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                                                            <div class="position-relative d-flex align-items-center">
                                                                                <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                    <i class="fas fa-play me-0"></i>
                                                                                </a>
                                                                                <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[0].title1}</span>
                                                                            </div>
                                                                            <p class="mb-0 text-truncate">2m 10s</p>
                                                                        </div>
                                                                        <!-- Add note button -->
                                                                        <a class="btn btn-xs btn-warning" data-bs-toggle="collapse" href="#addnote-1" role="button" aria-expanded="false" aria-controls="addnote-1">View note
																</a>
                                                                        <!-- Notes START -->
                                                                        <div class="collapse" id="addnote-1">
                                                                            <div class="card card-body p-0">
                                                                                <!-- Note item -->
                                                                                <div class="d-flex justify-content-between bg-light rounded-2 p-2 mb-2">
                                                                                    <!-- Content -->
                                                                                    <div class="d-flex align-items-center">
                                                                                        <span class="badge bg-dark me-2">5:20</span>
                                                                                        <h6 class="d-inline-block text-truncate w-40px w-sm-150px mb-0 fw-light">Describe SEO Engine</h6>
                                                                                    </div>
                                                                                    <!-- Button -->
                                                                                    <div class="d-flex">
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round me-2 mb-0">
                                                                                            <i class="bi fa-fw bi-play-fill"></i>
                                                                                        </a>
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round mb-0">
                                                                                            <i class="bi fa-fw bi-trash-fill"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <!-- Note item -->
                                                                                <div class="d-flex justify-content-between bg-light rounded-2 p-2 mb-2">
                                                                                    <!-- Content -->
                                                                                    <div class="d-flex align-items-center">
                                                                                        <span class="badge bg-dark me-2">10:20</span>
                                                                                        <h6 class="d-inline-block text-truncate w-40px w-sm-150px mb-0 fw-light">Know about all marketing</h6>
                                                                                    </div>
                                                                                    <!-- Button -->
                                                                                    <div class="d-flex">
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round me-2 mb-0">
                                                                                            <i class="bi fa-fw bi-play-fill"></i>
                                                                                        </a>
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round mb-0">
                                                                                            <i class="bi fa-fw bi-trash-fill"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Notes END -->
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div>
                                                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                                                            <div class="position-relative d-flex align-items-center">
                                                                                <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                    <i class="fas fa-play me-0"></i>
                                                                                </a>
                                                                                <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[0].title2}</span>
                                                                            </div>
                                                                            <p class="mb-0 text-truncate">15m 10s</p>
                                                                        </div>
                                                                        <!-- Add note button -->
                                                                        <a class="btn btn-xs btn-warning" data-bs-toggle="collapse" href="#addnote-2" role="button" aria-expanded="false" aria-controls="addnote-2">View note
																	</a>
                                                                        <!-- Notes START -->
                                                                        <div class="collapse" id="addnote-2">
                                                                            <div class="card card-body p-0">
                                                                                <!-- Note item -->
                                                                                <div class="d-flex justify-content-between bg-light rounded-2 p-2 mb-2">
                                                                                    <!-- Content -->
                                                                                    <div class="d-flex align-items-center">
                                                                                        <span class="badge bg-dark me-2">5:20</span>
                                                                                        <h6 class="d-inline-block text-truncate w-40px w-sm-150px mb-0 fw-light">Describe SEO Engine</h6>
                                                                                    </div>
                                                                                    <!-- Button -->
                                                                                    <div class="d-flex">
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round me-2 mb-0">
                                                                                            <i class="bi fa-fw bi-play-fill"></i>
                                                                                        </a>
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round mb-0">
                                                                                            <i class="bi fa-fw bi-trash-fill"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <!-- Note item -->
                                                                                <div class="d-flex justify-content-between bg-light rounded-2 p-2 mb-2">
                                                                                    <!-- Content -->
                                                                                    <div class="d-flex align-items-center">
                                                                                        <span class="badge bg-dark me-2">10:20</span>
                                                                                        <h6 class="d-inline-block text-truncate w-40px w-sm-150px mb-0 fw-light">Know about all marketing</h6>
                                                                                    </div>
                                                                                    <!-- Button -->
                                                                                    <div class="d-flex">
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round me-2 mb-0">
                                                                                            <i class="bi fa-fw bi-play-fill"></i>
                                                                                        </a>
                                                                                        <a href="#" class="btn btn-sm btn-light btn-round mb-0">
                                                                                            <i class="bi fa-fw bi-trash-fill"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Notes END -->
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[0].title3}</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">18m 10s</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingTwo">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                <span class="mb-0 fw-bold">${selectedVideo[0].courseList[1].heading2}</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[1].title3}</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">2m 10s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[1].title4}</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">15m 10s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">${selectedVideo[0].courseList[1].title5}</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">18m 10s</p>
                                                                    </div>
                                                                </div>
                                                                <!-- Row END -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingThree">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                <span class="mb-0 fw-bold">What is Search Engine Optimization(SEO)</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Introduction</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">2m 10s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">How to SEO Optimise Your Homepage</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">15m 00s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">How to Write Title Tags Search Engines Love</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">28m 10s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">SEO Keyword Planning</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">38m 22s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Internal and External Links</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">12m 10s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Measuring SEO Effectiveness</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">35m 10s</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingFour">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                <span class="mb-0 fw-bold">YouTube Marketing</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Video Flow</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">25m 5s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Webmaster Tool</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">15m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Featured Contents on Channel</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">32m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Managing Comments</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">20m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Channel Analytics</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">18m 20s</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingFive">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                <span class="mb-0 fw-bold">Why SEO</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Understanding SEO</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">20m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">On-Page SEO</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">5m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Local SEO</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">16m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Measuring SEO Effectiveness</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">12m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">SEO Keyword Planning</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">36m 12s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Keywords in Blog and Articles</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">15m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-light btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="bi bi-lock-fill"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Mobile SEO</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">15m 00s</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Item -->
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="headingSix">
                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                                <span class="mb-0 fw-bold">Integration with Website</span>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body px-3">
                                                                <div class="vstack gap-3">
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Creating LinkedIn Account</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">13m 20s</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">Advance Searching</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">31m 20ss</p>
                                                                    </div>
                                                                    <!-- Course lecture -->
                                                                    <div class="d-flex justify-content-between align-items-center">
                                                                        <div class="position-relative d-flex align-items-center">
                                                                            <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i class="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">LinkedIn Mobile App</span>
                                                                        </div>
                                                                        <p class="mb-0 text-truncate">25m 20s</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Accordion END -->
                                            </div>
                                        </div>
                                        <!-- Course END -->
                                    </div>
                                    <!-- Course content END -->
                                    <div class="card-footer">
                                        <div class="d-grid">
                                            <a href="course-detail.html" class="btn btn-primary-soft mb-0">Back to course</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Collapse body END -->
                        </div>
                        <!-- Page content END --></source>
                        </div>
        `;
      
        // Insert the video HTML content into the "coursesVideo" container
        coursesVideoContainer.innerHTML = videoHTML;

        // Initialize Plyr for the video element
         // Initialize Plyr for the video element
  const player = new Plyr('video', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
  });
};


      // Assuming you have an object with the selected video data called "selectedVideo"
      const selectedVideo = [
        {
          id: 1,
          courseCreator: "Codewithharry",
          introTitle: "Introduction to Javascript",
          introImage: "../courseImages/download.png",
          introVideo: "../courseVideos/Introduction to JavaScript + Setup   JavaScript Tutorial in Hindi #1.mp4",
          courseList: [
            {
             heading1: "Introduction to Javascript",
              title1: "Introduction to Javascript",
              video1: "/courseVideos/Introduction to JavaScript + Setup _ JavaScript Tutorial in Hindi #1.mp4",
              title2: "Variables",
              video2: "/courseVideos/const, let and var in JavaScript   JavaScript Tutorial in Hindi #3.mp4",
              title3: "Loops",
              video3: "/courseVideos/For Loops in JavaScript   JavaScript Tutorial in Hindi #9.mp4",
            },
            {
                heading2: "Introduction to Condition & Expression",
                title4: "Conditional expression",
                video4: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                title5: "Operators & Expressons",
                video5: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                title6: "Primitives & Objects",
                video6: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
            },
            {
                heading2: "Introduction to Condition & Expression",
                title7: "Conditional expression",
                video7: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                title8: "Operators & Expressons",
                video8: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                title9: "Primitives & Objects",
                video9: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
            },
            {
                heading3: "Introduction to Condition & Expression",
                title10: "Conditional expression",
                video10: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                title11: "Operators & Expressons",
                video11: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                title12: "Primitives & Objects",
                video12: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
            },
            {
                heading4: "Introduction to Condition & Expression",
                title13: "Conditional expression",
                video13: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                title14: "Operators & Expressons",
                video14: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                title15: "Primitives & Objects",
                video15: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
            },
            // Add more videos as needed
          ],

        },
        {
            id: 2,
            courseCreator: "Haris",
            introTitle: "Introduction to Javascript",
            introImage: "../courseImages/download.png",
            introVideo: "../courseVideos/Introduction to JavaScript + Setup   JavaScript Tutorial in Hindi #1.mp4",
            courseList: [
              {
               heading1: "Introduction to Javascript",
                title1: "Introduction to Javascript",
                video1: "/courseVideos/Introduction to JavaScript + Setup _ JavaScript Tutorial in Hindi #1.mp4",
                title2: "Variables",
                video2: "/courseVideos/const, let and var in JavaScript   JavaScript Tutorial in Hindi #3.mp4",
                title3: "Loops",
                video3: "/courseVideos/For Loops in JavaScript   JavaScript Tutorial in Hindi #9.mp4",
              },
              {
                  heading2: "Introduction to Condition & Expression",
                  title4: "Conditional expression",
                  video4: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                  title5: "Operators & Expressons",
                  video5: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                  title6: "Primitives & Objects",
                  video6: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
              },
              {
                  heading2: "Introduction to Condition & Expression",
                  title7: "Conditional expression",
                  video7: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                  title8: "Operators & Expressons",
                  video8: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                  title9: "Primitives & Objects",
                  video9: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
              },
              {
                  heading3: "Introduction to Condition & Expression",
                  title10: "Conditional expression",
                  video10: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                  title11: "Operators & Expressons",
                  video11: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                  title12: "Primitives & Objects",
                  video12: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
              },
              {
                  heading4: "Introduction to Condition & Expression",
                  title13: "Conditional expression",
                  video13: "/courseVideos/Conditional expressions in JavaScript   JavaScript Tutorial in Hindi #7.mp4",
                  title14: "Operators & Expressons",
                  video14: "/courseVideos/JavaScript Operators and Expressions   JavaScript Tutorial in Hindi #6.mp4",
                  title15: "Primitives & Objects",
                  video15: "/courseVideos/Primitives and Objects in JavaScript   JavaScript Tutorial in Hindi #4.mp4",
              },
              // Add more videos as needed
            ],
  
          },
        // Add more courses as needed
      ];


  
  // Call the function to render the video when needed
  renderVideo(selectedVideo);