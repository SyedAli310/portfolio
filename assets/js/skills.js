$(document).ready(function () {
    // random skill floating animation
    const floatingIcons = document.querySelectorAll('.floating-icons');
     floatingIcons.forEach( (icon, index) => {
       icon.style.animation = 'slide-in-up ease 300ms forwards'
       icon.style.animationDelay=`${100 * index}ms`;
     })
  function makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(".floating-skills").height() - 50;
    var w = $(".floating-skills").width() - 50;

    var nh = Math.abs(Math.floor(Math.random() * h) - 50);
    var nw = Math.abs(Math.floor(Math.random() * w) - 50);

    return [nh, nw];
  }

  function animateDiv(myclass) {
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000, function () {
      animateDiv(myclass);
    });
  }
  });
  