if (sessionStorage.id) {
    if (sessionStorage.id !== 'undefined') {
    
// similar behavior as clicking on a link
window.location.href = sessionStorage.role + ".html";
    }
    
}



function login() {
    
    const input = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value,        
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/login', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        if (data.message === 'Error') {
            window.location.href = "loginError.html";
        } else {
        sessionStorage.id = data.id
        sessionStorage.role = data.role
        sessionStorage.images = data.images
        
        window.location.href = sessionStorage.role + ".html";
        
    }
        })

    }
    
    


document.getElementById('loginButton').onclick = login