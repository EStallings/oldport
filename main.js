
window.onload = function(){

	$("#foo").animate({width: "200px", left: "200px"}, 500)

	$("#foo").animate({height: "200px", top: "100px"}, 500)



	$("#foo").animate({color:"white"}, 500)
	$('#foo').click(function() {

		$("#foo").animate({left: "500px", "border-radius":"0px"}, 1000)
	});
}