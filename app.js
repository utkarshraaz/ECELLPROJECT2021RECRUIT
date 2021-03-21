var searchBar = document.getElementById('searchBar');//IT WILL STORE THE SEARCHING TERM

var submitBtn = document.getElementById('submitBtn');//IT WILL BE USED WHEN SUBMIT BUTTON IS PRESSED
var query = searchBar.value;

// API OF WIKIPEDIA
var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&gsrsearch="


var url = ''; // USE FOR SETTING URL

submitBtn.addEventListener('click', function(e) { 

    $("#searchResults").empty(); // ON CLICKING AFTER EVERY SEARCH IT  CLEAR THE RESULT 

    e.preventDefault(); // Prevent default behavior of submit button

    if (searchBar.value === '') { // If search bar is empty
        searchBar.classList.add('animated', 'shake', 'alert'); // Add the alert

        setTimeout(function() { // Remove alert
            searchBar.classList.remove('animated', 'shake', 'alert');
        }, 750);
    }

    else {

        var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, '_') + "%27"; // Replace whitespaces with underscores
        searchBar.value = ''; // Clear search bar
        url = apiUrl; // Set url to apiUrl
        searchResults(apiUrl); // Call searchResults, passing in the apiUrl

    }

});

function searchResults(url) {

    $.ajax({
        url: url,
        success: function(result) {
            for (var i in result.query.pages) { // Loop through all pages within result object
                var searchResults = document.getElementById('searchResults');
                var resultsLi = document.createElement('li'); // Create li element for all page titles

                resultsLi.className = 'singleResult'; // Add class to all li elements
                resultsLi.style.display = 'none'; // Hide li by default
                resultsLi.innerHTML = '<p>' + result.query.pages[i].title.toLowerCase() + '</p>'; // Add title text to lis
                searchResults.appendChild(resultsLi); // Append lis to searchResults div

                $(resultsLi).wrap(function() { // Wrap li with corresponding wiki url
                    return '<a target="_blank" href="https://en.wikipedia.org/wiki/' + result.query.pages[i].title + '"></a>';
                });

                $(resultsLi).fadeIn(1000); // Fade in hidden lis
            }

        }
    });
};
