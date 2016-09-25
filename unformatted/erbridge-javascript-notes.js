// Functions are hoisted to the top and read
// Variables are hoisted to the top, registered but not read
// If you assign a function to a variable it will be registered but not read.

// This
function foo() {
    bar();
    var x = 1;
}

// Runs like this.
function foo() {
    var x;
    bar();
    x = 1;
}

// So here, the name 'foo' is hoisted, but the body is left behind. 
// It will only be assigned during execution.
function test() {
    foo(); // TypeError "foo is not a function"
    bar(); // "this will run!"
    var foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
    function bar() { // function declaration, given the name 'bar'
        alert("this will run!");
    }
}
test();

//Client side
// This works
socket.on('messages-available', function startUpMessages(data) {
  for (var i = 0; i < data.length; i++) {
    addMessage(data[i]);
  }
});
  
// This returns > "ReferenceError: data is not defined"
// socket.on('messages-available', startUpMessages(data));
// 
// var startUpMessages = function startUpMessages(data) {
//   for (var i = 0; i < data.length; i++) {
//     addMessage(data[i]);
//   }
// }

//Server side

io.on('connection', function(socket) {
  sockets.push(socket);
  socket.emit('messages-available', messages);
}

https://jsbin.com/wizufowimo/edit?html,js,outpuZ
