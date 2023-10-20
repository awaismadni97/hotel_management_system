let id = null;
let propertyDetailsObj = null;
let reservationArray = JSON.parse(localStorage.getItem("Reservations"));
let propertyArray = JSON.parse(localStorage.getItem("propertyData"));
let userArray = JSON.parse(localStorage.getItem("users"));
let completeReservationDetails = null;
$("#reservation_form").validate({
  errorClass: "error fail-alert",
  validClass: "valid success-alert",
  rules: {
    fullName: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
    phoneNumber: {
      required: true,
    },
    reservationDate: {
      required: true,
    },
  },
  messages: {
    fullName: {
      required: "Full Name is required",
    },
    email: {
      required: "Email is required",
    },
    phoneNumber: {
      required: "Phone Number is required",
    },
    reservationDate: {
      required: "Check in required",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    let fullName = $("#fullName").val();
    let email = $("#email").val();
    let phoneNumber = $("#phoneNumber").val();
    let reservationDate = $("#reservationDate").val();
    let userDetailsObj = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      reservationDate: reservationDate,
      userType: "client",
    };
        console.log(userDetailsObj);
      if (id == null) {
        // create logic
        if (reservationArray == null) {
          let reservationData = [
            {
              userDetailsObj,
              propertyDetailsObj,
            },
          ];
          localStorage.setItem("Reservations", JSON.stringify(reservationData));
  
          if (userArray == null) {
            userData = [userDetailsObj];
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            userArray.push(userDetailsObj);
            localStorage.setItem("users", JSON.stringify(userArray));
          }
        } else {
          // completeReservationDetails.push([userDetailsObj,propertyDetailsObj]);
          reservationArray.push({ userDetailsObj, propertyDetailsObj });
          localStorage.setItem("Reservations", JSON.stringify(reservationArray));
  
          if (userArray == null) {
            userData = [userDetailsObj];
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            userArray.push(userDetailsObj);
            localStorage.setItem("users", JSON.stringify(userArray));
          }
        }
      }else{
        // update logic
        updateData(id,email);
        sessionStorage.setItem("UpdateSuccess", "true");
          $("#submit").text("Add");
      }

      resetData();
      // window.location = "display_reservation.html";
    alert('Your booking has been done');
  }
  //  submit Handler closed
});

function resetData() {
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("reservationDate").value = "";
}

function fetchPropertyDetails(index) {
  propertyDetailsObj = propertyArray[index];
  console.log(propertyDetailsObj);
}

function displayData() {
  
  let html = "";
  reservationArray.forEach((reservationObj,index) => {
    html =
      html +
      `<tr>
    <td>${reservationObj.userDetailsObj.fullName}</td>
    <td>${reservationObj.userDetailsObj.email}</td>
    <td>${reservationObj.userDetailsObj.phoneNumber}</td>
    <td>${reservationObj.propertyDetailsObj.propertyTitle}</td>
    <td>${reservationObj.userDetailsObj.reservationDate}</td>
    <td>
      <a href="./reservation_form.html?queryParameter=${index}" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a>&nbsp;
      <a href="#" class="btn btn-danger btn-sm" onclick="deleteData('${reservationObj.userDetailsObj.email}')"><i class="fa-solid fa-trash"></i></a>
    </td>
          
    </tr>`;
  });
  document.querySelector(".row_data").innerHTML = html;
}

function deleteData(email){
let message=confirm('Do you really want to delete Data?');
if(message){
  reservationArray=reservationArray.filter((reservationObj)=>{
    return reservationObj.userDetailsObj.email !== email
  })
  localStorage.setItem('Reservations', JSON.stringify(reservationArray));

  displayData();
  notify("", "Record has been deleted successfully", "error");

  userArray=userArray.filter((userObj)=>{
    return userObj.email != email;
  })
  localStorage.setItem('users', JSON.stringify(userArray));


}

}

function updateData(id,email){
  //updatingReservation Array
  reservationArray[id].userDetailsObj.fullName=document.getElementById('fullName').value;
  reservationArray[id].userDetailsObj.email=document.getElementById('email').value;
  reservationArray[id].userDetailsObj.phoneNumber=document.getElementById('phoneNumber').value;
  reservationArray[id].userDetailsObj.reservationDate=document.getElementById('reservationDate').value;
  localStorage.setItem("Reservations", JSON.stringify(reservationArray));
  id=null;
    
  //updating userArray
    let userIndex = userArray.findIndex((Userobj)=>{
        return Userobj.email == email;
    })
    userArray[userIndex].email=document.getElementById('email').value;
    userArray[userIndex].fullName=document.getElementById('fullName').value;
    userArray[userIndex].phoneNumber=document.getElementById('phoneNumber').value;
    localStorage.setItem("users", JSON.stringify(userArray));
}

