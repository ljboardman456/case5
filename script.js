"use strict";

// create a Room class to manage room information (e.g., Canyon, Javelina)
function Room(name, pricePerDay) {
    this.name = name;
    this.pricePerDay = pricePerDay;

    // method to calculate total cost based on number of days
    this.calculateCost = function(days) {
        return this.pricePerDay * days;
    };
}

// create instances for the Canyon and Javelina rooms
const canyonRoom = new Room("Canyon Room", 149.99);
const javelinaRoom = new Room("Javelina Room", 127.99);

// exception handling for form validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
    // clear any previous error messages
    let errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = "";

    // flag to track if any errors are found
    let hasError = false;

    // check if the name is entered
    let name = document.getElementById("myName").value.trim();
    if (name === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Name is required.</p>";
    }

    // check if the email is valid
    let email = document.getElementById("myEmail").value.trim();
    if (email === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Email is required.</p>";
    } else {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            hasError = true;
            errorMessages.innerHTML += "<p>Please enter a valid email address.</p>";
        }

        // check if the email is from a forbidden domain (e.g., gmail.com)
        let forbiddenDomain = "gmail.com"; // set the forbidden domain
        let emailDomain = email.split('@')[1]; // extract the domain part from the email
        if (emailDomain === forbiddenDomain) {
            hasError = true;
            errorMessages.innerHTML += "<p>Email addresses from gmail.com are not allowed.</p>";
        }
    }

    // check if the date is selected
    let date = document.getElementById("myDate").value;
    if (date === "") {
        hasError = true;
        errorMessages.innerHTML += "<p>Date is required.</p>";
    }

    // check if at least one room type is selected
    let roomTypes = document.querySelectorAll('input[name="Canyon"], input[name="Javelina"]');
    let roomSelected = false;
    roomTypes.forEach(function(room) {
        if (room.checked) {
            roomSelected = true;
        }
    });
    if (!roomSelected) {
        hasError = true;
        errorMessages.innerHTML += "<p>Please select at least one room type.</p>";
    }

    // if any errors were found, prevent form submission
    if (hasError) {
        event.preventDefault();
    }
});

// function to get the current time and set a greeting
function setGreeting() {
    let greetingText;
    let currentHour = new Date().getHours(); // get the current hour (0-23)

    if (currentHour < 12) {
        greetingText = "Good morning!"; // if hour is before noon it is morning
    } else if (currentHour < 18) {
        greetingText = "Good afternoon!"; // this will display afternoon if before 6 pm
    } else {
        greetingText = "Good evening!"; // everything else is set as evening, including night hours
    }

    document.getElementById("greeting").textContent = greetingText; // display greeting
}

// run function when page loads
window.onload = setGreeting;
