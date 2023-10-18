let id = null
let propertyDetailsObj = null
let reservationArray = JSON.parse(localStorage.getItem('Reservations'))
let propertyArray = JSON.parse(localStorage.getItem('propertyData'))
let userArray = JSON.parse(localStorage.getItem('users'))
let completeReservationDetails = null
$('#reservation_form').validate({
  errorClass: 'error fail-alert',
  validClass: 'valid success-alert',
  rules: {
    fullName: {
      required: true
    },
    email: {
      required: true,
      email: true
    },
    phoneNumber: {
      required: true
    },
    reservationDate: {
      required: true
    }
  },
  messages: {
    fullName: {
      required: 'Full Name is required'
    },
    email: {
      required: 'Email is required'
    },
    phoneNumber: {
      required: 'Phone Number is required'
    },
    reservationDate: {
      required: 'Check in required'
    }
  },
  submitHandler: function (form, event) {
    event.preventDefault()
    let fullName = $('#fullName').val()
    let email = $('#email').val()
    let phoneNumber = $('#phoneNumber').val()
    let reservationDate = $('#reservationDate').val()
    let userDetailsObj = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      reservationDate: reservationDate,
      userType: 'client'
    }

    if (id == null) {
      if (reservationArray == null) {
        let reservationData = [
          {
            userDetailsObj,
            propertyDetailsObj
          }
        ]
        localStorage.setItem('Reservations', JSON.stringify(reservationData))

        if (userArray == null) {
          userData = [userDetailsObj]
          localStorage.setItem('users', JSON.stringify(userData))
        } else {
          userArray.push(userDetailsObj)
          localStorage.setItem('users', JSON.stringify(userArray))
        }
      } else {
        // completeReservationDetails.push([userDetailsObj,propertyDetailsObj]);
        reservationArray.push({ userDetailsObj, propertyDetailsObj })
        localStorage.setItem('Reservations', JSON.stringify(reservationArray))

        if (userArray == null) {
          userData = [userDetailsObj]
          localStorage.setItem('users', JSON.stringify(userData))
        } else {
          userArray.push(userDetailsObj)
          localStorage.setItem('users', JSON.stringify(userArray))
        }
      }
    }
    resetData()
  }
})

function resetData () {
  document.getElementById('fullName').value = ''
  document.getElementById('email').value = ''
  document.getElementById('phoneNumber').value = ''
  document.getElementById('reservationDate').value = ''
}

function fetchPropertyDetails (index) {
  propertyDetailsObj = propertyArray[index]
  console.log(propertyDetailsObj)
}
