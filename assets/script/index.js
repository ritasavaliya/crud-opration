let tablebody = document.getElementById("bodydata");
let temp = [];
let formstore = localStorage.getItem("localstore");
let btn = document.getElementById("formsubmit");

if (formstore === null) {
  temp = [];
} else {
  temp = JSON.parse(formstore);
}
window.addEventListener("load", () => {
  temp.map((item, index) => {
    getData(item, index);
  });
});

// function formValidation(id) {
//   let getid = document.getElementById(id).value;
//   if (getid === "") {
//     seterror("nameerror", "please enter your name");
//     seterror("dateerror", "please enter your date of birth");
//     seterror("cityerror", "please select your city");
//     seterror("addresserror", "please enter your address");
//   } else {
//     seterror("nameerror", "");
//     seterror("dateerror", "");
//     seterror("cityerror", "");
//     seterror("addresserror", "");
//   }
// }
function namevalidation() {
  fullName = document.getElementById("fullname").value;
  if (fullName === "") {
    seterror("nameerror", "please enter your name");
    return true;
  } else {
    seterror("nameerror", "");
    return false;
  }
}

function gendervalidation() {
  gender = document.getElementsByName("gender");
  if (gender[0].checked == false && gender[1].checked == false) {
    seterror("gendererror", "please select your gender");
    return true;
  } else {
    seterror("gendererror", "");
    return false;
  }
}

function datevalidation() {
  dateofbirth = document.getElementById("dateofbirth").value;
  if (dateofbirth === "") {
    seterror("dateerror", "please enter your date of birth");
    return true;
  } else {
    seterror("dateerror", "");
    return false;
  }
}

function cityvalidation() {
  city = document.getElementById("city").value;
  if (city === "Addcity") {
    seterror("cityerror", "please select your city");
    return true;
  } else {
    seterror("cityerror", "");
    return false;
  }
}

function hobbyvalidation() {
  hobby = document.getElementsByName("hobby");
  let inputcheckbox = [];

  for (var i = 0; i < hobby.length; i++) {
    if (hobby[i].checked) {
      inputcheckbox.push(hobby[i].value);
    }
  }
  if (inputcheckbox.length > 0) {
    seterror("hobbyerror", "");
    return false;
  } else {
    seterror("hobbyerror", "please select your hobby");
    return true;
  }
}

function addressvalidation() {
  address = document.getElementById("address").value;
  if (address === "") {
    seterror("addresserror", "please enter your address");
    return true;
  } else {
    seterror("addresserror", "");
    return false;
  }
}

function submitvalidation(event, id) {
  event.preventDefault();
  fullName = document.getElementById("fullname").value;
  gender = document.getElementsByName("gender");
  var rate_value;
  for (var i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      rate_value = gender[i].value;
    }
  }
  let genderr = rate_value;
  dateofbirth = document.getElementById("dateofbirth").value;
  city = document.getElementById("city").value;
  hobby = document.getElementsByName("hobby");
  let inputcheckbox = new Array();

  for (var i = 0; i < hobby.length; i++) {
    if (hobby[i].checked) {
      inputcheckbox.push(hobby[i].value);
    }
  }
  var hobbyre = inputcheckbox.join(",");

  address = document.getElementById("address").value;
  // if (
  //   (formValidation(id) && gendervalidation() && hobbyvalidation()) ||
  //   formValidation(id) ||
  //   gendervalidation() ||
  //   hobbyvalidation()
  // ) {
  // } else {
  //   const formdata = {
  //     name: fullName,
  //     gender: genderr,
  //     dateofbirth: dateofbirth,
  //     city: city,
  //     hobby: hobbyre,
  //     address: address,
  //   };
  if (
    (namevalidation() &&
      gendervalidation() &&
      datevalidation() &&
      cityvalidation() &&
      hobbyvalidation() &&
      addressvalidation()) ||
    namevalidation() ||
    gendervalidation() ||
    datevalidation() ||
    cityvalidation() ||
    hobbyvalidation() ||
    addressvalidation()
  ) {
  } else {
    const formdata = {
      name: fullName,
      gender: genderr,
      dateofbirth: dateofbirth,
      city: city,
      hobby: hobbyre,
      address: address,
    };
    if (btn.value === "submit") {
      getData(formdata, temp.length);
      storeData(formdata);
      resetData();
    } else {
      let indexdata = temp[newid];
      let trdata = document.getElementById(`rowdata${newid}`);
      let updatedata = (indexdata = formdata);
      temp.splice(newid, 1, updatedata);
      newdata = `<tr id="rowdata${newid}"><td>${formdata.name}</td><td>${formdata.gender}</td><td>${formdata.dateofbirth}</td><td>${formdata.city}</td><td>${formdata.hobby}</td><td>${formdata.address}</td><td><button class="editbutton" type='submit' id="editbtn" onclick="dataEdit(${newid})" ><i class="fa fa-edit"></i>
  </button><button type='submit' id="deletebtn" onclick='dataDelete(${newid})'><i class="fa fa-trash-o"></i>
  </button></td></tr>`;
      localStorage.setItem("localstore", JSON.stringify(temp));
      trdata.innerHTML = newdata;
      resetData();
    }
  }
}

function storeData(formdata) {
  temp.push(formdata);
  localStorage.setItem("localstore", JSON.stringify(temp));
}

function getData(formdata, index) {
  let newdata = "";
  newdata =
    newdata +
    `<tr id="rowdata${index}"><td>${formdata.name}</td><td>${formdata.gender}</td><td>${formdata.dateofbirth}</td><td>${formdata.city}</td><td>${formdata.hobby}</td><td>${formdata.address}</td><td><button class="editbutton" type='submit' id="editbtn" onclick="dataEdit(${index})" ><i class="fa fa-edit"></i>
  </button><button type='submit' id="deletebtn" onclick='dataDelete(${index})'><i class="fa fa-trash-o"></i>
  </button></td></tr>`;
  tablebody.innerHTML += newdata;
}

function resetData() {
  document.getElementById("fullname").value = "";
  document.getElementsByName("gender");
  var rate_value;
  for (var i = 0; i < gender.length; i++) {
    if ((gender[i].checked = false)) {
      rate_value = gender[i].value;
    }
  }
  document.getElementById("dateofbirth").value = "";
  document.getElementById("city").value = "";
  document.getElementsByName("hobby");
  let inputcheckbox = new Array();

  for (var i = 0; i < hobby.length; i++) {
    if ((hobby[i].checked = false)) {
      inputcheckbox.push(hobby[i].value);
    }
  }
  document.getElementById("address").value = "";
}

function seterror(id, error) {
  let formerror = document.getElementById(id);
  formerror.innerHTML = error;
}

function dataDelete(index) {
  let tableid = document.getElementById(`rowdata${index}`);
  temp.splice(index, 1);
  localStorage.setItem("localstore", JSON.stringify(temp));
  tableid.remove();
}

function dataEdit(index) {
  newid = index;
  let rowdata = Object.values(temp[index]);
  document.forms["contactform"]["fullname"].value = rowdata[0];
  const gender = document.forms["contactform"]["gender"];
  for (var i = 0; i < gender.length; i++) {
    if (rowdata[1] === gender[i].value) {
      gender[i].checked = true;
    } else {
      gender[i].checked = false;
    }
  }
  document.forms["contactform"]["dateofbirth"].value = rowdata[2];
  document.forms["contactform"]["city"].value = rowdata[3];
  const hobby = document.forms["contactform"]["hobby"];

  for (var i = 0; i < hobby.length; i++) {
    if (rowdata[4].includes(hobby[i].value)) {
      hobby[i].checked = true;
    } else {
      hobby[i].checked = false;
    }
  }
  document.forms["contactform"]["address"].value = rowdata[5];
  btn.value = "update";
}
