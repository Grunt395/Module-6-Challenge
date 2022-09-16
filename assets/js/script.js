// alert(API_KEY);

var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");


searchForm.addEventListener("submit", function (event) {  
    event.preventDefault();

    var search = searchInput.value.trim();

    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;

    fetch(apiURL).then(function (response) {  
        return response.json();
    }).then(function(data) {
        if (data.length === 0) {
            alert("Location not found")
        }
        else {
            console.log(data[0]);
        }
    })
    


    searchInput.value = "";

})