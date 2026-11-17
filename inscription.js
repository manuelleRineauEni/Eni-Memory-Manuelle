//Vérifications sur les champs du formulaire d'inscription
// Nom d'utilisateur vérifie 3 caractères min
//Affichage d'un ! rouge dans l'input saisie + affichage d'une phrase en rouge
//Choisissez un pseudo contenant au moins 3 caractères + pastille verte si ok

//récupérer l'input et écouter à la saisie
$("#userName").on("input", checkUserName);
function checkUserName(){
    //si il y a moins de 3 caractères => symbole + phrase rouge
    const userName = $(this);
    //const imgErreur = "./assets/images/error.svg"
    if(userName.length < 3){
        $(this).attr("aria-describedby", "wrongUserName")
        $(this).after(`<div id = "wrongUserName" class="form-text">Choisissez un pseudo contenant au moins 3 caractères</div>`);
        $("#wrongUserName").css("color", "red");
        $("#imgCheck").attr("src", "./assets/images/error.svg")
    }   
}

//L'email doit être valide


//Le mdp doit correspondre à la vérification du mdp (?) 
// et comporter : au moins 6 caractères, un symbole, un chiffre et des lettres
