// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const mobileNav = document.getElementById("mobileNav")

mobileMenuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active")
  mobileMenuToggle.classList.toggle("active")
})

// Navigation Active State
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section")

function updateActiveNav() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === current) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const sectionId = link.getAttribute("data-section")
    scrollToSection(sectionId)

    // Close mobile menu if open
    mobileNav.classList.remove("active")
    mobileMenuToggle.classList.remove("active")
  })
})

// Skill Progress Animation
function animateSkillBars() {
  const skillCards = document.querySelectorAll(".skill-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".skill-progress")
          const width = progressBar.getAttribute("data-width")

          setTimeout(() => {
            progressBar.style.width = width + "%"
          }, 200)

          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  skillCards.forEach((card) => {
    observer.observe(card)
  })
}

// Initialize skill bar animation
animateSkillBars()

// Contact Form
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  alert("Thank you for your message! I'll get back to you soon.")
  contactForm.reset()
})

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".project-card, .tech-category, .skill-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Initialize scroll animations
initScrollAnimations()

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    if (body.getAttribute("data-theme") === "dark") {
      header.style.background = "rgba(15, 23, 42, 0.95)"
    }
  } else {
    header.style.background = "rgba(255, 255, 255, 0.8)"
    if (body.getAttribute("data-theme") === "dark") {
      header.style.background = "rgba(15, 23, 42, 0.8)"
    }
  }
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 50);
  }
})
