# O backendu

Backend napsán pomocí Node.js, Express, TypeScript, Sequelize a PostgreSQL

## Node.js a Express

[nodejs.org](https://nodejs.org/en/)

[expressjs.com](https://expressjs.com/)

Node.js je prostředí pro spouštění JavaScriptu na serveru. Express je framework pro Node.js, který umožňuje snadnou
tvorbu REST API. K routám můžeme definovat middleware, které se provedou před zpracováním dané routy. Například můžeme
zde definovat, že uživatel musí být přihlášen, aby se dostal na danou routu. 

## TypeScript

[typescriptlang.org](https://www.typescriptlang.org/)

TypeScript je superset jazyka JavaScript, který přidává statické datové typy. Díky tomu je kód mnohem čitelnější,
stabilnější a rozšiřitelnější. TypeScript je kompilován do JavaScriptu.

## Sequelize

[sequelize.org](https://sequelize.org/)

Sequelize je ORM (Object Relational Mapper) pro Node.js. Umožňuje snadnou práci s databází. Můžeme pomocí něj definovat
modely, které odpovídají tabulkám v databázi. Dále můžeme pomocí něj definovat tzv. associations, které definují vztahy
mezi tabulkami. Například můžeme definovat, že uživatel může mít více úkolů a úkol může mít pouze jednoho uživatele.

## PostgreSQL a Adminer

[postgresql.org](https://www.postgresql.org/)

[adminer.org](https://www.adminer.org/)

PostgreSQL je open-source databáze. Adminer je jednoduchý webový klient pro práci s databází.