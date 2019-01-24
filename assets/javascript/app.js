$(document).ready(function() {

    $("#trainBtn").on("click", function() {
        var name = $("#trainName").val().trim();
        var destination = $("#trainDestination").val().trim();
        var departureTime = $("#departureTime").val().trim(); 
        var frequency = $("#frequency").val().trim();

        console.log("name: " + name);
        console.log("destination :" + destination);
        console.log("departure: " + departureTime);
        console.log("frequency: " + frequency);
    })
});