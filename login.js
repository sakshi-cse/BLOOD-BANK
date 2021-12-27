let login_btn = document.getElementById("login_btn");


login_btn.addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let loader = document.getElementById("load");
    let wrap = document.getElementById("wrapper");
    loader.style.display = "block";
    wrap.style.filter = "blur(2px)";
    firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            wrap.style.filter = "blur(0px)";
            loader.style.display = "none";
           
            
            swal({
                title: "Congratulations",
                text: "Login Successfully!",
                icon: "success",
                })
              .then((data) => {
                if (data) {
                    
                 location="../pages/dashboard.html";
              }
            });
        })
        .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            wrap.style.filter = "blur(0px)";
            loader.style.display = "none";
            
            swal({
                title: "ERROR",
                text: errorMessage,
                icon: "warning",
                })
            // ...
        });
})

