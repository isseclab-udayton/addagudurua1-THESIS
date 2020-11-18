$(document).ready(function () {
    if(window.location.href === 'http://localhost;3000/success') 
    {
        localStorage.setItem('loggedIn', true);
    }
});