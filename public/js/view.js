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
    if (user) {
        // User is authenticated now
        console.log("signed in" + user.uid);
        document.getElementById('logBtn').style.display = 'none';
        document.getElementById('dashBtn').style.display = 'block';
        updateViewPage(user);
    } else {
        // User is not authenticated yet
        console.log("You are not logged in, please login to proceed ahead");
        document.getElementById('dashBtn').style.display = 'none';
        document.getElementById('logBtn').style.display = 'block';
    }
});

//this function gets data from common space and updates the UI
function updateViewPage(user) {
    if (user == null) {
        console.log("not logged in");
    }
    if (user != null) {
        console.log("logged in");
        //fetch data from firebase rtdb
        imgRef.once('value', (snapshot) => { //Images' section
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childData.file);
            });
        });
        audRef.once('value', (snapshot) => { //Audios' section
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childData.file);
            });
        });
        vidRef.once('value', (snapshot) => { //videos' section
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childData.file);
            });
        });

        //now enable download buttons
        var dwnBtn = document.getElementsByClassName('dwn');
        for (var i = 0; i < dwnBtn.length; i++) {
            dwnBtn[i].style.display = 'block';
        }
    }

}