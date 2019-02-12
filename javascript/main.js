var config = {
    apiKey: "AIzaSyDzS6738Z_TRB2xAESFZCYGu_sTZ35idwI",
    authDomain: "inclassdemo-97928.firebaseapp.com",
    databaseURL: "https://inclassdemo-97928.firebaseio.com",
    projectId: "inclassdemo-97928",
    storageBucket: "inclassdemo-97928.appspot.com",
    messagingSenderId: "172134813635"
};
firebase.initializeApp(config);
var database = firebase.database();

var name = "";
var destination = "";
var freq = "";
var next = "";

function currentTime() {
    var current = moment().format('HH:mm');
    console.log(current);
    setTimeout(currentTime, 1000);
};

$("#submit").on("click", function (event) {
    event.preventDefault();
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    freq = $("#freq-input").val().trim();
    next = $("#next-input").val().trim();

    database.ref().push(schedule)({
        name: name,
        destination: destination,
        freq: freq,
        next: next
    });
});

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

      
      
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().freq);
    console.log(snapshot.val().next);

    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().destination);
    $("#age-display").text(snapshot.val().freq);
    $("#comment-display").text(snapshot.val().next);

    $("#full-member-list").append(
        "<tr>" +
        "<td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + snapshot.val().freq + "</td>" +
        "<td>" + snapshot.val().next + "</td>" +
        "</tr>"
    )
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});