# Guide Utilisateur – Sellwatch

## 1. Présentation générale

**Sellwatch** est une application de gestion et de suivi des ventes destinée aux commerçants, entrepreneurs et petites entreprises.  
Elle permet de gérer les ventes, le stock, les commandes et de visualiser des statistiques de performance de manière simple et efficace.

L’application est accessible :
- Sur **navigateur web**
- Sur **Android (APK installable)**

---

## 2. Accès à l’application

### 2.1 Version Web
Ouvrez l’application dans un navigateur moderne (Chrome, Edge, Firefox) via le lien :

👉 **https://sellwatch-ui.vercel.app**

Aucune installation n’est nécessaire pour la version web.

---

### 2.2 Version Android (APK)
1. Téléchargez le fichier APK signé
2. Activez *Autoriser les applications de sources inconnues* sur votre téléphone
3. Installez l’APK
4. Lancez l’application depuis l’écran d’accueil

---

## 3. Interface générale

L’application est composée des sections suivantes :

- **Dashboard** : vue globale des ventes
- **Statistiques** : graphiques et tableaux avancés
- **Stock** : gestion des produits
- **Paramètres** : personnalisation de l’application

La navigation se fait via le **menu latéral**.

---

## 4. Dashboard

### Fonctionnalités :
- Visualisation rapide des ventes
- Aperçu du chiffre d’affaires
- Résumé des commandes récentes

Le dashboard donne une **vue synthétique** de l’activité commerciale.

---

## 5. Gestion du Stock

### 5.1 Ajouter un produit
1. Aller dans **Stock**
2. Remplir le formulaire :
   - Nom du produit
   - Quantité
   - Prix unitaire
   - Nombre vendu
3. Cliquer sur **Ajouter**

### 5.2 Modifier un produit
- Maintenez un clic droit (ou appui long sur Android) sur la ligne du produit
- Choisissez **modifier**
- Entrez les nouvelles valeurs

### 5.3 Supprimer un produit
- Clic droit / appui long
- Choisissez **supprimer**

### 5.4 Statut automatique du stock
- **En attente** : stock à 0
- **Faible** : stock ≤ 5
- **Normal** : stock correct
- **Excès** : stock ≥ 50

---

## 6. Statistiques avancées

La page **Statistiques** affiche :

### 6.1 Graphiques
- **Bar Chart** : Top des ventes
- **Pie Chart** : Répartition des ventes
- **Line Chart** : évolution du chiffre d’affaires
- **Line Chart annotations** : notes clients

Les graphiques s’adaptent automatiquement à la taille de l’écran (mobile, tablette, desktop).

---

### 6.2 Tableau détaillé
- Liste complète des ventes et commandes
- Indicateurs :
  - Livré
  - En attente
  - Payé
  - Annulé
  - Supprimé

Le tableau est **scrollable verticalement** pour éviter le débordement de l’écran.

---

## 7. Paramètres de l’application

Dans la page **Paramètres**, l’utilisateur peut :

### 7.1 Thème
- Blue Sky
- Dark
- White
- Sunset

### 7.2 Devise
- XOF
- USD
- EUR

### 7.3 Taille du texte
- 14px
- 16px
- 18px
- 20px

Après modification, cliquez sur **Enregistrer**.

Les préférences sont **sauvegardées localement** sur l’appareil.

---

## 8. Stockage des données

- Les données sont stockées localement via **localStorage**
- Aucune connexion internet n’est requise pour utiliser l’application après chargement
- Les données restent disponibles même après fermeture de l’application

---

## 9. Sécurité et fiabilité

- Validation des formulaires
- Protection contre les saisies invalides
- Aucune donnée personnelle sensible n’est collectée
- Application légère et stable

---

## 10. Bonnes pratiques d’utilisation

- Vérifiez régulièrement votre stock
- Utilisez les statistiques pour analyser les performances
- Ajustez le thème et la taille du texte pour un meilleur confort visuel
- Faites des sauvegardes si nécessaire

---

## 11. Support et évolution

Cette version correspond à :
- **Version : v1.0.0**
- Projet académique encadré

Les futures versions pourront inclure :
- Comptes utilisateurs
- Synchronisation cloud
- Export PDF/Excel
- Backend sécurisé

---

## 12. Auteur

**Oyoki**  
Application : **Sellwatch**  
Projet académique – Conception et développement d’application
