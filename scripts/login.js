// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});


// login
const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const emailInfo = document.querySelector('#emailInfo').value;
    const passwordInfo = document.querySelector('#passwordInfo').value;

    auth.signInWithEmailAndPassword(emailInfo, passwordInfo).then(cred => {
        window.location.replace('mainScreen.html');
    }).catch(err => {
        alert("Wrong login or password! Please try again.")
        document.getElementById("loginForm").reset();
    });
});

//login Google
function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Success")
        console.log(result)
        location.replace("mainScreen.html");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        console.log(error)
        console.log("Failed to sign in")
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Success")
        console.log(result)
        location.replace("mainScreen.html");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        console.log(error)
        console.log("Failed to sign in")
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}