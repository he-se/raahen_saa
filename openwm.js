// Openweathermap.org
// api: https://openweathermap.org/current

// async funktio, joka hakee säätiedot ja tulostaa sen
async function haeSaatiedot() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Raahe&units=metric&lang=fi&appid=e271d816b087806ee3edcee914d3fcc4`
  );
  const data = await response.json();
  //   console.log(data);

  document.querySelector("#saaAika").innerHTML = new Date(data.dt * 1000)
    .toLocaleString()
    .split(" ")[2]
    .slice(0, -3);
  document.querySelector("#temp").innerHTML =
    "<h3>" +
    data.name +
    "</h3>" +
    "<p>Lämpötila " +
    data.main.temp.toString().replace(".", ",") +
    "&#x2103" +
    "</p>" +
    "<p>Tuntuu kuin " +
    data.main.feels_like.toString().replace(".", ",") +
    "&#x2103" +
    "</p>" +
    "<p>Tuuli " +
    suunta(data.wind.deg) +
    " " +
    data.wind.speed.toString().replace(".", ",") +
    "m/s " +
    "</p>" +
    "<p>" +
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1) +
    "</p>";
  document.querySelector("#icon").innerHTML =
    "<div class='kuva'>" +
    "<img src='https://openweathermap.org/img/wn/" +
    data.weather[0].icon +
    "@2x.png'>" +
    "<p>" +
    Math.round(parseFloat(data.main.temp.toString())) +
    "&#x2103" +
    "</p>" +
    "<p>" +
    Math.round(parseFloat(data.wind.speed.toString())) +
    "m/s</p>" +
    "<p>" +
    suuntaNuoli(data.wind.deg) +
    "</p>" +
    "</div>";
  document.querySelector("#sun").innerHTML =
    "<h4>" +
    new Date().toLocaleDateString() +
    "</h4>" +
    "<p>Auringon nousu " +
    new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, -3) +
    "</p>" +
    "<p>Auringon lasku " +
    new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, -3) +
    "</p>";
}
// funktio palauttaa ilmansuunnan (parametrina suunta asteina)
function suunta(asteet) {
  if (asteet < 24) return "pohjoisesta";
  else if (asteet < 69) return "koillisesta";
  else if (asteet < 114) return "idästä";
  else if (asteet < 159) return "kaakosta";
  else if (asteet < 204) return "etelästä";
  else if (asteet < 249) return "lounaasta";
  else if (asteet < 294) return "lännestä";
  else if (asteet < 337) return "luoteesta";
  else return "pohjoisesta";
}
// funktio palauttaa ilmansuunnan nuolimerkin hex-koodin (parametrina suunta asteina)
function suuntaNuoli(asteet) {
  if (asteet < 24) return "&#x2193";
  else if (asteet < 69) return "&#x2199";
  else if (asteet < 114) return "&#x2190";
  else if (asteet < 159) return "&#x2196";
  else if (asteet < 204) return "&#x2191";
  else if (asteet < 249) return "&#x2197";
  else if (asteet < 294) return "&#x2192";
  else if (asteet < 294) return "&#x2198";
  else return "&#x2193";
}
haeSaatiedot();

// async funktio, joka hakee sääennusteen ja tulostaa sen
async function haeSaaennuste() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=Raahe&cnt=7&units=metric&lang=fi&appid=e271d816b087806ee3edcee914d3fcc4`
  );
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Raahe&appid={API key}`);
  const data = await response.json();
  //   console.log(data);
  const paivat = ["Tänään", "Huomenna", "Ylihuomenna"];
  const weekday = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ];

  document.querySelector("#ennusteAika").innerHTML = new Date(
    data.list[0].dt * 1000
  )
    .toLocaleString()
    .slice(0, -3)
    .replace(" ", " klo ");
  let h4 = "";
  for (let day = 0; day < data.list.length; day++) {
    if (day < 2) {
      h4 = paivat[day];
    } else {
      let paiva = new Date();
      paiva.setDate(paiva.getDate() + day);
      h4 = paiva.toLocaleDateString();
      h4 = weekday[paiva.getDay()];
    }
    document.querySelector("#ennuste").innerHTML +=
      "<div class='col forecast'>" +
      "<h4>" +
      h4 +
      "</h4>" +
      // +"<p>Lämpötila "+data.list[day].temp.day.toString().replace(".",",") + "&#x2103"+"</p>"
      // +"<p>Tuntuu kuin "+data.list[day].feels_like.day.toString().replace(".",",") + "&#x2103"+"</p>"
      // +"<p>Tuuli "+suunta(data.list[day].deg)+" "+data.list[day].speed.toString().replace(".",",") + "m/s "+"</p>"
      // +"<p>"+data.list[day].weather[0].description[0].toUpperCase()+data.list[day].weather[0].description.slice(1)+"</p>"

      "<div class='kuva'>" +
      "<img src='https://openweathermap.org/img/wn/" +
      data.list[day].weather[0].icon +
      "@2x.png'>" +
      "<p>" +
      Math.round(
        parseFloat(data.list[day].temp.day.toString().replace(".", ","))
      ) +
      "&#x2103" +
      "</p>" +
      "<p>" +
      Math.round(
        parseFloat(data.list[day].speed.toString().replace(".", ","))
      ) +
      "m/s</p>" +
      "<p>" +
      suuntaNuoli(data.list[day].deg) +
      "</p>" +
      "</div>" +
      "</div>";
  }
}
haeSaaennuste();

// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}&appid={API key}

/* 
// snippet: huomisen päivmäärän luominen
function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

const date = new Date;
const huominen = addOneDay(date);
const ylihuominen = addOneDay(date); 
*/
