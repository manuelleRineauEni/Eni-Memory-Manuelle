🃏 ENI Memory

Jeu de Memory en ligne réalisé dans le cadre de ma formation à l'ENI. Le joueur crée un compte, se connecte, choisit son thème d'images et la taille de sa grille, puis retrouve toutes les paires de cartes.

Le projet est entièrement front-end (HTML, CSS, JavaScript) : aucune base de données ni serveur n'est nécessaire, les données sont conservées dans le localStorage du navigateur.

✨ Fonctionnalités
Page d'accueil : présentation du jeu et des règles.
Inscription avec validation en temps réel : nom d'utilisateur de 3 caractères minimum / email valide / mot de passe d'au moins 6 caractères, avec un chiffre et un symbole / indicateur de robustesse du mot de passe (faible / moyen / fort) / confirmation du mot de passe / icônes de validation (✔ / ✖) sur chaque champ / refus des doublons de nom d'utilisateur et d'email.
Connexion : vérification de l'email et du mot de passe par rapport aux comptes enregistrés.
Profil : affichage des informations du joueur et choix de ses préférences :
thème du memory (avec aperçu de l'image du thème sélectionné) / taille de la grille.
Jeu :
grille générée dynamiquement selon les préférences / cartes mélangées aléatoirement (algorithme de Fisher-Yates) / animation de retournement des cartes / les paires trouvées sont validées, les autres se retournent face cachée / message de victoire lorsque toutes les paires sont trouvées / barre d'espace pour relancer une partie.
Site responsive : menu adapté aux mobiles grâce à Bootstrap.
🎨 Thèmes disponibles
Thèmes : Légumes, Animaux, Animaux animés, Animaux domestiques, Chiens, Dinosaures, Dinosaures avec nom, Lettres Scrabble
📐 Tailles de grille : 4x3 · 4x4 · 5x4 · 5x6

🛠️ Technologies
HTML5 / CSS3
JavaScript et jQuery 3.6.3
Bootstrap 5.3.9 (mise en page, navigation, formulaires)
Google Fonts : Playpen Sans
Web Storage API (localStorage) pour la persistance des données
📁 Structure du projet
.
├── index.html          # Accueil et règles du jeu
├── inscription.html    # Formulaire d'inscription
├── inscription.js      # Validation des champs + création du compte
├── connexion.html      # Formulaire de connexion
├── connexion.js        # Vérification des identifiants
├── profil.html         # Profil et préférences du joueur
├── profil.js           # Affichage du profil + enregistrement des préférences
├── jouer.html          # Page du jeu
├── jeuMemory.js        # Logique du jeu
├── style.css           # Styles personnalisés
└── assets/
    └── images/         # Icônes et images des différents memorys
🚀 Lancer le projet
Cloner le dépôt :
bash
git clone https://github.com/manuelleRineauEni/Eni-Memory-Manuelle.git
Ouvrir le dossier du projet.
Ouvrir index.html dans un navigateur (ou utiliser une extension de type Live Server dans VS Code).

Une connexion Internet est nécessaire pour charger Bootstrap, jQuery et la police Google Fonts via CDN.

🎮 Comment jouer
Créez un compte depuis la page S'inscrire.
Connectez-vous depuis la page Se connecter.
Dans votre profil, choisissez le thème et la taille de la grille, puis enregistrez : vous êtes redirigé vers le jeu.
Retournez deux cartes :
si les images sont identiques, elles restent visibles ;
sinon, elles se retournent face cachée.
La partie est terminée quand toutes les paires ont été trouvées.
Appuyez sur la barre d'espace pour relancer une partie.
💾 Données stockées

Les données sont enregistrées dans le localStorage du navigateur :

Clé	Contenu
users	Tableau des comptes (userName, email, password)
connectedUser	Utilisateur connecté (userName, email) et ses preferences (choixMemory, choixTaille)

🔒 Remarque : ce projet est un exercice pédagogique. Les mots de passe sont stockés en clair dans le navigateur, ce qui ne serait jamais acceptable en production. Une vraie application nécessiterait un back-end avec des mots de passe hachés.

🚧 Limites connues et pistes d'amélioration
Sauvegarde des 10 meilleurs scores : annoncée sur la page d'accueil, mais pas encore implémentée.
Compteur d'essais : à ajouter pour correspondre à la consigne « gagner avec le moins d'essais possibles ».
Taille de grille et thèmes : les thèmes Légumes et Animaux animés (8 images) ne permettent pas les grilles 5x4 et 5x6 ; les thèmes de 10 images ne permettent pas la grille 5x6. Il faudrait filtrer les tailles proposées selon le thème choisi.
Accès au jeu sans préférences : la vérification de connexion dans jeuMemory.js est actuellement commentée. Il faudrait rediriger vers la connexion ou le profil si aucun utilisateur n'est connecté ou si ses préférences ne sont pas définies.
Compte par utilisateur : les préférences sont enregistrées dans connectedUser et non dans le compte de l'utilisateur, elles sont donc perdues à la déconnexion.
Bouton de déconnexion : non disponible pour le moment.

🎨 Charte graphique
Dégradé de l'en-tête et boutons :
Début : 
#5268C9
Fin : 
#E73469
Police des titres : Playpen Sans.

👩‍💻 Auteur

Projet réalisé par Manuelle Rineau dans le cadre de la formation ENI.