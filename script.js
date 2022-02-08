/*
######################################################################
    Sidebar y button toggle
######################################################################
*/
document.getElementById("btn").addEventListener(
  "click",
  function () {
    document.getElementById("btn").classList.toggle("close-btn");
    document.getElementById("sidebar").classList.toggle("sidebar-open");

    if (document.getElementById("btn").classList.contains("close-btn")) {
      document.getElementById("btn").src = "assets/shared/icon-close.svg";
    } else {
      document.getElementById("btn").src = "assets/shared/icon-hamburger.svg";
    }
  },
  false
);
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
          pageNumber,
          actualPageLastChar,
          data.home[actualPageLastChar],
          data.subHeadings[0].home
        );
      } else if (pageNumber == 1) {
        writePage(
          page,
          pageNumber,
          actualPageLastChar,
          data.destinations[actualPageLastChar],
          data.subHeadings[0].destination,
          data.destinations
        );
      } else if (pageNumber == 2) {
        writePage(
          page,
          pageNumber,
          actualPageLastChar,
          data.crew[actualPageLastChar],
          data.subHeadings[0].crew,
          data.crew
        );
      } else if (pageNumber == 3) {
        writePage(
          page,
          pageNumber,
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
!queda pendiente colocarle borde al boton tech en sidebar que no lo tiene
*/

/*
######################################################################
    Hidding and Clear page  Functions
######################################################################
*/
function clearPage() {
  //para desaparecer la barra lateral en vista movil
  document.querySelector("#sidebar").classList.remove("sidebar-open");
  if (document.querySelector("#btn").classList.contains("close-btn")) {
    document.querySelector("#btn").classList.toggle("close-btn");
  }

  document.getElementsByTagName("main")[0].removeAttribute("class");
  //de la primera pagina
  document.querySelector(".explore").style.display = "none";
  //imagen de 03
  document.getElementById("imgTechDiv").style.display = "none";

  //cambiar el boton X
  document.querySelector("#btn").src = "assets/shared/icon-hamburger.svg";

  //hidding
  // de la pagina 02 / 03 destinations
  document.getElementById("mainImg").removeAttribute("class");
  document.getElementById("mainImg").removeAttribute("src");

  document.querySelector("body > main > div:nth-child(8)").style.display = "none"
  document.querySelector("body > main > div:nth-child(8)").removeAttribute("class");

  //desapareciedo contenedor pestañas y eliminando elementos internos
  allTabs = document.querySelectorAll(".crewBullets");
  allTabs.forEach((element) => {
    element.remove();
  });

  document.querySelector("#textBeforeTitle").removeAttribute("class");
  document.querySelector("#main-title").removeAttribute("class");
  document.querySelector("#textAfterTitle").removeAttribute("class");
  //por pag 01 02 y 03
  document.getElementById("containerTabs").removeAttribute("class");
  document.getElementById("containerTabs").removeAttribute("style");
  document.getElementById("containerTabs").textContent = "";
  document.getElementById("containerTabs").style.display = "none";


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
  document.querySelector("main").removeAttribute("class");

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
  pageNumber,
  actualPageLastChar,
  pageContent,
  subHeading,
  allContentPage
) {
  clearPage()
  bodyBackground = `black url("assets/${page}/background-${page}-mobile.jpg") no-repeat`;
  document.body.style.background = bodyBackground;

  document.body.style.backgroundSize = `100%`;

  subHead = document.getElementById("textBeforeTitle");

  title = document.getElementById("main-title");

  title.textContent = pageContent.name;
  mainText = document.getElementById("textAfterTitle");

  switch (page) {
    /*
######################################################################
    01 Home y basicos de los otros
######################################################################
*/ case "home":
      //el unico custom var del titulo
      subHead.textContent = subHeading;
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
      
  document.getElementById("containerTabs").style.display = "flex";
  document.querySelector("body > main > div:nth-child(8)").style.display = "flex"
      break;

    case "crew":
      subHead.classList.add("crewSubHeading");
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

  //media query adjustments
  mediaQuery(page,pageContent);
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
  containerTabs.classList.add("containerTabs");
  //containerTabs.style.display = "flex";
  textBeforeTitle = document.getElementById("textBeforeTitle");
  textBeforeTitle.innerHTML = `<b id="numberPageId">${pageSubHeadingNumber}</b>${subHeading}`;

  //cambiando imagen

  if (page != "technology") {
    document.getElementById("mainImg").src = pageContent.images.webp;
  }

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
${
  page != "technology"
    ? `<a href="#" onclick="actualPage = '${pageNumber}.3'; extractJSON('data.json', (err, data) => {});return false;" class="${
        classTab[pageNumber]
      }"> ${page == "destination" ? allContentPage[3].name : ""}
</a>`
    : ""
}
`;
//mostrando pestañas/bullets/navegacion
document.getElementById("containerTabs").style.display = "flex";

  switch (page) {
    /*
######################################################################
  02 Destination
######################################################################
*/ case "destination":
      //agregando clase de imagen
      document.getElementById("mainImg").classList.add("mainImgPlanet");
      document
        .getElementById("textBeforeTitle")
        .classList.add("textBeforeTitle-destination");

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

      //borrando los bordes en tabs planets para colocar el correspondiente y colocando hover
      document.querySelectorAll(".destinationTab").forEach((element) => {
        element.style.borderBottom = "none";
        element.classList.add("link-page-hover");
      });
      //colocando borde a pestaña correspondiente
      actualtab =
        document.getElementsByClassName("destinationTab")[actualPageLastChar];
      actualtab.style.borderBottom = "2px solid white";
      
      navActualPage = document.querySelectorAll(".link-page")[pageNumber];
      navActualPage.classList.remove("link-page-hover");

      //agregando borde a la pagina actual
      navActualPage.style.borderBottom = "2px solid white";
      navActualPage.classList.remove("link-page-hover");

      break;
    /*
######################################################################
    03 Crew
######################################################################
*/ case "crew":
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

      document.getElementById("textBeforeTitle").classList.add("subHeadTech");

      //eliminando img tag para trabajar con background-img
      document.querySelector("#mainImg").style.display = "none";
      document.getElementById("imgTechDiv").style.display = "block";
      document.getElementById("imgTechDiv").classList.add("imgTech");
      document.getElementById(
        "imgTechDiv"
      ).style.background = `url("${pageContent.images.landscape}")`;
      document
        .getElementById("containerTabs")
        .classList.add("containerNumbesTech");

      //borrando los bordes en tabs planets para colocar el correspondiente y colocando hover
      document.querySelectorAll(".tabNumbers").forEach((element) => {
        element.style.border = "1px solid gray";
        element.classList.add("tabNumber-page-hover");
      });
      //colocando borde a pestaña correspondiente
      actualTabNumber =
        document.getElementsByClassName("tabNumbers")[actualPageLastChar];
      actualTabNumber.style.border = "1px solid white";
      actualTabNumber.style.background = "white";
      actualTabNumber.style.color = "black";
      actualTabNumber.classList.remove("tabNumber-page-hover");

      //colocando titulo del crew
      beforeName = document.getElementById("subTitle");
      beforeName.textContent = "the terminology...";
      beforeName.classList.add("beforeName");

      mainText.classList.add("mainTextTech");
      mainText.textContent = pageContent.description;

      break;
  }
}

/*
######################################################################
    Los media querys
######################################################################
*/
function mediaQuery(page,pageContent) {
  let mqls = [
    window.matchMedia("screen and (min-width: 768px) and (max-width: 991px"),
    window.matchMedia("screen and (min-width: 992px)"),
  ];

  function test(mql) {
    if (!mqls[0].matches && !mqls[1].matches) {/*
######################################################################
  moviles
######################################################################
*/
      console.log("SM");
      
      setBodyBackgorund(page, "mobile")

      //aparecer funcion sidebar
      document.getElementById("sidebar").classList.remove("sidebar-nonSmall");

      //quitar bordes molestos de pantallas grandes en pantalla pequeña
      document.querySelectorAll(".link-page")[pageNumber].style.border = "0px";


    } else if (mqls[0].matches) {/*
######################################################################
  Tablets
######################################################################
*/
      console.log("MD");
      setBodyBackgorund(page, "tablet") 
      sidebarToNav()

      //en caso de ser una pagina noHome
      //el padding top de main
      document
        .getElementsByTagName("main")[0]
        .classList.add("main-padingTop-noHome");
      document
        .getElementById("textBeforeTitle")
        .classList.add("textBeforeTitle-123-tablet");

      switch (page) {
        case "home":
          //por ser home
          document.getElementsByTagName("main")[0].removeAttribute("class");
          document.getElementById("textBeforeTitle").removeAttribute("class");
          document
            .getElementById("textBeforeTitle")
            .classList.add("textBeforeTitle-home-tablet");

          break;
        case "destination":
          document
            .querySelector("#mainImg")
            .classList.add("mainImgPlanet-tablet");

          document
            .querySelector(".containerTabs")
            .classList.add("containerTabs-tablet");

          document
            .querySelector(".main-title-destination")
            .classList.add("main-title-destination-tablet");

          document
            .querySelector(".textAfterTitle-destination")
            .classList.add("textAfterTitle-destination-tablet");
          break;

        case "crew":
          document.getElementsByTagName("main")[0].removeAttribute("class");
          document.querySelector("main").classList.add("main-crew-tablet");
          document
            .querySelector("#textBeforeTitle")
            .classList.add("subHeading-gridItem");
          document
            .querySelector("#subTitle")
            .classList.add("subTitle-gridItem");
          document
            .querySelector("#main-title")
            .classList.add("nameCrew-gridItem");
          document
            .querySelector("#textAfterTitle")
            .classList.add("textAfterTitleCrew-gridItem");
          document
            .querySelector("#containerTabs")
            .classList.add("containerTabsCrew-gridItem");
          document
            .querySelector("#mainImg")
            .classList.add("mainImgCrew-gridItem");
          break;

        case "technology":
          document
            .querySelector("#imgTechDiv")
            .classList.add("imgTechDiv-tech-tablet");
          document
            .querySelector("#containerTabs")
            .classList.add("containerTabs-tech-tablet");
          document
            .querySelector("#subTitle")
            .classList.add("subTitle-tech-tablet");
          document
            .querySelector("#main-title")
            .classList.add("main-title-tech-tablet");
          document
            .querySelector("#textAfterTitle")
            .classList.add("textAfterTitle-tech-tablet");

          break;
      }

    } else if (mqls[1].matches) {/*
######################################################################
  Desktops
######################################################################
*/    console.log("LG");

      sidebarToNav()
/*
######################################################################
  00 Home Desktop
######################################################################
*/switch (page) {
    case "home":
      document.getElementsByTagName("main")[0].removeAttribute("class");
      document
        .getElementsByTagName("main")[0]
        .classList.add("main-home-desktop");
      setBodyBackgorund(page, "desktop") 
        document
        .querySelector("#textBeforeTitle")
        .classList.add("textBeforeTitle-home-desktop");
        document
        .querySelector("#main-title")
        .classList.add("main-title-home-desktop");
        document
        .querySelector("#textAfterTitle")
        .classList.add("textAfterTitle-home-desktop");
        
        break
/*
######################################################################
  01 Destinations
######################################################################
*/  case "destination":
        document
        .getElementsByTagName("main")[0]
        .classList.add("main-destination-desktop");
        document
        .querySelector("#textBeforeTitle")
        .classList.add("textBeforeTitle-destination-desktop");
        document
        .querySelector("#mainImg")
        .classList.add("mainImg-destination-desktop-desktop");
        document
        .querySelector("#containerTabs")
        .classList.add("containerTabs-destination-desktop");
        document
        .querySelector("#main-title")
        .classList.add("main-title-destination-desktop");  
        document
        .querySelector("#textAfterTitle")
        .classList.add("textAfterTitle-destination-desktop");
    
    document.querySelector("body > main > div:nth-child(8)")
    .classList.add("planetDataContainer-destination-desktop");

      break
    case "crew":
      document
      .getElementsByTagName("main")[0]
      .classList.add("main-crew-desktop");
      document
      .querySelector("#textBeforeTitle")
      .classList.add("textBeforeTitle-crew-desktop");
      document
      .querySelector("#mainImg")
      .classList.add("mainImg-crew-desktop");
      document
      .querySelector("#containerTabs")
      .classList.add("containerTabs-crew-desktop");
      document
      .querySelector("#subTitle")
      .classList.add("subTitle-crew-desktop");  
      document
      .querySelector("#main-title")
      .classList.add("main-title-crew-desktop");  
      document
      .querySelector("#textAfterTitle")
      .classList.add("textAfterTitle-crew-desktop");
      break

    case "technology":
    
      document.getElementById("imgTechDiv").style.background = `url("${pageContent.images.portrait}")`;

    
      document
      .getElementsByTagName("main")[0]
      .classList.add("main-technology-desktop");
      document
      .querySelector("#textBeforeTitle")
      .classList.add("textBeforeTitle-technology-desktop");
      document
      .querySelector("#imgTechDiv")
      .classList.add("imgTechDiv-technology-desktop");
      document
      .querySelector("#containerTabs")
      .classList.add("containerTabs-technology-desktop");
      document
      .querySelector("#subTitle")
      .classList.add("subTitle-technology-desktop");  
      document
      .querySelector("#main-title")
      .classList.add("main-title-technology-desktop");  
      document
      .querySelector("#textAfterTitle")
      .classList.add("textAfterTitle-technology-desktop");
      break

}
    }
  }
  for (let i = 0; i < mqls.length; i++) {
    test(mqls[i]);
    mqls[i].addListener(test);
  }
}

//funcion para aplicar el fondo
function setBodyBackgorund(page, device) {
bodyBackground = `black url("assets/${page}/background-${page}-${device}.jpg") no-repeat`;
document.body.style.background = bodyBackground;
}

      //conviertiendo sidebar to nav (notSmall)
function sidebarToNav(){
      document.getElementById("sidebar").classList.add("sidebar-nonSmall");
      //quitando bordes a las otros links del nav y colocandole efecto hover
      document.querySelectorAll(".link-page").forEach((element) => {
        element.style.borderBottom = "none";
        element.classList.add("link-page-hover");
      });
      //agregando borde a la pagina actual
      navActualPage = document.querySelectorAll(".link-page")[pageNumber];
      navActualPage.style.borderBottom = "2px solid white";
      navActualPage.classList.remove("link-page-hover");
}