/*
*
    INJECT IN CUSTOM CODE - JS
*
*/
let myScript = document.createElement("script");

if (window.location.hostname.endsWith(".webflow.io"))
  //DEVELOPMNENT
  myScript.setAttribute(
    "src",
    "https://44zhf9-8080.preview.csb.app/src/js/pages/black-friday/index.js"
  );
//PRODUCTION
else
  myScript.setAttribute(
    "src",
    "https://w-thefutur.netlify.app/js/pages/black-friday/index.min.js"
  );

document.body.appendChild(myScript);

/* 
     INJECT IN CUSTOM CODE - CSS
*/
let cssScript = document.createElement("link");
cssScript.setAttribute("rel", "stylesheet");
cssScript.setAttribute("type", "text/css");
cssScript.setAttribute("media", "all");

if (window.location.hostname.endsWith(".webflow.io"))
  //DEVELOPMNENT
  cssScript.setAttribute(
    "src",
    "https://cgfrse-8080.preview.csb.app/dist/css/pages/home/style.css"
  );
//PRODUCTION
else
  cssScript.setAttribute(
    "src",
    "https://webflow-js-starter.netlify.app/css/body/style.min.css"
  );

document.body.appendChild(cssScript);
