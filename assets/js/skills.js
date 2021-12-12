$(document).ready(function () {
    // random skill floating animation
    const floatingIcons = document.querySelectorAll('.floating-icons');
     floatingIcons.forEach( (icon, index) => {
       icon.style.animation = 'slide-in-up ease 300ms forwards'
       icon.style.animationDelay=`${100 * index}ms`;
     })

  });
  