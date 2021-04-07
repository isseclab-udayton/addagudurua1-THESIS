app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();  
    res.redirect('/');
})