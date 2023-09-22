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

    
   
    
    


