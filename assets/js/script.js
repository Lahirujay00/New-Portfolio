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
const formMessage = document.getElementById("form-message");

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

// Add form submission handling with AJAX
if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const submitButton = this.querySelector("[data-form-btn]");
    const buttonText = submitButton.querySelector("span");
    const originalText = buttonText.textContent;
    
    // Update button to show sending state
    buttonText.textContent = "Sending...";
    submitButton.disabled = true;
    formMessage.style.display = "none";
    
    try {
      // Get form data
      const formData = new FormData(form);
      
      // Send to Formspree via AJAX
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success - show confirmation message
        formMessage.innerHTML = `
          <div style="color: var(--vegas-gold); padding: 15px; border: 1px solid var(--vegas-gold); border-radius: 8px; margin-top: 15px; text-align: center;">
            <ion-icon name="checkmark-circle-outline" style="font-size: 24px; margin-bottom: 8px;"></ion-icon>
            <p style="margin: 0; font-weight: 500;">Thank you! Your message has been sent successfully.</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">I'll get back to you soon!</p>
          </div>
        `;
        formMessage.style.display = "block";
        
        // Reset form
        form.reset();
        submitButton.setAttribute("disabled", "");
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
        
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      // Error - show error message
      formMessage.innerHTML = `
        <div style="color: #ff6b6b; padding: 15px; border: 1px solid #ff6b6b; border-radius: 8px; margin-top: 15px; text-align: center;">
          <ion-icon name="close-circle-outline" style="font-size: 24px; margin-bottom: 8px;"></ion-icon>
          <p style="margin: 0; font-weight: 500;">Oops! Something went wrong.</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Please try again or contact me directly.</p>
        </div>
      `;
      formMessage.style.display = "block";
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
    
    // Reset button
    buttonText.textContent = originalText;
    if (form.checkValidity()) {
      submitButton.removeAttribute("disabled");
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

// Function to save current page to localStorage
function saveCurrentPage(pageName) {
  localStorage.setItem('currentPage', pageName);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    const targetPage = this.innerHTML.toLowerCase();
    console.log("Clicked navigation:", targetPage);

    // Save current page
    saveCurrentPage(targetPage);

    // Add smooth transition - fade out current page first
    const currentActivePage = document.querySelector('article[data-page].active');
    if (currentActivePage) {
      currentActivePage.style.opacity = '0';
    }

    // After fade out, switch pages
    setTimeout(() => {
      // Remove active class from all pages and navigation links
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
        pages[j].style.opacity = '0';
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
          // Fade in the new page
          setTimeout(() => {
            pages[m].style.opacity = '1';
          }, 50);
          console.log(`Activated page: ${targetPage}, classes: ${pages[m].className}`);
          pageFound = true;
          break;
        }
      }
      
      if (!pageFound) {
        console.log(`No page found for: ${targetPage}`);
      }
      
      window.scrollTo(0, 0);
    }, 150); // Delay to allow fade out
    
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
  
  // Project Modal Functionality
  const projectModalContainer = document.querySelector("[data-project-modal-container]");
  const projectOverlay = document.querySelector("[data-project-overlay]");
  const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
  
  // Modal elements
  const projectModalTitle = document.querySelector("[data-project-modal-title]");
  const projectModalTech = document.querySelector("[data-project-modal-tech]");
  const projectModalDescription = document.querySelector("[data-project-modal-description]");
  const projectModalLive = document.querySelector("[data-project-modal-live]");
  const projectModalGithub = document.querySelector("[data-project-modal-github]");

  // Project action buttons
  const projectCards = document.querySelectorAll(".project-card");

  if (projectCards.length > 0 && projectModalContainer) {
    projectCards.forEach(card => {
      const detailsBtn = card.querySelector(".details-btn");
      const liveBtn = card.querySelector(".live-btn");
      const githubBtn = card.querySelector(".github-btn");
      
      // Details button - show modal
      if (detailsBtn) {
        detailsBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const title = card.dataset.projectTitle;
          const tech = card.dataset.projectTech;
          const description = card.dataset.projectDescription;
          const liveUrl = card.dataset.liveUrl;
          const githubUrl = card.dataset.githubUrl;
          
          // Populate modal
          projectModalTitle.textContent = title;
          projectModalDescription.querySelector('p').textContent = description;
          
          // Create tech tags
          projectModalTech.innerHTML = '';
          if (tech) {
            tech.split(',').forEach(techItem => {
              const tag = document.createElement('span');
              tag.className = 'tech-tag';
              tag.textContent = techItem.trim();
              projectModalTech.appendChild(tag);
            });
          }
          
          // Set links
          projectModalLive.href = liveUrl || '#';
          projectModalGithub.href = githubUrl || '#';
          
          // Show modal
          projectModalContainer.classList.add('active');
          projectOverlay.classList.add('active');
        });
      }
      
      // Live demo button
      if (liveBtn) {
        liveBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          const liveUrl = card.dataset.liveUrl;
          if (liveUrl && liveUrl !== '#') {
            window.open(liveUrl, '_blank');
          }
        });
      }
      
      // GitHub button
      if (githubBtn) {
        githubBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          const githubUrl = card.dataset.githubUrl;
          if (githubUrl && githubUrl !== '#') {
            window.open(githubUrl, '_blank');
          }
        });
      }
    });

    // Close modal functionality
    function closeProjectModal() {
      projectModalContainer.classList.remove('active');
      projectOverlay.classList.remove('active');
    }

    if (projectModalCloseBtn) {
      projectModalCloseBtn.addEventListener("click", closeProjectModal);
    }
    
    if (projectOverlay) {
      projectOverlay.addEventListener("click", closeProjectModal);
    }
  }
  
});