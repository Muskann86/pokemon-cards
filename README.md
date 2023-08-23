# Poke-context 1 (avec correction)

[Poke-context](./public/poke-context.m4v)

Ce projet va regrouper l'ensemble des connaissances que vous avez accumulé lors de ces dernières semaines, mais cette fois ci avec l'utilisation des Hooks React. Cet énoncé est délibérément moins détaillé que les anciens. On prend en compte votre évolution et connaissances que vous avez acquis lors de ces dernières semaines React.

## Instructions

L'objectif de cet exercice consiste à créer un mini-site pour récupérer l'information d'un Pokémon de manière aléatoire. Un utilisateur aura le droit d'accéder à la fonctionnalité de récupération de Pokémon seulement s'il est connecté.

Cette information d'utilisateur connecté ou non sera partagé à l'aide du context (À découvrir dans le cours suivant).

Créez une nouvelle application `poke-context`

```jsx
npx create-react-app poke-context
```

Installez le package `react-router-dom`

```jsx
npm i react-router-dom
```

## Mise en place des pages :

-   Créez un dossier components avec deux nouveaux fichiers `Home.jsx` et `Login.jsx`.
-   Chacun de ces fichiers contiendra un simple composant fonction pour le moment, tout deux affichant un texte `HOME` et `LOGIN`.
-   Dans `App.js`, initialisez deux routes dans une `navbar` à l'aide des `BrowserRouter`, `Switch` et `Route` du package `react-router-dom` (N'oubliez pas de l'installer et de l'importer).
-   Prévoyez également une route en cas d'erreur 404
-   Essayez de naviguer entre les deux routes. S'il n'y pas d'erreurs, vous pouvez passer à la suite.

💡 Cf. [cours](https://www.notion.so/f6da4f8e516541c29f45abf080f1674b) sur le Router ou la [documentation](https://react-hook-form.com/) pour des exemples.

## Création du formulaire de Login

-   Allez sur le fichier `components/Login.js`
-   Installer le package `react-hook-form`
-   Créez un formulaire avec deux inputs et les validations suivantes :
    -   username ⇒ `required` et `maxLength: 15`
    -   password ⇒ `required` et `minLength: 6`
-   Utilisez la méthode `register()` de `react-hook-form` pour la validation des champs
-   Affichez les erreurs dans des balises `li` en utilisant la variable `errors` de `react-hook-form`
-   Créez une méthode `onSubmit` qui va permettre de récupérer les information du formulaire. Pour le moment afficher simplement un `console.log`

[Poke-context](./public/poke-context.png)

💡 Cf. [cours](https://www.notion.so/3b41deccf54e452a999d3d8459e5902a) sur le formulaire ou la [documentation](https://react-hook-form.com/) pour des exemples

## Création de la page Home

-   Allez sur le fichier `components/Home.js`
-   Ce composant va récupérer les informations d'un Pokémon de façon asynchrone.
-   Pour ça, nous allons utiliser la géniale [Poké-API](https://pokeapi.co/) ! Ouvrez la documentation et lisez attentivement les informations. Faites un test pour voir à quoi ressemble chaque réponse de l'API, et décryptez toutes les clés de ces réponses pour localiser les informations nécessaires !
-   Créez un state `pokemon` et sa fonction de mise à jour `setPokemon` en utilisant le hook `useState()` initialisé avec la valeur `null`.
-   Créez un hook `useEffect` pour effectuer une action seulement au montage du composant. Dans celui-ci, vous allez récupérer les informations du premier Pokémon [https://pokeapi.co/api/v2/pokemon/1](https://pokeapi.co/api/v2/pokemon/1) et le stocker dans le state avec la fonction `setPokemon` déclarée plus haut.

💡 L'api marche de cette manière [https://pokeapi.co/api/v2/pokemon/ID](https://pokeapi.co/api/v2/pokemon/ID) où
ID correspondant à un nombre. Ce numéro est associé à un Pokémon. Par exemple, le 1 correspond à Bulbizarre.

-   Vérifiez bien que le Pokémon est enregistré dans le state à l'aide d'un `console.log()`.
-   Au niveau du render, nous allons simplement afficher les informations suivantes :

```jsx
name;
height;
weight;
types;
```

💡 Notez qu'un Pokémon peut avoir plusieurs types. Il vous faut donc parcourir le tableau `types` avant des les afficher individuellement.

-   Finalement, créez un bouton qui permet de récupérer un Pokémon aléatoirement et de mettre à jour le state de `pokemon`

Vous pouvez utiliser la fonction ci-dessous pour récupérez un nombre aléatoire entre 1 et 151

```jsx
function randomNumber() {
	return Math.floor(Math.random() * 151) + 1;
}
```

💡 Faites une concatenation de l'url et du nombre aléatoire pour récupérer un pokemon aléatoirement

-   Lorsque vous cliquez sur le bouton, vous devez visuellement voir que les information du Pokémon changent.

> Bravo, vous avez fini la première partie de l'exercice !

# Poke-context 2

## Initialisation du Context

Dans cet exercice, nous allons créer un **Context** très simple contenant seulement une variable `isLogged` Ce **Context** va être déclarer au plus haut niveau pour pouvoir être partagé entre les composants `Home` et `Login` :

-   Dans le fichier `App.js`, créez une constante `UserContext` qui prendra comme valeur la déclaration d'un context avec la méthode `createContext()` initialisée avec une propriété `isLogged` à `false` (pour la syntaxe, référez vous au [cours](https://www.notion.so/Context-aafcfe8077b44b3a8bcc0d758765e8a1) ou à la [documentation](https://fr.reactjs.org/docs/context.html)).
-   Puis créez un state `isLogged` et `setIsLogged` initialisé à `false`.
-   Créez une fonction `setAuth()` qui permet d'inverser la valeur du state `isLogged` (false ⇒ true / true ⇒ false) en appelant `setIsLogged()`. Cette fonction sera utilisée par tous les composants enfants du context pour mettre à jour la valeur de `isLogged`.
-   Placez `UserContext.Provider` en tant que balise dans le render de manière à ce qu'il englobe tous les composants enfants.
-   Maintenant nous devons donner accès à ces deux valeurs (`isLogged` et `setAuth()`) aux consumers. Pour ce faire, il faut passer à l'attribut `value` un objet contenant `isLogged` et `setAuth()` au sein de la balise `UserContext.Provider`.

> Vous avez terminer l'initialisation du context ! Vous donner accès à vos composants enfants une manière de modifier et de lire une variable commune sans avoir à passer de props.

<aside>
💡 Bonus : Vous pouvez séparer le code du context dans un fichier `src/context/userContext.js` pour plus de clarté.

</aside>

<aside>
⚠️ Si vous ne comprenez pas ce que vous faite durant ces étapes, relisez le cours et essayez de comprendre pourquoi est-ce que nous vous demandons d'effectuer ces instructions.

</aside>

## Utilisation du context dans la page de login

Maintenant que nos enfants peuvent lire et écrire la valeur de `isLogged`. Nous allons utiliser cette valeur pour afficher du contenu différent si l'utilisateur est connecté ou non.

-   Rendez-vous dans le fichier `Login.jsx` et modifiez la fonction `onSubmit()` pour y appeler la fonction du context `setAuth()`. N'oubliez pas d'importer le `UserContext` et ses méthodes à l'aide de la fonction `useContext`.
-   Vérifiez à l'aide d'un `console.log()` que le state `isLogged` du context est bien changé lorsqu'on clique sur le bouton de soumission du formulaire.
-   Maintenant, en fonction de la valeur de `isLogged`, affichez un bouton différent :
-   Si l'utilisateur est connecté, on affiche le bouton du formulaire (type submit) :

```jsx
<span className="btn btn-danger" onClick={onSubmit}>
	Logout
</span>
```

<aside>
💡 Nous utilisons un `span` plutôt qu'un `button`, considéré par **React Hook Form** comme un bouton de soumission de formulaire.

</aside>

-   Sinon, il s'agira d'un bouton standard

```jsx
<button className="btn btn-primary" type="submit">
	Login
</button>
```

Cette étape est importante sinon vous allez devoir réécrire les valeurs du formulaire pour pouvoir vous déconnecter. Ce qui n'est pas très logique.

Aide pour la syntaxe de `useContext` :

```jsx
// Syntaxe de useContext :
import React, { useContext } from "react";
const { uneValeur, uneMethode, uneAutreValeur } = useContext(UnContext);
```

## Utilisation du context dans la page Home

-   Dans cette page, nous allons cacher tout le contenu si l'utilisateur n'est pas connecté.
-   Pour ce faire nous allons utiliser la notions de render conditionnel vu dans les [cours](https://www.notion.so/1f4d08ee94d9416ba2084024beca7020) précédents et la valeur du context `isLogged`.
-   Si `isLogged` est `true` l'utilisateur peut voir et changer la valeur du Pokémon.
-   Sinon, on lui affiche un simple composant l'invitant à se connecter à l'aide d'un lien pointant sur la route `/login`.
# pokemon-cards
