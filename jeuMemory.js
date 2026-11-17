//compteur du nombre d'images cliquées
let compteur = 0;
let caseCliquees = [];
let casesValidees=[];
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
        $(`#${i}`).on("click", revealTwoImages);    
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
            $(`#${i}`).children("img").attr("src", "./assets/images/question.svg").attr("data-image", plateauMelange[i]);
        }
    }

//Révéler deux image au click et les faire disparaitre si c'est faux
function revealTwoImages() {    
    //Réveler l'image cliquée avec fondu
    let vraieImage = $(this).children("img").attr("data-image");
    $(this).children("img").attr("src", vraieImage).fadeIn();  
    //Incrémenter le compteur de click d'image
    compteur++
    //Remplir le tableau pour garder en mémoire les 2 images cliquées
    caseCliquees.push($(this));
    //Conditions
    //si deux images ont été cliquée et qu'elles sont pareilles
    if(compteur===2 && caseCliquees[0].children("img").attr("src") === caseCliquees[1].children("img").attr("src")){
        caseCliquees[0].children("img").attr("src", "./assets/images/validation.png")
        caseCliquees[0].children("img").attr("alt", "validation")
        caseCliquees[1].children("img").attr("src", "./assets/images/validation.png")
        caseCliquees[1].children("img").attr("alt", "validation")
        compteur = 0;
        caseCliquees = []
        //si deux images sont cliquées mais qu'elles sont différentes et qu'elles n'ont pas déjà été validées
    } else if (compteur === 2 && caseCliquees[0].children("img").attr("alt") != "validate") {
        caseCliquees[0].children("img").fadeOut();
        caseCliquees[1].children("img").fadeOut();
        compteur = 0;
        caseCliquees = []
    }    
    victory();
}  

//Condition de victoire
function victory(){
    if($('img[alt="validation"]').length === 12){
        $("h2").text("Bravo, vous avez gagné!")
    }
}

lancerJeu();