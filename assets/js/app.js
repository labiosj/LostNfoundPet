//switching to v.4 bootstrap for the selectpicker
///$.fn.selectpicker.Constructor.BootstrapVersion = '4';


//code for the JS dropdown


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

let var_type='';
const breeds =function(type) {
   var_type=type;
   $('#appendHere').empty();
   console.log(var_type);
   fetch("https://api.petfinder.com/v2/oauth2/token", {
 body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
 headers: {
   "Content-Type": "application/x-www-form-urlencoded"
 },
method: "POST"
}).then(async function (response) {
   let a = await response.json()
   console.log(a.access_token);
   const breedsUrl =`https://api.petfinder.com/v2/types/${var_type}/breeds`
   $.ajax({
       url: breedsUrl,
       headers: {Authorization: `Bearer  ${a.access_token}`},
       method: 'GET'
     }).then(function(response) {
       for (i=0;i<response.breeds.length;i++){
       $('#appendHere').append(`<a href="#">${response.breeds[i].name}</a>`);
       }

     });});
   };

$('.dogType').on("click",  () => breeds('Dog'));
$('.catType').on("click",  () => breeds('Cat'));

const petDetails= function(){
   fetch("https://api.petfinder.com/v2/oauth2/token", {
       body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
      method: "POST"
     }).then(async function (response) {
       let a = await response.json()
       console.log(a.access_token)

   const petUrl = 'https://api.petfinder.com/v2/animals?type=dog&location=07097';
       $.ajax({
           url: petUrl,
           headers: {Authorization: `Bearer  ${a.access_token}`},
           method: 'GET'
         }).then(function(response) {
           console.log(response.animals);
           });
});
};
$('.petLocate').on('click', petDetails);

// zipCode function

function retrieve_zip() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var callback = "zipcode_callback",
         lat = position.coords.latitude,
         long = position.coords.longitude,
         script = document.createElement("script");

       script.src = "https://open.mapquestapi.com/nominatim/v1/reverse.php?key=TKvEQYC9Z0USuLAUEZw1JpdX9wAT9Jso&format=json&json_callback=" +
         callback +
         "&lat=" + lat +
         "&lon=" + long;

       //document.getElementsByTagName("head")[0].appendChild(script);
     });
   }
 }

 function zipcode_callback(json) {
   const zip_code = json.display_name.split(',');
   var zipCode = zip_code[5];
   $('#locationSearch').val(" zipCode ");
   // $("#locationSearch").empty();
   console.log(zipCode);
   $('#locationSearch').val(zipCode);
   
 }

 // call the method
 retrieve_zip();