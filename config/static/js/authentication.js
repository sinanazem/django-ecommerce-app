

// Your web app's Firebase configuration
var firebaseConfig = {
    // Paste your Config Code
    apiKey: "AIzaSyDWYTnNbaMntGS3nrjZYdY0MnSHgfBNpao",
authDomain: "eduport-69523.firebaseapp.com",
projectId: "eduport-69523",
storageBucket: "eduport-69523.appspot.com",
messagingSenderId: "60193854207",
appId: "1:60193854207:web:9b16067ddb2c10596b72ca",
measurementId: "G-PNJPY0B5DW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.getElementById('dashboard').style.display="none"

  document.getElementById('login').addEventListener('click', GoogleLogin)
  document.getElementById('logout').addEventListener('click', LogoutUser)

  let provider = new firebase.auth.GoogleAuthProvider()

  function GoogleLogin(){
    console.log('Login Btn Call')
    firebase.auth().signInWithPopup(provider).then(res=>{
      console.log(res.user)
      document.getElementById('LoginScreen').style.display="none"
      document.getElementById('dashboard').style.display="block"
      showUserDetails(res.user)
    }).catch(e=>{
      console.log(e)
    });
  };

  function showUserDetails(user) {
    const [firstName, lastName] = user.displayName.split(' ');
    document.getElementById('userDetails').innerHTML = `
    <!-- Notification dropdown START -->
    <li class="nav-item mx-3 dropdown notification-icon">
        <!-- Notification button -->
        <a class="btn btn-light btn-round mb-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
            <i class="bi bi-bell fa-fw"></i>
        </a>
        <!-- Notification dote -->
        <span class="notif-badge animation-blink"></span>
        <!-- Notification dropdown menu START -->
        <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0">
            <div class="card bg-transparent">
                <div class="card-header bg-transparent border-bottom py-4 d-flex justify-content-between align-items-center">
                    <h6 class="m-0">
                        Notifications <span class="badge bg-danger bg-opacity-10 text-danger ms-2">2 new</span>
                    </h6>
                    <a class="small" href="#">Clear all</a>
                </div>
                <div class="card-body p-0">
                    <ul class="list-group list-unstyled list-group-flush">
                        <!-- Notif item -->
                        <li>
                            <a href="#" class="list-group-item-action border-0 border-bottom d-flex p-3">
                                <div class="me-3">
                                    <div class="avatar avatar-md">
                                        <img class="avatar-img rounded-circle" src="images/03.jpg" alt="avatar">
                                    </div>
                                </div>
                                <div>
                                    <h6 class="mb-1">Update v2.3 completed successfully</h6>
                                    <p class="small text-body m-0">What's new! Find out about new features</p>
                                    <small class="text-body">5 min ago</small>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- Button -->
                <div class="card-footer bg-transparent border-0 py-3 text-center position-relative">
                    <a href="#" class="stretched-link">See all incoming activity</a>
                </div>
            </div>
        </div>
        <!-- Notification dropdown menu END -->
    </li>
    <li class="nav-item ms-6 px-2  dropdown auth-sec">
    <!-- Avatar -->
    <a class="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="avatar-img rounded-circle" src="${user.photoURL}" alt="${firstName} ${lastName}">
    </a>

    <!-- Profile dropdown START -->
    <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
        <!-- Profile info -->
        <li class="px-3 mb-3">
            <div class="d-flex align-items-center">
                <!-- Avatar -->
                <div class="avatar me-3">
                    <img class="avatar-img rounded-circle shadow" src="${user.photoURL}" alt="${firstName} ${lastName}">
                </div>
                <div>
                    <a class="h6" href="#">${firstName} ${lastName}</a>
                    <p class="small m-0">${user.email}</p>
                </div>
            </div>
        </li>
        <!-- Links -->
        <li> <hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="instructor-edit-profile.html"><i class="bi bi-person fa-fw me-2"></i>Edit Profile</a></li>
        <li><a class="dropdown-item" href="instructor-setting.html"><i class="bi bi-gear fa-fw me-2"></i>Account Settings</a></li>
        <li><a class="dropdown-item" href="help-center.html"><i class="bi bi-info-circle fa-fw me-2"></i>Help</a></li>
        <li id="logout"><a class="dropdown-item bg-danger-soft-hover"><i class="bi bi-power fa-fw me-2"></i>Sign Out</a></li>
        <li> </li>
    </ul>
    <!-- Profile dropdown END -->
    </li>
      
    `;

     // Store user information in localStorage
     localStorage.setItem('userDisplayFirstName', firstName);
     localStorage.setItem('userDisplayLastName', lastName);
     localStorage.setItem('userPhotoURL', user.photoURL);
     localStorage.setItem('userEmail', user.email); // Corrected line here

  };

  function checkAuthState(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        document.getElementById('LoginScreen').style.display="none"
        document.getElementById('dashboard').style.display="block"
        showUserDetails(user)
      }else{

      }
    });
  };

  function LogoutUser(){
    console.log('Logout Btn Call')
    firebase.auth().signOut().then(()=>{
      document.getElementById('LoginScreen').style.display="block"
      document.getElementById('dashboard').style.display="none"
    }).catch(e=>{
      console.log(e)
    });
  };
  checkAuthState();
















  