$('.btn').on("click", function(){
    $('.btn').toggleClass('close-btn');
    $('.sidebar').toggleClass('sidebar-open');
    if ($("#btn").hasClass("close-btn")) {
        $(this).attr('src', 'assets/shared/icon-close.svg')
    } else {
        $(this).attr('src', 'assets/shared/icon-hamburger.svg')
    }
  });

