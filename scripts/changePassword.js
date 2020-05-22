const biogram = document.querySelector('#info');
const form = document.querySelector('form')

auth.onAuthStateChanged(user => {
    if (user) {
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                const html = `
                    <p>Logged as <b>${doc.data().login}.</b>
                `;
                const img = `
                    <img src="${doc.data().avatar}" height=200 width:200"/>
                `;
                info.innerHTML = html;
            } else {
                console.log("No such document!");
                info.innerHTML = ''
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        console.log('user logged out');
    }
});

function check(input) {
    if (input.value != document.getElementById('newInput').value) {
        input.setCustomValidity('Password Must be Matching.');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newConfirmationInput").value

    user.updatePassword(newPassword).then(function() {
        // logout
        alert("You have succesfully changed your password. Please relog.")
        auth.signOut();
        window.location.replace("index.html");
    }).catch(function(error) {
        alert("Please relog, you are logged for so long. Please check Google Firebase Authentication standards for more details.")
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html");
});