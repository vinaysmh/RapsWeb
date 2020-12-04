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

//Initialize Firebase Analytics SDK
firebase.analytics();

//reference a firestore collection - users collection where all users' data is saved
var db = firebase.firestore().collection('users');
//reference to the firebase's storage service
var storageRef = firebase.storage().ref();
//Instance of Firebase auth Module
var fireAuth = firebase.auth();
//Function to set inner HTML values of some elements on the front END based on data from Back-END
function passedVal(id, data) {
    return document.getElementById(id).innerHTML = data;
}

// //audio upload section
var au = document.getElementById('a1');
var af = document.getElementById('audio');
af.addEventListener('change', function(e) {
    var id = fireAuth.currentUser.email;
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(id + '/audio.mp3');
    var task = storageRef.put(file);
    //This task uploads the selected file in our firebase storage bucket 
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        au.innerHTML = percentage.toString().substring(0, 5) + " %";
    }, function error() {
        window.alert("An Error has occured" + '\n' + error.message);
    }, function complete() {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.firestore().collection('users').doc(id).update({
                audio: downloadURL
            }).then(function() { //Called on completion of saving process
                document.getElementById('a3').style.display = 'block';
                document.getElementById('a2').style.display = 'none';
            });
        });
    });
});

// //video upload section
var vu = document.getElementById('v1');
var vf = document.getElementById('video');
vf.addEventListener('change', function(e) {
    var id = fireAuth.currentUser.email;
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(id + '/video.mp4');
    var task = storageRef.put(file);
    //This task uploads the selected file in our firebase storage bucket 
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        vu.innerHTML = percentage.toString().substring(0, 5) + " %";
    }, function error() {
        window.alert("An Error has occured" + '\n' + error.message);
    }, function complete() {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.firestore().collection('users').doc(id).update({
                video: downloadURL
            }).then(function() { //Called on completion of saving process
                document.getElementById('v3').style.display = 'block';
                document.getElementById('v2').style.display = 'none';
            });
        });
    });
});

// //image upload section
var imgu = document.getElementById('i1');
var imgf = document.getElementById('image');
imgf.addEventListener('change', function(e) {
    var id = fireAuth.currentUser.email;
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(id + '/image.png');
    var task = storageRef.put(file);
    //This task uploads the selected file in our firebase storage bucket 
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        imgu.innerHTML = percentage.toString().substring(0, 5) + " %";
    }, function error() {
        window.alert("An Error has occured" + '\n' + error.message);
    }, function complete() {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.firestore().collection('users').doc(id).update({
                image: downloadURL
            }).then(function() { //Called on completion of url saving process
                document.getElementById('i3').style.display = 'block';
                document.getElementById('i2').style.display = 'none';
            });
        });
    });
});

//Download files function


//firebase's auth-state-change listener updates UI accordingly when the user logs out of the system to prevent unauthorised access
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in now
        console.log("You are still signed in, don't worry, this feature has GOOGLE's Reliability");
        var docID = user.email;
        //Display only User's data on this page
        db.doc(docID).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                passedVal('name', doc.data().name);
                passedVal('email', doc.data().email);
                passedVal('dob', doc.data().dob);
                passedVal('regDate', doc.data().registeredOn);
                passedVal('uid', doc.data().uid);
                var imu = doc.data().image;
                var adu = doc.data().audio;
                var vdu = doc.data().video;
                if (imu != null) { //check if user has uploaded image
                    document.getElementById('imgUp').src = imu;
                    document.getElementById('imgDl').href = imu;
                    document.getElementById('imageSection').style.display = 'block';
                }
                if (adu != null) { //check if user has uploaded audio
                    document.getElementById('audUp').src = adu;
                    document.getElementById('audDl').href = adu;
                    document.getElementById('audioSection').style.display = 'block';
                }
                if (vdu != null) { //check if user has uploaded video
                    document.getElementById('vidUp').src = vdu;
                    document.getElementById('vidDl').href = vdu;
                    document.getElementById('videoSection').style.display = 'block';
                }
                if (imu != null || adu != null || vdu != null) { //If user has uploaded any file then the UI should display it/them
                    document.getElementById('viewUploads').style.display = 'block';
                }
                if (imu != null && adu != null && vdu != null) { //If user has uploaded all 3 files, no more uploads are allowed
                    document.getElementById('filesTable').style.display = 'none';
                }
            } else {
                // doc.data() is undefined in this case, so we say it as an error
                console.log("We are sorry, but there is no records of you");
            }
        }).catch(function(error) {
            console.log("Error getting your data", error);
        });
    } else {
        // User is signed out
        console.log("You have been logged out ");
        window.location.replace('../');
    }
});

//refresh the page to update upload status
function refreshPage() {
    window.location.reload();
}
//logging a user out of the system
function logMeOut() {
    window.alert("Confirm That You Want To Logout");
    firebase.auth().signOut()
        .then(() => console.log('User Signed Out'));
    window.location.replace('../');
}