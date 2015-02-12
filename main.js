
WIDTH = 250;
HEIGHT = 1080;

SPEED = 100; //number of points to diffuse at a time

var elapsed = 1;
var tick = new Date().getTime();
var baseline = 25;
function update(){
	var currentTick = new Date().getTime();
	elapsed = currentTick - tick;
	tick = currentTick;

	if(!failFlag) {
		// ensure a mostly steady framerate
		var factor = 20/elapsed;
		// var num = Math.floor(SPEED*((numPoints)/maxPoints+1)*factor);
		var num = SPEED * factor;

		for(var i = 0; i < num; i++){

			if(numPoints < maxPoints)
				 diffusePoint(num);
			if(failFlag)
				break;
		}
		if(sDistY > 2000){
			failFlag = true;
			//We've reached the end, basically
		}
	}
	if(!failFlag && numPoints < maxPoints) {
		draw();
		requestAnimationFrame(update);
	}
}

function rint(n){ return Math.floor(Math.random()*n) }

canvas = null;
context = null;
window.onload = function(){
	canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	var body = document.body,
    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, 
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	canvas.height= height
	$(window).resize(function(){
		var body = document.body,
	    html = document.documentElement;

		var height = Math.max( body.scrollHeight, body.offsetHeight, 
		                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		canvas.width = window.innerWidth;
		canvas.height = height
		draw();
	});
	
	context = canvas.getContext('2d');
	context.fillStyle = 'rgba(0,0,0,0)';
	context.fillRect(0,0,1000,1000);
	update();

	var fnavAbout = function(){
		weeble = true;
		$("#navAbout").addClass("active");
		$("#navProjects").removeClass("active");
		$("#navSkills").removeClass("active");
		$("#navWork").removeClass("active");
		$("#navEducation").removeClass("active");
		$("#navContact").removeClass("active");

	}
	var fnavProjects = function(){
		weeble = true;
		$("#navProjects").addClass("active");
		$("#navAbout").removeClass("active");
		$("#navSkills").removeClass("active");
		$("#navWork").removeClass("active");
		$("#navEducation").removeClass("active");
		$("#navContact").removeClass("active");

	}
	var fnavSkills = function(){
		weeble = true;
		$("#navSkills").addClass("active");
		$("#navAbout").removeClass("active");
		$("#navProjects").removeClass("active");
		$("#navWork").removeClass("active");
		$("#navEducation").removeClass("active");
		$("#navContact").removeClass("active");

	}
	var fnavWork = function(){
		weeble = true;
		$("#navWork").addClass("active");
		$("#navAbout").removeClass("active");
		$("#navProjects").removeClass("active");
		$("#navSkills").removeClass("active");
		$("#navEducation").removeClass("active");
		$("#navContact").removeClass("active");

	}
	var fnavEducation = function(){
		weeble = true;
		$("#navEducation").addClass("active");
		$("#navAbout").removeClass("active");
		$("#navProjects").removeClass("active");
		$("#navSkills").removeClass("active");
		$("#navWork").removeClass("active");
		$("#navContact").removeClass("active");

	}
	var fnavContact = function(){
		weeble = true;
		$("#navContact").addClass("active");
		$("#navAbout").removeClass("active");
		$("#navProjects").removeClass("active");
		$("#navSkills").removeClass("active");
		$("#navWork").removeClass("active");
		$("#navEducation").removeClass("active");
	}
	var weeble = false;
	$("#navAbout").click(fnavAbout);
	$("#navProjects").click(fnavProjects);
	$("#navSkills").click(fnavSkills);
	$("#navWork").click(fnavWork);
	$("#navEducation").click(fnavEducation);
	$("#navContact").click(fnavContact);
	var scrollDetect = function() {
		if(weeble)
		{
			weeble = false;
			return;
		}
		if($(this).scrollTop() - 40> $("#AboutHeader").offset().top) { fnavAbout(); }
		if($(this).scrollTop() - 40> $("#ProjectsHeader").offset().top) { fnavProjects(); }
		if($(this).scrollTop() - 40> $("#SkillsHeader").offset().top) { fnavSkills(); }
		if($(this).scrollTop() - 40> $("#WorkHeader").offset().top) { fnavWork(); }
		if($(this).scrollTop() - 40> $("#EducationHeader").offset().top) { fnavEducation(); }
		if($(this).scrollTop() - 40> $("#ContactHeader").offset().top) { fnavContact(); }
    }
    $(window).bind('scroll', scrollDetect);
		
	



}

function draw(){
	context.clearRect(0,0,canvas.width, canvas.height);
	context.fillStyle = 'rgba(20,200,20,0.5)';
	var scale = 4;
	var oX = (canvas.width*(3/4) - w2*scale)*1.0;
	var oY = (canvas.height/2 - h2*scale)*0.2;
	for(var i = 0; i < WIDTH && i < canvas.width; i++){
		for(var j = 0; j < HEIGHT && j < canvas.height; j++){
			if(map[i][j] == 1){
				context.fillRect(oX+i*scale, oY+j*scale, 2, 2);
			}
		}
	}
}



var particleDensity = 30;
var currentX = null;
var currentY = null;
var distBufferX = 10;
var distBufferY = 10;
var bufferSizeX = 50;
var bufferSizeY = 20;
var sDistX = distBufferX;
var sDistY = distBufferY;
var maxPoints = Math.floor((particleDensity/100) * (WIDTH * HEIGHT));
var numPoints = 0;
var w2 = WIDTH/2;
var h2 = HEIGHT/2;
var numTries = 500;
var numFails = 0;
var failThreshold = 500;
var failFlag = false;
var cX = w2;
var cY = 10;

//Make and initialize DLA specific stuff
var map = [];
for(var i = 0; i<WIDTH; i++){
	map[i] = [];
	for(var j = 0; j<HEIGHT; j++){
		map[i][j] = 0;
	}
	// map[i][HEIGHT-1] = 1;
}
map[w2][10] = 1;


function getRandPos(){
	for(var i = 0; i < numTries; i++){
		// oX = rint(bufferSizeX) + sDistX;
		// oY = rint(bufferSizeY) + sDistY;

		// currentX = boundsw((rint(2)==1) ? w2 + oX : w2 - oX);
		// currentY = boundsh((rint(2)==1) ? h2 + oY : h2 - oY);
		currentX = rint(WIDTH);
		currentY = (sDistY + rint(bufferSizeY));
		if(map[currentX][currentY] != 1){
			return;
		}
	}
	numFails++;
	if(numFails > failThreshold){
		failFlag = true;
	}
}

//Do diffusion of a single point
function diffusePoint(num)
{
	
	getRandPos();
	if(failFlag)
		return;
	
	var currentDiffusionSteps = 0;
	var success = true;
	while(testCurrentPosition() ){
		switch(rint(4))
		{
			case 0:	currentX = boundsw(currentX + 1); break;
			case 1:	currentX = boundsw(currentX - 1); break;
			case 2:	currentY = boundsh(currentY + 1); break;
			case 3:	currentY = boundsh(currentY - 1); break;
		}
		currentDiffusionSteps++;
		if (currentDiffusionSteps > 600000/num){
			success = false;
			break;
		}
	}
	if(success) {
		map[currentX][currentY] = 1;
		numPoints ++;
		var dx = Math.abs(currentX-cX) + distBufferX;
		var dy = Math.abs(currentY-cY) + distBufferY;
		sDistX = Math.max(dx, sDistX);
		sDistY = Math.max(dy, sDistY);
	
	}
	currentDiffusionSteps = 0;
}


function testCurrentPosition()
{
  return((map[currentX][boundsh(currentY+1)]  == 0) &&
  		(map[currentX][boundsh(currentY-1)] == 0) &&
  		(map[boundsw(currentX+1)][currentY]  == 0) &&
  		(map[boundsw(currentX-1)][currentY]  == 0));

}

function boundsw(n){
	if(n > WIDTH-1) return WIDTH-1;
	if(n < 0) return 0;
	return n;
}

function boundsh(n){
	if(n > HEIGHT-1) return HEIGHT-1;
	if(n < 0) return 0;
	return n;
}


// window.onload = function(){

// 	$("#foo").animate({width: "200px", left: "200px"}, 500)

// 	$("#foo").animate({height: "200px", top: "100px"}, 500)



// 	$("#foo").animate({color:"white"}, 500)
// 	$('#foo').click(function() {

// 		$("#foo").animate({left: "500px", "border-radius":"0px"}, 1000)
// 		AnimateRotate($('#foo'), 90);
		
// 	});

// }


// function AnimateRotate($elem, angle) {
//     // caching the object for performance reasons
//     // var $elem = $('#MyDiv2');

//     // we use a pseudo object for the animation
//     // (starts from `0` to `angle`), you can name it as you want
//     $({deg: 0}).animate({deg: angle}, {
//         duration: 2000,
//         step: function(now) {
//             // in the step-callback (that is fired each step of the animation),
//             // you can use the `now` paramter which contains the current
//             // animation-position (`0` up to `angle`)
//             $elem.css({
//                 transform: 'rotate(' + now + 'deg)'
//             });
//         }
//     });
// }