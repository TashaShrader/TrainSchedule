var config = {
    apiKey: "AIzaSyDzS6738Z_TRB2xAESFZCYGu_sTZ35idwI",
    authDomain: "inclassdemo-97928.firebaseapp.com",
    databaseURL: "https://inclassdemo-97928.firebaseio.com",
    projectId: "inclassdemo-97928",
    storageBucket: "inclassdemo-97928.appspot.com",
    messagingSenderId: "172134813635"
};
firebase.initializeApp(config);

var trainName = "";
var theTrainDestination = "";

var nextTrain = "";
var minutesAway = "";

var theTrainTime = "";
var tFrequency = "";
var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    
    trainName = $("#train-input").val().trim();
    theTrainDestinations = $("#destination-input").val().trim();
    tFrequency = $("#frequency-input").val().trim();
    
     minutesAway = $("#train-time-input").val().trim();
   


    database.ref().push({
        name: trainName,
        destination: theTrainDestination,
        frequency: tFrequency,
        minutes: minutesAway,
    });

})

database.ref().on("value", function (snapshot) {
    var tFrequency = "";
  var diffTime = 0;

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    $("#train-input").text(snapshot.val().trainName);
   $("#destination-input").text(snapshot.val().theTrainDestination);
   $("#frequency-input").text(snapshot.val().tFrequency);
   $("#train-time-input").text(snapshot.val().minutesAway);
   
    

      
$("#here").append(

    "<tr>" + "<td>" + snapshot.val().trainName + "</td>" +
    "<td>" + snapshot.val().theTrainDestination + "</td>" +
    "<td>" + tFrequency + "</td>" +
    "<td>" + minutesAway + "</td>" + "</tr>"
)

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}

)






