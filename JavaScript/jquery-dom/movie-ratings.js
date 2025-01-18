let movieRatings = $("#movie-ratings")

movieRatings.on("submit", function(e) {
    e.preventDefault();
    let title = $('#title').val();
    let rating = $('#rating').val();
    $('#movie-list').append($('<li>', {text: `Title: ${title} Rating: ${rating}`}));
    $('#movie-list li').eq(-1).append($('<button>', {text: 'X'}));
});

$('#movie-list').on('click' ,'button' , function(){
    $(this).parent().remove();
});