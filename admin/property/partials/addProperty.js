// localStorage.clear();

let id= null;
let propertyImages=[];
let arr =  JSON.parse(localStorage.getItem('propertyData'));

$("#uploadFile").change(function(e){
   catchImageFile= e.target.files;
   for(let allFiles of catchImageFile){
    Imgfilename= allFiles.name;

    let fileObj = {
        filename: Imgfilename
     }
     propertyImages.push(fileObj);
   }

})


$("#propertyForm").validate({

    errorClass: "error fail-alert",
    validClass: "valid success-alert",

 rules:{
    property_title:{
        required:true
    },
    room_type:{
        required:true
    },
    property_location:{
        required:true
    },
    // uploadFile:{
    //     required:true
    // }
 },messages:{
    property_title:{
        required:'Title field is required'
    },
    room_type:{
        required:'Room-type is required'
    },
    property_location:{                                                                                                 
        required:'Location field is required'
    },
    // uploadFile:{
    //     required:'Image field is required'
    // }

 },

 submitHandler: function(form){
    
     propertyTitle= $("#property_title").val();
     roomType= $("#room_type").val();
     propertyLocation= $("#property_location").val();
     PropertyDescription= $("#property_description").val();
     pricingPlan =$("#price_plan").val();
     PropertyImages= propertyImages

    event.preventDefault();

    propertyObj={
        propertyTitle:propertyTitle,
        roomType:roomType,
        propertyLocation:propertyLocation,
        PropertyDescription:PropertyDescription,
        pricingPlan:pricingPlan,
        PropertyImages:PropertyImages
    }

    $("#submit").text("Please wait..");
    $("#submit").attr("disabled", true);
    setTimeout(() => {
        $("#submit").attr("disabled", false);
        if(id==null){
            if(arr==null){
               let propData=[propertyObj];
               setLocalData(propData);
               $("#submit").text("Add");
               sessionStorage.setItem("CreateSuccess", "true");
                //  alert('Record has been created successfully');
            }else{
               arr.push(propertyObj);
               setLocalData(arr);
               $("#submit").text("Add");
               sessionStorage.setItem("CreateSuccess", "true");
            //    alert('Record has been created successfully');
            }
        }else{
            //update Logic
            updateData(id);
              id=null;
              $("#submit").text("Add");
              sessionStorage.setItem("UpdateSuccess", "true");
            //   alert('Record has been updated successfully');
        }
        resetData();
        window.location = "displayProperty.html"
    }, 1000);

 } 

});


//set Data in local Storage
function setLocalData(arrayData){
    localStorage.setItem('propertyData', JSON.stringify(arrayData));
}

function resetData(){
 $("#property_title").val('');
 $("#room_type").val('');
 $("#property_location").val('');
 $("#property_description").val('');
 $("#price_plan").val('');
 $("#uploadFile").val(null);
}

function diplayData(){
     if(arr !=null){
        let html="";
          arr.forEach((currentObj,index)=>{
              html= html + 
              `<tr>
                 <td>${currentObj.propertyTitle}</td>
                 <td>${currentObj.roomType}</td>
                 <td>${currentObj.propertyLocation}</td>
                 <td>${currentObj.PropertyDescription}</td>
                 <td>${currentObj.pricingPlan}</td>
                 <td><img src="../public/storage/property_images/${currentObj.PropertyImages[0].filename}" alt="" width=100></td>
                  
                 <td>
                 
                  <a href="./addProperty.html?index=${index}" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a> &nbsp;
                  <a href="#" class="btn btn-danger btn-sm" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i></a> 
                 </td>
                    
                 </tr>`
          })
          document.querySelector('.row_data').innerHTML=html;
          
     }else{
        alert("No Data exist")
     }
}

function deleteData(id){
    let message = confirm("Do you want to delete this record?");
    if(message){
        arr.splice(id,1);
        setLocalData(arr);
        diplayData();
        notify("", "Record has been deleted successfully", "error");
    }
  
}

function updateData(rid){
    // alert(`the value of id is ${rid}`);
    arr[rid].propertyTitle=propertyTitle;  
    arr[rid].roomType=roomType;
    arr[rid].propertyLocation=propertyLocation;
    arr[rid].PropertyDescription=PropertyDescription;
    // arr[rid].propertyImages[0].filename=propertyImages;
    localStorage.setItem('propertyData', JSON.stringify(arr));
    
}


