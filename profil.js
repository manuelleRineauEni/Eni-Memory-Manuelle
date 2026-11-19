//Affichage du profil utilisateur
//Affichage de Bienvenue "user"
let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    // Vérifie si un utilisateur est bien connecté et affichage du message de bienvenue
    if (connectedUser) {
        $("#welcomeMessage").text(`Bienvenue ${connectedUser.userName}`);
        console.log(connectedUser.userName); 
    } else {
        // Redirection vers la page de connexion si personne n'est connecté
        alert("Vous devez être connecté pour accéder à cette page.");
        window.location.href = "connexion.html"; 
    }

//Affichage du nom utilisateur
$("#userName").val(connectedUser.userName);
//Affichage de l'email
$("#email").val(connectedUser.email);

// Enregistrement des préférences utilisateur dans le localstorage:
//choix du thème du mémory 
//Liste de tous les mémory disponibles : 
var tableauCorrespondanceMemoryImage = [
    {nom:"legumes",
    nomAffiche:"Légumes",
    img:"./assets/images/memory-legume/memory_detail.png",
    chemin:"./assets/images/memory-legume/",
    extension:"svg",
    nombreCartes:8
    },
    {nom:"animaux",
    nomAffiche:"Animaux",
    img:"./assets/images/animaux/memory_detail_animaux.png",
    chemin:"./assets/images/animaux/",
    extension:"webp",
    nombreCartes:28
    },
    {nom:"animauxAnimes",
    nomAffiche:"Animaux animés",
    img: "./assets/images/animauxAnimes/memory_detail_animaux_animes.png",
    chemin: "./assets/images/animauxAnimes/",
    extension:"webp",
    nombreCartes:8
    },
    {nom:"animauxDomestiques",
    nomAffiche:"Animaux Domestiques",
    img: "./assets/images/animauxDomestiques/memory_detail_animaux_domestiques.png",
    chemin: "./assets/images/animauxDomestiques/",
    extension:"jpg",
    nombreCartes:10
    },
    {nom:"chiens",
    nomAffiche:"Chiens",
    img: "./assets/images/chiens/memory_detail_chiens.png",
    chemin:"./assets/images/chiens/",
    extension:"webp",
    nombreCartes:23
    },
    {nom:"dinosaures",
    nomAffiche:"Dinosaures",
    img:"./ressources/dinosaures/memory_detail_dinosaures.png",
    chemin:"./ressources/dinosaures/",
    extension:"jpg",
    nombreCartes:10
    },
    {nom:"dinosauresAvecNom",
    nomAffiche:"Dinosaures avec nom",
    img:"./ressources/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",
    chemin:"./ressources/dinosauresAvecNom/",
    extension:"jpg",
    nombreCartes:10
    },
    {nom:"alphabetScrabble",
    nomAffiche:"Lettre Scrablle",
    img:"./ressources/alphabet-scrabble/memory_detail_scrabble.png",
    chemin:"./ressources/alphabet-scrabble/",
    extension:"png",
    nombreCartes:26
    }
];
//Affichage de l'image du memory selon la sélection 
$("#choixMemory").on("change", () => {
    let memorySelectionne = $("#choixMemory").val();
    for(let i=0; i<tableauCorrespondanceMemoryImage.length; i++){
        if(tableauCorrespondanceMemoryImage[i].nomAffiche === memorySelectionne){
            $("#imageMemory").attr("src", tableauCorrespondanceMemoryImage[i].img)
        }
    }
})


//choix de la taille de la grille

