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
rhit.FB_COLLECTION_PROFILE = "Profile";
rhit.FB_KEY_NICKNAME = "Nickname";
rhit.FB_KEY_AGE = "Age";
rhit.FB_KEY_COUNTRY = "Country";
rhit.FB_KEY_STATE = "State"
rhit.FB_KEY_USER = "User"
rhit.fbUserManager = null;
rhit.fbSingleUserManager = null;
rhit.fbAuthManager = null;

rhit.User = class {
	constructor(id, nickname, age, country, state, user) {
		this.id = id;
		this.nickname = nickname;
		this.age = age;
		this.country = country;
		this.state = state;
		this.user = user;
	}

}

//manage the mainpage slide effect
$(document).ready(function () {
	var slideNum = $('.page').length,
		wrapperWidth = 100 * slideNum,
		slideWidth = 100 / slideNum;
	$('.wrapper').width(wrapperWidth + '%');
	$('.page').width(slideWidth + '%');

	$('button.scrollitem').click(function () {
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

rhit.startFirebaseUI = function () {
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

rhit.FbUserManager = class {
	constructor() {
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_PROFILE);
		this._unsubscribe = null;
	}

	add(nickname, age, country, state) {
		this._ref.add({
			[rhit.FB_KEY_NICKNAME]: nickname,
			[rhit.FB_KEY_AGE]: age,
			[rhit.FB_KEY_COUNTRY]: country,
			[rhit.FB_KEY_STATE]: state,
			[rhit.FB_KEY_USER]: rhit.fbAuthManager.uid,
		})
			.then(function (docRef) {
				console.log("User profile written with ID: ", docRef.id);
			})
			.catch(function (error) {
				console.error("Error adding profile: ", error);
			});

	}

	beginListening(changeListener) {
		let query = this._ref;
		this._unsubscribe = query.onSnapshot((querySnapshot) => {
			console.log("User Profile Update");
			this._documentSnapshots = querySnapshot.docs;
			changeListener();
		})
	}

	stopListening() {
		this._unsubscribe();
	}

	update(nickname, age, country, state) { }
	delete(id) { }

	get length() {
		return this._documentSnapshots.length;
	}

	getUserAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const user = new rhit.User(
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_NICKNAME),
			docSnapshot.get(rhit.FB_KEY_AGE),
			docSnapshot.get(rhit.FB_KEY_COUNTRY),
			docSnapshot.get(rhit.FB_KEY_STATE),
			docSnapshot.get(rhit.FB_KEY_USER)
		)
		return user;
	}
}

rhit.MainPageController = class {
	constructor() {
		//set the bottom navbar indicator
		document.querySelector("#statButton").addEventListener("click", (event) => {
			document.querySelector("#statIndicator").style.display = "block";
			document.querySelector("#triviaIndicator").style.display = "none";
		});
		document.querySelector("#triviaButton").addEventListener("click", (event) => {
			document.querySelector("#statIndicator").style.display = "none";
			document.querySelector("#triviaIndicator").style.display = "block";
		});

		document.querySelector("#menuSignOut").addEventListener("click", (event) => {
			rhit.fbAuthManager.signOut();
		});

		rhit.fbUserManager.beginListening(this.updateList.bind(this));

	}

	checkForProfile(){
		let profileCreated = false;
		let profileId = "";
		for (let i = 0; i < rhit.fbUserManager.length; i++) {
			const profile = rhit.fbUserManager.getUserAtIndex(i);
			if (profile.user == rhit.fbAuthManager.uid) {
				profileCreated = true;
				profileId = profile.id;
			}
		}
		return profileCreated;
	}

	updateList() {
		console.log("update main page");

		if (rhit.fbAuthManager.isSignedIn) {
			let profileCreated = false;
			let profileId = "";
			for (let i = 0; i < rhit.fbUserManager.length; i++) {
				const profile = rhit.fbUserManager.getUserAtIndex(i);
				if (profile.user == rhit.fbAuthManager.uid) {
					profileCreated = true;
					profileId = profile.id;
				}
			}
			document.querySelector("#menuEdit").addEventListener("click", (event) => {
				location.href = `/account.html?id=${profileId}`;
			});
			if (!profileCreated) {
				rhit.fbUserManager.add("", "", "", "", rhit.fbAuthManager.uid)
				setTimeout(function () {
					for (let i = 0; i < rhit.fbUserManager.length; i++) {
						const profile = rhit.fbUserManager.getUserAtIndex(i);
						if (profile.user == rhit.fbAuthManager.uid) {
							profileId = profile.id;
						}
					}
					location.href = `/account.html?id=${profileId}`;
				}, 1000);	
			}

		}
		
	}
}

rhit.FbSingleUserManager = class {
	constructor(docId) {
		this._documentSnapshot = {};
		this._unsubscribe = null;
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_PROFILE).doc(docId);
		console.log(`${this._ref.path}`);
	}
	beginListening(changeListener) {
		this._unsubscribe = this._ref.onSnapshot((doc => {
			if (doc.exists) {
				this._documentSnapshot = doc;
				console.log(this._documentSnapshot.data());
				changeListener();
			} else {
				console.log("no such document");
			}
		}))
	}
	stopListening() {
		this._unsubscribe();
	}
	update(nickname, age, country, state) {
		this._ref.update({
			[rhit.FB_KEY_NICKNAME]: nickname,
			[rhit.FB_KEY_AGE]: age,
			[rhit.FB_KEY_COUNTRY]: country,
			[rhit.FB_KEY_STATE]: state
		})
			.then(() => {
				console.log("Document updated");
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
	}

	delete() {
		return this._ref.delete();
	}

	get nickname() {
		return this._documentSnapshot.get(rhit.FB_KEY_NICKNAME);
	}

	get age() {
		return this._documentSnapshot.get(rhit.FB_KEY_AGE);
	}

	get country() {
		return this._documentSnapshot.get(rhit.FB_KEY_COUNTRY);
	}

	get state() {
		return this._documentSnapshot.get(rhit.FB_KEY_STATE);
	}
}

rhit.ProfilePageController = class {
	constructor() {
		document.querySelector("#applyBtn").addEventListener("click", (event) => {
			const nickname = document.querySelector("#inputNickname").value;
			const age = document.querySelector("#inputAge").value;
			const country= document.querySelector("#countries").value;
			const state = document.querySelector("#states").value;

			rhit.fbSingleUserManager.update(nickname, age, country, state);
			setTimeout(function () {
				window.location.href = "index.html";
			}, 1000);

		});

		document.querySelector("#deleteBtn").addEventListener("click", (event) => {
			
			rhit.fbSingleUserManager.delete().then(function () {
				console.log("signOut");
				rhit.fbAuthManager.signOut();
			}).then(function () {
				console.log("document deleted");
				window.location.href = "index.html";
			}).catch(function (error) {
				console.error("Error deleting document", error);
			});

		});

		rhit.fbSingleUserManager.beginListening(this.updateList.bind(this));

	}

	updateList() {
		console.log("update Account Page");
		document.querySelector("#inputNickname").value = rhit.fbSingleUserManager.nickname;
		document.querySelector("#inputAge").value = rhit.fbSingleUserManager.age;
		document.querySelector("#countries").value = rhit.fbSingleUserManager.country;
		document.querySelector("#states").value = rhit.fbSingleUserManager.state;


	}

}

rhit.initializePage = function () {
	if (document.querySelector("#mainPage")) {
		new rhit.MainPageController();
		//direct to the login page if the user haven't log in
		if (!rhit.fbAuthManager.isSignedIn) {
			document.querySelector("#lr1").onclick = (event) => {
				window.location.href = "login.html";
			}
		}
	}

	if (document.querySelector("#loginPage")) {
		console.log("Ready");
		rhit.startFirebaseUI();
		document.querySelector("#rosefireBtn").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
	}

	if (document.querySelector("#accountPage")) {
		console.log("on account page");

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const docId = urlParams.get("id");

		if(!docId){
			console.log("error, no Id");
			window.location.href = "/";
		}
		rhit.fbSingleUserManager = new rhit.FbSingleUserManager(docId);
		new rhit.ProfilePageController();

	}
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	rhit.fbAuthManager = new rhit.FbAuthManager();

	rhit.fbAuthManager.beginListening(() => {
		if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
			window.location.href = "/";
		}

		rhit.fbUserManager = new rhit.FbUserManager();
		rhit.initializePage();
	});

};

rhit.main();
