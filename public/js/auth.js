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

//reference a firestore collection - users collection where all users' data is saved
var db = firebase.firestore().collection('users');

// Function to get form values from user's input form
function getVal(id) {
    return document.getElementById(id).value;
}

//Function to handle and log the users in
function login() {
    event.preventDefault();
    var emm = getVal('email');
    var pss = getVal('pwd');
    console.log(emm + '\n' + pss);

    //Transfer control to firebase-auth sdk
    fireAuth.signInWithEmailAndPassword(emm, pss)
        .then((user) => {
            // Successfully Signed in and the firebase's auth-state-change listener updates UI accordingly
            window.location.replace('home.html');
        })
        .catch((error) => {
            //Errors in authentication are handled here
            var erc = error.code;
            var erm = error.message;
            console.log(erc + '\n' + erm);
            window.alert("Following Error Encountered" + '\n' + erm);
        });
}

//Function to handle user registration
function register() {
    event.preventDefault();
    var emm = getVal('email1');
    var pss = getVal('pwd1');
    var nmm = getVal('name');
    var dbb = getVal('dob');
    console.log(emm + '\n' + pss + '\n' + nmm + '\n' + dbb);

    //Transfer control to firebase-auth sdk
    fireAuth.createUserWithEmailAndPassword(emm, pss)
        .then((user) => {
            saveData(emm, nmm, dbb);
        })
        .catch((error) => {
            //Errors in registration are handled here -auth module
            var erc = error.code;
            var erm = error.message;
            console.log(erc + '\n' + erm);
            window.alert("Following Error Encountered " + '\n' + erm);
        });
}

// User authenticated - Transfer the control to firestore-SDK to save personal details in database
function saveData(e, n, d) {
    var id = fireAuth.currentUser.uid;
    console.log(id); //unique id of logged in user
    var cdt = new Date().toString(); //Current Date Time
    //Now all data is passedon to firestore API for saving
    if (id != null) {
        db.doc(e).set({
                name: n,
                email: e,
                dob: d,
                uid: id,
                registeredOn: cdt
            }).then(function() { //Called on completion of saving process
                console.log("Data Saved Successfully :)");
                window.alert("User Registered Successfully" + '\n' + "You Are Logged-In Automatically" + '\n' + "Click OK to proceed to your Dashboard");
                window.location.replace('home.html');
            })
            .catch(function(error) { //Called when data isn't saved to db or any errors occur -db module
                console.error("An Error Occured While Saving Your Data: ", error);
            });
    }
}
//Function to allow users to reset their passwords
function resett() {
    event.preventDefault();
    var emm = getVal('email2');
    console.log(emm);
    window.alert("Are you sure that you want to reset your password");
    //Transfer control to firebase-auth SDK
    fireAuth.sendPasswordResetEmail(emm).then(function() {
        // Email sent, display notification to users
        window.alert("Request Accepted Successfully" + '\n' +
            "Instruction had been sent to your requested email address" + '\n' +
            "Click OK to proceed to login page");
        window.location.replace('../');
    }).catch(function(error) {
        //Some error occured, handle below
        console.log(error.code + '\n' + error.message);
        window.alert(error.message);
    });
}

//firebase's auth-state-change listener updates UI accordingly
fireAuth.onAuthStateChanged((user) => {
    if (user) {
        // User is authenticated now
        console.log("signed in");
    } else {
        // User is not authenticated yet
        console.log("You are not logged in, please login to proceed ahead");
    }
});