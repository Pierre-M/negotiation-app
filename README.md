# negociation-app [![Netlify Status](https://api.netlify.com/api/v1/badges/925a892d-991a-4850-b79b-3cf90926aa02/deploy-status)](https://app.netlify.com/sites/negotiation-app-for-everoad/deploys)

Check it here : [https://negotiation-app-for-everoad.netlify.app/](https://negotiation-app-for-everoad.netlify.app/)

## Introduction

This tiny app allows an employer and an employee to negotiate employee's salary comparing :

-   How much employer is willing to pay
-   How much employee wants as a minimum

Moreover, when negotiation result is displayed, you also have access to London current temperature in degree :)

## Stack

-   Typescript
-   Vue.js
-   @vue/composition-api \*
-   vue-i18n
-   Sass
-   Jest + vue-test-utils
-   deployed with Netlify

\* I preferred to use only this plugin rather than Vue.js 3 beta as it does not seems to be entirely ready for production.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test
```

### Lints and fixes files

```
yarn lint
```

## Bonus

A few months ago, I did a quick side project to test some new stuff, using also OpenWeatherApp API to build a meteo app.

You can check it here: [https://snaly.netlify.com/](https://snaly.netlify.com/).

And if you want to see the code also : [https://github.com/Pierre-M/snaly](https://github.com/Pierre-M/snaly)
