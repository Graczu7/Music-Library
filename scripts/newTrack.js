// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});

document.getElementById("add").onclick = function() {quasiSearch()};

// quasiSearchFromGoogleCloudFirestore
function quasiSearch(){
    const col = db.collection('albums');
    const query = col.where('title', '==', document.getElementById("checkAlbum").value);
    console.log(query)

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var id = (doc.id);
            if (id) {
                addingData(id);
                return;
            }
        });
        if (document.getElementById("checkAlbum").value != '') {
            alert('The "' + document.getElementById("checkAlbum").value + '" album is not existing in MusicLibrary database!');
            document.getElementById('addingAlbums').reset();
        }
    });
};

// updatingMyLibrary
function addingData(id){
    const ID = 'albums/' + id;

    db.collection('tracks').add({
        aid: ID,
        title: document.getElementById("addTitle").value,
        length: document.getElementById("addLength").value,
        number: document.getElementById("addNumberOnAlbum").value,
    });
    alert("Track added succesfully!");
    document.getElementById('addingAlbums').reset();
};