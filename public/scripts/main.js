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

rhit.startFirebaseUI = function() {
	// FirebaseUI config.
	var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        //tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        //privacyPolicyUrl: function() {
        //  window.location.assign('<your-privacy-policy-url>');
        //}
      };

      // Initialize the FirebaseUI Widget using Firebase.
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

}

rhit.logAccountInfo = function() {
  
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
  console.log("Ready");

  if(document.querySelector("#mainPage")){
    document.querySelector("#lr1").onclick = (event) => {
      window.location.href = "login.html";
    }
	  document.querySelector("#statButton").addEventListener("click", (event) =>{
	  	document.querySelector("#statIndicator").style.display = "block";
	  	document.querySelector("#triviaIndicator").style.display = "none";
	  });
	  document.querySelector("#triviaButton").addEventListener("click", (event) =>{
	  	document.querySelector("#statIndicator").style.display = "none";
	  	document.querySelector("#triviaIndicator").style.display = "block";
    });

  }
  
  if(document.querySelector("#loginPage")){

    rhit.startFirebaseUI();
  }

};

rhit.main();
