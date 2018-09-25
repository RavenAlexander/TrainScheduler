// var config = {
//     apiKey: "AIzaSyAdoT8cxKI1QoJoI3PWGZzJDKeBDllfvi8",
//     authDomain: "trainscheduler-bd197.firebaseapp.com",
//     databaseURL: "https://trainscheduler-bd197.firebaseio.com",
//     projectId: "trainscheduler-bd197",
//     storageBucket: "trainscheduler-bd197.appspot.com",
//     messagingSenderId: "267071318324"
//   };
//   firebase.initializeApp(config);
var trainArray = [];

$(document).ready(function(){
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

{/* <tr id="">
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr> */}

function addTrainsToTable() {
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