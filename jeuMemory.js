// Permet de jouer au memory choisi dans les préférences utilisateurs
// Vérification qu'un utilisateur est connecté
/*if (connectedUser) {
    initGame(); 
} else {
     // Redirection vers la page de connexion si personne n'est connecté
    alert("Vous devez être connecté pour accéder à cette page.");
    window.location.href = "connexion.html"; 
}*/

$(window).on('load', initGame);

//Liste des memorys
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
    img: "./assets/images/chiens/memory_details_chiens.png",
    chemin:"./assets/images/chiens/",
    extension:"webp",
    nombreCartes:23
    },
    {nom:"dinosaures",
    nomAffiche:"Dinosaures",
    img: "./assets/images/dinosaures/memory_detail_dinosaures.png",
    chemin: "./assets/images/dinosaures/",
    extension:"jpg",
    nombreCartes:10
    },
    {nom:"dinosauresAvecNom",
    nomAffiche:"Dinosaures avec nom",
    img:"./assets/images/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",
    chemin:"./assets/images/dinosauresAvecNom/",
    extension:"jpg",
    nombreCartes:10
    },
    {nom:"alphabetScrabble",
    nomAffiche:"Lettres Scrablle",
    img:"./assets/images/alphabet-scrabble/memory_detail_scrabble.png",
    chemin:"./assets/images/alphabet-scrabble/",
    extension:"png",
    nombreCartes:26
    }
];

function initGame(){
    //Récupération des préférences utilisateurs
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    //Initialisation de la grille de jeu selon le choix
    const tailleGrille = connectedUser.preferences.choixTaille;
    const rowsColumns = tailleGrille.split("*").map(Number);
    $("section").empty();
    placeTable(rowsColumns);
    let plateau = melangerTableau(rowsColumns);
    console.log(plateau);
    attribuerImages(plateau);
    lancerJeu(rowsColumns);
}

function placeTable(rowcolumn) {
    let tableHtml = `<table class="mx-auto">`;
    for(i=0; i < rowcolumn[0]; i++){
        tableHtml += "<tr>";
        for(j=0; j<rowcolumn[1];j++){
            tableHtml += `
                <td id="${(i * rowcolumn[1])+j}">
                    <img src = "">
                </td>
            `;
        } 
    tableHtml += "</tr>"
    }
    tableHtml += "</table>"
    $("section").prepend(tableHtml);
}

//Mélanger les images du plateau de jeu
function melangerTableau(rowcolumn) {
   //Récupération des images du thème choisi par l'utilsateur 
    let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    const themeChoisi = connectedUser.preferences.choixMemory
    const images = [];
    for(let i=0; i<tableauCorrespondanceMemoryImage.length; i++){
        if(themeChoisi === tableauCorrespondanceMemoryImage[i].nomAffiche){            
            const nbreImages = (rowcolumn[0] * rowcolumn[1]) / 2;            
            for(let imgIndex = 0; imgIndex < nbreImages; imgIndex++){
                images[imgIndex] = `${tableauCorrespondanceMemoryImage[i].chemin}${imgIndex+1}.${tableauCorrespondanceMemoryImage[i].extension}`              
            } 
        }
    }    
  // Création d'une copie pour ne pas modifier l'original
  const copie = [...images, ...images]; 
  for (let j = copie.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [copie[j], copie[k]] = [copie[k], copie[j]]; // Échange des éléments
  }  
  return copie;  
}

//Attribuer les images aux cases du html tout en restant cachée
function attribuerImages(plateauMelange){
    for(let i=0; i<plateauMelange.length; i++){
        $(`#${i}`).children("img").attr("src", "./assets/images/question.svg").attr("data-image", plateauMelange[i]).attr("alt","");
    }
}

   

// Fonction lancer jeu
function lancerJeu(rowcolumn){    
    //Lancement de la boucle de jeu
    const nbreImages = (rowcolumn[0] * rowcolumn[1]) / 2;
    for(let i=0; i<nbreImages; i++){
        $(`#${i}`).off("click", revealTwoImages).on("click", revealTwoImages);    
    }  
}

//Tableau qui stocke les id de la cases des images cliquées
let caseCliquees = []; 
//Révéler deux image au click et les faire disparaitre si c'est faux
function revealTwoImages() {
    //Empêcher de pouvoir cliquer deux fois sur la même image
    if (caseCliquees.length === 2 || $(this).children('img').hasClass('tourne')) {
        return;
    }       
    //Réveler l'image cliquée
    let vraieImage = $(this).children("img").attr("data-image");
    $(this).children("img").attr("src", vraieImage).toggleClass("tourne");      
    //Remplir le tableau pour garder en mémoire les 2 images cliquées
    caseCliquees.push($(this));
    //Conditions
    //si deux images ont été cliquée et qu'elles sont pareilles

    if(caseCliquees.length === 2){
        
        //Délai pour voir s'afficher les deux images avant de vérifier la condition
        setTimeout(() => {
            if (caseCliquees[0].children("img").attr("src") === caseCliquees[1].children("img").attr("src")) {
                caseCliquees[0].children("img").attr("src", "./assets/images/validation.png");
                caseCliquees[0].children("img").attr("alt", "validation");
                caseCliquees[1].children("img").attr("src", "./assets/images/validation.png");
                caseCliquees[1].children("img").attr("alt", "validation");                
            } else {
                caseCliquees[0].children("img").attr("src", "./assets/images/question.svg").removeClass("tourne");
                caseCliquees[1].children("img").attr("src", "./assets/images/question.svg").removeClass("tourne");                
            }
            caseCliquees = [];       
            victory();     
        }, 2000);                
    }
}

//Condition de victoire
function victory(){
    if($('img[alt="validation"]').length === 12){
        $("h2").text("Bravo, vous avez gagné!")
    }
}

//Reset et lancer le jeu de nouveau avec espace 
function recommencerPartie(){
    //reset des cases cliquées, du texte de victoire, des alt des images validées et des animations sur les images
    caseCliquees = [];
    $("h2").text("A vous de jouer!")    
    $("img").removeClass("tourne").removeAttr("alt");        
    lancerJeu();
}



//Ecoute de "espace" pour redémarrer partie
 $(document).on("keydown", (event) => {
    if (event.code === "Space") {
    initGame();
   
    }
});

/*

function placeTable(rowcolumn) {
    let tableHtml = "<table>";
    for(i=0; i < row; i++){
        tableHtml += "<tr>";
        for(j=0; j<column;j++){
            tableHtml += `
                <td id="${(i * column)+j}">
                    <img src = "">
                </td>
            `;
        } 
    tableHtml += "</tr>"
    }
    tableHtml += "</table>"
    $("section").after(tableHtml);
}

placeTable(3, 4)
*/