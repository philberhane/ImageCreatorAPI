if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";   
}
if (sessionStorage.role !== 'admin') {
    if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }
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


        if ($(window).width() <= 616) {
     var select = document.createElement('select')
        select.id = 'navSelect'
        var option1 = document.createElement('option')
        option1.value = 'admin.html'
        option1.innerText = 'DASHBOARD'
            
        var option2 = document.createElement('option')
        option2.value = 'users.html'
        option2.innerText = 'USERS'
            
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
     anchor1.setAttribute('href', 'admin.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'users.html')
     anchor2.innerText = 'Users'
     var anchor3 = document.createElement('a')
     anchor3.setAttribute('href', '#')
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
        option1.value = 'admin.html'
        option1.innerText = 'DASHBOARD'
        var option2 = document.createElement('option')
        option2.value = 'users.html'
        option2.innerText = 'USERS'
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
     anchor1.setAttribute('href', 'admin.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'users.html')
     anchor2.innerText = 'Users'
     var anchor3 = document.createElement('a')
     anchor3.id = 'logoutNav'
     anchor3.setAttribute('onclick', 'logout()')
     anchor3.innerText = 'Logout'
     anchor3.setAttribute('href', '#')
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
});
    



var input = {}
fetch('https://lisathomasapi.herokuapp.com/routes/users/getUsers', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
   
    
        for (i=0;i<data.message.length;i++) {
           
            if (data.message[i].accountStatus) {
               var div = document.createElement('div')
               div.className = 'row'
                div.style.marginTop = '25px'
                
                var div2 = document.createElement('div')
                div2.className = 'col-md-3 col-xs-4'
                var h4 = document.createElement('h4')
                h4.innerText = data.message[i].name
                div2.appendChild(h4)
                
                
                var div3 = document.createElement('div')
                div3.className = 'col-md-3 col-xs-4'
                var input = document.createElement('input')
                input.setAttribute('type', 'checkbox')
                input.setAttribute('data-toggle', 'toggle')
                input.value = data.message[i]._id
                input.id = 'toggle' + i
                
                var div4 = document.createElement('div')
                div4.className = 'col-md-3 col-xs-4'
                div4.innerHTML = '<span id="'+data.message[i]._id+'" onclick="modalPopup(this.id)" class="close1">&times;</span>'
                
                
            
                
                div3.appendChild(input)
                
                div.appendChild(div2)
                div.appendChild(div3)
                div.appendChild(div4)
                
                document.getElementById('main').appendChild(div)
                
                if (data.message[i].accountStatus === 'inactive') {
                    $('#toggle'+i).bootstrapToggle({
      on: 'On',
      off: 'Off'
    });
                } else {
                    $('#toggle'+i).bootstrapToggle('on', {
      on: 'On',
      off: 'Off'
    });
                }
                
                input.setAttribute('onchange', 'changeStatus(this.id)')
                
                
            }
        }
    
    
        })


function changeStatus(clicked_id) {
    var input = document.getElementById(clicked_id)
    console.log(input.checked)
    var inputData = {}
    
    if (input.checked === true) {
        inputData.accountStatus = 'active'
    } else {
        inputData.accountStatus = 'inactive'
    }
    
    inputData.id = input.value
   
    
    
    
fetch('https://lisathomasapi.herokuapp.com/routes/users/changeStatus', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
 
        })
    
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal


var cancel = document.getElementById("cancelButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function modalPopup() {
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

function deleteUser(clicked_id) {
    var clickedUser = document.getElementById(clicked_id)
    
    var input = {
        id: clickedUser.id
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/deleteUser', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        location.reload();
        })
}


function logout() {
    delete sessionStorage.id
    delete sessionStorage.images
    delete sessionStorage.role
    window.location.href = "login.html";
}