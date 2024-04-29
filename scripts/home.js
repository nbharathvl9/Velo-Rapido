const currentDate = new Date();
const month = currentDate.toLocaleString('default', { month: 'long' });
const day = currentDate.getDate();
const formattedDate = `${month} ${day}`;
const cardHeaderSpan = document.querySelector('.card-header span:last-child');
cardHeaderSpan.textContent = formattedDate;


const currentHour = currentDate.getHours();

// Check if the current hour is after 6 (18:00)
if (currentHour >= 18) {
    const sunIcons = document.querySelectorAll('.sun');
    sunIcons.forEach(icon => {
        icon.style.background = 'linear-gradient(to right, #ffffff, #ffffff)';
    });

    const card = document.querySelector('.card');
    card.style.background = 'linear-gradient(to bottom left, #000033 0%, #000066 100%)';

    const cardfont = document.querySelector('.card-header span:first-child');
    cardfont.style.color = 'white';

    const cardDate = document.querySelector('.card-header span:last-child');
    cardDate.style.color = 'white';

    const cardTemp = document.querySelector('.temp');
    cardTemp.style.color = 'white';

    const cardTempScale = document.querySelector('.temp-scale span');
    cardTempScale.style.color = 'white';

}




// Get location of user using open street view maps api

window.onload = function() {
    getLocation();
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector(".card-header span:first-child").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            let city = data.address.city;

            if (city === undefined){
                city = "";
            }
            const area = data.address.suburb;
            const country = data.address.country;
            document.querySelector(".card-header span:first-child").innerHTML = `${area}, ${city}<br>${country}`;
        })
        .catch(error => console.log('Error fetching location data:', error));

    const temperature = 23; 
    document.querySelector(".temp").innerHTML = temperature + "°";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector(".card-header span:first-child").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector(".card-header span:first-child").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.querySelector(".card-header span:first-child").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector(".card-header span:first-child").innerHTML = "An unknown error occurred.";
            break;
    }
}