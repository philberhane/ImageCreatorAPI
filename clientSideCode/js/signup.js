if (sessionStorage.id) {
    
// similar behavior as clicking on a link
window.location.href = sessionStorage.role + ".html";
}


const signUp = () => {
    
    const input = {
        name: document.getElementById('name').value,
        email : document.getElementById('email').value,
        instaUser: document.getElementById('instaUser').value,
        instaPass: document.getElementById('instaPass').value,
        password : document.getElementById('password').value,
        password2 : document.getElementById('password2').value,
        role: 'stylist'
        
    }
    
    fetch('http://localhost:3000/routes/users/register', {
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
        document.getElementById('instaPass').value = ''
        document.getElementById('email').value = ''
        document.getElementById('instaUser').value = ''
        document.getElementById('password').value = ''
        document.getElementById('password2').value = ''
        
        }

    })
    
    
}

document.getElementById('signupButton').onclick = signUp