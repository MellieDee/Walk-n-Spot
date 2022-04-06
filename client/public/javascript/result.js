// const searchAlert = require('./pluralize')

////////////////////// Map Section Start/////////////////////////////////////
var map = document.getElementById("map"); //know where to display map
var marker = []; //to store pin/marker
var mymap;
var first = 1; //Use to control different search without reflesh the page
var found = 0; //counter for pins on map so can clear later
var total_sighting = 0;
var city_found = 0;
var animal_found = 0;



var Add_Map = function (lat, lon) {
  if (first) {
    mymap = L.map('map').setView([lat, lon], 11);
    first = 0;
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg'
    }).addTo(mymap);
  } else {
    mymap.flyTo([lat, lon], 11);
  }
};

var AddMarker = function (lat, lon, n, img_url, trail_name, sighting) {
  marker[n] = L.marker([lat, lon]).addTo(mymap);
  marker[n].bindPopup(/*'<img src=' + img_url + '>' + */trail_name + " has had " + sighting + " of animal sightings.").openPopup();
};

var Reset = function () {
  if (mymap) {
    var i = 0;
    while (i < marker.length) {
      marker[i].remove();
      i++;
    }
  }
    city_found = 0;
    animal_found = 0;
    total_sighting = 0;
    found = 0; 
};

///////////////////////////End of Map Section//////////////////////////

var PrintMatchResult = function (json, city_input, animal_input, avoid_animal, search_type) {
  for (var i = 0; i < json.length; i++) {
    if (json[i].city_name === city_input) {
      city_found++;
      map.style.display = "flex";
      Add_Map(json[i].lat, json[i].lon);

      var match_sighting = 0;
      var avoid = false;

      for (var j = 0; j < json[i].animals.length; j++) {
        total_sighting += json[i].animals[j].trail_animal.sighting;

        if (json[i].animals[j].animal_name === animal_input) {
          //if match, save sighting counts
          match_sighting = json[i].animals[j].trail_animal.sighting; 
          animal_found++;
        }
        if (json[i].animals[j].animal_name === avoid_animal) {
          avoid = true;
        }
      }//after aniaml matching
      if (!avoid && (match_sighting > 0 || search_type === "All")) {
        if (search_type === "All") {
          match_sighting = total_sighting;
        }
        AddMarker(json[i].lat, json[i].lon, found, json[i].trail_img, json[i].trail_name, match_sighting);
        found++;

        let trailImg = json[i].trail_img;
        let trailUrl = json[i].trail_info
        let trailID = json[i].id;

        renderSearchCards(trailImg, json[i].trail_name, trailUrl, trailID);
        //api/trailCard(trailInfoArr)
      }
    }
  }
}

var trailInfoArr = [];
var generatedCard = "";
var searchCardContainer = "";

async function searchFormHandler(event) { //When click search

  searchCardContainer.innerHTML = "";
  event.preventDefault();

  if (first === 0) { //Clear any control if search again 
    Reset();
  }

  const response = await fetch('/api/trail', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(function (json) {
      console.log(json)

      const city_input = document.querySelector('#CityInput').value.trim().toUpperCase();
      const city_input_org = document.querySelector('#CityInput').value.trim();
      const animal_input = document.querySelector("select[name='AnimalInput']").value;
      const avoid_animal = document.querySelector("select[name='AvoidInput']").value;




      if (animal_input === avoid_animal) {
        window.alert(`You can't simultaneously avoid and see the same animal! You can still take a hike though! Here are all the trails in the city.`);
        PrintMatchResult(json, city_input, animal_input, "None", "All");
      }
      else if (animal_input != "All") {
        PrintMatchResult(json, city_input, animal_input, avoid_animal, "notAll");
      }
      else {
        PrintMatchResult(json, city_input, animal_input, avoid_animal, "All");
      }

    /*  
      if(found === 0 && city_found)  { //If no match trail find for the city
        if(animal_found > 1){ //have more than 1 trail matching result but all of them have animal to avoid (plural)
          window.alert(`(plural)${animal_input} only spotted in the trail that also spotted (plural)${avoid_animal}! No matching search. Here are all trails in this city.`);
          PrintMatchResult (json, city_input, animal_input, "None", "All");
        } 
        else if(animal_found === 1){ //have only one trail matching result but has animal want to avoid (singular)
          window.alert(`(singular)${animal_input} only spotted in the trail that also spotted (singular)${avoid_animal}! No matching search. Here are all trails in this city.`);
          PrintMatchResult (json, city_input, animal_input, "None", "All");
        } 
        else if(animal_input != "All") {
          window.alert(`${animal_input} hasn't been spotted before on any trail! Here are all trails in this city.`);
          PrintMatchResult (json, city_input, animal_input, avoid_animal, "All");
        }
        else { //search all animal but animal want to avoid are on every trail
          window.alert(`No matching search. Here are all trails in this city.`);
          PrintMatchResult (json, city_input, animal_input, "None", "All");
        }
      } 
      else if (city_found === 0) { //City not found in our database
        window.alert(`No city found. Please verify and search again.`);
        */



      if (found === 0 && city_found) { //If no match trail find for the city
        if (animal_found > 1) { //have more than 1 trail matching result but all of them have animal to avoid (plural). Example: look for fish avoid dog
          window.alert(`Your searched animal - ${animal_input} - was only spotted on the same trails as the animal(s) you want to avoid - ${avoid_animal}! You can still take a hike though! Here are the trails in your searched city.`);
          PrintMatchResult(json, city_input, animal_input, "None", "All");
        }
        else if(animal_found === 1){ //have only one trail matching result but has animal want to avoid (singular) Example: look for bear avoid dog
          window.alert(`Your searched animal - ${animal_input} - was only spotted on the same trail as the animal(s) you want to avoid - ${avoid_animal}! You can still take a hike though! Here are the trails in your searched city.`);
          PrintMatchResult(json, city_input, animal_input, "None", "All");
        }
        else if(animal_input != "All") {//no search animal on any trail. Example: look for bear in auburn
          window.alert(`Your searched animal - ${animal_input} -  hasn't been spotted before on any trail! You can still take a hike though! Here are the trails in your searched city.`);
          PrintMatchResult(json, city_input, animal_input, avoid_animal, "All");
        }
        else { //search ALL animal but animal want to avoid are on every trail. Example: look for All but avoid dog
          window.alert(`Animal you want to avoid - ${avoid_animal} was spotted on every trail! Here are the trails in your searched city.`);
          PrintMatchResult (json, city_input, animal_input, "None", "All");
        }
      }
      else if (city_found === 0) {
        window.alert(`Couldn't find ${city_input_org}. Please verify and search again.`);

      }
    });

}

searchCardContainer = document.querySelector(".card-container");

function renderSearchCards(trailImg, trail_name, trailUrl, trailID) {

  // Card
  var searchCard = document.createElement("div");
  searchCard.classList = "result-card-div m-3";
  searchCardContainer.appendChild(searchCard);

  // Card Row
  var searchCardRow = document.createElement("div");
  searchCardRow.classList = "row g-0";
  searchCard.appendChild(searchCardRow);

  // Card Col-4
  var searchCardCol4 = document.createElement("div");
  searchCardCol4.classList = "col-md-4";
  searchCardRow.appendChild(searchCardCol4);

  // Card img
  var searchCardImg = document.createElement("img");
  searchCardImg.classList = "result-card-img img-fluid rounded-start";
  searchCardImg.src = trailImg
  searchCardCol4.appendChild(searchCardImg);

  // Card Col-8
  var searchCardCol8 = document.createElement("div");
  searchCardCol8.classList = "col-md-8";
  searchCardRow.appendChild(searchCardCol8);

  // Card body
  var searchCardBody = document.createElement("div");
  searchCardBody.classList = "card-body";
  searchCardCol8.appendChild(searchCardBody);

  // Card Title
  var searchCardTitle = document.createElement("h2");
  searchCardTitle.classList = "card-title  mb-3";
  searchCardTitle.textContent = trail_name;
  searchCardBody.appendChild(searchCardTitle);

  //Card Total Animal Count
  var searchCardAnCount = document.createElement("p");
  searchCardAnCount.classList = "card-text text-muted card-animal-count";
  searchCardAnCount.textContent = "A total of 9 animals of all types have been seen on this trail."

  // Card Trail_info URL
  var trailUrla = document.createElement("a");
  trailUrla.classList = "card-trail-url me-2 btn";
  var atURL = document.createTextNode("Learn more about this trail!")
  trailUrla.appendChild(atURL)
  trailUrla.title = "Learn more at All Trails"
  trailUrla.href = trailUrl
  trailUrla.setAttribute("target", "_blank")
  searchCardBody.appendChild(trailUrla);

  var dashboardExists = document.getElementById("dashboard");

  if (dashboardExists) {      
  // Result Save Trail Link Button
  var saveTrailBtn = document.createElement("button");
  var saveText = document.createTextNode("Save This Trail");
  saveTrailBtn.setAttribute("id", trailID);
  saveTrailBtn.classList = `trail-save-btn ms-2 text-nowrap btn btn-save-${trailID}`;
  saveTrailBtn.appendChild(saveText)
  saveTrailBtn.addEventListener("click", function (event) {
    saveTrail(trailID, event)
  })
  searchCardBody.appendChild(saveTrailBtn);
  }
}

document.querySelector('.SearchCity').addEventListener('click', searchFormHandler);
