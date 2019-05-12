let selectedRow = '';
let i = 6;
//penampung id untuk edit contact
let idTampung = [];
let idFilter = [1,2,3,4,5];

//db
const contacts = [{
    id: 1,
    fullName: "Genna Arnli",
    phoneNumber: "5278765234",
    email: "garnli0@photobucket.com",
    gender: "Female"
  },
  {
    id: 2,
    fullName: "Jojo Scotchford",
    phoneNumber: "7925766855",
    email: "jscotchford1@booking.com",
    gender: "Female"
  },
  {
    id: 3,
    fullName: "Kakalina Pietasch",
    phoneNumber: "3118199662",
    email: "kpietasch2@auda.org.au",
    gender: "Female"
  },
  {
    id: 4,
    fullName: "Araldo Coil",
    phoneNumber: "5887272284",
    email: "acoil3@behance.net",
    gender: "Male"
  },
  {
    id: 5,
    fullName: "Shadow Maffi",
    phoneNumber: "8455497996",
    email: "smaffi4@bravesites.com",
    gender: "Male"
  }
];

//menampilkan data
function view() {
  
  contacts.map((contact, index) => {
    //menyeleksi id table-row
    let tbody = document.getElementById("table-rows");

    //membuat tabel
    let row = tbody.insertRow(); // tr, table row

    //memberikan atribut id dengan value sesuai id user pada setiap baris
    row.setAttribute("id", `db-${contact.id}`);

    let column1 = row.insertCell(0); // td, table , column #0
    let column2 = row.insertCell(1); // column #1
    let column3 = row.insertCell(2);
    let column4 = row.insertCell(3);
    let column5 = row.insertCell(4);
    let column6 = row.insertCell(5);
    
    //mengisi tabel
    column1.innerHTML = contact.id;
    column2.innerHTML = contact.fullName;
    column3.innerHTML = contact.phoneNumber;
    column4.innerHTML = contact.email;
    column5.innerHTML = contact.gender;
    column6.innerHTML = `
      <a href="#" id="hapus" db-id=${contact.id} class="btn btn-outline-danger"> Hapus</a>
      <a href="#" id="edit" db-id=${contact.id} class="btn btn-outline-success"> Edit</a>
    `;
  });
};

// tambah data
function add(data) {
  const addContacts = [...contacts, data];
  return addContacts;
};

//mengubah data
function edit(data,id) {
  let editContact = contacts.map(contact => {
    if (contact.id === id) {
      return { ...contact, ...data };
    }
    return contact;
  });

  return editContact;
};

//menghapus data
function remove(x) {
  const removeContact = contacts.filter(contact => contact.id != x);
  console.log(removeContact);
};

//validasi form input nama, nomer, email
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

//mengosongkan form
function clearForm() {
  
  let fullName = document.getElementById("input-fullname");
  let phoneNumber = document.getElementById("input-phonenumber");
  let email = document.getElementById("input-email");

  fullName.value = '';
  phoneNumber.value = '';
  email.value = '';
};

document.addEventListener('click',function(e){

  //evwnt klik untuk tombol hapus
  if(e.target.id == 'hapus') {
    if(confirm("Apakah Anda Yakin Untuk Menghapus Kontak Ini ?")) {
      const id = e.target.attributes[2].nodeValue;
      const data = document.getElementById(`db-${id}`);
      data.innerHTML = "";
      remove(id);
    };
  };

  //event klik untuk tombol edit
  if(e.target.id == 'edit') {
    const id = e.target.attributes[2].nodeValue;

    let fullName = document.getElementById("input-fullname");
    let phoneNumber = document.getElementById("input-phonenumber");
    let email = document.getElementById("input-email");
    let gender = document.getElementById("input-gender");

    let data = [];
    contacts.filter(contact => {
      if( contact.id == id ) {
        data = contact;
      };
    });

    fullName.value = data.fullName;
    phoneNumber.value = data.phoneNumber;
    email.value = data.email;
    gender.value = data.gender;
    idTampung[0] = data.id

    const edit = document.getElementById('submit');
    edit.setAttribute('id', 'edited')

  };

  if(e.target.id == 'edited') {
    let fullName = document.getElementById("input-fullname");
    let phoneNumber = document.getElementById("input-phonenumber");
    let email = document.getElementById("input-email");
    let gender = document.getElementById("input-gender");

    //validasi
    const valid = isValid(fullName.value, phoneNumber.value, email.value);

    if (valid) {
      //seleksi tr yang akan diedit
      let tr = document.getElementById(`db-${idTampung[0]}`);
      tr.cells[1].innerHTML = fullName.value;
      tr.cells[2].innerHTML = phoneNumber.value;
      tr.cells[3].innerHTML = email.value;
      tr.cells[4].innerHTML = gender.value;

      let input = {
        id: idTampung[0],
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        gender: gender.value
      };

      edit(input, id[0]);
      alert('Contact Telah Di Update')
      clearForm();

      const submit = document.getElementById('edited');
      submit.setAttribute('id', 'submit');
    };
    
  };

  //event klik untuk tombol submit
  if(e.target.id == 'submit'){

      let fullName = document.getElementById("input-fullname");
      let phoneNumber = document.getElementById("input-phonenumber");
      let email = document.getElementById("input-email");
      let gender = document.getElementById("input-gender");
  
      //validasi
      const valid = isValid(fullName.value, phoneNumber.value, email.value);
  
      if (valid) {
        let tbody = document.getElementById("table-rows");
        //membuat tabel
        let row = tbody.insertRow(); // tr, table row
  
        //memberikan atribut id dengan value sesuai id user pada setiap baris
        row.setAttribute("id", `db-${i}`);
  
        let column1 = row.insertCell(0); // td, table data, column #0
        let column2 = row.insertCell(1); // column #1
        let column3 = row.insertCell(2);
        let column4 = row.insertCell(3);
        let column5 = row.insertCell(4);
        let column6 = row.insertCell(5);
        
        //mengisi tabel
        column1.innerHTML = i;
        column2.innerHTML = fullName.value;
        column3.innerHTML = phoneNumber.value;
        column4.innerHTML = email.value;
        column5.innerHTML = gender.value;
        column6.innerHTML = `
          <a href="#" id="hapus" db-id=${i} class="btn btn-outline-danger"> Hapus</a>
          <a href="#" id="edit" db-id=${i} class="btn btn-outline-success"> Edit</a>
        `;

        idFilter.push(i);

        let input = {
          id: i++,
          fullName: fullName.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          gender: gender.value
        }
        add(input);
        alert('Contact Baru Telah Di Input');
      }
    
    clearForm();

  };

const searchBar = document.forms['searchForm'].querySelector('input')
searchBar.addEventListener('keyup', function(){
  
  let optionValue = document.getElementById('search_param').value;
  if( searchBar.value !== '') {
    //Jika yang dipilih filter by fullname
    if(optionValue === 'fullname') {
      idFilter.forEach((num, index) => {
        let tr = document.getElementById(`db-${idFilter[index]}`);
        if( tr.cells[1].innerHTML === searchBar.value ) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }
      })

    //jika yang dipilih filter by Gender
    } else {
      idFilter.forEach((num, index) => {
        let tr = document.getElementById(`db-${idFilter[index]}`);
        if( tr.cells[4].innerHTML === searchBar.value ) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }
      })
      
    }
  }

})
});

view();



// //load ajax
// const request = (url, type,callback,data=null) => {

//     if(type == "GET" || type == "DELETE"){
//         const myAjax = new XMLHttpRequest()
//         myAjax.open(type, url, true)
//         myAjax.onreadystatechange = () => {
//             if (myAjax.readyState === 4 && myAjax.status === 200) {
//                 callback(myAjax.response)
//             }
//         }
//         myAjax.send();

//     }else if(type == "POST" || type == "PATCH"){
//         const myAjax = new XMLHttpRequest()
//         myAjax.onload = () => {
//                 callback(myAjax.response)
//         }
//         myAjax.open(type, url, true)
//         myAjax.setRequestHeader('Content-Type',"application/json")
//         myAjax.send(data);  
//     };  
// };

// //base url
// const baseUrl = "http://localhost:4000/contacts/";

// //input form get data
// function input () {
//     const fullName = document.getElementById('input-fullname');
//     const phoneNumber = document.getElementById('input-phonenumber');
//     const email = document.getElementById('input-email');
//     const gender = document.getElementById('input-gender');

//     let inputData = {
//         fullName : fullName.Value,
//         phoneNumber : phoneNumber.value,
//         email : email.value,
//         gender : gender.value
//     };

//     return inputData;
// };

// //clear input form
// function clearForm() {
  
//     let fullName = document.getElementById("input-fullname");
//     let phoneNumber = document.getElementById("input-phonenumber");
//     let email = document.getElementById("input-email");
  
//     fullName.value = '';
//     phoneNumber.value = '';
//     email.value = '';
// };

// //form validation
// function isValid(fullname, phonenumber, email) {
//     const numberval = /^[0-9]+$/; //only number for phone
//     const emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/; // email format
    
//     if( fullname !='' && phonenumber !='' && email !='') {
//       if(fullname.length > 3 && phonenumber.length > 3 && email.length > 3){
//         if(phonenumber.match(numberval)) {
//           if(emailval.test(email)){
//             return true;
//           } else {
//             alert('Format Email \n youremail@mail.com')
//           }
//         } else {
//           alert('Phone Number only Number');
//           return false;
//         }
//       } else {
//         alert('Input Minimal 4 Caracter');
//         return false;
//       }
//     } else {
//       alert('Input can not empty');
//       return false;
//     }
//   };

// //show data on table
// function showData(contacts) {
//     contacts.map((contact, index) => {
//         //selection id table-row
//         let tbody = document.getElementById("table-rows");
    
//         //make a table row
//         let row = tbody.insertRow(); // tr, table row
    
//         //give id atribute with a value = id user, in every row
//         row.setAttribute("id", `db-${contact.id}`);
    
//         let column1 = row.insertCell(0); // td, table , column #0
//         let column2 = row.insertCell(1); // column #1
//         let column3 = row.insertCell(2);
//         let column4 = row.insertCell(3);
//         let column5 = row.insertCell(4);
//         let column6 = row.insertCell(5);
        
//         //input data table with data from contacts database
//         column1.innerHTML = contact.id;
//         column2.innerHTML = contact.fullName;
//         column3.innerHTML = contact.phoneNumber;
//         column4.innerHTML = contact.email;
//         column5.innerHTML = contact.gender;
//         column6.innerHTML = `
//           <a href="#" id="hapus" db-id=${contact.id} class="btn btn-outline-danger"> Hapus</a>
//           <a href="#" id="edit" db-id=${contact.id} class="btn btn-outline-success"> Edit</a>
//         `;
//       });
// };

// //view
// function view() {
//     request(baseUrl, "GET", true, contact => {
//         contact = JSON.parse(contact);

//         input(contact);
//     });
// };

// document.addEventListener('click',function(e){
    
//     //event click for submit button when id = submit
//     if(e.target.id == 'submit'){

//         //get object from function inputData
//         let input = inputData()

//         //validation
//         const valid = isValid(input.fullName, input.phoneNumber, inputemail);
    
//         if (valid) {
//             // json format to javascript format
//             const contact = JSON.stringify(input);
//             request(base_url, "POST", contact => {
//                 view()
//             }, contact);
//           clearForm();
//         };
//     };

//     //event click for delete button
//     if(e.target.id == 'hapus') {
//       if(confirm("Are You Sure to Delete This Contact ?")) {
//         const id = e.target.attributes[2].nodeValue;
//         request(`${base_url}${id}`, "DELETE", contact=> {
//             view()
//         });
//       };
//       clearForm()
//     };
  
//     //event klik for edit button
//     if(e.target.id == 'edit') {
//       const id = e.target.attributes[2].nodeValue;
//       idTampung[0] = id
//       request(`${base_url}${id}`, "GET", contact => {
//           contact = JSON.parse(contact);
//       });
//       //form selectiion
//       let fullName = document.getElementById("input-fullname");
//       let phoneNumber = document.getElementById("input-phonenumber");
//       let email = document.getElementById("input-email");
//       let gender = document.getElementById("input-gender");

//       //fill the input form
//       fullName.value = contact.fullName;
//       phoneNumber.value = contact.phoneNumber;
//       email.value = contact.email;
//       gender.value = contact.gender;
  
//       //change value attribute id 
//       const edit = document.getElementById('submit');
//       edit.setAttribute('id', 'edited');
  
//     };
  
//     //event click submit button when id = edited
//     if(e.target.id == 'edited') {
//         let input = inputData();
//         let id = idTampung[0];
//       //validasi
//       const valid = isValid(fullName.value, phoneNumber.value, email.value);
  
//       if (valid) {
//         //seleksi tr yang akan diedit
//         const contact = JSON.stringify(input);
//         request(`${base_url}${id}`, "PATCH", contact => {
//             view()
//         }, contact);

//         clearForm()
//         //change submit button id
//         const submit = document.getElementById('edited');
//         submit.setAttribute('id', 'submit');
        
//         };
  
        
//     };
// });

// //filter bar
// const searchBar = document.forms['searchForm'].querySelector('input')
// searchBar.addEventListener('keyup', function(){
    
// let value = searchBar.value
// let optionValue = document.getElementById('search_param').value;
//   if( value !== '') {
//     //Jika yang dipilih filter by fullname
//     if(optionValue === 'fullname') {
        

//     //jika yang dipilih filter by Gender
//     } else {
//       if(value.toLowerCase() === 'male') {
//         request(`${base_url}?gender=male`,"GET",contact =>{
//             contact = JSON.parse(contact)
//             showData(contact);
//         })
//       } else if(value.toLowerCase() === 'female') {
//         request(`${base_url}?gender=female`,"GET",contact =>{
//             contact = JSON.parse(contact)
//             showData(contact);
//         })
//       }else {
//           alert('search by gender only: male or female')
//       }
      
      
//     }
//   }

// })
// view()