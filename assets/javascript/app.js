$(document).ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCyHt1NO-_znx4ZvylZKj9nM4BI9u611jw",
        authDomain: "train-scheduler-71f7d.firebaseapp.com",
        databaseURL: "https://train-scheduler-71f7d.firebaseio.com",
        projectId: "train-scheduler-71f7d",
        storageBucket: "train-scheduler-71f7d.appspot.com",
        messagingSenderId: "694927622955"
    };
    firebase.initializeApp(config);
    

    // Access to the database
    var database = firebase.database();

    $("#trainBtn").on("click", function() {
        event.preventDefault();

        // Assign the info from the for to variables
        var name = $("#trainName").val().trim();
        var destination = $("#trainDestination").val().trim();
        var firstDeparture = $("#departureTime").val().trim(); 
        var frequency = $("#frequency").val().trim();

        // Debug to see if the info is there
        console.log("name: " + name);
        console.log("destination :" + destination);
        console.log("departure: " + firstDeparture);
        console.log("frequency: " + frequency);

        database.ref().push({ 

            // Push to the database
            name: name,
            destination: destination,
            firstDeparture: firstDeparture,
            frequency: frequency,
            date: firebase.database.ServerValue.TIMESTAMP
        });

        // clear the text boxes
        $("#trainName").val("");
        $("#trainDestination").val("");
        $("#departureTime").val("");
        $("#frequency").val("");
 
    });

    database.ref().on("child_added", function(snapshot) { //need child_added here instead of value because push does not set a value, as set does
        console.log(snapshot.val());
        
        // Pull info from the database
        name = snapshot.val().name;
        destination = snapshot.val().destination;
        firstDeparture = snapshot.val().firstDeparture;
        frequency = snapshot.val().frequency;

        // Calculate the next train and minutes away
        var firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");
        console.log(firstDepartureConverted);

        // Current Time
        var currentTime = moment();
        console.log("The time is: " + moment(currentTime).format("hh:mm"));

        // Get the difference form the current time and first train time
        var difference =  moment().diff(moment(firstDepartureConverted), "minutes");
        console.log("Difference: " + difference);

        // Time until the Choo Choo arrives
        var remainder = difference % frequency;
        console.log(remainder);
        var waitTime = frequency - remainder;
        console.log("TIme to next train: " + waitTime);

        // Time of the next Choo Choo
        var allAboard = moment().add(waitTime, "minutes");
        allAboard = moment(allAboard).format("hh:mm");
        console.log("Next Train: " + allAboard);
        
        // Append the new train to the table
        $("#trains > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>"+ frequency + "</td><td>" + allAboard + "</td><td>" + waitTime + "</td></tr>");


    }, function(error){
        console.log(error);
    });

}); // End document ready