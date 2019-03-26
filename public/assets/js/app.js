
///ZIP CODE STUFF

//capture the zip code

function retrieve_zip() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var callback = "zipcode_callback",
        lat = position.coords.latitude,
        long = position.coords.longitude,
        script = document.createElement("script");

      script.src = "https://open.mapquestapi.com/nominatim/v1/reverse.php?key=TKvEQYC9Z0USuLAUEZw1JpdX9wAT9Jso&format=json&json_callback=" +
        callback +
        "&lat=" + lat +
        "&lon=" + long;

      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }
}

let varzipCode = '';
console.log('nozip');

function zipcode_callback(json) {
  const zip_code = json.display_name.split(',');
  var zipCode = zip_code[5];
  $('#locationSearch').val(" zipCode ");
  // $("#locationSearch").empty();
  // console.log(zipCode);
  varzipCode = zipCode.trim();

  $('#locationSearch').val(zipCode);

}

// call the method
retrieve_zip();
let vardistanceVal = '';
let breedSelector = '';
//DISTANCE STUFF
var distanceVal;

$(document).ready(function () {
  $("#distSelect").change(function () {
    distanceVal = $(this);
    vardistanceVal = distanceVal.val();
    // alert(vardistanceVal);
  })
  $("#breedSelect").change(function () {
    breedSelector = $(this).val();
    // alert(breedSelector);
  })
});


//code for the JS dropdown

let animalsArray = [];
$('#locationSearch').val(" ");


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

//code for the buttons

let var_type = '';
const breeds = function (type) {
  var_type = type;
  //$('.breedSelect').empty();
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(async function (response) {
    let a = await response.json()
    console.log(a.access_token);
    const breedsUrl = `https://api.petfinder.com/v2/types/${var_type}/breeds`
    $.ajax({
      url: breedsUrl,
      headers: { Authorization: `Bearer  ${a.access_token}` },
      method: 'GET'
    }).then(function (response) {
      for (i = 0; i < response.breeds.length; i++) {
        $('#breedSelect').append(`<option value="${response.breeds[i].name}">${response.breeds[i].name}</option>`);
        //  console.log(`${response.breeds[i].name}`)
      }

      $("#breedSelect").selectpicker('refresh');


    });
  });
};

$('.dogType').on("click", () => breeds('Dog'));
$('.catType').on("click", () => breeds('Cat'));

const petDetails = function () {
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(async function (response) {
    let a = await response.json()
    // console.log(a.access_token);
    // console.log(varzipCode);
    // console.log(vardistanceVal);
    // console.log(var_type);
    // console.log(breedSelector);
    //  const petUrl =  'https://api.petfinder.com/v2/animals?type=Dog&location=07097';
    const petUrl = `http://localhost:5000/api/animals/${var_type}/${varzipCode}/${breedSelector}/${a.access_token}`;
    $.get(petUrl)
    .then(function (response) {
       console.log(response);
      animalsArray = [...response];

      // console.log(animalsArray);
      //  console.log(zipCode);
      //  console.log(distanceVal);
      for (let i = 0; i < animalsArray.length; i++){
     if (animalsArray[i].photos.length>0){
       $('#searchOutput').append(`<li class="list-group-item"><img class="rounded" src="${animalsArray[i].photos[0].small}" width="10%"></li>`);
          }
              
          $('#searchOutput').append(`<li class="list-group-item"><h3>${animalsArray[i].name}</h3>`);
          $('#searchOutput').append(`<li class="list-group-item"><h5>${animalsArray[i].breeds.primary}</h5>`);
          $('#searchOutput').append(`<li class="list-group-item"><h6>${animalsArray[i].description}</h6>`);
          $('#searchOutput').append(`<li class="list-group-item"><h6>${animalsArray[i].contact.email}</h6><br>`);
          $('#searchOutput').append(`<li class="list-group-item"><a href="${animalsArray[i].url}">${animalsArray[i].url}</a><br>`);



      //  $('#searchOutput').append(`<div class="text-left"><h3>${animalsArray[i].name}</h3></div>`);
      //  $('#searchOutput').append(`<div class="text-left"><h3>${animalsArray[i].breeds.primary}</h3></div>`);
      //  $('#searchOutput').append(`<div class="text-left"><h3>${animalsArray[i].description}</h3></div>`);
      //  $('#searchOutput').append(`<div class="text-left"><h3>${animalsArray[i].contact.email}</h3></div>`);
       
      };
    });
  });

};
$('.petLocate').on('click', petDetails);


// //$('.stockLogo').append(`<img class="rounded float-left" src="${logoURL}" alt="companyLogo"><br>`);
// $('.stockInfo').append(`<div class="text-left"><h3>${companyName}</h3></div>`);
// $('.stockInfo').append(`<div class="text-left"><h3>$${latestPrice}</h3></div>`);
// $('.stockInfo').append(`<div class="text-left font-weight-bold">News headlines: <p></p></div>`);
// for (let i = 0; i < headline.length; i++){
//   console.log(headline[i]);
//   $('.stockInfo').append(`<div class="text-left"><p>${headline[i]}</p></div>`);;



// function to tweet image with message to Twitter

$('.twitterType').on('click', function () {
  console.log("Entered Twitter function");

  const msg = $('.tweetDesc').val();
  console.log(msg);

  $.post(`/api/twitter/${msg}`)
    .then(function (response) {
      console.log(response);
    })
});

