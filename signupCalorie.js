
//firebase config 
var firebaseConfig = {
    apiKey: "AIzaSyCXBYTuIG-YtwVbavq9cqTVn9LlLzQPu48",
    authDomain: "calorie-pal-8c6ab.firebaseapp.com",
    projectId: "calorie-pal-8c6ab",
    storageBucket: "calorie-pal-8c6ab.appspot.com",
    messagingSenderId: "1056260062896",
    appId: "1:1056260062896:web:3da46965064c9971b08575",
    measurementId: "G-TY7HQDVS99"
  };


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();


function signUp(){
    firstname = document.getElementById('firstname').value;
    lastname = document.getElementById('lastname').value;
    email = document.getElementById('email').value;
    password1 = document.getElementById('password1').value;
    password2 = document.getElementById('password2').value;

    if(validField(firstname) == false || validField(lastname) == false){ 
        //checks if all fields are filled out
        alert('Please fill out all fields.');
    } else if(checkEmail(email) == false){
        //checks valid email and if password longer than 6 characters
        alert('Invalid Email');
        return
    } else if(checkPassword(password1) ==false || checkPassword(password2) == false){
        alert('Please enter a password.');
    }

    //check if passwords match
    if(password1 != password2){
        alert('Passwords do not match');
        return
    }

    auth.createUserWithEmailAndPassword(email,password1).then(function(){
        var user = auth.currentUser;

        //Add user to firebase database
        var databaseRef = database.ref();

        //creating user data
        var userData = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            lastLogin:Date.now()
        }

        databaseRef.child('users/' + user.uid).set(userData);
        alert('User has been created');

    })
    .catch(function(error){
        //alert of errors
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })

}


/*
Checking if email is actually a valid email
*/
function checkEmail(email){
    check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(check.test(email) == true){
        //valid email
        return true;
    } else {
        //invalid email
        return false;
    }
}

/*
Checking if password is at least 6 characters
*/
function checkPassword(password){
    if(password > 6){
        //password must be greater than 6 characters
        return true;
    } else {
        return false;
    }
}

/*
checks if fields are filled out 
*/
function validField(field){
    if(field == null){
        return false
    }
    if(field.length <= 0){
        return false
    } else {
        return true
    }
}












