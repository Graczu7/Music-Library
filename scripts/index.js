function resetPassword(){
    var usersEmail = document.getElementById('usersEmail').value;

    auth.sendPasswordResetEmail(usersEmail).then(function() {
        alert("Reset password e-mail has been sent");
    }).catch(function(error) {
        alert("It is not correct e-mail address! Please try again.");
    });

    document.getElementById('emailForm').reset();
};
    