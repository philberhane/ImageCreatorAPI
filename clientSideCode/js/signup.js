if (sessionStorage.id) {
    
// similar behavior as clicking on a link
window.location.href = sessionStorage.role + ".html";
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("IGPopUp");

var cancel = document.getElementById("cancelDeletion");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

cancel.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function connect() {
   // document.getElementById('instaUser').value = document.getElementById('inputUser').value
    
  //  document.getElementById('instaPass').value = document.getElementById('inputPass').value
    
 //   modal.style.display = "none";
    var input = {
        instaUser: document.getElementById('inputUser').value,
        instaPass: document.getElementById('inputPass').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/testIGLogin', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById('serverMessage').innerText = data.message
    
        
              if (data.message.indexOf('Success') === 0) {
         document.getElementById('instaUser').value = document.getElementById('inputUser').value
    
    document.getElementById('instaPass').value = document.getElementById('inputPass').value
    
    modal.style.display = "none";
            
            document.getElementById('clear2').innerHTML = 'Connected!'
        
        
        } 
        
         if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').innerText = 'Error: Instagram Username/Password is invalid! Please Try again.'
            document.getElementById('serverMessage').style.color = '#fa755a'
        }
    })
    
    
    
}

function signUp() {
    
    const input = {
        name: document.getElementById('name').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value,
        email : document.getElementById('email').value,
        fbemail : document.getElementById('fbemail').value,
        instaUser: document.getElementById('instaUser').value,
        instaPass: document.getElementById('instaPass').value,
        role: 'stylist',
        accountStatus: 'inactive'
        
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/register', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
       // console.log(data)
        document.getElementById('server-response').innerHTML = data.message
        
        if (data.message.indexOf('Error') === 0) {
            document.getElementById('server-response').style.color = '#fa755a'
        } else {
            
        document.getElementById('server-response').style.color = 'black'
        document.getElementById('name').value = ''
            document.getElementById('password').value = ''
            document.getElementById('password2').value = ''
        document.getElementById('instaPass').value = ''
        document.getElementById('email').value = ''
        document.getElementById('instaUser').value = ''
        
        
        }

    })
    
    
}

