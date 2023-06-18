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

* Dodanie linijki
```
"browser": { "fs": false, "node-fetch": false, "string_decoder": false, "crypto": false },
```
w pliku 
```
/projekt-przejsciowy-tensorflow-js/node_modules/@tensorflow-models/speech-commands/package.json
```
w celu uruchomienia modułu rozpoznawania głosu

* Instalacja wymaganych bibliotek znajdujących się w pliku package.json
```
npm install
``` 
* Uruchomienie lokalnego serwera strony internetowej
```
npm run start
``` 