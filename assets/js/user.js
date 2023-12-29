let subBody = document.querySelector('#products, #info, #account'),
  loginBttn = document.querySelector(".login"),
  userProfile = document.querySelector(".userProfile"),
  userOptions = document.querySelector(".user-options"),
  logoutBtn = document.querySelector(".logout"),
  cardIcon = document.querySelector(".card-icon"),
  cardItems = document.querySelector(".card-items");

// go to login page
loginBttn.addEventListener("click", () => {
  if (loginBttn.innerHTML === "login") {
    window.location = "./login.html";
  }
});

// show username in NavBar
if (localStorage.getItem("username")) {
  loginBttn.style.display = "none";
  userProfile.innerHTML = localStorage.getItem("username");
  userProfile.style.display = "block";
}

subBody.addEventListener("click", () => {
  if (userOptions.classList.contains('active')) {
    userOptions.classList.remove("active");
  }
  if (cardItems.classList.contains('active')) {
    cardItems.classList.remove("active");
  }
})

// Drop User Oprtions
userProfile.addEventListener("click", () => {
  userOptions.classList.toggle("active");
  cardItems.classList.remove("active");
});

// Drop card item liste
cardIcon.addEventListener("click", () => {
  cardItems.classList.toggle("active");
  userOptions.classList.remove("active");
});

// logout && clear localstorage
logoutBtn.addEventListener("click", logout);
function logout(e) {
  e.preventDefault();
  localStorage.clear();
  setTimeout(() => {
    window.location = "./login.html";
  }, 1500);
}
