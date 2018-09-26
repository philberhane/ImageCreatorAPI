if (!sessionStorage.id) {
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






 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
    
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
         console.log(response);
    });
  }

  window.onload = function() {
    FB.init({
      appId      : '291738151646105',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.1' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.


  };
      
      

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
  //  console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {locale: 'en_US', fields: 'name, email'}, function(response) {
        
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
    
         if (data.message.indexOf('Error') === 0) {
             document.getElementById('serverResponse').innerText = data.message
             document.getElementById('serverResponse').style.color = '#fa755a'
             
             
         
         } else {
    
        document.getElementById('clear1').innerHTML = '<p>Connected!</p><p>To reconnect your Facebook account <button style="background-color:transparent; text-decoration: underline; border: none" onclick="fbLogoutUser()">click here</button></p>'
   
         }
    
})
       
      
    });
  }
     
      function loginButton() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}
           
           
           





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
        document.getElementById('clear1').innerHTML = '<p>Connected!</p><p>To reconnect your Facebook account <button style="background-color:transparent; border: none; text-decoration: underline" onclick="fbLogoutUser()">click here</button></p>'
    }
    
    if (data.message2 !== 'none') {
        document.getElementById('clear2').innerHTML = '<p>Connected!</p><p>To reconnect your Instagram account <button style="background-color:transparent; border: none; text-decoration: underline" onclick="modalPopup()">click here</button></p>'
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
                console.log('Line 268: '+ input.fbemail)
        
fetch('https://lisathomasapi.herokuapp.com/routes/users/updateFacebookNull', {
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
    console.log('test')
    FB.getLoginStatus(function(response) {
        if (response && response.status !== 'connected') {
            FB.login(function(response) {
           FB.api('/me', {locale: 'en_US', fields: 'name, email'}, function(response) {     
         //       console.log(response)
               var input = {
        id:sessionStorage.id,
        fbemail: response.email
        }
                        console.log('Line 295: '+ input.id)
fetch('https://lisathomasapi.herokuapp.com/routes/users/updateFacebook', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {

       if (data.message.indexOf('Error') === 0) {
             document.getElementById('serverResponse').innerText = data.message
             document.getElementById('serverResponse').style.color = '#fa755a'
             
             
         
         } else {
        document.getElementById('clear1').innerHTML = '<p>Connected!</p><p>To reconnect your Facebook account <button style="background-color:transparent; text-decoration: underline; border:none" onclick="fbLogoutUser()">click here</button></p>'
   
         }
    
})
            }) },{auth_type: 'rerequest' });
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

function testUpdateInstagram() {
var input = {
        id: sessionStorage.id,
        instaUser: document.getElementById('inputUser').value,
        instaPass: document.getElementById('inputPass').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/testUpdateInstagram', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        
        
        if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').innerText = 'Error: Instagram Username/Password is invalid! Please Try again.'
            document.getElementById('serverMessage').style.color = '#fa755a'
        } else {
              document.getElementById('clear2').innerHTML = '<p>Connected!</p><p>To reconnect your Instagram account <button style="background-color:transparent; border: none; text-decoration: underline" onclick="modalPopup()">click here</button></p>'
    modal.style.display = "none";
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
        
           if (data.message.indexOf('Error') === 0) {
             document.getElementById('serverResponse').innerText = data.message
             document.getElementById('serverResponse').style.color = '#fa755a'
             
             
         
         } else {
        document.getElementById('clear2').innerHTML = '<p>Connected!</p><p>To reconnect your Instagram account <button style="background-color:transparent; border: none; text-decoration: underline" onclick="modalPopup()">click here</button></p>'
             
         }
    })
}


