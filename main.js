
/* 
    INJECT IN CUSTOM CODE
*/
let myScript = document.createElement("script");

if (window.location.hostname.endsWith('.webflow.io')) //DEVELOPMNENT
    myScript.setAttribute("src", "https://cgfrse-8080.preview.csb.app/dist/js/pages/home/index.js");
else//PRODUCTION
		myScript.setAttribute("src", "https://cdn.jsdelivr.net/gh/terryfri3nds/webflow-tam@v0.1.0/dist/js/pages/home/index.js");

document.body.appendChild(myScript);

