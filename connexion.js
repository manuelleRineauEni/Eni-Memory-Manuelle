// Au clic sur se connecter, comparaison avec le local storage pour vérifier
//l'adéquation email et mdp
$("form").on("submit", (e) => {    
    //Empêche à la page de se recharger avant l'éxécution du script
    e.preventDefault();   
    //Récupérer la saisie utilisateur et le stockage dans le storage
    let saisieMail = $("#email").val();   
    let saisiePassword = $("#userPassword").val();     
    let usersStorage = JSON.parse(localStorage.getItem("users"));
    
    // comparaison email et mdp saisi avec le storage
    for (let i=0; i < usersStorage.length; i++){
        if(saisieMail === usersStorage[i].email && saisiePassword === usersStorage[i].password){
            let connectedUser = {userName : usersStorage[i].userName, email: usersStorage[i].email};
            localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
            alert(`L'email ${saisieMail} s'est connecté`);
            window.location.href = "profil.html";
            return;
        }                    
    }        
    alert("Erreur, veuillez saisir les informations correctement"); 
})