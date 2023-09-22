// Registeration code
let id = null;

$("#register_form").validate({
  errorClass: "error fail-alert",
  validClass: "valid success-alert",

  rules: {
    Name: {
      required: true,
      maxlength: 15,
    },

    Email: {
      required: true,
      email: true,
    },

    Password: {
      required: true,
      minlength: 5,
    },

    Confirm_Password: {
      required: true,
      minlength: 5,
      equalTo: "#password",
    },
  },
  messages: {
    Name: {
      required: "Full name field is required",
      maxlength: "Maximum Length is 16 characters",
    },

    Email: {
      required: "Email field is required",
      email: "Enter a valid email",
    },

    Password: {
      required: "Password field is required",
      minlength: "Your password must be atleast 5 characters long",
    },

    Confirm_Password: {
      required: "Confirm Password field is required",
      minlength: "Your password must be atleast 5 characters long",
      equalTo: "Please enter the same password as above",
    },
  },

  submitHandler: function (form) {

    let fullName = $("#fullName").val();
    let email = $("#email").val();
    let password = $("#password").val();

    event.preventDefault();
    //password encryption
    cipher = CryptoJS.AES.encrypt(password, "CIPHERKEY");
    let cryptPassword = cipher.toString();
    console.log("cryptPassword");

    let userObj = {
      fullName: fullName,
      email: email,
      password: cryptPassword,
    };

    $("#submit").text("Please wait..");
    $("#submit").attr("disabled", true);
    setTimeout(() => {
      $("#submit").attr("disabled", false);
      $("#submit").text("Register");
      
      let arr = JSON.parse(localStorage.getItem("users"));
        if (id == null) {
   
        // create record
       
       if (arr == null) {
          let userData = [userObj];
          localStorage.setItem("users", JSON.stringify(userData));

          sessionStorage.setItem("loginSuccess", "true");
          window.location.href = "./login.html";
          notify("Success", "You are successfully registered", "success");
        } else if(arr){
           
          let error =false;
          arr.some((obj)=>{
            if(obj.email === email){
               error =true;
            } 

          })
             if(error==true){
              notify("Sorry", "Email already exist try again.", "warning");
             }else{
         
          arr.push(userObj);
          localStorage.setItem("users", JSON.stringify(arr));
          console.log("After registration code");
          sessionStorage.setItem("loginSuccess", "true");
          window.location.href = "./login.html";
          notify("Success", "You are successfully registered", "success");
          }
        
        }
      } else {
        // update logic
      }
 
      $("#fullName").val("");
      $("#email").val("");
      $("#password").val("");
      $("#cpassword").val("");
      $("#fullName").attr("autofocus", true);
    }, 2000);
  },
});

// login Page

$("#login_form").validate({
  rules: {
    Email: {
      required: true,
    },

    Password: {
      required: true,
    },
  },
  submitHandler: function () {
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    let arr = JSON.parse(localStorage.getItem("users"));

    $("#login_btn").text("Please wait..");
    $("#login_btn").attr("disabled", true);
    setTimeout(() => {
      $("#login_btn").attr("disabled", false);
      $("#login_btn").text("Login");
      if (arr) {
        // let emailMatch = false;
        let isValidAuth = false;

        arr.find(checkCredentials);

        function checkCredentials(obj) {
          if (obj.email === email) {
            const decrypted = CryptoJS.AES.decrypt(obj.password, "CIPHERKEY");
            const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8); // Convert decrypted data to a string
            if (decryptedPassword === password) {
              // Compare decrypted password with user-entered password
              isValidAuth = true;
            }
          }
        }

        
         
        if (isValidAuth == true) {
          const  token = makeid(50);
          localStorage.setItem('token', token);
          window.location.href = "../Home/dashboard.html";
        } else {
          notify("Error", "Invalid credentials", "error");
        }
      } else {
        notify("Sorry","The email address you entered isn't connected to an account.","error");
      }

      $("#password").val("");
    }, 2000);
  },
});




