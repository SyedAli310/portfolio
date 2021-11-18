
$(document).ready(function() {
    function checkScroll(){
        if($(document).scrollTop() > 1){
            $('.main-navigation').addClass('scrolled');
        } else {
            $('.main-navigation').removeClass('scrolled');
        }
    }
    checkScroll();
    $('#mobile-nav-toggle').on('click', ()=>{
        // animate button
        $('#mobile-nav-toggle').toggleClass('open');
        // toggle navigation
        $('.navbar').toggleClass('is-open');
    })
    $(document).on('scroll', checkScroll)
});