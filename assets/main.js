$(document).ready(function () {
    var sv = "";
    var database = firebase.database();
    var nextTrain = "";
    var minutesAway = "";
    //var frequency = 0;

    database.ref().on("child_added", function (snapshot) {
        sv = snapshot.val();
        console.log(sv.frequency + "is sv.frequency");
        getTimes(sv.frequency);
        makeRows();

    }); 

    function makeRows() {
        var tBody = $("tbody");
        var tRow = $("<tr>");
        var nameTd = $("<td>").text(sv.trainName);
        var destinationTd = $("<td>").text(sv.Destination);
        var frequencyTd = $("<td>").text(sv.frequency);
        var nextArrivalTd = $("<td>").text(nextTrain);
        var minutesAwayTd = $("<td>").text(minutesAway);
        tRow.append(nameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);
        tBody.append(tRow);
    }
    //makeRows();

    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val();
        database.ref().push({
            trainName: trainName,
            Destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        }) 

});
function getTimes(frequency) {
    var timeConverter = moment(sv.trainTime, "HH:mm").subtract(1, "years");
    console.log(moment(timeConverter).format("HH:mm"));
    var time = moment(timeConverter).format("HH:mm");

    var currentTime = moment();
    console.log("Current Time = " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverter), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemainder = diffTime % frequency;
    console.log("frequency is " + frequency)
    console.log("Time Remainder: " + timeRemainder);

    minutesAway = frequency - timeRemainder;
    console.log("Minutes until train " + minutesAway);

    nextTrainTime = moment().add(minutesAway, "minutes");
    console.log("Arrival Time is " + moment(nextTrainTime).format("hh:mm"))
    nextTrain = moment(nextTrainTime).format("hh:mm");
}

});