/*
######################################################################
               Sidebar function
######################################################################
*/
/*
$(".btn").on("click", function () {
  $(".btn").toggleClass("close-btn");
  $(".sidebar").toggleClass("sidebar-open");
  if ($("#btn").hasClass("close-btn")) {
    $(this).attr("src", "assets/shared/icon-close.svg");
  } else {
    $(this).attr("src", "assets/shared/icon-hamburger.svg");
  }
});
*/
/* 
!suplantacion de codigo para la eliminacion de Jquery
!   :(
!por alguna razon reacciona mas lento en JS vanilla, quiza es perdida de memoria
*/
document.getElementById("btn").addEventListener('click', function (){
  document.getElementById("btn").classList.toggle("close-btn");
  document.getElementById("sidebar").classList.toggle("sidebar-open");
  
  if (document.getElementById("btn").classList.contains("close-btn")) {
    document.getElementById("btn").src = "assets/shared/icon-close.svg";
  } else {
    document.getElementById("btn").src = "assets/shared/icon-hamburger.svg";
  }
}, false);
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


          console.log("desde dentro de write home");
  console.log(home);
  console.log(subHeading);
          */



      actualPageLastChar = actualPage.charAt(2);
      pageNumber = actualPage.charAt(0);
      pageSubHeadingNumber = `0${actualPage.charAt(0)}`;
      if (actualPageLastChar == "") {
        actualPageLastChar = 0;
      }
      //alert(actualPage + "\n" + typeof actualPage)
      switch (actualPage) {
        case "0":
          page = "home";
          break;
        case "1":
          page = "destination";
          break;
        case "2":
          page = "crew";
          break;
        case "3":
          page = "technology";
          break;
      }
      if (pageNumber == 0) {
        //esto es para la pagina home
        //writeHomePage(data.home[0], data.subHeadings[0].home);
        writePage(
          page,
          actualPageLastChar,
          data.home[actualPageLastChar],
          data.subHeadings[0].home
        );
      } else if (pageNumber == 1) {
        writePage(
          page,
          actualPageLastChar,
          data.destinations[actualPageLastChar],
          data.subHeadings[0].destination,
          data.destinations
        );
      } else if (pageNumber == 2) {
        writePage(
          page,
          actualPageLastChar,
          data.crew[actualPageLastChar],
          data.subHeadings[0].crew,
          data.crew
        );
        
      }
      else if (pageNumber == 3) {
        writePage(
          page,
          actualPageLastChar,
          data.technology[actualPageLastChar],
          data.subHeadings[0].technology,
          data.technology
        );
        
      }
    } else if (request.readyState === 4) {
      callbackFunc("no se han podido obtener los datos", undefined);
    }
  });
  request.open("GET", tasksList);
  request.send();
}

function sleep(time) {
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
  //para desaparecer la barra lateral
document.querySelector("#sidebar").classList.remove("sidebar-open");
if (document.querySelector("#btn").classList.contains("close-btn")) {
  document.querySelector("#btn").classList.toggle("close-btn");
}

  //de la primera pagin
  document.querySelector(".explore").style.display = "none";

  document.getElementById("imgTechDiv").style.display = "none"

  
  //cambiar el boton X
  document.querySelector("#btn").src = "assets/shared/icon-hamburger.svg";

  //hidding
  // de la pagina 02 / 03 destinations
  document.getElementById("mainImg").removeAttribute("class");
  document.getElementById("mainImg").removeAttribute("src");

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
    Write Page
######################################################################
*/
function writePage(
  page,
  actualPageLastChar,
  pageContent,
  subHeading,
  allContentPage
) {
  clearPage();
  //background-crew-mobile.jpg - background-home-tablet.jpg - background-home-desktop.jpg
  bodyBackground = `black url("assets/${page}/background-${page}-mobile.jpg") no-repeat`;
  document.body.style.background = bodyBackground;

  document.body.style.backgroundSize = `100%`;
  //document.body.style.backgroundSize = `100% ${screen.height}px`;
  document.body.style.paddingBottom = "30px";

  subHead = document.getElementById("textBeforeTitle");
  subHead.textContent = subHeading;

  title = document.getElementById("main-title");
  
  title.textContent = pageContent.name;
  mainText = document.getElementById("textAfterTitle");

  switch (page) {
/*
######################################################################
    01 Home y basicos de los otros
######################################################################
*/  case "home":
      //el unico custom var del titulo
      title.textContent = pageContent.title;
      mainText.textContent = pageContent.mainText;
      button = document.getElementById("exploreText");
      button.textContent = pageContent.bugButtonText;
      //hidding
      document.getElementById("mainImg").style.display = "none";
      //showing
      boxButton = document.querySelector(".explore").style.display = "flex";
      break;
    case "destination":
      title.classList.add("main-title-destination");
      mainText.textContent = pageContent.description;
      mainText.classList.add("textAfterTitle-destination");
      break;
    case "crew":
      title.classList.add("crewName");
      mainText.textContent = pageContent.bio;
      break;
    case "technology":
      title.classList.add("crewName");
      mainText.textContent = pageContent.bio;



      break;
  }
  if (page != "home") {
    writeTheRestOfThePage(
      page,
      actualPageLastChar,
      pageContent,
      subHeading,
      allContentPage
    );
  }
}


/*
######################################################################
    Other pages
######################################################################
*/
function writeTheRestOfThePage(
  page,
  actualPageLastChar,
  pageContent,
  subHeading,
  allContentPage
) {
  //showing
  document.getElementById("mainImg").style.display = "inherit ";
  containerTabs = document.getElementById("containerTabs");
  containerTabs.style.display = "flex";
  textBeforeTitle = document.getElementById("textBeforeTitle");
  textBeforeTitle.innerHTML = `<b>${pageSubHeadingNumber} </b>${subHeading}`;

  //cambiando imagen
  
  if (page != "technology") {  document.getElementById("mainImg").src = pageContent.images.webp;  }

  //modificando atributo alt de la imagen
  altTemp = "Photo of " + pageContent.name;
  document.getElementById("mainImg").setAttribute("alt", altTemp);

  //class de los tabs
  classTab = ["", "destinationTab", "crewBullets", "tabNumbers"];
  //creando pestañas
  document.getElementById("containerTabs").innerHTML = `
<a href="#" onclick="actualPage = '${pageNumber}.0'; extractJSON('data.json', (err, data) => {});return false;" class="${
    classTab[pageNumber]
  }">
${page == "destination" ? allContentPage[0].name : page == "crew" ? "" : "1"}
</a>
<a href="#" onclick="actualPage = '${pageNumber}.1'; extractJSON('data.json', (err, data) => {});return false;" class="${
    classTab[pageNumber]
  }">
${page == "destination" ? allContentPage[1].name : page == "crew" ? "" : "2"}
</a>
<a href="#" onclick="actualPage = '${pageNumber}.2'; extractJSON('data.json', (err, data) => {});return false;" class="${
    classTab[pageNumber]
  }">
${page == "destination" ? allContentPage[2].name : page == "crew" ? "" : "3"}
</a>
${ (page != "technology") ? 
`<a href="#" onclick="actualPage = '${pageNumber}.3'; extractJSON('data.json', (err, data) => {});return false;" class="${classTab[pageNumber]}"> ${page == "destination" ? allContentPage[3].name : ""}
</a>` : ""
}
`;

  switch (page) {
/*
######################################################################
  02 Destination
######################################################################
*/  case "destination":
      //agregando clase de imagen
      document.getElementById("mainImg").classList.add("mainImgPlanet");
      document.getElementsByClassName(
        "containerDescriptionDestinations"
      )[0].style.display = "flex";
      document.getElementsByClassName(
        "containerDescriptionDestinations"
      )[1].style.display = "flex";

      descriptionData = document.querySelectorAll(".descriptionData")[0];
      descriptionData.textContent = "Avg. distance";

      descriptionData = document.querySelectorAll(".descriptionData")[1];
      descriptionData.textContent = "Est. Travel Time";

      //distancia
      dataPlanet = document.querySelectorAll(".dataDestination")[0];
      dataPlanet.textContent = pageContent.distance;

      //tiempo de recorrido
      dataPlanet = document.querySelectorAll(".dataDestination")[1];
      dataPlanet.textContent = pageContent.travel;
      document.getElementById("containerTabs").classList.add("containerTabs");

      //borrando los bordes para colocar el correspondiente
      document.querySelectorAll(".destinationTab").forEach((element) => {
        element.style.borderBottom = "none";
      });
      //colocando borde a pestaña correspondiente
      actualtab =
        document.getElementsByClassName("destinationTab")[actualPageLastChar];
      actualtab.style.borderBottom = "2px solid white";
      /*
!falta solucionar el caso de la linea horizontal en la pagina destinations
let pbase = document.querySelector("#textAfterTitle");
let lineHr = document.createElement("hr");
pbase.after(hr);

*/
      break;
/*
######################################################################
    03 Crew
######################################################################
*/  case "crew":
      //agregando clase de imagen
      document.getElementById("mainImg").classList.add("mainImgCrew");

      //modificando atributo alt de la imagen del planeta
      altTemp = "Photo of " + pageContent.name;
      document.getElementById("mainImg").setAttribute("alt", altTemp);
      //mostrando el contenedor de las pestañas
      document
        .getElementById("containerTabs")
        .classList.add("bulletsContainer");
      //aplicando estillo a bullet activa
      document.getElementsByClassName("crewBullets")[
        actualPageLastChar
      ].style.background = "white";
      //colocando titulo del crew
      role = document.getElementById("subTitle");
      role.textContent = pageContent.role;

      //colocando clase a subtitulo
      role.classList.add("subtitleCrew");
      document
        .getElementById("textAfterTitle")
        .classList.add("textAfterNameCrew");
      break;
/*
######################################################################
    04 Technology
######################################################################
*/ case "technology":
//alert(`url("${pageContent.images.portrait}")`)
//eliminando img tag para trabajar con background-img
      document.querySelector("#mainImg").style.display = "none";
      document.getElementById("imgTechDiv").style.display = "block"
      document.getElementById("imgTechDiv").classList.add("imgTech");
      document.getElementById("imgTechDiv").style.background = `url("${pageContent.images.landscape}")`



      document.getElementById("containerTabs").classList.add("containerNumbesTech");

      //borrando los bordes para colocar el correspondiente
      document.querySelectorAll(".tabNumbers").forEach((element) => {
        element.style.border = "1px solid gray";
      });
      //colocando borde a pestaña correspondiente
      actualTabNumber = document.getElementsByClassName("tabNumbers")[actualPageLastChar];
      actualTabNumber.style.border = "1px solid white";
      actualTabNumber.style.background = "white";
      actualTabNumber.style.color = "black";
      
      //colocando titulo del crew
      beforeName = document.getElementById("subTitle");
      beforeName.textContent = "the terminology...";
      beforeName.classList.add("beforeName");

      mainText.textContent = pageContent.description


      break;
  }
}
