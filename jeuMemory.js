
let caseCliquees = [];    
let images=["./assets/images/memory-legume/1.svg", "./assets/images/memory-legume/2.svg", "./assets/images/memory-legume/3.svg",
"./assets/images/memory-legume/4.svg", "./assets/images/memory-legume/5.svg", "./assets/images/memory-legume/6.svg", 
"./assets/images/memory-legume/1.svg", "./assets/images/memory-legume/2.svg", "./assets/images/memory-legume/3.svg",
"./assets/images/memory-legume/4.svg", "./assets/images/memory-legume/5.svg", "./assets/images/memory-legume/6.svg"];

// Fonction lancer jeu
function lancerJeu(){    
    let plateau = melangerTableau(images);
    attribuerImages(plateau);
    //Lancement de la boucle de jeu
    for(let i=0; i<12; i++){
        $(`#${i}`).off("click", revealTwoImages).on("click", revealTwoImages);    
    }  
}

//Mélanger les images du plateau de jeu
function melangerTableau(plateau) {
  // Création d'une copie pour ne pas modifier l'original
  const copie = [...plateau]; 
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]]; // Échange des éléments
  }  
  return copie;
}

//Attribuer les images aux cases du html tout en restant cachée
    function attribuerImages(plateauMelange){
        for(let i=0; i<plateauMelange.length; i++){
            $(`#${i}`).children("img").attr("src", "./assets/images/question.svg").attr("data-image", plateauMelange[i]).attr("alt","");
        }
    }

//Révéler deux image au click et les faire disparaitre si c'est faux
function revealTwoImages() {       
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

lancerJeu();

//Ecoute de "espace" pour redémarrer partie
 $(document).on("keydown", (event) => {
    if (event.code === "Space") {
    recommencerPartie();
   
    }
});

