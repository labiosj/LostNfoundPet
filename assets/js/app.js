/* JS for dropdown When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let var_type='';

$('.dogType').on("click",  function() {
    var_type='Dog';
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
        $('#searchOutput').append(`<a href="#">${response.breeds[i].name}</a>`);
        console.log(response.breeds[i].name);
        }
    
      });});
    });

$('.catType').on('click', function() {
    var_type='Cat';
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
    $('#searchOutput').append(`<a href="#">${response.breeds[i].name}</a>`);
    }

  });
});
});
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
fetch("https://api.petfinder.com/v2/oauth2/token", {
  body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
 method: "POST"
}).then(async function (response) {
    let a = await response.json()
    console.log(a.access_token)

const petUrl = 'https://api.petfinder.com/v2/animals?type=dog&location=07097&status=found';
    $.ajax({
        url: petUrl,
        headers: {Authorization: `Bearer  ${a.access_token}`},
        method: 'GET'
      }).then(function(response) {
        console.log(response);
        });




});
// $('#add-stock').on('click', addButton);