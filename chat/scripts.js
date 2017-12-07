// Create a reference to firebase
var messagesRef = new Firebase('https://cinderchat-5cf58.firebaseio.com/chatroom');

// C.R.E.A.M -  cache your elements
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var loginField = $('#codeInput');
var messageList = $('.messages');
var timeField = $('#timeInput');
var date = new Date();
var audio = new Audio('alert.mp3');

function addMessage(data) {
  var username = data.name || 'anonymous';
  var message = data.text;
  var time = data.time;

  // Create an element
  var nameElement = $('<strong>').text(username);
  var messageElement = $('<p>').text(message).prepend(nameElement);
  var timeElement = $('<li>').text(time).prepend(messageElement);

  // Add the message to the DOM
  messageList.append(timeElement);
  
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
    text : messageField.val() + " - " + timeField.val() + ", " + date.getMonth() + "/" + date.getDate()
  };

  // Save Data to firebase
  messagesRef.push(message);

  // clear message field
  messageField.val('');
  
  // stops audio from playing when you add a message
  audio.stop();

});

// Add a callback that is triggered for each chat message
// this is kind of like an Ajax request, but they come in via websockets
// 10 of them will load on page load, and any future messages will as well
messagesRef.limitToLast(175).on('child_added', function (snapshot) {
  // Get data from returned
  addMessage(snapshot.val());
  
  audio.play(); //This plays a sound when someone messages
});


// Login scripts
$('.login').on('loginatmpt',function(l) {
    // stop form from submitting
    l.preventDefault();
    
    //change username
    nameField.val('')
});

//Welcome scripts
var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

$(function () {

  showText("#motd", "Welcome Back, 707.", 0, 200);   

});
