
// login Page

$("#login_form").validate({
  rules: {
    Email: {
      required: true,
    },

    Password: {
      required: true,
    },
    userType:{
      required: true,
    }
  },
  submitHandler: function () {
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    let userType= $("#userType").val();
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
          if (obj.email === email && obj.userType === userType) {
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
      $("#userType").val("");
    }, 2000);
  },
});




