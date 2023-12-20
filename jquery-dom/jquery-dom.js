// Q1

$().ready(console.log("Let's get ready to party with jQuery!"));

// Q2

$('img').addClass('image-center');

// Q3

$('p').eq(-1).remove();

// Q4

$('#title').css('font-size', Math.random() * 100);

// Q5

$('ol').append($('<li>', {text: 'The new list element!'}));

// Q6

$('aside').empty().append($('p', {text: 'my apologies'}));

// Q7

$(".form-control").on('keyup blur change', function () {
    let red = $(".form-control").eq(0).val();
    let blue = $(".form-control").eq(1).val();
    let green = $(".form-control").eq(2).val();
    $("body").css("background-color",
        "rgb(" + red + "," + green + "," + blue + ")");
  });

// Q8

$("img").on('click', function (e) {
    $(this).remove();
  });