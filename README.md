# Javascript-module-exam

This is a solution to the final exam of women in AI web-dev course [Nike page Javascript Module Exam](https://www.figma.com/design/y94fZXoiQvqpziu41yER66/Untitled?node-id=0-1&p=f&t=oZehXdzXlREkU6kb-0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

This is a simple landing page of an e-commerce site with minimal design that focuses on implementation of functionalities such as scroll, dynamic UI rendering, dynamic product-page creation, search and so on

### The challenge

Users should be able to:

- View hover effects on interactive elements such as links and buttons
- View available products on the home-page
- Utilize the pagination to navigate between different pages of products
- View dynamically changed design of the page after a certain scroll height is reached
- View product details in a separate page for each of the products listed on the home-page
- Filter products based on keywords (e.g Nike, pegasus, etc)
- View different category dropdowns of products (by gender, age and price)

### Links

- Live Site URL: [https://soposilverhawk.github.io/Javascript-module-exam/]

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Desktop-first workflow
- [SASS](https://sass-lang.com/) - CSS preprocessor
- SCSS (SASS syntax)
- [Styled Components](https://styled-components.com/) - For styles
- Vanilla Javascript
- Modular Javascript


### What I learned

I learned how to utilize modularity of Javascript, in this case to have made common UI components which then via export/imports were implemented as modules in different parts of the project. Apart from that I learned how to utilize event bubbling and event delegatin to effectively attach event listeners despite the rerending of UI. With all of this, I learnt how to effectively set multiple attributes at once from Javascript.

I also feel this project gave me an opportunity to better my understanding in separation of concerns with functions. Namely, I created and utilized separate functions for operation logic and for rendering items into UI.

Aside from that, I learned how to effectively clean user inputs for the purpose of comparing them to my own data for proper filtering (search functionality).


### Continued development

While working on the project I was actively using asynchronous operations for which I mainly used fetch API. I did refactor loader .js modules into using async/await but I would like to practice and develop better understanding of async/await in the future as it proved to be overall an easier way to work with promises.


## Author

- Website - [Sopo Bichinashvili](https://github.com/soposilverhawk)

