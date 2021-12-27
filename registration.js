let login_li = document.getElementById("login_li");
let logout_li = document.getElementById("logout_li");

//

let reg_btn = document.getElementById("reg_btn");

let email_s = document.getElementById("email");
let name_s = document.getElementById("name");
let blood_grp_s = document.getElementById("blood_grp");
let address_s = document.getElementById("address");
let num_s = document.getElementById("number");
let age_s = document.getElementById("age");

//

let down = document.getElementById("down");
let sub_btn = document.getElementById("sub_btn");

let uid;
window.addEventListener("load",()=>
{
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            uid = user.uid;
            email_s.value=user.email;
            console.log(uid)
        }
    
    })
})

// submit button event

sub_btn.addEventListener("click", () => {
    let email = email_s.value;
    let name = name_s.value;
    let address = address_s.value;
    let blood_grp = blood_grp_s.value;
    let age = age_s.value;
    let number = num_s.value;

    if (age <= 0) {
        swal({
            title: "ERROR",
            text: "Type in the appropriate age",
            icon: "warning",
        })
    }
    else {
        if (name !== "" && email != "" && address != "" && age != "" && blood_grp != "") {
            if (number.length != 10) {
                swal({
                    title: "ERROR",
                    text: "Phone number must have 10 digits!",
                    icon: "warning",
                })
            }
            else {
                let donor =
                {
                    name,
                    email,
                    address,
                    age,
                    blood_grp,
                    number

                }
               

               
                let db = firebase.database().ref();
               // firebase.auth().createUserWithEmailAndPassword(email, password)

                db.child(uid).push("registered");
                db.child("donors").push(donor)
                    .then(() => {
                        swal({
                            title: "ThankYou",
                            text: "Registration Successful!",
                            icon: "success",
                        })
                        .then(()=>
                        {
                            location.assign("../pages/dashboard.html");
                        })

                    })
                    .catch((error) => {
                        swal({
                            title: "ERROR",
                            text: error.message,
                            icon: "warning"
                        })
                    });
            }
        }
        else {
            swal({
                title: "ERROR",
                text: "Please fill in all the input fields",
                icon: "warning",
            })
        }


    }
})