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
var homeObj = {},
  destinationsObj = {},
  crewObj = {},
  technologyObj = {},
  subHeadingsVec = {};
var actualPage = 0;
function extractJSON(tasksList, callbackFunc) {
  const request = new XMLHttpRequest();
  request.addEventListener("readystatechange", () => {
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

      if (actualPage == 0) {
        //esto es para la pagina home
        writeHomePage(data.home[0], data.subHeadings[0].home);
      }
      if (actualPage == 1) {
        //esto es para la pagina home
        //writeHome(data.home[0],data.subHeadings[0].home)

        //este es de la pagina 2
        writeDestinationPage(
          data.destinations[0],
          data.subHeadings[0].destination
        );
        destinationEspecific(data.destinations[0]);
      } else if (actualPage == 1.0) {
        destinationEspecific(data.destinations[0]);
      } else if (actualPage == 1.1) {
        destinationEspecific(data.destinations[1]);
      } else if (actualPage == 1.2) {
        destinationEspecific(data.destinations[2]);
      } else if (actualPage == 1.3) {
        destinationEspecific(data.destinations[3]);
      } else if (actualPage == 2) {
        writeCrewPage(data.crew[0]);
      } else if (actualPage == 2.0) {
        writeCrewPage(data.crew[0]);
      } else if (actualPage == 2.1) {
        writeCrewPage(data.crew[1]);
      } else if (actualPage == 2.2) {
        writeCrewPage(data.crew[2]);
      } else if (actualPage == 2.3) {
        writeCrewPage(data.crew[3]);
      }
    } else if (request.readyState === 4) {
      callbackFunc("no se han podido obtener los datos", undefined);
    }
  });
  request.open("GET", tasksList);
  request.send();
}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/*
######################################################################
    Hidding and Clear page  Functions
######################################################################
*/
function clearPage() {
  //TODO tengo que especificar que se debe eliminar para cada pagina, y no estar eliminando a la brava
  //colocar icono de hamburguesa en sidebar nuevamente para
  
  //document.querySelector("#btn").classList.toggle("close-btn");

  //de la primera pagin
  document.querySelector(".explore").style.display = "none";

  //para desaparecer la barra lateral
  document.querySelector("body > nav").classList.remove("sidebar-open");

  //hidding
  // de la pagina 02 destinations
  document.getElementById("mainImg").removeAttribute("class");

  //desapareciedo contenedor pestañas y eliminando elementos internos
  allTabs = document.querySelectorAll(".crewBullets");
  allTabs.forEach((element) => {
    element.remove();
  });
  document.getElementById("containerTabs").style.display = "none";

  //por pag 01 02 y 03
  document.getElementById("containerTabs").removeAttribute("class");

  //borrando detalles de planetas
  document.getElementsByClassName(
    "containerDescriptionDestinations"
  )[0].style.display = "none";
  document.getElementsByClassName(
    "containerDescriptionDestinations"
  )[1].style.display = "none";

  // de la pagina 03 crew
  document.getElementById("textAfterTitle").removeAttribute("class");
  document.getElementById("subTitle").removeAttribute("class");
  document.getElementById("subTitle").textContent = "";

  //cambiando estilos del texto del titulo
  document.getElementById("main-title").removeAttribute("class");
}

/*
######################################################################
         00 Home
######################################################################
*/
function writeHomePage(home, subHeading) {
  console.log("desde dentro de write home");
  console.log(home);
  console.log(subHeading);


  clearPage()


  //colocando fondo de body
  document.body.style.background =
    'black url("assets/home/background-home-mobile.jpg") no-repeat';

  //hidding
  //pendiente para meter en clear page
  document.getElementById("mainImg").style.display = "none";

  //showing
  boxButton = document.querySelector(".explore").style.display = "flex";

  subHead = document.getElementById("textBeforeTitle");
  subHead.textContent = subHeading;

  title = document.getElementById("main-title");
  title.textContent = home.title;

  mainText = document.getElementById("textAfterTitle");
  mainText.textContent = home.mainText;

  button = document.getElementById("exploreText");
  button.textContent = home.bugButtonText;
}

/*
######################################################################
          01  DESTINATIONS
######################################################################
*/
function writeDestinationPage(destinations, subHeading) {


  clearPage()


  //showing
  document.getElementById("mainImg").style.display = "inherit ";
  //agregando la clase de las pestañas
  document.getElementById("containerTabs").classList.add("containerTabs");
  document.getElementById("containerTabs").style.display = "flex";
  document.getElementsByClassName(
    "containerDescriptionDestinations"
  )[0].style.display = "flex";
  document.getElementsByClassName(
    "containerDescriptionDestinations"
  )[1].style.display = "flex";

  //class toggles
  document.querySelector("#main-title").classList.add("main-title-destination");
  document
    .querySelector("#textAfterTitle")
    .classList.add("main-title-destination");

  textBeforeTitle = document.getElementById("textBeforeTitle");
  textBeforeTitle.innerHTML = "<b>01 </b> " + subHeading;
  //fondo
  document.body.style.background =
    'black url("assets/destination/background-destination-mobile.jpg") no-repeat';
  //! no funciona opacarlo en la misma etiqueta al parecer, tengo que solucionarlo porque o necesito para las otras paginas
  //document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";

  document.getElementById("containerTabs").classList.add("destinationTabs");
  //!No con texto directamente como lo estoy haciendo
  //!colocar ids con los que puedan interactuar todas las paginas, y no tener que crearlas una a una
  document.getElementById("containerTabs").innerHTML = `
<a href="#" onclick="actualPage = 1.0; extractJSON('data.json', (err, data) => {});return false;" class="destinationTab" id="destinationTab0">Moon</a>
<a href="#" onclick="actualPage = 1.1; extractJSON('data.json', (err, data) => {});return false;" class="destinationTab" id="destinationTab1">Mars</a>
<a href="#" onclick="actualPage = 1.2; extractJSON('data.json', (err, data) => {});return false;" class="destinationTab" id="destinationTab2">Europa</a>
<a href="#" onclick="actualPage = 1.3; extractJSON('data.json', (err, data) => {});return false;" class="destinationTab" id="destinationTab3">Titan</a>
`;

  /*
!falta solucionar el caso de la linea horizontal en la pagina destinations
let pbase = document.querySelector("#textAfterTitle");
let lineHr = document.createElement("hr");
pbase.after(hr);

*/
  descriptionData = document.querySelectorAll(".descriptionData")[0];
  descriptionData.textContent = "Avg. distance";

  descriptionData = document.querySelectorAll(".descriptionData")[1];
  descriptionData.textContent = "Est. Travel Time";
}

function destinationEspecific(destination) {
  //agregando clase de imagen
  document.getElementById("mainImg").classList.add("mainImgPlanet");

  //cambiando imagen del planeta
  document.getElementById("mainImg").src = destination.images.webp;

  //modificando atributo alt de la imagen del planeta
  altTemp = "Photo of " + destination.name;
  document.getElementById("mainImg").setAttribute("alt", altTemp);

  //colocando nombre del planeta
  title = document.getElementById("main-title");
  title.textContent = destination.name;

  //colocando contenido
  mainText = document.getElementById("textAfterTitle");
  mainText.textContent = destination.description;

  //distancia
  dataPlanet = document.querySelectorAll(".dataDestination")[0];
  dataPlanet.textContent = destination.distance;

  //tiempo de recorrido
  dataPlanet = document.querySelectorAll(".dataDestination")[1];
  dataPlanet.textContent = destination.travel;

  //extrayendo cual es la pagina actual
  actualPageLastChar = String(actualPage);
  actualPageLastChar = actualPageLastChar.charAt(2);
  if (actualPageLastChar == "") {
    actualPageLastChar = 0;
  }

  //borrando los bordes para colocar el correspondiente
  document.querySelectorAll(".destinationTab").forEach((element) => {
    element.style.borderBottom = "none";
  });
  //colocando borde a pestaña correspondiente
  document.querySelectorAll(".destinationTab")[actualPageLastChar].style.borderBottom = "2px solid white";
}

/*
######################################################################
        03 Crew
######################################################################
*/
function writeCrewPage(crew) {

  clearPage()

  sleep(10)
  //cambiando fondo que
  document.body.style.background = 'black url("assets/crew/background-crew-mobile.jpg") no-repeat';
  //document.body.style.filter = "brightness(100%)"

  //haciendo visible imagen el
  document.getElementById("mainImg").style.display = "block"

  //agregando clase de imagen
  document.getElementById("mainImg").classList.add("mainImgCrew");

  //cambiando imagen del planeta
  document.getElementById("mainImg").src = crew.images.png;

  //modificando atributo alt de la imagen del planeta
  altTemp = "Photo of " + crew.name;
  document.getElementById("mainImg").setAttribute("alt", altTemp);

  //mostrando el contenedor de las pestañas
  document.getElementById("containerTabs").classList.add("bulletsContainer");
  //haciendo visible en el dom el contenedor
  document.getElementById("containerTabs").style.display = "flex"
  //!tengo que crear una funcion donde se creen estos slider y que pueda modificar las clases aparte en el css y le relaciono la clase con el id
  document.getElementById("containerTabs").innerHTML = `
<a href="#" onclick="actualPage = 2.0; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet0"></a>
<a href="#" onclick="actualPage = 2.1; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet1"></a>
<a href="#" onclick="actualPage = 2.2; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet2"></a>
<a href="#" onclick="actualPage = 2.3; extractJSON('data.json', (err, data) => {});return false;" class="crewBullets" id="crewBullet3"></a>
`;



actualPageLastChar = String(actualPage);
actualPageLastChar = actualPageLastChar.charAt(2);
if (actualPageLastChar == "") {
  actualPageLastChar = 0;
}
//aplicando estillo a bullet activa
document.getElementsByClassName("crewBullets")[actualPageLastChar].style.background = "white"



  //colocando titulo del crew
  role = document.getElementById("subTitle");
  role.textContent = crew.role;

  //colocando clase a subtitulo
  role.classList.add("subtitleCrew");

  //colocando nombre del crew
  nameCrew = document.getElementById("main-title");
  nameCrew.textContent = crew.name;

  //agregagndo la clase para poder aplicar estilos
  nameCrew.classList.add("crewName");

  //colocando contenido
  mainText = document.getElementById("textAfterTitle");
  mainText.textContent = crew.bio;

  document.getElementById("textAfterTitle").classList.add("textAfterNameCrew");

}

/*
######################################################################
    04 Technology
######################################################################
*/
