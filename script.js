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
            //esto es para la pagina home
            writeHomePage(data.home[0],data.subHeadings[0].home)
          }
          if (actualPage == 1){
            //esto es para la pagina home
            //writeHome(data.home[0],data.subHeadings[0].home)
            
            //este es de la pagina 2
            writeDestinationPage(data.destinations[0],data.subHeadings[0].destination)
            destinationEspecific(data.destinations[0])
          }
          else if (actualPage == 1.0){
            destinationEspecific(data.destinations[0])
          }
          else if (actualPage == 1.1){
            destinationEspecific(data.destinations[1])
          }
          else if (actualPage == 1.2){
            destinationEspecific(data.destinations[2])
          }
          else if (actualPage == 1.3){
            destinationEspecific(data.destinations[3])
          }
          else if (actualPage == 2){
            writeCrewPage(data.crew[0])
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
function writeHomePage(home, subHeading){
  console.log("desde dentro de write home")
  console.log(home)
  console.log(subHeading)
//hidding
document.getElementById("mainImg").style.display = "none"
document.getElementById("containerTabs").style.display = "none"
document.getElementsByClassName("containerDescriptionDestinations")[0].style.display = "none"
document.getElementsByClassName("containerDescriptionDestinations")[1].style.display = "none"

//showing
boxButton = document.querySelector(".explore").style.display = "flex"


subHead = document.getElementById("textBeforeTitle")
subHead.textContent = subHeading

title = document.getElementById("main-title")
title.textContent = home.title

mainText = document.getElementById("textAfterTitle")
mainText.textContent = home.mainText

button = document.getElementById("exploreText")
button.textContent = home.bugButtonText
//! tengo que agregar el boton de nuevo pero creandolo desde aqui


}

/*
######################################################################
          01  DESTINATIONS
######################################################################
*/
function writeDestinationPage(destinations, subHeading){
//hidding
document.querySelector(".explore").style.display = "none"

//showing
document.getElementById("mainImg").style.display = "inherit "
document.getElementById("containerTabs").style.display = "flex"
document.getElementsByClassName("containerDescriptionDestinations")[0].style.display = "flex"
document.getElementsByClassName("containerDescriptionDestinations")[1].style.display = "flex"

//class toggles
document.querySelector("#main-title").classList.add("main-title-destination")
document.querySelector("#textAfterTitle").classList.add("main-title-destination")



textBeforeTitle = document.getElementById("textBeforeTitle")
textBeforeTitle.innerHTML = "<b>01 </b> " + subHeading
//fondo                                           
document.body.style.background = 'url("assets/destination/background-destination-mobile.jpg") no-repeat';
//todo no funciona opacarlo a lo mejor tendre que ponerlo en una etiquita img
//document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";


//!aqui tengo que colocar los planetas con las variables que lei del JSON
//!No con texto directamente como lo estoy haciendo
document.getElementById("containerTabs").innerHTML = `
<a href="#" onclick="actualPage = 1.0; extractJSON('data.json', (err, data) => {});return false;" class="destinationTabs" id="destinationTab0">Moon</a>
<a href="#" onclick="actualPage = 1.1; extractJSON('data.json', (err, data) => {});return false;" class="destinationTabs" id="destinationTab1">Mars</a>
<a href="#" onclick="actualPage = 1.2; extractJSON('data.json', (err, data) => {});return false;" class="destinationTabs" id="destinationTab2">Europa</a>
<a href="#" onclick="actualPage = 1.3; extractJSON('data.json', (err, data) => {});return false;" class="destinationTabs" id="destinationTab3">Titan</a>
`

/*
!falta solucionar el caso de la linea horizontal en la pagina destinations
let pbase = document.querySelector("#textAfterTitle");
let lineHr = document.createElement("hr");
pbase.after(hr);

*/
descriptionData = document.querySelectorAll(".descriptionData")[0]
descriptionData.textContent = "Avg. distance"

descriptionData = document.querySelectorAll(".descriptionData")[1]
descriptionData.textContent = "Est. Travel Time"

}

function destinationEspecific(destination) {
//agregando clase de imagen 
document.getElementById("mainImg").removeAttribute("class")
document.getElementById("mainImg").classList.add("mainImgPlanet")

//cambiando imagen del planeta
document.getElementById("mainImg").src= destination.images.webp

//modificando atributo alt de la imagen del planeta
altTemp = "Photo of " + destination.name 
document.getElementById("mainImg").setAttribute("alt", altTemp);

//colocando nombre del planeta  
title = document.getElementById("main-title")
title.textContent = destination.name 

//colocando contenido
mainText = document.getElementById("textAfterTitle")
mainText.textContent = destination.description

//distancia
dataPlanet = document.querySelectorAll(".dataDestination")[0]
dataPlanet.textContent = destination.distance

//tiempo de recorrido
dataPlanet = document.querySelectorAll(".dataDestination")[1]
dataPlanet.textContent = destination.travel

//para desaparecer la barra lateral
document.querySelector("body > nav").classList.remove("sidebar-open");

//extrayendo cual es la pagina actual
actualPageLastChar = String(actualPage)
actualPageLastChar = actualPageLastChar.charAt(2)
if (actualPageLastChar == ""){actualPageLastChar = 0}

//borrando los bordes para colocar el correspondiente
document.querySelectorAll(".destinationTabs").forEach(element => {
  element.style.borderBottom = "none"
});

//colocando borde a pestaña correspondiente
document.querySelectorAll(".destinationTabs")[actualPageLastChar].style.borderBottom = "2px solid white"


}

function writeCrewPage(crew) {
  //agregando clase de imagen 
  document.getElementById("mainImg").removeAttribute("class")
  document.getElementById("mainImg").classList.add("mainImgCrew")
  
  //cambiando imagen del planeta
  document.getElementById("mainImg").src = crew.images.png
  
  //modificando atributo alt de la imagen del planeta
  altTemp = "Photo of " + crew.name 
  document.getElementById("mainImg").setAttribute("alt", altTemp);
  

//!tengo que crear una funcion donde se creen estos slider y que pueda modificar las clases aparte en el css y le relaciono la clase con el id
  document.getElementById("containerTabs").innerHTML = `
<a href="#" onclick="actualPage = 2.0; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet0"></a>
<a href="#" onclick="actualPage = 2.1; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet1"></a>
<a href="#" onclick="actualPage = 2.2; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet2"></a>
<a href="#" onclick="actualPage = 2.3; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet3"></a>
`

  //colocando titulo del crew 
  role = document.getElementById("subTitle")
  role.textContent = crew.role 

  //colocando nombre del crew 
  nameCrew = document.getElementById("main-title")
  nameCrew.textContent = crew.name 
  
  //colocando contenido
  mainText = document.getElementById("textAfterTitle")
  mainText.textContent = crew.bio
  
  //para desaparecer la barra lateral
  document.querySelector("body > nav").classList.remove("sidebar-open");
   /*
  
  !aqui es donde voy a hacer las modificaciones de  los bullets para el cambio de imagenes
  //extrayendo cual es la pagina actual
  actualPageLastChar = String(actualPage)
  actualPageLastChar = actualPageLastChar.charAt(2)
  if (actualPageLastChar == ""){actualPageLastChar = 0}
  
  //borrando los bordes para colocar el correspondiente
  document.querySelectorAll(".destinationTabs").forEach(element => {
    element.style.borderBottom = "none"
  });
  
  //colocando borde a pestaña correspondiente
  document.querySelectorAll(".destinationTabs")[actualPageLastChar].style.borderBottom = "2px solid white"
*/ 
}

































