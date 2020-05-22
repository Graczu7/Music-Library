// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});

document.getElementById("add").onclick = function() {addingData()};

// updatingMyLibrary
function addingData(){

    db.collection('albums').add({
        title: document.getElementById("addTitle").value,
        author: document.getElementById("addAuthor").value,
        genre: document.getElementById("addGenre").value,
        year: document.getElementById("addYear").value,
    });

    alert("Album added succesfully!");
    document.getElementById('addingAlbums').reset();
    
};

//Get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Listen for file selection
fileButton.addEventListener('change', function(e) {
    if (document.getElementById("addTitle").value) {
        //Get file
        var file = e.target.files[0];

        //Create a storage ref
        var storageRef = firebase.storage().ref('albums_covers/' + document.getElementById("addTitle").value);

        //Upload file
        var task = storageRef.put(file);

        //Update progress bar
        task.on('state_changed', 
        
            function progress(snapshot) {
                uploader.style["width"] = "100%";
            },

            function error(err) {
            },

            function complete() {
            }
        );
        alert("Cover uploaded successfully!");

    } else {
        alert("Fill the album title before assignin the album's cover!");
    }
});
