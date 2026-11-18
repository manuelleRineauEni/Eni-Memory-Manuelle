//Vérifications sur les champs du formulaire d'inscription
// Nom d'utilisateur vérifie 3 caractères min
//Affichage d'un ! rouge dans l'input saisie + affichage d'une phrase en rouge
//Choisissez un pseudo contenant au moins 3 caractères + pastille verte si ok

//récupérer l'input et écouter à la saisie
$("#userName").on("input", checkUserName);
function checkUserName(){
    //si il y a moins de 3 caractères => symbole + phrase rouge
    if($(this).val().length < 3){
        if($(this).attr("aria-describedby") === undefined) {
            $(this).attr("aria-describedby", "wrongUserName")
            $(this).after(`<div id = "wrongUserName" class="form-text">Choisissez un pseudo contenant au moins 3 caractères</div>`);
            $("#wrongUserName").css("color", "red");
        }        
        $("#imgCheck").attr("src", "./assets/images/error.svg")
    } else {
        $("#wrongUserName").remove();
        $("#imgCheck").attr("src", "./assets/images/validation.png");
        $(this).removeAttr("aria-describedby");
    }  
}

//L'email doit être valide
$("#email").on("input", checkEmail);
function checkEmail(){
    //Regex email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(emailRegex.test($(this).val())){
        $("#imgCheck2").attr("src", "./assets/images/validation.png");
        $(this).removeAttr("aria-describedby");
        $("#wrongEmail").remove();
    } else {
        if($(this).attr("aria-describedby") === undefined) {
            $(this).attr("aria-describedby", "wrongEmail")
            $(this).after(`<div id = "wrongEmail" class="form-text">Rentrez un email valide</div>`);
            $("#wrongEmail").css("color", "red");
        }        
        $("#imgCheck2").attr("src", "./assets/images/error.svg")        
    }  
}

//Le mdp doit correspondre à la vérification du mdp (?) 
// et comporter : au moins 6 caractères, un symbole, un chiffre et des lettres
$("#userPassword").on("input", checkPassword);
function checkPassword(){
    const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9À-ÖØ-öø-ÿ\s])[^\s]{6,}$/;
    //Uniquement condition de longueur. Ajouter les autres conditions + l'indicateur visuel => autre fonction?
    if(passwordRegex.test($(this).val())){
        $("#imgCheck3").attr("src", "./assets/images/validation.png");
        $("#passwordHelp").css("color", "")
    } else {              
        $("#imgCheck3").attr("src", "./assets/images/error.svg") 
        $("#passwordHelp").css("color", "red")    
    }  
}