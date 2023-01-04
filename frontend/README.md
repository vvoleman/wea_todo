# O frontendu

Frontend napsán pomocí Vue3, Vite, TypeScript, Pinia a Vue Router

## Vue3

[vuejs.org](https://v3.vuejs.org/)

Knihovna, která umožňuje tvorbu reaktivních komponent - při změně dat v komponentě se automaticky aktualizuje i vzhled
komponenty. Umožňuje rychlý vývoj a snadnou údržbu.

## Vite

[vitejs.dev](https://vitejs.dev/)

Nástupce webpacku pro vývoj frontendu. Umožňuje kompilaci TypeScriptu, SASSu, případně i TypeScriptu do JavaScriptu.
Daleko rychlejší než webpack. Vite je také přímo určen pro vývoj frontendu, webpack je určen pro vývoj jak frontendu,
tak backendu.

## TypeScript

[typescriptlang.org](https://www.typescriptlang.org/)

TypeScript je superset jazyka JavaScript, který přidává statické datové typy. Díky tomu je kód mnohem čitelnější,
stabilnější a rozšiřitelnější. TypeScript je kompilován do JavaScriptu.

## Pinia

[pinia.esm.dev](https://pinia.esm.dev/)

Pinia je state management knihovna pro Vue3. Umožňuje snadnou správu stavu aplikace. Stav je uložen v jednom souboru (
store). Stav je reaktivní, takže se automaticky aktualizuje vzhled aplikace při změně stavu. Můžeme takto na jednom
místě definovat třeba metody pro práci s API, které můžeme použít v různých komponentách.

## Vue Router

[vue-router.vuejs.org](https://next.router.vuejs.org/)

Vue Router je router pro Vue3. Umožňuje snadnou navigaci mezi stránkami aplikace. Můžeme také definovat tzv. guard -
middleware, který se provede před přechodem na danou stránku. Například můžeme zde definovat, že uživatel musí být
přihlášen, aby se dostal na danou stránku.

Vue Router se stará o historii prohlížeče, takže se můžeme vracet zpět pomocí tlačítka zpět v prohlížeči.


