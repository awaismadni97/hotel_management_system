
let id = null;
let arr = JSON.parse(localStorage.getItem("users"));

   $("#userForm").validate({
    errorClass: "error fail-alert",
    validClass: "valid success-alert",

    rules:{
      fullName:{
        required:true
      },
      email:{
        required:true,
        email:true
      },
      userType:{
        required:true
      }
    },
    messages:{
      fullName:{
        required:'Full Name is required'
      },
      email:{
        required:'Email is required',
        email:'Invalid email format'
      },
      userType:{
        required:'userType is required'
      }
    },
    submitHandler: function(form){
      let userName= $("#fullName").val();
      let email= $("#email").val();
      let userType= $("#userType").val();
      event.preventDefault();

      let userObj= {
        userName:userName,
        email:email,
        userType:userType
      }

     if(id==null){
      // create logic
      if(arr==null){
        let userData = [userObj];
        setlocalData(userData);
      }else{
        arr.push(userObj);
        setlocalData(arr);
      }
     }else{
      // update logic
     }
      resetData();
    }
     //  submit Handler closed
   });
  //  jquery validate closed
 

   





function displayData() {
    let html = "";
    for (let userData of arr) {
      html = html + `<tr>
      <td>${userData.fullName}</td>
      <td>${userData.email}</td>
      <td>
         <a href="" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a>&nbsp;
         <a href="" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></a>
      </td>
      </tr>`               

    }
    document.querySelector(".row_data").innerHTML = html;
  
}

function resetData(){
   $("#fullName").val()="";
   $("#email").val()="";
   $("#userType").val()="";
}

function setlocalData(array){
  localStorage.setItem('users', JSON.stringify(array));
}

