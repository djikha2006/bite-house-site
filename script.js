document.addEventListener("DOMContentLoaded", function () {

    // 1. Message de bienvenue
    const bienvenue = document.getElementById("bienvenue");

    if (bienvenue) {
        bienvenue.textContent = "Bienvenue chez BITE HOUSE !";
    }

    // 2. Bouton de découverte du menu
    const boutonMenu = document.getElementById("boutonMenu");
    const messageMenu = document.getElementById("messageMenu");

    if (boutonMenu && messageMenu) {
        boutonMenu.addEventListener("click", function () {
            messageMenu.textContent =
                "Voici nos délicieux plats ! Choisis ton préféré. 🍔";
        });
    }

    // 3. Produits disponibles
    const produits = [
        {
            id: "commanderBurger",
            nom: "Classic Burger",
            prix: 3500
        },
        {
            id: "commanderPizza",
            nom: "Pizza Spéciale",
            prix: 5000
        },
        {
            id: "commanderMilkshake",
            nom: "Milkshake",
            prix: 2000
        }
    ];

    // 4. Éléments du panier
    const listePanier = document.getElementById("listePanier");
    const totalPanier = document.getElementById("totalPanier");
    const nombreArticles = document.getElementById("nombreArticles");
    const boutonVider = document.getElementById("viderPanier");

    if (!listePanier || !totalPanier ||
        !nombreArticles || !boutonVider) {
        console.error("Vérifie les éléments HTML du panier.");
        return;
    }

    // 5. Créer un panier vide
    const panier = [];

    // 6. Afficher le panier
    function afficherPanier() {
        listePanier.replaceChildren();

        if (panier.length === 0) {
            const message = document.createElement("li");
            message.textContent = "Ton panier est vide.";
            listePanier.appendChild(message);
        }

        panier.forEach(function (produit, index) {
            const ligne = document.createElement("li");
            ligne.className = "ligne-panier";

            // Nom et prix du produit
            const details = document.createElement("span");

            const sousTotal = produit.prix * produit.quantite;

            details.textContent =
                produit.nom + " — " +
                sousTotal.toLocaleString("fr-FR") +
                " FCFA";

            // Groupe des boutons de quantité
            const controles = document.createElement("div");
            controles.className = "controles-quantite";

            // Bouton moins
            const boutonMoins = document.createElement("button");
            boutonMoins.type = "button";
            boutonMoins.className = "btn bouton-quantite";
            boutonMoins.textContent = "−";
            boutonMoins.setAttribute(
                "aria-label",
                "Diminuer la quantité de " + produit.nom
            );

            // Afficher la quantité actuelle
            const quantite = document.createElement("span");
            quantite.className = "quantite";
            quantite.textContent = produit.quantite;

            // Bouton plus
            const boutonPlus = document.createElement("button");
            boutonPlus.type = "button";
            boutonPlus.className = "btn bouton-quantite";
            boutonPlus.textContent = "+";
            boutonPlus.setAttribute(
                "aria-label",
                "Augmenter la quantité de " + produit.nom
            );

            // Diminuer la quantité
            boutonMoins.addEventListener("click", function () {
                produit.quantite--;

                // Supprimer le produit si la quantité arrive à zéro
                if (produit.quantite <= 0) {
                    panier.splice(index, 1);
                }

                afficherPanier();
            });

            // Augmenter la quantité
            boutonPlus.addEventListener("click", function () {
                produit.quantite++;
                afficherPanier();
            });

            controles.append(
                boutonMoins,
                quantite,
                boutonPlus
            );

            // Bouton pour retirer complètement le produit
            const boutonRetirer = document.createElement("button");
            boutonRetirer.type = "button";
            boutonRetirer.className = "btn bouton-retirer";
            boutonRetirer.textContent = "Retirer";

            boutonRetirer.addEventListener("click", function () {
                panier.splice(index, 1);
                afficherPanier();
            });

            ligne.append(details, controles, boutonRetirer);
            listePanier.appendChild(ligne);
        });

        // 7. Calculer le montant total
        const total = panier.reduce(function (somme, produit) {
            return somme + produit.prix * produit.quantite;
        }, 0);

        totalPanier.textContent =
            "Total : " + total.toLocaleString("fr-FR") + " FCFA";

        // Compter le nombre total d'articles
        const nombreTotal = panier.reduce(function (somme, produit) {
            return somme + produit.quantite;
        }, 0);

        nombreArticles.textContent = nombreTotal;
    }

    // 8. Ajouter les produits au panier
    produits.forEach(function (produit) {
        const bouton = document.getElementById(produit.id);

        if (bouton) {
            bouton.addEventListener("click", function () {

                // Vérifier si le produit est déjà dans le panier
                const produitExistant = panier.find(function (article) {
                    return article.id === produit.id;
                });

                if (produitExistant) {
                    produitExistant.quantite++;
                } else {
                    panier.push({
                        ...produit,
                        quantite: 1
                    });
                }

                afficherPanier();
            });
        } else {
            console.error("Bouton introuvable :", produit.id);
        }
    });

    // 9. Vider tout le panier
    boutonVider.addEventListener("click", function () {
        panier.length = 0;
        afficherPanier();
    });

    // 10. Affichage initial
    afficherPanier();

});