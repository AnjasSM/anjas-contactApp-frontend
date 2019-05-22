//base url
const baseUrl = "http://localhost:4000/users/"

const isValid = (username, email, password) => {
    const emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;
    const upperCase = /[A-Z]/g;
    const lowerCase = /[a-z]/g;
    const numbers = /[0-9]/g;
    
    if(username !='' && email !='' && password !='') {
      if(username.length > 5 && email.length > 5 && password.length > 5){
          if(emailval.test(email)){
            if(upperCase.test(password) && lowerCase.test(password) && numbers.test(password)) {
              return true
            } else {
              alert('Password Must Contain Upper Case, Lower Case, and Number')
              return false
            }
          } else {
            alert('Email Format: \n youremail@mail.com')
            return false
          }
      } else {
        alert('Input Minimal 6 Character');
        return false;
      }
    } else {
      alert('Input Can not Empty');
      return false;
    }
  };

const getInput = () =>{
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  let input = {
      username : username.value,
      email : email.value,
      password : password.value
  }

  return input;
}

document.addEventListener("click", function(e) {
  //click for signup btn
  if(e.target.id == "signup") {
    let input = getInput();
    const valid = isValid(input.username, input.email, input.password)
    if(valid) {
      const data = JSON.stringify(input);
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(res => window.location ="/signin.html")
    } else {
      console.log("post error")
    }
  } 

  //click for cancel btn
  if(e.target.id == "cancel") {
    window.location = "/"
  }
})