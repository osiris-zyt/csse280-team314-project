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
rhit.fbAuthManager = null;

//manage the mainpage slide effect
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
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
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

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
	}
	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const phoneNumber = user.phoneNumber;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        // ...
        console.log("user signed in ", uid);
        console.log('email:>>', email);
        console.log('phoneNumber:>>', phoneNumber);
        console.log('photoURL:>>', photoURL);
        console.log('isAnonymous:>>', isAnonymous);
      } else {
        console.log("no user signed in");
        // User is signed out.
        // ...
      }
			this._user = user;
			changeListener();
		});
	}
	signIn() {
		Rosefire.signIn("0f3acb1a-0f53-4807-83b7-d1e119140355", (err, rfUser) => {
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);

			// Next use the Rosefire token with Firebase auth.
			firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
				if (error.code === 'auth/invalid-custom-token') {
					console.log("The token you provided is not valid.");
				} else {
					console.log("signInWithCustomToken error", error.message);
				}
      });
		});


	}
	signOut() {
		firebase.auth().signOut();
	}
	get uid() {
		return this._user.uid;
	}
	get isSignedIn() {
		return !!this._user;
	}

}

rhit.initializePage = function(){
  if(document.querySelector("#mainPage")){
    //direct to the login page if the user haven't log in
    if(!rhit.fbAuthManager.isSignedIn){
      document.querySelector("#lr1").onclick = (event) => {
        window.location.href = "login.html";
      }
    }
    //set the bottom navbar indicator
	  document.querySelector("#statButton").addEventListener("click", (event) =>{
	  	document.querySelector("#statIndicator").style.display = "block";
	  	document.querySelector("#triviaIndicator").style.display = "none";
	  });
	  document.querySelector("#triviaButton").addEventListener("click", (event) =>{
	  	document.querySelector("#statIndicator").style.display = "none";
	  	document.querySelector("#triviaIndicator").style.display = "block";
    });

    document.querySelector("#menuSignOut").addEventListener("click", (event) =>{
			rhit.fbAuthManager.signOut();
		});

  }
  
  if(document.querySelector("#loginPage")){
    console.log("Ready");
    rhit.startFirebaseUI();
    document.querySelector("#rosefireBtn").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
  }
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
  console.log("Ready");

  rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbAuthManager.beginListening(() => {
    if(document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn){
      window.location.href = "/";
    }
		rhit.initializePage();
	});

};

rhit.main();
