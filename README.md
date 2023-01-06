# WEA TODO

- [deploynutá stránk](http://139.59.147.144:8000)
- Existuje demo uživatel
  - login: `demo@test.cz`
  - heslo: `heslo123`

Aplikace se skládá z 2 částí:

- backend
	- Node.js, Express
	- Typescript
	- Postgres + ORM knihovna Sequelize
- frontend
	- Vue.js 3
	- Typescript
	- Vite pro bundling a dev server
	- Vue-router pro routování
	- Pinia pro state management

## Struktura backendu

- Na backendu existuje abstrakce pro Express.js. Námi psaný kód píšeme jako moduly - každý modul má svůj router, ve
  kterém se definují routy - cesta, http metoda, kontroler a akce. Všechny moduly jsou v adresáři `src/modules`.
	- Př:
		- `src/modules/user` - modul pro autentikaci
		- `src/modules/task` - modul pro práci s úkoly
- K routám můžeme připojit middleware - opět abstrakce. Middleware je funkce, která se spustí před kontrolerem.
	- Př:
		- `src/middleware/NoRouteFoundMiddleware` - middleware, která se spustí, pokud není nalezena žádná cesta
		- `src/middleware/UserLoggedMiddleware` - middleware, která se spustí před každou routou, která je přístupná
		  pouze přihlášeným uživatelům
- Kontrolery jsou třídy, které obsahují akce. Akce jsou funkce, které se spustí při zavolání konkrétní routy.
	- Př:
		- `src/modules/user/controllers/UserController` - kontroler pro práci s uživateli
		- `src/modules/task/controllers/TaskController` - kontroler pro práci s úkoly
- Pokud vytvoříme nový modul, musíme ho manuálně přidat do `src/app.ts` do pole `routers`.
- Backend využívá ORM Sequelize. Všechny modely jsou v adresáři `src/models`. Práce s modely jsem se snažit zabalit do
  repositářů (ty jsou v modulech)
	- Př:
		- `src/modules/user/repository/UserRepository` - repositář pro práci s uživateli
		- `src/modules/task/repository/TaskRepository` - repositář pro práci s úkoly
- Pro ověření uživatele se používá JWT. Tento token je uložen v httpOnly cookie. Pro odhlášení je potřeba zavolat
  endpoint /signout, který smaže cookie. Při každém načtení klientské stránky se musí poslat request na /user, který
  vrátí informace o uživateli, pokud je uživatel přihlášený. Pokud není, tak se vrátí 401 Unauthorized.

## Struktura frontendu

- Na frontendu je použit Vue.js 3. Všechny komponenty jsou v adresáři `src/components`.
- Veškerá komunikace se serverem se nachází v Pinia storech. Store je třída, která obsahuje state a akce. State je
  reaktivní, takže se změny v něm automaticky projeví v komponentách. Akce jsou funkce, které mění state. Store se
  nachází v adresáři `src/store`.
    - Př:
        - `src/stores/AuthStore` - store pro práci s uživatelem. Je zde metoda `isAuthenticated`.
        - `src/stores/TaskStore` - store pro práci s úkoly
- Routování je řešeno pomocí Vue-routeru. Všechny routy jsou v souboru `src/router/router.ts`. U každé routy můžeme
  definovat `beforeEach` guard (middleware), který se spustí před načtením routy.
  - Př:
    - `src/guards/auth.ts` - obsahuje dva guard jestli je nebo není uživatel přihlášený. Pokud není, tak se přesměruje na
      login stránku.

## Docker
- Deploy aplikace řeším pomocí Dockeru. Nastavení se nachází v `docker-compose.yml`, tedy po zavolání `docker-compose up`
  se spustí backend a frontend. Backend je dostupný na portu 3000, frontend na portu 8000.