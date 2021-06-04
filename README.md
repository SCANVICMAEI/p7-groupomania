# Groupomania </br> Projet 7 Open ClassRooms <br/>SCANVIC Maei

<h1>Etapes d'installation du Projet</h1>

Dans un premier temps installer Node.js et MySQL localement 

```bash
git clone https://github.com/SCANVICMAEI/p7-groupomania.git && cd p7-groupomania
```

- Paramétrer l'application
```bash
cp example.env .env
```
- Créer une base de données MySQL et un user
- Compléter le .env avec les informations requises

```bash
cd backend
npm install
nodemon serve
```
- (Optionnel) Importer les tables dans la base de données : Créer la base de données dans MySQL (groupomania)
```bash
sequelize db:migrate
```

Si sequelize et mysql2 ne sont pas installés localement faire ceci: npm i -g sequelize-cli npm install -g sequelize npm install mysql2 -g

## Côté front
```bash
cd ../frontend
```
Si besoin, (si pas de serveur web qui tourne sur lequel on peut executer notre application)`: 
```bash
npm install && npm run serve
```

## Résultat
Enjoy localhost:8080
