const baseUrl = "http://localhost:4000/users/"

let attempt = 3; // Variable to count number of attempts.

//parsing user from db
const validate = (data) =>{
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    data.map(user => {
        if( username == user.username ) {
            if(password == user.password) {
                alert("Login successfully");
                window.location = "/"; // Redirecting to other page.
                return false;
            } else {
                attempt--; // Decrementing by one.
                alert(`Wrong Password \nYou have ${attempt} attempt left"`);
                // Disabling fields after 3 attempts.
                if (attempt == 0) {
                    document.getElementById("username").disabled = true;
                    document.getElementById("password").disabled = true;
                    document.getElementById("submit").disabled = true;
                    return false;
                };
            };
        } else {
            attempt--; // Decrementing by one.
            alert(`Wrong User Name \nYou have left ${attempt} attempt"`);
            // Disabling fields after 3 attempts.
            if (attempt == 0) {
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
            };
        };
    });
};

//get user from db
const getData = () => {    
    fetch(`${baseUrl}`)
    .then(res => res.json())
    .then(data => {
        validate(data)
    })
}

//click event
document.addEventListener("click", e => {
    //click for signin btn
    if(e.target.id == "signin") {
        getData()
    }
  
    //click for cancel btn
    if(e.target.id == "cancel") {
      window.location = "/"
    }
})