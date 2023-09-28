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


$("#myForm").validate({
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
    uploadFile:{
        required:true
    }
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
    uploadFile:{
        required:'Image field is required'
    }

 },submitHandler: function(form){
    
    let propertyTitle= $("#property_title").val();
    let roomType= $("#room_type").val();
    let propertyLocation= $("#property_location").val();
    let PropertyDescription= $("#property_description").val();
    let PropertyImages= propertyImages

    event.preventDefault();

    propertyObj={
        propertyTitle:propertyTitle,
        roomType:roomType,
        propertyLocation:propertyLocation,
        PropertyDescription:PropertyDescription,
        PropertyImages:PropertyImages
    }
      

    if(id==null){
        if(arr==null){
           let propData=[propertyObj];
           setLocalData(propData);
        }else{
           arr.push(propertyObj);
           setLocalData(arr);
        }
    }else{
        //update Logic
    }
    resetData();
    window.location = "displayProperty.html"

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
 $("#uploadFile").val(null);
}

function diplayData(){
     if(arr !=null){
        let html="";
          arr.forEach((currentObj,index)=>{
              console.log(currentObj);
              html= html + 
              `<tr>
                 <td>${currentObj.propertyTitle}</td>
                 <td>${currentObj.roomType}</td>
                 <td>${currentObj.propertyLocation}</td>
                 <td>${currentObj.PropertyDescription}</td>
                 <td><img src="../public/storage/property_images/${currentObj.PropertyImages[0].filename}" alt="" width=100></td>
               
                 <td>
                 <button type="button" class="editRecord">
                 <a href="./addProperty.html?index=${index}">Edit</a>
               </button>
                 <a href="#" onclick="deleteData(${index})">Delete</a> 
                 </td>
                    
                 </tr>`
          })
          document.querySelector('.row_data').innerHTML=html;
          
     }else{
        alert("No Data exist")
     }
}

function deleteData(id){
    arr.splice(id,1);
    setLocalData(arr);
    diplayData();
}

function editData(index){
    document.addEventListener('DOMContentLoaded', function () {
       
            alert('jhjh');
            id = index;
            console.log(id);
            // Make sure to access the element after the DOM is loaded
            document.getElementById('property_title').value = arr[index].propertyTitle;
        
    });
}





