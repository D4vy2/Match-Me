(function() {

    var btnSend = document.querySelector('#btn-send');

    btnSend.addEventListener('mouseover', function(ev) {
        btnSend.style.backgroundColor = "#ffc04c";
        btnSend.style.color = "white";
        btnSend.style.transition = "0.5s";
    })
    btnSend.addEventListener('mouseleave', function(ev) {
        btnSend.style.backgroundColor = "navajowhite";
        btnSend.style.color = "lightcoral";
        btnSend.style.transition = "0.5s";
    })

    window.onload = function(ev) {
        messages.style.transition = "3s";
        messages.scrollTop = messages.scrollHeight;
        ev.preventDefault();
    };


    // Ajax for save message
    var postMessage = function(message) {
        var xhr = new XMLHttpRequest();
        var url = document.URL;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('Message posted!');
            }
        }
        var content = document.querySelector('#content').value;
        xhr.send("content=" + message.text);
    }

    var socket = io();
    var roomName = document.querySelector('#chat').getAttribute('name');
    var form = document.querySelector('#form-chat');
    var content = document.querySelector('#content');
    var messages = document.querySelector('#msg-container');
    var login = document.querySelector('#currentUser').innerHTML;
    var target = document.querySelector('#target').value;

    socket.emit('create', roomName);

    form.addEventListener('submit', function(ev) {
        if (content.value.trim() == "") {
            return (false);
        }
        var message = {
            login: login,
            text: content.value,
        }
        postMessage(message);
        socket.emit('message', message, roomName);
        socket.emit('notif', target);
        socket.emit('notif-chat', {from: login, dest: target});
        content.value = "";
        content.focus();
        ev.preventDefault();
    }, false);

    socket.on('server-message', function(message) {
        var li = document.createElement('li');
        li.innerHTML = `<span style="font-weight: bold">` + message.login + ':</span>  ' + message.text;
        li.setAttribute('id', 'msg-content');
        messages.appendChild(li);
        messages.style.transition = "3s";
        messages.scrollTop = messages.scrollHeight;
    })

    // Check if user is online
    socket.on('online check', function(login) {
        let user = document.querySelector('#currentUser').innerHTML;
        if (login === user) {
            socket.emit('online resp', login);
        }
    })

    socket.on('notif-chat resp', function(obj) {
        let user = document.querySelector('#currentUser').innerHTML;
        let from = document.querySelector('#chat-id').innerHTML;
        if (obj.dest === user && obj.from === from) {
            let chatBar = document.querySelector('#chat-bar');
            chatBar.style.backgroundColor = 'black';
            chatBar.style.color = 'lightcoral';
        }
        else if (obj.dest === user) {
            location.reload();
        }
    })

    // click on page to reset the chat bar
    window.document.addEventListener('click', function(ev) {
            let chatBar = document.querySelector('#chat-bar');
            chatBar.style.backgroundColor = 'dimgray';
            chatBar.style.color = 'antiquewhite';
    })

})();