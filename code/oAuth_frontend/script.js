function onSignIn(gogoleUser)
{
    var profile= gogoleUser.getBasicProfile();
    $(".g-signin2").css("display","none");          // hide the signin button if not signed in
    $(".data").css("display","block");              // loading the profile details from here
    $("#pic").attr('src',profile.getImageUrl());    // get image details
    $('#email').text(profile.getEmail());           // get email ID 
}


function signOut()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        alert("You've been signed out successfully!");
        $(".g-signin2").css("display","block");
        $(".data").css("display","none"); 
    })
}