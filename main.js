
window.onload = function(){

	$("#foo").animate({width: "200px", left: "200px"}, 500)

	$("#foo").animate({height: "200px", top: "100px"}, 500)



	$("#foo").animate({color:"white"}, 500)
	$('#foo').click(function() {

		$("#foo").animate({left: "500px", "border-radius":"0px"}, 1000)
		AnimateRotate($('#foo'), 90);
		
	});

}


function AnimateRotate($elem, angle) {
    // caching the object for performance reasons
    // var $elem = $('#MyDiv2');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: 2000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}