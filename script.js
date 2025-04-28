// Counter Animation
document.addEventListener('DOMContentLoaded', () => {
  // Counter animation for statistics
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
    const animate = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/,/g, '');
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(animate, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    animate();
  });

  // Enhanced Feature Cards Interactions
  const featureCardsInteractive = document.querySelectorAll('.feature-card');
  
  featureCardsInteractive.forEach((card, index) => {
    // Add sequential animation on page load
    setTimeout(() => {
      card.classList.add('animate-in');
    }, 300 * index);
    
    // Add interactive mouse movement effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // Apply the transformation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      
      // Move the icon based on mouse position
      const icon = card.querySelector('.w-16');
      if (icon) {
        icon.style.transform = `translate(${(x - centerX) / 10}px, ${(y - centerY) / 10}px) scale(1.1)`;
      }
      
      // Highlight text that mouse is near
      const listItems = card.querySelectorAll('li');
      listItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const distanceY = Math.abs(e.clientY - (itemRect.top + itemRect.height / 2));
        if (distanceY < 30) {
          item.classList.add('active-item');
        } else {
          item.classList.remove('active-item');
        }
      });
    });
    
    // Reset transforms when mouse leaves
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const icon = card.querySelector('.w-16');
      if (icon) {
        icon.style.transform = '';
      }
      card.querySelectorAll('li').forEach(item => {
        item.classList.remove('active-item');
      });
    });
    
    // Add click effect
    card.addEventListener('click', () => {
      card.classList.add('card-pulse');
      setTimeout(() => {
        card.classList.remove('card-pulse');
      }, 300);
    });
  });

  // Initialize logo carousel animation
  initLogoCarousel();
  
  // Initialize scroll reveal animations
  initScrollRevealAnimations();
  
  // Map points hover effect
  const esgPoints = document.querySelectorAll('.esg-point');
  
  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.classList.add('esg-tooltip', 'absolute', 'bg-white', 'shadow-lg', 'rounded-md', 'p-3', 'z-50', 'text-sm', 'hidden');
  document.querySelector('.data-visualization')?.appendChild(tooltip);
  
  esgPoints.forEach(point => {
    point.addEventListener('mouseover', (e) => {
      // Increase point size on hover
      point.setAttribute('r', parseInt(point.getAttribute('r')) + 2);
      
      // Show tooltip with data
      const region = point.getAttribute('data-region');
      const score = point.getAttribute('data-score');
      
      tooltip.innerHTML = `
        <div class="font-bold">${region}</div>
        <div>ESG Rating: <span class="font-semibold">${score}</span></div>
      `;
      
      tooltip.classList.remove('hidden');
      
      // Position tooltip near the point
      const svgRect = e.target.ownerSVGElement.getBoundingClientRect();
      const pointRect = e.target.getBoundingClientRect();
      
      const tooltipX = pointRect.left - svgRect.left + parseInt(point.getAttribute('r')) + 5;
      const tooltipY = pointRect.top - svgRect.top;
      
      tooltip.style.left = tooltipX + 'px';
      tooltip.style.top = tooltipY + 'px';
    });
    
    point.addEventListener('mouseout', () => {
      // Restore original point size
      point.setAttribute('r', parseInt(point.getAttribute('r')) - 2);
      
      // Hide tooltip
      tooltip.classList.add('hidden');
    });
  });

  // News section enhancements
  // Animate news cards when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('news-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const newsCards = document.querySelectorAll('#news .news-card');
  newsCards.forEach(card => {
    observer.observe(card);
  });

  // Add "Read More" functionality to news cards
  document.querySelectorAll('#news .read-more').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const newsTitle = this.closest('.news-card').querySelector('h3').textContent;
      alert(`Full article for "${newsTitle}" would open here.`);
    });
  });

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Navigation scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Feature Cards Animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    const delay = card.getAttribute('data-delay') || 0;
    
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: delay/1000,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.feature-cards-container',
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Data Cards Animation with Counter
  const dataCards = document.querySelectorAll('.data-card');
  
  dataCards.forEach(card => {
    const delay = card.getAttribute('data-delay') || 0;
    
    gsap.from(card, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: delay/1000,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.data-cards-container',
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => {
          // Animate counters after card animation
          setTimeout(() => {
            const counter = card.querySelector('.counter');
            if (counter) {
              animateCounter(counter);
            }
          }, parseInt(delay) + 600);
        }
      }
    });
  });
  
  // Counter animation function
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    let startTime = null;
    
    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.floor(progress * target);
      counter.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, { 
          duration: 1, 
          scrollTo: { y: targetElement, offsetY: 80 },
          ease: "power2.inOut"
        });
        
        // Close mobile menu
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Initialize environmental data animations
  initEnvironmentalAnimations();
});

// Initialize logo carousel
function initLogoCarousel() {
  const logoContainer = document.querySelector('.logo-slider-container');
  const logoTrack = document.querySelector('.logo-track');
  if (!logoContainer || !logoTrack) return;
  
  // Calculate proper animation duration based on number of logos
  const logoSlide = document.querySelector('.logo-slide');
  if (!logoSlide) return;
  
  // Ensure the logos have proper spacing
  const logos = document.querySelectorAll('.partner-logo');
  const totalLogos = logos.length;
  
  // Make sure we have proper width calculation
  const slideWidth = logoSlide.offsetWidth;
  const containerWidth = logoContainer.offsetWidth;
  
  // Adjusted animation duration calculation
  // The wider the carousel, the longer the animation should be
  const scrollSpeed = 40; // pixels per second - lower number means slower scroll
  const animationDuration = slideWidth / scrollSpeed;
  
  // Apply animation settings with GPU acceleration
  logoTrack.style.animationDuration = `${animationDuration}s`;
  logoTrack.style.transform = 'translate3d(0, 0, 0)'; // Force GPU acceleration
  
  // Create a smooth transition for when animation gets restarted (such as after browser tab inactivity)
  logoTrack.addEventListener('animationiteration', () => {
    // If the animation would cause flashing, we can use this event to handle smooth transitions
    // This helps in some browsers that might have a slight pause between iterations
    logoTrack.style.animationPlayState = 'running';
  });
  
  // Keep the animation running smoothly even when tab is inactive
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Smoothly restart the animation when tab becomes visible again
      logoTrack.style.animationPlayState = 'running';
    }
  });
  
  // No hover events for logo track - continuous scrolling
  
  // Add the partners section to the scroll reveal animations
  const partnersSection = document.querySelector('#partners');
  if (partnersSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          partnersSection.classList.add('reveal');
          observer.unobserve(partnersSection);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(partnersSection);
  }
}

// Initialize scroll reveal animations
function initScrollRevealAnimations() {
  // Use Intersection Observer to detect when elements enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add reveal class based on animation type
        const element = entry.target;
        const animationType = element.dataset.animation || 'fade-in-up';
        
        // Add animation class
        element.classList.add(`animate-${animationType}`, 'reveal');
        
        // For staggered animations of child elements
        if (element.dataset.stagger) {
          const children = element.querySelectorAll(element.dataset.stagger);
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1 + 0.1}s`;
            child.classList.add(`animate-${animationType}`, 'reveal');
          });
        }
        
        // Stop observing after animation is added
        observer.unobserve(element);
      }
    });
  }, { 
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly above the bottom of viewport
  });
  
  // Observe elements with 'data-animation' attribute
  document.querySelectorAll('[data-animation]').forEach(element => {
    observer.observe(element);
  });
  
  // Observe feature cards for staggered animation
  const featureSection = document.querySelector('#features');
  if (featureSection) {
    featureSection.dataset.stagger = '.feature-card';
    featureSection.dataset.animation = 'fade-in-up';
    observer.observe(featureSection);
  }
  
  // Observe news cards for staggered animation
  const newsSection = document.querySelector('#news');
  if (newsSection) {
    newsSection.dataset.stagger = '.news-card';
    newsSection.dataset.animation = 'fade-in-up';
    observer.observe(newsSection);
  }
  
  // Observe data cards for staggered animation
  const dataSection = document.querySelector('#data-overview');
  if (dataSection) {
    dataSection.dataset.stagger = '.stat-card';
    dataSection.dataset.animation = 'fade-in-up';
    observer.observe(dataSection);
  }

  // Add float animation to world map
  const worldMap = document.querySelector('.data-visualization svg');
  if (worldMap) {
    worldMap.classList.add('animate-float');
  }
  
  // Add pulse animation to chart center text
  const chartCenterText = document.querySelector('.chart-center-text');
  if (chartCenterText) {
    chartCenterText.classList.add('animate-pulse');
  }
}

// Environmental Data Animations
function initEnvironmentalAnimations() {
  // Animate sector bars
  const sectorBars = document.querySelectorAll('.sector-bar');
  const environmentPanel = document.querySelector('.environmental-data');
  
  if (environmentPanel) {
    // Create an observer for the environmental panel
    const envObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate sector bars with delays
          sectorBars.forEach((bar, index) => {
            setTimeout(() => {
              const width = bar.getAttribute('data-width') || '0%';
              bar.style.width = width;
              bar.classList.add('animated');
            }, 200 * index);
          });
          
          // Animate progress bars
          const progressBars = document.querySelectorAll('.progress-bar');
          progressBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add('animated');
            }, 300 * index);
          });
          
          // Animate vegetation bars
          const vegetationBars = document.querySelectorAll('.vegetation-bar');
          vegetationBars.forEach((bar, index) => {
            setTimeout(() => {
              const width = bar.getAttribute('data-width') || '0%';
              bar.style.width = width;
              bar.classList.add('animated');
            }, 250 * index);
          });
          
          // Animate grid items with staggered delay
          const gridItems = document.querySelectorAll('.env-grid-item');
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animated');
            }, 150 * index);
          });
          
          // Animate panels
          const panels = document.querySelectorAll('.env-panel');
          panels.forEach((panel, index) => {
            setTimeout(() => {
              panel.classList.add('animated');
            }, 200 * index);
          });
          
          // Animate fade-in elements
          const fadeElements = document.querySelectorAll('.fade-in');
          fadeElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animated');
            }, 100 * index);
          });
          
          // Disconnect observer once animations are triggered
          envObserver.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    
    envObserver.observe(environmentPanel);
  }
} 