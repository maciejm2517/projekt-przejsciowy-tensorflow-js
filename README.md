# projekt-przejsciowy-tensorflow-js

# Instalacja
* Pobranie repozytorium przy użyciu komendy
```
git clone https://github.com/maciejm2517/projekt-przejsciowy-tensorflow-js
```
* Zainstalowanie oprogramowania Node.js w wersji przynajmniej v18.16.0 (LTS): https://nodejs.org/en
* Przejście do folderu z projektem 
```
cd projekt-przejsciowy-tensorflow-js
```

* Instalacja wymaganych bibliotek znajdujących się w pliku package.json
```
npm install
```

* Dodanie linijki
```
"browser": { "fs": false, "node-fetch": false, "string_decoder": false, "crypto": false },
```
w pliku 
```
/projekt-przejsciowy-tensorflow-js/node_modules/@tensorflow-models/speech-commands/package.json
```
w celu uruchomienia modułu rozpoznawania głosu

* Uruchomienie lokalnego serwera strony internetowej
```
npm run start
``` 

# Installation
* Downloading the repository using the command
```
git clone https://github.com/maciejm2517/projekt-przejsciowy-tensorflow-js
```
* Install Node.js v18.16.0 (LTS) at least: https://nodejs.org/en
* Go to the project folder
```
cd transition-project-tensorflow-js
```

* Install required libraries from package.json
```
npm install
```

* Added a line
```
"browser": { "fs": false, "node-fetch": false, "string_decoder": false, "crypto": false },
```
in the file
```
/tensorflow-js-transition-project/node_modules/@tensorflow-models/speech-commands/package.json
```
to start the voice recognition module

* Starting a local webserver
```
npm run start
```
