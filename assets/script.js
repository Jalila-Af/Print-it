/* ---------- REGLAGE GENERAL DE CHARGEMENT ----------*/

// Décrit l'état de chargement du fichier document : différer le lancement du script tant que le doc et ttes les sous-ressources n'ont pas fini de se charger 
if (document.readyState === "complete") { // si etat de lecture du document est complète
	monScript();
  } else { // alors mon script peut être chargé
	document.addEventListener("DOMContentLoaded", function () { //une fois que l’addEventListener est exécuté, la fonction passée en paramètre ne se lance pas immédiatement. Cette dernière sera lancée au moment où l'événement qu’on écoute (ici, "DOMContentLoaded") se produit.
	  monScript();   
	});
  }
  
  function monScript() {
	alert("Et Hop !"); // alerte pour tester le foctionnement de mon script

/* ---------- FIN REGLAGE GENERAL DE CHARGEMENT ----------*/

  
/* ---------- REGLAGE CONCERNANT LES IMAGES ----------*/

	//Tableau non modifié-Les images sont stockées ici, cela m’a permis de les retrouver en un seul endroit, et de limiter le nombre de variables dans mon code.

	const slides = [
	  {
		image: "slide1.jpg",
		tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
	  },
	  {
		image: "slide2.jpg",
		tagLine:
		  "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
	  },
	  {
		image: "slide3.jpg",
		tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
	  },
	  {
		image: "slide4.png",
		tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
	  },
	];
  
	//Information concernant le rôle slider + position de la 1ère image + localisation des images
	let nbElement = slides.length - 1; //Pour connaître le nombre d’éléments que contient mon tableau, j'accéde à la propriété length - JS est indexé à 0 afin de parcourir mon tableau entier,je définis la limite maximale length-1
	let numDot = 0;
	let srcImage = "./assets/images/slideshow/"; //emplacement des images

	// Méthode qui consiste à retourner ces Elements dans le document correspondant au sélecteur 
	const bannerImg = document.querySelector(".banner-img");
	const bannerText = document.querySelector(".banner-text");
	const arrowLeft = document.querySelector(".arrow_left");
	const arrowRight = document.querySelector(".arrow_right");
	const dots = document.querySelector(".dots");

/* ---------- FIN REGLAGE CONCERNANT LES IMAGES ----------*/

/* ---------- REGLAGE DES FLECHES ET LES BULLETS POINTS ----------*/
  
	// Flêches qui s'affichent lors du lancement du script
	arrowLeft.classList.remove("hidden");//classlist propriété spécifique qui permet de modifier des classes + methode remove
	arrowRight.classList.remove("hidden");
  
	// Création des bullets points
	for (let pas = 0; pas <= nbElement; pas++) { //La boucle for permet de répéter du code lorsque l’on sait d’avance combien de fois il faudra le répéter.

	  dots.innerHTML += //méthode innerHTML pour créer nos éléments
		'<span id="dot' +
		pas +
		'" class="dot" title="Image ' +
		(pas + 1) +
		'"></span>';
	}
  
	// Liste sur éléments portant la class dot
	const dotList = document.querySelectorAll(".dot");
  
	// Mise en forme  des bullets points : celui qui est actif est rempli et les autres sont semblables à des cercles 
	const addSelected = () => {
	  for (let pas = 0; pas <= nbElement; pas++) {
		if (pas === numDot) {
		  dotList[pas].classList.add("dot_selected"); //ajouter
		} else {
		  dotList[pas].classList.remove("dot_selected");//supprimer
		}
	  }
	};
  
	// Dot actif et image portant son texte
	const updateSlider = (arg) => {
	  bannerImg.src = srcImage + slides[arg]["image"];
	  bannerImg.alt = "Banner Print-it - " + slides[arg]["image"];
	  bannerText.innerHTML = slides[arg]["tagLine"];
	  addSelected();
	};
  
	// Mise en place de l'image de départ du slider avec le texte
	updateSlider(numDot);
  
	// Target la propriété en lecture seule de l'id de la catégorie dot
	dots.addEventListener("click", (e) => {
	  if (e.target.id != "" && e.target.id != null) {
		numDot = parseInt(e.target.id.substring(3));
	  }
	  updateSlider(numDot);
	});
  
	// Réglage de la fleche gauche
	arrowLeft.addEventListener("click", () => {
	  if (numDot <= 0) {
		numDot = nbElement;
	  } else {
		numDot--;
	  }
	  updateSlider(numDot);
	});
  
	// Réglage de la fleche droite
	arrowRight.addEventListener("click", () => {
	  if (numDot >= nbElement) {
		numDot = 0;
	  } else {
		numDot++;
	  }
	  updateSlider(numDot);
	});
  }

/* ---------- FIN REGLAGE DES FLECHES ET LES BULLETS POINTS ----------*/
