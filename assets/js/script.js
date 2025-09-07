'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables - Adding null checks since we removed testimonials
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Only add testimonials functionality if elements exist
if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay) {
  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

console.log("Navigation links found:", navigationLinks.length);
console.log("Pages found:", pages.length);

// Log all pages and their data-page attributes
pages.forEach((page, index) => {
  console.log(`Page ${index}: data-page="${page.dataset.page}", class="${page.className}"`);
});

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    const targetPage = this.innerHTML.toLowerCase();
    console.log("Clicked navigation:", targetPage);

    // Remove active class from all pages and navigation links first
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
      console.log(`Removed active from: ${pages[j].dataset.page}`);
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }
    
    // Add active class to clicked navigation link
    this.classList.add("active");
    console.log(`Navigation "${targetPage}" now active`);
    
    // Add active class to corresponding page
    let pageFound = false;
    for (let m = 0; m < pages.length; m++) {
      if (pages[m].dataset.page === targetPage) {
        pages[m].classList.add("active");
        console.log(`Activated page: ${targetPage}, classes: ${pages[m].className}`);
        pageFound = true;
        break;
      }
    }
    
    if (!pageFound) {
      console.log(`No page found for: ${targetPage}`);
    }
    
    window.scrollTo(0, 0);
  });
}



// Animated title text switching
document.addEventListener('DOMContentLoaded', function() {
  const animatedTitle = document.getElementById('animated-title');
  
  if (animatedTitle) {
    const titles = ['Web developer', 'Software Engineer', 'Graphic Designer', 'Video Editor'];
    let currentIndex = 0;

    function switchTitle() {
      animatedTitle.classList.remove('fade-in');
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        animatedTitle.textContent = titles[currentIndex];
        animatedTitle.classList.add('fade-in');
      }, 250);
    }

    // Start the animation
    setInterval(switchTitle, 3000); // Switch every 3 seconds
    console.log("Animated title initialized");
  } else {
    console.log("animated-title element not found");
  }
});