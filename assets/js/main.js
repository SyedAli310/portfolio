
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

        //show/hide menu
        // if($('.navbar').attr('aria-expanded') === 'true'){
        //     $('.navbar').attr('aria-expanded', 'false');
        // } else if ($('.navbar').attr('aria-expanded') === 'false'){
        //     $('.navbar').attr('aria-expanded', 'true');
        // }
        $('.navbar').toggleClass('is-open');
    })
    $(document).on('scroll', ()=>{
        checkScroll();
    })
});