"use strict";

((window.Portfolio = window.Portfolio || {}),
  (window.Portfolio.UTILS = {
    ...(window.Portfolio.UTILS || {}),
    on: (el, event, handler, options) => {
      el && el.addEventListener(event, handler, options);
    },
    debounce: function (fn, delay = 100) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    },
  }));
