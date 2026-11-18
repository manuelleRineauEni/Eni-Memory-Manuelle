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
        $("#imgCheck").attr("src", "./assets/images/check.svg");
        $(this).removeAttr("aria-describedby");
    }  
}

//L'email doit être valide
$("#email").on("input", checkEmail);
function checkEmail(){
    //Regex email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(emailRegex.test($(this).val())){
        $("#imgCheck2").attr("src", "./assets/images/check.svg");
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

//Le mdp doit comporter : au moins 6 caractères, un symbole, un chiffre et des lettres + barre faible/moyen/fort
$("#userPassword").on("input", checkPassword);
function checkPassword(){
    const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9À-ÖØ-öø-ÿ\s])[^\s]{6,}$/;
    const regexStrongPassword = /^(?=.*\d)(?=.*[^a-zA-Z0-9À-ÖØ-öø-ÿ\s])[^\s]{9,}$/;
    //Uniquement condition de longueur. Ajouter les autres conditions + l'indicateur visuel => autre fonction?
    if($(this).val().length >= 6){
        $("#imgCheck3").attr("src", "./assets/images/check.svg");        
        $("#moyen").toggleClass("d-none", !passwordRegex.test($(this).val()));
        $("#fort").toggleClass("d-none", !regexStrongPassword.test($(this).val()));  
    } else {              
        $("#imgCheck3").attr("src", "./assets/images/error.svg") 
        if($(this).val().length < 6){
            $("#faible").removeClass("d-none");
        }   
    }  
}

//Confirmation du mot de passe
$("#confirmPassword").on("input", checkConfirmation);
function checkConfirmation(){
    if($(this).val() === $("#userPassword").val()) {
        $("#imgCheck4").attr("src", "./assets/images/check.svg");
    } else {
        $("#imgCheck4").attr("src", "./assets/images/error.svg");
    }
}

// Au clic sur créer le compte, stockage des données dans le local storage
$("form").on("submit", (e) => {    
    //Empêche à la page de se recharger avant l'éxécution du script
    e.preventDefault();

    //Création de la nouvelle fiche utilisateur
    let user = {
        userName : $("#userName").val(),
        email: $("#email").val(),
        password: $("#userPassword").val()
    };

    // Créer un tableau users pour stocker tous les utilisateurs ou aller le récupérer s'il existe déjà
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //Vérification que l'userName et l'email n'existent pas déjà : 
    for(let i=0; i < users.length; i++) {
        if(users[i].userName === $("#userName").val()){
            alert("Ce nom d'utilisateur est déjà pris, veuillez en choisir un autre!");
            return;
        }
        if(users[i].email === $("#email").val()){
            alert("Cet email est déjà utilisé, veuillez saisir un nouvel email!");
            return;
        }
    }
    
    //Ajouter l'user dans users
    users.push(user);
    //Mettre la fiche utilisateut dans le local storage avec JSON.stringify
    localStorage.setItem("users", JSON.stringify(users));   
})