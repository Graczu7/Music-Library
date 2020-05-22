const biogram = document.querySelector('#biogram');
const avatar = document.querySelector('#avatar');

auth.onAuthStateChanged(user => {
    if (user) {
        var docRef = db.collection("users").doc(user.uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                const html = `
                    <p>About <b>${doc.data().login}</b>:</p> 
                    <p>"${doc.data().bio}"</p>
                `;
                const img = `
                    <img src="${doc.data().avatar}" height=200 width:200"/>
                `;
                biogram.innerHTML = html;
                avatar.innerHTML = img;
            } else {
                console.log("No such document!");
                biogram.innerHTML = ''
                avatar.innerHTML = ''
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        console.log('user logged out');
    }
});

document.getElementById("bioChanger").onclick = function() {updatingBio()};
document.getElementById("avatarChanger").onclick = function() {updatingAvatar()};

// updatingUserBio
function updatingBio(){
    const newBio = document.getElementById("bioInput").value;
    if (newBio != '') {
        auth.onAuthStateChanged(user => {
            if (user) {
                var docRef = db.collection("users").doc(user.uid)
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        db.collection("users").doc(user.uid).update({
                            bio: newBio
                        });
                    } else {
                        console.log('Document does not exist.');
                    }
                })
            }
        })
        alert("You have succesfully updated your bio!");
        setTimeout(function () {
            window.location.reload(1);
        }, 1000);
    }
};

// updatingUserAvatar
function updatingAvatar(){
    const newAva = document.getElementById("avatarInput").value;
    if (newAva != '') {
        auth.onAuthStateChanged(user => {
            if (user) {
                var docRef = db.collection("users").doc(user.uid)
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        db.collection("users").doc(user.uid).update({
                            avatar: newAva
                        });
                    } else {
                        console.log('Document does not exist.');
                    }
                })
            }
        })
        alert("You have succesfully updated your avatar!");
        setTimeout(function () {
            window.location.reload(1);
        }, 1000);
    }
};

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html");
});