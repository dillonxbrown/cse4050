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


function login(){
    //obtain input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

     //checks valid email and if password longer than 6 characters
     if(validEmail(email) == false || validPassword(password) == false){
        alert('Invalid Email or Password');
        return
    }


    //Authorize User sign in
    auth.signInWithEmailAndPassword(email,password).then(function(){
        var user = auth.currentUser;

        //Add user to firebase database
        var databaseRef = database.ref();

        //creating user data
        var userData = {
            lastLogin:Date.now()
        }

        databaseRef.child('users/' + user.uid).update(userData);
        alert('User has been logged in');

    })
    .catch(function(error){
        //alert of errors
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })
}

//function for sending email to user to reset password

function resetPass(){
    var auth = firebase.auth();
    emailReset = document.getElementById('forgottenPassEmail').value;
/*
   if(validField(emailReset) == false){
       window.alert("PLease fill out specified field.");
       return;
   } else if(validEmail(emailReset) == false){
       window.alert("Invalid Email");
       return;
   }*/
    auth.sendPasswordResetEmail(emailReset).then(function(){
        window.alert("Email has been sent. Please go verify.");
        console.log("success");
    })
    .catch(function(error){
        //alert of errors
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    })

}




//validating if email input is actually an email
function validEmail(Email){
    check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(check.test(email) == true){
        //email passes
        return true;
    } else {
        //email fails
        return false;
    }
}

//only accepting a valid password
function validPassword(password){
    //must be more than 6 characters
    if(password < 6){
        return false
    }else{
        return true
    }
}


//checking that each field is filled out
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
//forgot password modal
var modal = document.getElementById("forgotModal");

var forgotPassBtn = document.getElementById("forgot-pass");

//span element that closes modal
var span = document.getElementsByClassName("close")[0];

//when user clicks button display modal
forgotPassBtn.onclick = function(){
    modal.style.display = "block";
}

//when user clicks on x close 
span.onclick = function(){
    modal.style.display = "none";
}
/*
//user clicks anywhere out of modal close it 
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}*/