const form = document.querySelector('#add-toBookshelf-form');
const formA = document.querySelector('#add-artist-toBookshelf-form');
const mySearchResult = document.querySelector('#searchResults');
const mySearchResultA = document.querySelector('#searchResultsA');
const mySearchResultB = document.querySelector('#cover');

// quasiSearchFromGoogleCloudFirestore
function quasiSearch(){

    const col = db.collection('albums');
    const query = col.where('title', '==', form.title.value);

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var book = (doc.id, doc.data());
            displayPossible(book);
            form.title.value = '';     
        });
    });
};

function quasiSearchArtist(){

    const col = db.collection('artists-bands');
    const query = col.where('name', '==', formA.name.value);

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var artist = (doc.id, doc.data());
            displayPossibleArtist(artist);
            formA.name.value = '';     
        });
    });
};

// displayingSearchResult
function displayPossible(doc){
    mySearchResult.innerHTML = "";

    let tr = document.createElement('tr');
    let title = document.createElement('td');
    let artist = document.createElement('td');
    let genre = document.createElement('td');
    let publication_year = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    title.textContent = doc.title;
    artist.textContent = doc.author;
    genre.textContent = doc.genre;
    publication_year.textContent = doc.year;

    tr.appendChild(title);
    tr.appendChild(artist);
    tr.appendChild(genre);
    tr.appendChild(publication_year);

    mySearchResult.appendChild(tr);
};

function displayPossibleArtist(doc){
    mySearchResultA.innerHTML = "";

    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let about = document.createElement('td');
    let genre = document.createElement('td');
    let publication_year = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.name;
    about.textContent = doc.bio;
    genre.textContent = doc.genre;
    publication_year.textContent = doc.year;

    tr.appendChild(name);
    tr.appendChild(about);
    tr.appendChild(genre);
    tr.appendChild(publication_year);

    mySearchResultA.appendChild(tr);
};


function displayAlbumCover() {
    var title = document.getElementById("searchResults").rows[0].cells[0].innerHTML;
    if (title) {
        // Create a reference to the file we want to download
        var storageRef = firebase.storage().ref('albums_covers/' + title);
        console.log(storageRef)

        // Get the download URL
        storageRef.getDownloadURL().then(function(url) {
            console.log(url)
            displayCover(url);

        
        }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
            // File doesn't exist
            break;

            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;

            case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
        });
    } else {
        alert("Search album first!");
    }
}

function displayCover(url){
    console.log('jestemtutaj')
    const img = `
        <img src="${url}" height=200 width:200"/>
    `;
    mySearchResultB.innerHTML = img;
}