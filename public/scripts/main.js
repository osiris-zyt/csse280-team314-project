/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.variableName = "";

/** function and class syntax examples */
rhit.functionName = function () {
	/** function body */
};

rhit.ClassName = class {
	constructor() {

	}

	methodName() {

	}
}

$(document).ready(function() {
  var slideNum = $('.page').length,
    wrapperWidth = 100 * slideNum,
    slideWidth = 100 / slideNum;
  $('.wrapper').width(wrapperWidth + '%');
  $('.page').width(slideWidth + '%');

  $('button.scrollitem').click(function() {
    $('button.scrollitem').removeClass('selected');
    $(this).addClass('selected');

    var slideNumber = $($(this).attr('href')).index('.page'),
      margin = slideNumber * -100 + '%';

    $('.wrapper').animate({
      marginLeft: margin
    }, 1000);
    return false;
  });
});

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	document.querySelector("#statButton").addEventListener("click", (event) =>{
		document.querySelector("#statIndicator").style.display = "block";
		document.querySelector("#triviaIndicator").style.display = "none";
	});
	document.querySelector("#triviaButton").addEventListener("click", (event) =>{
		document.querySelector("#statIndicator").style.display = "none";
		document.querySelector("#triviaIndicator").style.display = "block";
	});

};

rhit.main();
