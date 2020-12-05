//My Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCWiJ1b5zKBTnLL7Cm1LbVPDoHGRCs8O_c",
    authDomain: "vinay-smh.firebaseapp.com",
    databaseURL: "https://vinay-smh.firebaseio.com",
    projectId: "vinay-smh",
    storageBucket: "vinay-smh.appspot.com",
    messagingSenderId: "798645509372",
    appId: "1:798645509372:web:fbb659b1a25c3038de8b79",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Firebase Analytics for insights on project
firebase.analytics();

//Instance of Firebase auth Module
var fireAuth = firebase.auth();

//firebase references to different sections
var imgRef = firebase.database().ref('image/');
var audRef = firebase.database().ref('audio/');
var vidRef = firebase.database().ref('video/');
//this function checks user's auth status to enable/disable downloading
fireAuth.onAuthStateChanged((user) => {
    updateViewPage();
    if (user) {
        // User is authenticated now
        console.log("signed in" + user.uid);
        document.getElementById('logBtn').style.display = 'none';
        document.getElementById('dashBtn').style.display = 'block';

    } else {
        // User is not authenticated yet
        console.log("You are not logged in, please login to proceed ahead");
        document.getElementById('dashBtn').style.display = 'none';
        document.getElementById('logBtn').style.display = 'block';
    }
});

//this function gets data from common space and updates the UI
function updateViewPage() {

    // //fetch data from firebase rtdb
    // imgRef.once('value', (snapshot) => { //Images' section
    //     snapshot.forEach((childSnapshot) => {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(childData.file);
    //         //renderImagesUI(childData);
    //     });
    // });
    // audRef.once('value', (snapshot) => { //Audios' section
    //     snapshot.forEach((childSnapshot) => {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(childData.file);
    //         //renderAudioUI(childData);
    //     });
    // });
    // vidRef.once('value', (snapshot) => { //videos' section
    //     snapshot.forEach((childSnapshot) => {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(childData.file);
    //         //renderVideoUI(childData);
    //     });
    // });

    //Now check if user is authenticated or not
    if (fireAuth.currentUser == null) {
        console.log("not logged in");
    }
    if (fireAuth.currentUser != null) {
        console.log("logged in");
        //now enable download buttons
        var dwnBtn = document.getElementsByClassName('dwn');
        for (var i = 0; i < dwnBtn.length; i++) {
            dwnBtn[i].style.display = 'block';
        }
    }

}

// const imageList = document.querySelector('#imgList');
// const audioList = document.querySelector('#audList');
// const videoList = document.querySelector('#vidList');

// function renderImagesUI(doc) {
//     let tr = document.createElement('tr');
//     let td1 = document.createElement('td');
//     let img1 = document.createElement('img');

//     tr.setAttribute('data-id', doc.file);
//     img1.src = doc.file;
//     img1.sizes = "(max-width: 320px) 480px,240px"
//     tr.appendChild(td1);
//     tr.appendChild(img1);
//     imageList.appendChild(tr);
// }


// function renderAudioUI(doc) {
//     let tr = document.createElement('tr');
//     let td1 = document.createElement('td');
//     let aud1 = document.createElement('audio');
//     let src1 = document.createElement('source');

//     tr.setAttribute('data-id', doc.file);
//     // aud1.setAttribute('src', doc.file);
//     src1.type = "audio/mp3";
//     src1.src = doc.file;
//     tr.appendChild(td1);
//     tr.appendChild(aud1);
//     tr.appendChild(src1);
//     audioList.appendChild(tr);
// }

// function renderVideoUI(doc) {
//     let tr = document.createElement('tr');
//     let td1 = document.createElement('td');
//     let vid1 = document.createElement('video');
//     let src1 = document.createElement('source');

//     tr.setAttribute('data-id', doc.file);
//     //vid1.setAttribute('src', doc.file);
//     src1.type = "video/mp4";
//     src1.src = doc.file;

//     tr.appendChild(td1);
//     tr.appendChild(vid1);
//     tr.appendChild(src1);
//     videoList.appendChild(tr);
// }