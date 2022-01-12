
/*
######################################################################
               Sidebar function
######################################################################
*/
$(".btn").on("click", function () {
  $(".btn").toggleClass("close-btn");
  $(".sidebar").toggleClass("sidebar-open");
  if ($("#btn").hasClass("close-btn")) {
    $(this).attr("src", "assets/shared/icon-close.svg");
  } else {
    $(this).attr("src", "assets/shared/icon-hamburger.svg");
  }
});

/*
######################################################################
               Reading JSON file
######################################################################
*/ 
var homeObj = {}, destinationsObj = {}, crewObj = {}, technologyObj = {}, subHeadingsVec = {}; 
var actualPage = 0
function extractJSON(tasksList , callbackFunc){
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
          const data = JSON.parse(request.responseText);
          /*
          ! tengo que trabajar desde adentro, no hay forma de exportar las variables desde funcion arrow
          home = data.home[0]
          destinations = data.destinations
          crew = data.crew
          technology = data.technology
          subHeadings = data.subHeadings[0]
          console.log("desde dentro de la funcion")
          console.log(home)
          console.log(destinations)
          console.log(crew)
          console.log(technology)
          console.log(subHeadings)
          */

          if (actualPage == 0){
            writeHome(data.home[0],data.subHeadings[0].home)
          }
          
        } else if (request.readyState === 4) {
            callbackFunc('no se han podido obtener los datos', undefined);
        }
    });
    request.open('GET', tasksList);
    request.send();
}

/*
######################################################################
         00 Home
######################################################################
*/
function writeHome(home, subHeading){
  console.log("desde dentro de write home")
  console.log(home)
  console.log(subHeading)

subHead = document.getElementById("textBeforeTitle")
subHead.textContent = subHeading

title = document.getElementById("main-title")
title.textContent = home.title

mainText = document.getElementById("textAfterTitle")
mainText.textContent = home.mainText

button = document.getElementById("exploreText")
button.textContent = home.bugButtonText
}

/*
######################################################################
          01  DESTINATIONS
######################################################################
*//* 
textBeforeTitle = document.getElementById("textBeforeTitle")
textBeforeTitle.innerHTML = "<span>01</span> Pick your destination"
 */
//inserta imagen del astro
/*
var newImg = document.createElement("img")
var srcIMG = document.

*/





































