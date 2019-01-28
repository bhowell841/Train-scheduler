$(document).ready(function() {

    var database = firebase.database();

    $("#trainBtn").on("click", function() {
        event.preventDefault();

        var name = $("#trainName").val().trim();
        var destination = $("#trainDestination").val().trim();
        var departureTime = $("#departureTime").val().trim(); 
        // var time = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequency = $("#frequency").val().trim();

        console.log("name: " + name);
        console.log("destination :" + destination);
        console.log("departure: " + departureTime);
        // console.log("time: " + time);
        console.log("frequency: " + frequency);

        database.ref().push({  // push add to the data instead of setting it
            name: name,
            destination: destination,
            departureTime: departureTime,
            // time: time,
            frequency: frequency
        });
    });

    database.ref().on("child_added", function(snapshot) { //need child_added here instead of value because push does not set a value, as set does
        console.log(snapshot.val());
// poosibly put these into a array first then push that
        name = snapshot.val().name;

        // Append to the table
        // Will need a line break most likely


    }, function(error){
        console.log(error);
    });
});