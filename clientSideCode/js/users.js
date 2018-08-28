/*if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";   
}
if (sessionStorage.role !== 'admin') {
    if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }
} */

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
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
});
    


console.log('admin')
var input = {}
fetch('https://lisathomasapi.herokuapp.com/routes/users/getUsers', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    
    if (data.message.indexOf('Error') === 0) {
        document.getElementById('slideshow').innerText = data.message
    } else {
        for (i=0; i<data.message.length; i++) {
            var image = document.createElement('img')
            image.src = data.message[i].imageCopyLink
            image.className = 'mySlides'
            image.style.width = '100%'
           image.id = data.message[i]._id
            image.title = data.message[i].imageLink
            image.alt = data.message[i].canvasLink
            document.getElementById('slideshow').appendChild(image)
            
        }
    showDivs(slideIndex);
          } 
        })

