// localStorage.clear();
let id = null;
let propertyImages = [];
let propertyAttributesArray = [];
let propertyAttributeObj = null;
let arr = JSON.parse(localStorage.getItem("propertyData"));

//  get image file
$("#uploadFile").change(function (e) {
  catchImageFile = e.target.files;
  alert(catchImageFile[0].name);
  for (let allFiles of catchImageFile) {
    Imgfilename = allFiles.name;

    let fileObj = {
      filename: Imgfilename,
    };
    propertyImages.push(fileObj);
  }
});

// get_property_attribute_data

$("#save_btn").click(function () {
  $("#attrForm").submit(function () {
    $(".modal").modal("hide");
    //   let attr_array = JSON.parse(localStorage.getItem('property_attributes'));

    let roomLimit = $("#room_limit").val();
    let BedType = $("#bed_Type").val();
    let viewChoice = $("#view-choice").val();
    let NonSmokeyRoom = $("[name=smoke_options]:checked").val();
    let PetFriendly = $("[name=pet_options]:checked").val();
    let airConditioningService = $("[name=ac_options]:checked").val();
    let kitchenAvailablity = $("[name=kitchen_options]:checked").val();
    let tvService = $("[name=Tv_options]:checked").val();
    let roomService = $("[name=room_service]:checked").val();
    let privateBathRooms = $("[name=bathroom_service]:checked").val();

    event.preventDefault();
    propertyAttributeObj = {
      roomLimit: roomLimit,
      BedType: BedType,
      viewChoice: viewChoice,
      NonSmokeyRoom: NonSmokeyRoom,
      PetFriendly: PetFriendly,
      airConditioningService: airConditioningService,
      kitchenAvailablity: kitchenAvailablity,
      tvService: tvService,
      roomService: roomService,
      privateBathRooms: privateBathRooms,
    };

    propertyAttributesArray.push(propertyAttributeObj);
  });
});

$("#propertyForm").validate({
  errorClass: "error fail-alert",
  validClass: "valid success-alert",

  rules: {
    property_title: {
      required: true,
    },
    room_type: {
      required: true,
    },
    property_location: {
      required: true,
    },
    price_plan: {
      required: true,
    },
    // uploadFile:{
    //     required:true
    // }
  },
  messages: {
    property_title: {
      required: "Title field is required",
    },
    room_type: {
      required: "Room-type is required",
    },
    property_location: {
      required: "Location field is required",
    },
    price_plan: {
      required: "Mention the price",
    },
    // uploadFile:{
    //     required:'Image field is required'
    // }
  },

  submitHandler: function (form) {
    // event.preventDefault();
    propertyTitle = $("#property_title").val();
    roomType = $("#room_type").val();
    propertyLocation = $("#property_location").val();
    PropertyDescription = $("#property_description").val();
    pricingPlan = $("#price_plan").val();
    PropertyImages = propertyImages;
    propertyAttributesArray: propertyAttributesArray;

    propertyObj = {
      propertyTitle: propertyTitle,
      roomType: roomType,
      propertyLocation: propertyLocation,
      PropertyDescription: PropertyDescription,
      pricingPlan: pricingPlan,
      PropertyImages: PropertyImages,
      propertyAttributesArray: propertyAttributesArray,
    };
    event.preventDefault();
    $("#submit").text("Please wait..");
    $("#submit").attr("disabled", true);
    setTimeout(() => {
      $("#submit").attr("disabled", false);
      if (id == null) {
        if (arr == null) {
          let propData = [propertyObj];
          setLocalData(propData);
          $("#submit").text("Add");
          sessionStorage.setItem("CreateSuccess", "true");
          //  alert('Record has been created successfully');
        } else {
          arr.push(propertyObj);
          setLocalData(arr);
          $("#submit").text("Add");
          sessionStorage.setItem("CreateSuccess", "true");
          //    alert('Record has been created successfully');
        }
      } else {
        //update Logic
        updateData(id);
        id = null;
        $("#submit").text("Add");
        sessionStorage.setItem("UpdateSuccess", "true");
        //   alert('Record has been updated successfully');
      }
      resetData();
      window.location = "displayProperty.html";
    }, 2000);
  },
});

//set Data in local Storage
function setLocalData(arrayData) {
  localStorage.setItem("propertyData", JSON.stringify(arrayData));
}

function resetData() {
  $("#property_title").val("");
  $("#room_type").val("");
  $("#property_location").val("");
  $("#property_description").val("");
  $("#price_plan").val("");
  $("#uploadFile").val(null);
}

function diplayData() {
  if (arr != null) {
    let html = "";
    arr.forEach((currentObj, index) => {
      html =
        html +
        `<tr>
                 <td>${currentObj.propertyTitle}</td>
                 <td>${currentObj.roomType}</td>
                 <td>${currentObj.propertyLocation}</td>
                 <td>$${currentObj.pricingPlan}</td>
                 <td><img src="../public/storage/property_images/${currentObj.PropertyImages[0].filename}" alt="" width=100></td>
                  
                 <td>
                  <a href="../reservations/reservation_form.html?index=${index}" class="btn btn-primary btn-sm">Book</a>&nbsp;
                  <a href="./PropertyDetails.html?index=${index}" class="btn btn-info btn-sm"><i class="fa-regular fa-eye"></i></a>&nbsp;
                  <a href="./addProperty.html?index=${index}" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a> &nbsp;
                  <a href="#" class="btn btn-danger btn-sm" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i></a> 
                 </td>
                    
                 </tr>`;
    });
    document.querySelector(".row_data").innerHTML = html;
  } else {
    alert("No Data exist");
  }
}

function deleteData(id) {
  let message = confirm("Do you want to delete this record?");
  if (message) {
    arr.splice(id, 1);
    setLocalData(arr);
    diplayData();
    notify("", "Record has been deleted successfully", "error");
  }
}

function updateData(rid) {
  // alert(`the value of id is ${rid}`);
  arr[rid].propertyTitle = propertyTitle;
  arr[rid].roomType = roomType;
  arr[rid].propertyLocation = propertyLocation;
  arr[rid].PropertyDescription = PropertyDescription;
  (arr[rid].pricingPlan = pricingPlan),
    
 console.log(arr[rid].propertyImages);
    (arr[rid].propertyAttributesArray = propertyAttributesArray);
  localStorage.setItem("propertyData", JSON.stringify(arr));
}

// For each and every property details
function showDetails(index) {
  document.getElementById("title_detail").innerText = arr[index].propertyTitle;
  document.getElementById("room_detail").innerText = arr[index].roomType;
  document.getElementById("location_detail").innerText =
    arr[index].propertyLocation;
  document.getElementById("description_details").innerText =
    arr[index].PropertyDescription;
  document.getElementById("pricing_details").innerText = arr[index].pricingPlan;

  document
    .getElementById("image_details")
    .setAttribute(
      "src",
      `../public/storage/property_images/${arr[index].PropertyImages[0].filename}`
    );

    
    if( arr[index].propertyAttributesArray[0].roomLimit == null){
      document.getElementById('room_limit_head').innerText='';
    }

    if(arr[index].propertyAttributesArray[0].BedType == null){
      document.getElementById('Bed_type_head').innerText="";
    } 

    if(arr[index].propertyAttributesArray[0].viewChoice == null){
      document.getElementById('view-choice_head').innerText='';
    }


  //  attributes info
  document.getElementById("room-details").innerText =
    arr[index].propertyAttributesArray[0].roomLimit; 
  document.getElementById("bed_details").innerText =
    arr[index].propertyAttributesArray[0].BedType;
  document.getElementById("view_details").innerText =
    arr[index].propertyAttributesArray[0].viewChoice;

  // For Yes/No attributes
  if (arr[index].propertyAttributesArray[0].NonSmokeyRoom === "1") {
    document.getElementById("smoke_details").innerText = "Yes";
  } else {
    document.getElementById("Non_Smokey_head").innerText = "";
  }

  if (arr[index].propertyAttributesArray[0].PetFriendly === "1") {
    document.getElementById("pet_details").innerText = "Yes";
  } else {
    document.getElementById("Pet_Friendly_head").innerText = "";
  }

  if(arr[index].propertyAttributesArray[0].airConditioningService ==='1'){
    document.getElementById('air_condition_details').innerText = "Yes"
  }else{
    document.getElementById('Air_Condition_head').innerText="";
  }

  if(arr[index].propertyAttributesArray[0].kitchenAvailablity ==='1'){
    document.getElementById('Kitchen_avalibilty_details').innerText ='Yes'
  }else{
    document.getElementById('Kitchen_availablity_head').innerText="";
  }

  if(arr[index].propertyAttributesArray[0].tvService ==='1'){
    document.getElementById('tv_details').innerText ='Yes'
  }else{
    document.getElementById('tv_service_head').innerText="";
  }

  if(arr[index].propertyAttributesArray[0].roomService ==='1'){
    document.getElementById('Room_Service_details').innerText ='Yes'
  }else{
    document.getElementById('Room_service_head').innerText="";
  }

  if(arr[index].propertyAttributesArray[0].privateBathRooms ==='1'){
    document.getElementById('bathroom_details').innerText ='Yes'
  }else{
    document.getElementById('privateBathroom_head').innerText="";
  }
  
}



