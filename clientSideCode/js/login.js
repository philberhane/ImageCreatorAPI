if (sessionStorage.id) {
    if (sessionStorage.id !== 'undefined') {
    
// similar behavior as clicking on a link
window.location.href = sessionStorage.role + ".html";
    }
    
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("forgotPopup");

var cancel = document.getElementById("cancelButton");

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
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
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
      console.log(response);
        
        document.getElementById('fbemail').value = response.email
       
        fblogin()
    });
  }

function loginButton() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function fblogin() {
    
    
    const input = {
        fbemail : document.getElementById('fbemail').value,
    }
    
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/fblogin', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message.indexOf('Error') === 0) {
            window.location.href = "loginError.html";
        } else {
        sessionStorage.id = data.id
        sessionStorage.role = data.role
        sessionStorage.images = data.images
        
        window.location.href = sessionStorage.role + ".html";
        
    }
        })

    }

function login() {
    
    
    const input = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    }
    
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/login', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message.indexOf('Error') === 0) {
            window.location.href = "loginError.html";
        } else {
        sessionStorage.id = data.id
        sessionStorage.role = data.role
        sessionStorage.images = data.images
        
        window.location.href = sessionStorage.role + ".html";
        
    }
        })

    }



function sendCode() {
    
    const input = {
        email : document.getElementById('forgotEmail').value
    }
    
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/forgotPassword', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').style.color = '#fa755a'
            document.getElementById('serverMessage').innerText = data.message
        } else {
        // Add Code Area to modal
        document.getElementById('clear').innerHTML = '<p>We have emailed you a 5-digit code! Please enter it below:</p><br><input style="background-color: transparent" id="code" placeholder="Enter Code">'
        
        document.getElementById('forgotButton').setAttribute('onclick', 'verifyCode()')
    }
        })
}
    
    function verifyCode() {
        document.getElementById('userCode').value = document.getElementById('code').value
        const input = {
        code : document.getElementById('code').value
    }
        
        fetch('https://lisathomasapi.herokuapp.com/routes/users/verifyCode', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').style.color = '#fa755a'
            document.getElementById('serverMessage').innerText = data.message
        } else {
        // Add Code Area to modal
        document.getElementById('clear').innerHTML = '<p>You have been successfully verified! Please change your password below:</p><br><input id="password3" name="password3" style="background-color: transparent" placeholder="Enter Password" type="password"><br><input id="password4" name="password4" style="background-color: transparent" placeholder="Verify Password" type="password">'
            
        document.getElementById('forgotButton').setAttribute('onclick', 'changePassword()')
            
            
    }
        })
        
    }


function changePassword() {
    const input = {
        password3 : document.getElementById('password3').value,
        password4 : document.getElementById('password4').value,
        code : document.getElementById('userCode').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/changePassword', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message.indexOf('Error') === 0) {
            document.getElementById('serverMessage').style.color = '#fa755a'
            document.getElementById('serverMessage').innerText = data.message
        } else {
        // Add Code Area to modal
        document.getElementById('myModal').style.display = 'none'
        
        document.getElementById('server-response').innerText = 'You have successfully changed your password! Please log in.'
            
            
            
    }
        })
    
}


