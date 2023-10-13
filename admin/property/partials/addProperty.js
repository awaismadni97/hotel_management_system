// localStorage.clear();

let id= null;
let propertyImages=[];
let propertyAttributesArray=[];
let propertyAttributeObj =null;
let arr =  JSON.parse(localStorage.getItem('propertyData'));

//  get image file 
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

      // get_property_attribute_data

$("#save_btn").click(function(){
    $('#attrForm').submit(function(){
      $('.modal').modal('hide');
        //   let attr_array = JSON.parse(localStorage.getItem('property_attributes'));
          
          let roomLimit = $("#room_limit").val();
          let BedType =$("#bed_Type").val();
          let viewChoice=$('#view-choice').val();
          let NonSmokeyRoom =$('[name=smoke_options]:checked').val();
          let PetFriendly=$('[name=pet_options]:checked').val();
          let airConditioningService= $('[name=ac_options]:checked').val();
          let kitchenAvailablity=$('[name=kitchen_options]:checked').val();
          let tvService = $('[name=Tv_options]:checked').val();
          let roomService = $('[name=room_service]:checked').val();
          let privateBathRooms =$('[name=bathroom_service]:checked').val();
           
           event.preventDefault();
           propertyAttributeObj={
            roomLimit:roomLimit,
            BedType:BedType,
            viewChoice:viewChoice,
            NonSmokeyRoom:NonSmokeyRoom,
            PetFriendly:PetFriendly,
            airConditioningService:airConditioningService,
            kitchenAvailablity:kitchenAvailablity,
            tvService:tvService,
            roomService:roomService,
            privateBathRooms:privateBathRooms
          }
          
          propertyAttributesArray.push(propertyAttributeObj);
    
 });
    
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
        price_plan:{
            required:true
        }
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
        price_plan:{
            required:'Mention the price'
        }
        // uploadFile:{
        //     required:'Image field is required'
        // }
        
    },
    
     submitHandler: function(form){
        // event.preventDefault();
         propertyTitle= $("#property_title").val();
         roomType= $("#room_type").val();
         propertyLocation= $("#property_location").val();
         PropertyDescription= $("#property_description").val();
         pricingPlan =$("#price_plan").val();
         PropertyImages= propertyImages;
         propertyAttributesArray:propertyAttributesArray 
        
        propertyObj={
            propertyTitle:propertyTitle,
            roomType:roomType,
            propertyLocation:propertyLocation,
            PropertyDescription:PropertyDescription,
            pricingPlan:pricingPlan,
            PropertyImages:PropertyImages,
            propertyAttributesArray:propertyAttributesArray
        }
        event.preventDefault();     
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
                 <td>$${currentObj.pricingPlan}</td>
                 <td><img src="../public/storage/property_images/${currentObj.PropertyImages[0].filename}" alt="" width=100></td>
                  
                 <td>
                  <a href="" class="btn btn-info btn-sm"><i class="fa-regular fa-eye"></i></a>&nbsp;
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
    arr[rid].pricingPlan=pricingPlan,
    // arr[rid].propertyImages[0].filename=propertyImages;
    arr[rid].propertyAttributesArray=propertyAttributesArray;
    localStorage.setItem('propertyData', JSON.stringify(arr));
    
}



