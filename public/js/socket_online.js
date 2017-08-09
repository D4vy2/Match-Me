var socket = io();
socket.on('online check', function(login) {
    let user = document.querySelector('#currentUser').innerHTML;
    if (login === user) {
        socket.emit('online resp', login);
    }
})

socket.on('notif resp', function(dest) {
    let user = document.querySelector('#currentUser').innerHTML;
    if (dest === user) {
        setTimeout(function() {
            location.reload();
        }, 500)
    }
})