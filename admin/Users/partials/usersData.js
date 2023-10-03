
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

      let fullName= $("#fullName").val();
      let email= $("#email").val();
      let userType= $("#userType").val();
      event.preventDefault();

      let userObj= {
        fullName:fullName,
        email:email,
        userType:userType
      }
        
      $("#submit").text("Please wait..");
      $("#submit").attr("disabled", true);

      setTimeout(() => {
        $("#submit").attr("disabled", false);
        if(id==null){
          // create logic
          if(arr==null){
            let userData = [userObj];
            setlocalData(userData);
            $("#submit").text("Add");
            sessionStorage.setItem("CreateSuccess", "true");
          }else{
            arr.push(userObj);
            setlocalData(arr);
            sessionStorage.setItem("CreateSuccess", "true");
            $("#submit").text("Add");
          }
         }else{
          // update logic
          updateData(id);
          sessionStorage.setItem("UpdateSuccess", "true");
          $("#submit").text("Add");
         }
         resetData();
         window.location = "/Users/display_users.html"
      }, 2000);
          // set Timeout closed
    }
     //  submit Handler closed
   });
  //  jquery validate closed
 

   





function displayData() {
    let html = "";
    arr.forEach((userObj, index)=>{
      html = html + `<tr>
      <td>${userObj.fullName}</td>
      <td>${userObj.email}</td>
      <td>${userObj.userType}</td>
      <td>
         <a href="/Users/add_user.html?index=${index}" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a>&nbsp;
         <a href="#" class="btn btn-danger btn-sm" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i></a>
      </td>
      </tr>`      
    });
   
    document.querySelector(".row_data").innerHTML = html;
  
}

function deleteData(index){
let message= confirm("Do you want to delete this record?");
if(message){
  arr.splice(index,1);
  setlocalData(arr);
  displayData();
  notify("", "Record has been deleted successfully", "error");
}
}

function resetData(){
   $("#fullName").val('');
   $("#email").val('');
   $("#userType").val('');
}

function setlocalData(array){
  localStorage.setItem('users', JSON.stringify(array));
}

function updateData(id){
    //  alert(id);
    arr[id].fullName = $("#fullName").val();
    arr[id].email= $("#email").val();
    arr[id].userType=$("#userType").val();
   
  //   console.log(arr[id].fullName);
    setlocalData(arr);
    console.log(arr);
   id=null
    
}
