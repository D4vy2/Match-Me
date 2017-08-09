(function() {
    // Some visual effects
    var tagsContainer = document.querySelector('#profil-tags-container');
    var imgContainer = document.querySelector('#profil-img-container');
    var mainPic = document.querySelector('#profil-main-pic');
    var tags = document.querySelectorAll('.profil-tag');
    var blockContainer = document.querySelector('#block-container');
    var likeContainer = document.querySelector('#like-container');
    var btnChat = document.querySelector('#btn-chat');
    var btnChatContainer = document.querySelector('#btn-chat-container');
    var reportContainer = document.querySelector('#report-container');

    tagsContainer.addEventListener('mouseover', function(ev) {
        tagsContainer.style.backgroundColor = '#441100';
        tagsContainer.style.transition = '0.5s';
        for (var i = 0; i < tags.length; i++) {
            tags[i].style.backgroundColor = 'transparent';
        }
    })
    tagsContainer.addEventListener('mouseleave', function(ev) {
        tagsContainer.style.backgroundColor = '#4e4456';
        tagsContainer.style.transition = '0.5s';
        for (var i = 0; i < tags.length; i++) {
            tags[i].style.backgroundColor = '#625969';
        }
    })
    
    imgContainer.addEventListener('mouseover', function(ev) {
        imgContainer.style.backgroundColor = '#441100';
        imgContainer.style.transition = '0.5s';
    })
    imgContainer.addEventListener('mouseleave', function(ev) {
        imgContainer.style.backgroundColor = 'black';
        imgContainer.style.transition = '0.5s';
    })

    mainPic.addEventListener('mouseover', function(ev) {
        mainPic.style.border = '20px solid black';
        mainPic.style.transition = '0.5s';
    })
    mainPic.addEventListener('mouseleave', function(ev) {
        mainPic.style.border = '5px solid black';
        mainPic.style.transition = '0.8s';
    })

    blockContainer.addEventListener('mouseover', function(ev) {
        if (blockContainer.style.backgroundColor != 'salmon') {
            blockContainer.style.backgroundColor = '#441100';
            blockContainer.style.transition = '0.5s';
        }
    })
    blockContainer.addEventListener('mouseleave', function(ev) {
        if (blockContainer.style.backgroundColor != 'salmon') {
            blockContainer.style.backgroundColor = '';
            blockContainer.style.transition = '0.5s';
        }
    })

    likeContainer.addEventListener('mouseover', function(ev) {
        likeContainer.style.backgroundColor = '#441100';
        likeContainer.style.transition = '0.5s';
    })
    likeContainer.addEventListener('mouseleave', function(ev) {
        likeContainer.style.backgroundColor = '';
        likeContainer.style.transition = '0.5s';
    })

    reportContainer.addEventListener('mouseover', function(ev) {
        if (reportContainer.style.backgroundColor != 'salmon') {
            reportContainer.style.backgroundColor = '#441100';
            reportContainer.style.transition = '0.5s';
        }
    })
    reportContainer.addEventListener('mouseleave', function(ev) {
        if (reportContainer.style.backgroundColor != 'salmon') {
            reportContainer.style.backgroundColor = '';
            reportContainer.style.transition = '0.5s';
        }
    })
    
    if (btnChat != null) {
        btnChat.addEventListener('mouseover', function(ev) {
                btnChat.style.backgroundColor = '#441100';
                btnChat.style.transition = '0.5s';
        })
        btnChat.addEventListener('mouseleave', function(ev) {
                btnChat.style.backgroundColor = '';
                btnChat.style.transition = '0.5s';
        })
    }


    // Ajax for like
    function likeUser(bool) {
        xhr = new XMLHttpRequest();
        var url = document.querySelector('#url').value;
        if (bool == true)
            url += '/like';
        else
            url += '/unlike';
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('Like/Unlike with success!');
            }
        }
        xhr.send();
    }

    var btnLike = document.querySelector('#btn-like');
    var heartIcon = document.querySelector('#span-like');
    var user = document.querySelector('#currentUser').innerHTML;
    likeContainer.addEventListener('click', function(ev) {
        if (btnLike.value == 'Like') {
            heartIcon.style.color = 'red';
            heartIcon.style.transition = '0.5s';
            btnLike.value = 'Unlike';
            socket.emit('notif', login);
            likeUser(true);
        } else {
            likeContainer.style.backgroundColor = 'salmon';
            heartIcon.style.color = 'lightgray';
            heartIcon.style.transition = '0.3s';
            btnLike.value = 'Like';
            if (btnChatContainer != null) {
                btnChatContainer.style.display = 'none';
            }
            socket.emit('notif', login);
            likeUser(false);
        }
        ev.preventDefault();
    })


    // Ajax for blocking user
    function blockUser(bool) {
        xhr = new XMLHttpRequest();
        var url = document.querySelector('#url').value;
        if (bool == true)
            url += '/block';
        else
            url += '/unblock';
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('Block/Unblock with success!');
            }
        }
        xhr.send();
    }

    var btnBlock = document.querySelector('#btn-block');
    blockContainer.addEventListener('click', function(ev) {
        if (btnBlock.value == 'Block') {
            blockContainer.style.backgroundColor = 'salmon';
            blockContainer.style.transition = '0.5s';
            btnBlock.value = 'Unblock';
            blockUser(true);
        } else {
            blockContainer.style.backgroundColor = 'transparent';
            blockContainer.style.transition = '0.3s';
            btnBlock.value = 'Block';
            blockUser(false);
        }
    })

    // Ajax for report user
    function reportUser() {
        xhr = new XMLHttpRequest();
        var url = document.URL + '/report';
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('User reported with success!');
            }
        }
        xhr.send();
    }
    reportContainer.addEventListener('click', function(ev) {
        let reportContent = document.querySelector('#report-content');
        reportContent.innerHTML = 'Profil reported';
        reportContainer.style.backgroundColor = 'salmon';
        reportUser();
    })



    var status = document.querySelector('#status');
    var lastConnection = document.querySelector('#last-connection');
    var login = document.querySelector('#login').lastChild.textContent;

    var socket = io();
    socket.emit('online req', login);

    socket.on('online', function() {
        status.style.transition = "0.7s";
        status.style.background = 'springgreen';
        status.style.width = '1.6em';
        status.style.height = '1.6em';
        lastConnection.style.display = 'none';
    })

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


   


})()