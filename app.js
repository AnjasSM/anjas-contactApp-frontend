// base url
const baseUrl = "http://localhost:4000/contacts/" 

//get input
const getInput = () =>{
  let fullName = document.getElementById("input-fullname");
  let phoneNumber = document.getElementById("input-phonenumber");
  let email = document.getElementById("input-email");
  let gender = document.getElementById("input-gender");
    
    let input = {
        fullName : fullName.value,
        phoneNumber : phoneNumber.value,
        email : email.value,
        gender : gender.value
    }

    return input;
}
// clear form
const clearForm = () => {
  let fullName = document.getElementById("input-fullname");
  let phoneNumber = document.getElementById("input-phonenumber");
  let email = document.getElementById("input-email");
    fullName.value ="";
    phoneNumber.value ="";
    email.value ="";
}

//form validation
function isValid(fullname, phonenumber, email) {
  const numberval = /^[0-9]+$/;
  const emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;
  
  if( fullname !='' && phonenumber !='' && email !='') {
    if(fullname.length > 3 && phonenumber.length > 3 && email.length > 3){
      if(phonenumber.match(numberval)) {
        if(emailval.test(email)){
          return true;
        } else {
          alert('Format Email Harus Sesuai \n youremail@mail.com')
        }
      } else {
        alert('Phone Number Harus Berupa Angka');
        return false;
      }
    } else {
      alert('Input Minimal 4 Karakter');
      return false;
    }
  } else {
    alert('Input Tidak Boleh kosong');
    return false;
  }
};

//making table
const showData = (data) => {
    let tbody = document.getElementById("table-rows");

    data.map(contact => {
        let row = tbody.insertRow();
        row.setAttribute("id", `db-${contact.id}`);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);


        cell1.innerHTML = contact.id;
        cell2.innerHTML = contact.name;
        cell4.innerHTML = contact.phone;
        cell3.innerHTML = contact.email;
        cell5.innerHTML = contact.gender;
        cell6.innerHTML = `
            <a href="#" > <i  id="edit"  db-id=${contact.id} class="fas fa-user-edit"></i></a> 
            <a href="#" > <i id="hapus"  db-id=${contact.id} class="fas fa-trash"></i> </a> 
        `;
    }
    )}

// view
const view = () => {    
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => {showData(data)})
}

view()