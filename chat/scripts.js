// Create a reference to firebase
var messagesRef = new Firebase('https://cinderchat-5cf58.firebaseio.com/chatroom');

// C.R.E.A.M -  cache your elements
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var loginField = $('#codeInput')
var messageList = $('.messages');
var date = new Date();

function addMessage(data) {
  var username = data.name || 'anonymous';
  var message = data.text;

  // Create an element
  var nameElement = $('<strong>').text(username);
  var messageElement = $('<li>').text(message).prepend(nameElement);

  // Add the message to the DOM
  messageList.append(messageElement);
  

  // Scroll to the bottom of the message list
  messageList[0].scrollTop = messageList[0].scrollHeight;
}

// Listen for the form submit
$('.chat').on('submit',function(e) {

  // stop the form from submitting
  e.preventDefault();

  // create a message object
  var message = {
    name : nameField.val(),
    text : messageField.val() + " - " +  currentTime.getHours() + ":" + currentTime.getMinutes() + " " + date.getDate() + "/" + date.getMonth()
  }

  // Save Data to firebase
  messagesRef.push(message);

  // clear message field
  messageField.val('');

});

// Add a callback that is triggered for each chat message
// this is kind of like an Ajax request, but they come in via websockets
// 10 of them will load on page load, and any future messages will as well
messagesRef.limitToLast(175).on('child_added', function (snapshot) {
  // Get data from returned
  addMessage(snapshot.val());
});


// Login scripts
$('.login').on('loginatmpt',function(l) {
    // stop form from submitting
    l.preventDefault();
    
    //change username
    nameField.val('')
});

//This is to update the time when message was last submitted
function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('time_span').innerHTML = t_str;
}
setInterval(updateTime, 1000);