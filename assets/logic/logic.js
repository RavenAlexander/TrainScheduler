var config = {
    apiKey: "AIzaSyAdoT8cxKI1QoJoI3PWGZzJDKeBDllfvi8",
    authDomain: "trainscheduler-bd197.firebaseapp.com",
    databaseURL: "https://trainscheduler-bd197.firebaseio.com",
    projectId: "trainscheduler-bd197",
    storageBucket: "trainscheduler-bd197.appspot.com",
    messagingSenderId: "267071318324"
  };
  firebase.initializeApp(config);

//Using jquery to add trains and display them to the table


  $(document).ready(function(){
    var trainArray = [];
    $('#submit').on('click', function(e){
      e.preventDefault();
        var train = {
          name: $('#trainName').val(),
          destination: $('#destination').val(),
          firstTime: $('#firstTime').val(),
          frequency: $('#frequency').val()
        }
        trainArray.push(train);
        addTrainsToTable()
      
    });
  });
  
  
  function addTrainsToTable() {
    var trainArray = [];
    $('#trainTable').empty();
    for( var i =0; i < trainArray.length; i++ ) {
        var tableRow = $('<tr>');
        var tdTrainName = $('<td>').text(trainArray[i].name);
        var tdDestination = $('<td>').text(trainArray[i].destination);
        var tdFirstTime = $('<td>').text(trainArray[i].firstTime);
        var tdFrequency = $('<td>').text(trainArray[i].frequency);
        tableRow.append(tdTrainName);
        tableRow.append(tdDestination);
        tableRow.append(tdFirstTime);
        tableRow.append(tdFrequency);
        $('#trainTable').append(tableRow);
    }
  
  }
  
//Firebase snapshots

  var database = firebase.database();
  $('#submit').on("click", function() {
    // take user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTime").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();
    // to create local temporary object to hold train data
    var newTrain = {
        name: trainName,
        place: destination,
        ftrain: firstTrain,
        freq: frequency
      }
      // uploads train data to the database
    database.ref().push(newTrain);
    console.log(newTrain.name);
    // clears all the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");
    // Prevents moving to new page
    return false;
  });
  //  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Now we store the childSnapshot values into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrain = childSnapshot.val().ftrain;
    var frequency = childSnapshot.val().freq;
    // first Train pushed back to make sure it comes before current time
    var firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log(firstTimeConverted);
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);
    // store difference between currentTime and fisrt train converted in a variable.
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(firstTrain);
    console.log("Difference in Time: " + timeDiff);
    // find Remainder of the time left and store in a variable
    var timeRemainder = timeDiff % frequency;
    console.log(timeRemainder);
    // to calculate minutes till train,we store it in a variable
    var minsAway = frequency - timeRemainder;
    // next train
    var nextArrival = moment().add(minsAway, "minutes").format("HH:mm");

  
    $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival  + "</td><td>" + minsAway + "</td></tr>");

  });
  












// 
// var tFrequency = 3;

//     // Time is 3:30 AM
//     var firstTime = "03:30";

//     // First Time (pushed back 1 year to make sure it comes before current time)
//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));