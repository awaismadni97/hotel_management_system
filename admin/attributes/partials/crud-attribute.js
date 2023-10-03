let id = null;
let arr = JSON.parse(localStorage.getItem("attributes"));

$.validator.addMethod(
  "numericOnly",
  function (value, element) {
    // Define a regular expression that allows only numeric values
    var numericRegex = /^[0-9]+$/;

    // Test the input value against the regular expression
    return this.optional(element) || numericRegex.test(value);
  },
  "Please enter only numeric values."
);

$("#attribute_form").validate({
  errorClass: "error fail-alert",
  validClass: "valid success-alert",

  rules: {
    attribute_title: {
      required: true,
    },
    display_order: {
      required: true,
      numericOnly: true,
    },
  },
  messages: {
    attribute_title: {
      required: "Attribute title is required",
    },
    display_order: {
      required: "Display_order is required",
      numericOnly: "Please enter only numeric values.",
    },
  },
  submitHandler: function (form) {
    let attribute_title = $("#attribute_title").val();
    let display_order = $("#display_order").val();
    event.preventDefault();
    let attributeObj = {
      attribute_title: attribute_title,
      display_order: display_order,
    };
     
    $("#submit").text("Please wait..");
      $("#submit").attr("disabled", true);
    setTimeout(() => {
        $("#submit").attr("disabled", false);
      if (id == null) {
        //create logic
        if (arr == null) {
          let attributeData = [attributeObj];
          setlocalData(attributeData);
          $("#submit").text("Add");
          sessionStorage.setItem("CreateSuccess", "true");
        } else {
          arr.push(attributeObj);
          setlocalData(arr);
          $("#submit").text("Add");
          sessionStorage.setItem("CreateSuccess", "true");
        }
      } else {
        //update logic
        updateData(id);
        sessionStorage.setItem("UpdateSuccess", "true");
        $("#submit").text("Add");
      }
      resetData();
      window.location = "/admin/attributes/display_attribute.html";
    }, 2000);
    //    set Timeout closed
  },
  // submit handler is closed
});
// validation function closed

function displayData() {
  let html = "";
  arr.forEach((attributeObj, index) => {
    html =
      html +
      `<tr>
                    <td>${attributeObj.attribute_title}</td>
                    <td>${attributeObj.display_order}</td>
                    <td>
                        <a href="/admin/attributes/add_attribute.html?index=${index}" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square text-white" style="color: #3c5072;"></i></a>&nbsp;
                        <a href="#" class="btn btn-danger btn-sm" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i></a>
                    </td>
                   </tr>`;
  });
  document.querySelector(".row_data").innerHTML = html;
}

function deleteData(index) {
  let message = confirm("Do you want to delete this record?");
  if (message) {
    arr.splice(index, 1);
    setlocalData(arr);
    displayData();
    notify("", "Record has been deleted successfully", "error");
  }
}

function updateData(id) {
  arr[id].attribute_title = $("#attribute_title").val();
  arr[id].display_order = $("#display_order").val();
  setlocalData(arr);
  id = null;
}

function setlocalData(array) {
  localStorage.setItem("attributes", JSON.stringify(array));
}

function resetData() {
  $("#attribute_title").val("");
  $("#display_order").val("");
}
