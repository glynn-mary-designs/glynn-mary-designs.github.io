// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const sideMenu = document.getElementById('sideMenu');

hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
  hamburgerBtn.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  hamburgerBtn.classList.remove('active');
});

// Close menu when a link is clicked
const menuLinks = document.querySelectorAll('.menu-list a');
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && sideMenu.classList.contains('open')) {
    sideMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
  }
});

// Draggable windows functionality
const windows = document.querySelectorAll('.window');

windows.forEach((draggable) => {
  draggable.translateX = 0;
  draggable.translateY = 0;
  draggable.addEventListener('mousedown', (e) => {
    currentDraggable = draggable;
    offsetX = e.clientX - draggable.translateX;
    offsetY = e.clientY - draggable.translateY;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  });
});

function drag(e) {
  if (currentDraggable) {
    currentDraggable.translateX = e.clientX - offsetX;
    currentDraggable.translateY = e.clientY - offsetY;
    currentDraggable.style.transform = `translate(${currentDraggable.translateX}px, ${currentDraggable.translateY}px)`;
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  currentDraggable = null;
}

// Add wiggle effect to X buttons
const closeButtons = document.querySelectorAll('.window-header span');

closeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering drag
    const windowElement = button.closest('.window');
    windowElement.classList.add('wiggle');
    setTimeout(() => {
      windowElement.classList.remove('wiggle');
    }, 500); // Remove class after animation duration
  });
});

// Sticky header opacity on scroll
const topMenu = document.querySelector('.top-menu');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxOpacity = 0.8;
  const minOpacity = 0.6;
  const fadeStart = 0;
  const fadeEnd = 300; // pixels to fade completely
  
  let opacity;
  if (scrollY <= fadeStart) {
    opacity = maxOpacity;
  } else if (scrollY >= fadeEnd) {
    opacity = minOpacity;
  } else {
    opacity = maxOpacity - ((scrollY - fadeStart) / (fadeEnd - fadeStart)) * (maxOpacity - minOpacity);
  }
  
  topMenu.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
});