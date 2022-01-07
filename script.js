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
function extractJSON(tasksList, callbackFunc){
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);
            callbackFunc(undefined, data);
        } else if (request.readyState === 4) {
            callbackFunc('no se han podido obtener los datos', undefined);
        }
    });
    request.open('GET', tasksList);
    request.send();
}

/*
######################################################################
         breaking down JSON variables
######################################################################
*/
//TODO tengo que agregar la misma mecanica a la pagina -> meterlo en json
function declare(dataJSON) {
  homeObj = dataJSON.home
  destinationsObj = dataJSON.destinations
  crewObj = dataJSON.crew
  technologyObj = dataJSON.technology
  subHeadingsVec = dataJSON.subHeadings
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





































