/*if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";
} 

if (sessionStorage.role !== 'stylist') {
 if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }    
}
*/

if ($(window).width() <= 616) {
     var select = document.createElement('select')
        select.id = 'navSelect'
        var option1 = document.createElement('option')
        option1.value = 'admin.html'
        option1.innerText = 'DASHBOARD'
            
        var option2 = document.createElement('option')
        option2.value = 'settings.html'
        option2.innerText = 'SETTINGS'
            
        var option3 = document.createElement('option')
        option3.value = 'logout'
        option3.innerText = 'LOGOUT'
        
        select.appendChild(option2)
        select.appendChild(option1)
        select.appendChild(option3)
        select.setAttribute('onchange', 'redirect(this.value)')
        document.getElementById('hideTho').innerHTML = ''
        document.getElementById('hideTho').appendChild(select)
  }
 else {
    document.getElementById('hideTho').innerHTML = ''
     var anchor1 = document.createElement('a')
     anchor1.id = 'loginNav'
     anchor1.setAttribute('href', 'stylist.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'settings.html')
     anchor2.innerText = 'Settings'
     var anchor3 = document.createElement('a')
     anchor3.id = 'logoutNav'
     anchor3.setAttribute('onclick', 'logout()')
     anchor3.innerText = 'Logout'
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
        
        $(window).resize(function() {
  if ($(window).width() <= 616) {
     var select = document.createElement('select')
        select.id = 'navSelect'
        var option1 = document.createElement('option')
        option1.value = 'stylist.html'
        option1.innerText = 'DASHBOARD'
        var option2 = document.createElement('option')
        option2.value = 'settings.html'
        option2.innerText = 'SETTINGS'
      var option3 = document.createElement('option')
        option3.value = 'logout'
        option3.innerText = 'LOGOUT'
        select.appendChild(option2)
        select.appendChild(option1)
      select.appendChild(option3)
        select.setAttribute('onchange', 'redirect(this.value)')
        document.getElementById('hideTho').innerHTML = ''
        document.getElementById('hideTho').appendChild(select)
  }
 else {
    document.getElementById('hideTho').innerHTML = ''
     var anchor1 = document.createElement('a')
     anchor1.id = 'loginNav'
     anchor1.setAttribute('href', 'stylist.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'settings.html')
     anchor2.innerText = 'Settings'
     var anchor3 = document.createElement('a')
     anchor3.id = 'logoutNav'
     anchor3.setAttribute('onclick', 'logout()')
     anchor3.innerText = 'Logout'
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
});



// Do an onlick (this.id) so that when clicked, the big div's img src becomes the clicked div
function dope() {
    console.log('dope')
}



function redirect(t) {
    if (t === 'logout') {
        delete sessionStorage.id
    delete sessionStorage.images
    delete sessionStorage.role
    window.location.href = "login.html";
    } else {
        window.location.href = t
    }
} 

function logout() {
    delete sessionStorage.id
    delete sessionStorage.images
    delete sessionStorage.role
    window.location.href = "login.html";
}


var input = {id:sessionStorage.id}
fetch('https://lisathomasapi.herokuapp.com/routes/users/getSocial', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    console.log(data)
    
    if (data.message1 !== 'none') {
        document.getElementById('clear1').innerHTML = '<p>Connected!</p><p>To connect a different Facebook Account instead, <button style="background-color:transparent; border: none; text-decoration: underline" onclick="fbLogoutUser()">click here</button></p>'
    }
    
    if (data.message2 !== 'none') {
        document.getElementById('clear2').innerHTML = '<p>Connected!</p><br><p>To connect a different Instagram Account instead, <button style="background-color:transparent; border: none; text-decoration: underline" onclick="modalPopup()">click here</button></p>'
    }
    
    
})







function fbLogoutUser() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                var input = {
        id:sessionStorage.id,
        fbemail: null
        }
        
fetch('https://lisathomasapi.herokuapp.com/routes/users/updateFacebook', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
   
   fbLoginUser()
    
    
})
            });
        }
    });
}

function fbLoginUser() {
    FB.getLoginStatus(function(response) {
        if (response && response.status !== 'connected') {
            FB.login(function(response) {
               var input = {
        id:sessionStorage.id,
        fbemail: response.email
        }
        
fetch('https://lisathomasapi.herokuapp.com/routes/users/updateFacebook', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    console.log(data)
    
        document.getElementById('clear1').innerHTML = '<p>Connected!</p><p>To connect a different Facebook Account instead, <button style="background-color:transparent; text-decoration: underline" onclick="fbLogoutUser()">click here</button></p>'
   
    
    
})
            });
        }
    });
}






// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("IGPopUp");

var cancel = document.getElementById("cancelDeletion");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function modalPopup() {
    modal.style.display = "block";
}

// When the user clicks the button, open the modal 
btn.onclick =  modalPopup

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
         
    updateInstagram()
    modal.style.display = "none";
            
            
        
        
        } 
        
         if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').innerText = 'Error: Instagram Username/Password is invalid! Please Try again.'
            document.getElementById('serverMessage').style.color = '#fa755a'
        }
    })
    
    
    
}



function updateInstagram() {
    
    var input = {
        id: sessionStorage.id,
        instaUser: document.getElementById('inputUser').value,
        instaPass: document.getElementById('inputPass').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/updateInstagram', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById('clear2').innerHTML = '<p>Connected!</p><p>To connect a different Instagram Account instead, <button style="background-color:transparent; border: none; text-decoration: underline" onclick="modalPopup()">click here</button></p>'
    })
}


