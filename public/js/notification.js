(function() {

	var notifications = document.querySelectorAll('#notification');
	var links = document.querySelectorAll('#profile-name');
	var status = document.querySelectorAll('#notif-status');
	var btn = document.querySelector('.dropdown-toggle');
	var matchBtn = document.querySelector('.navbar-brand');

	matchBtn.addEventListener('mouseover', function(ev) {
		matchBtn.style.color = "#B8FFB0";
		matchBtn.style.backgroundColor = "#58525b";
		matchBtn.style.transition = "0.4";
	})

	matchBtn.addEventListener('mouseleave', function(ev) {
		matchBtn.style.color = "#777";
		matchBtn.style.backgroundColor = "transparent";
		matchBtn.style.transition = "0.4s";
	})

	for(var i = 0, len = links.length; i < len; i++) {
		let elem = links[i];
		elem.addEventListener('click', function(ev) {
			socket.emit('notif', elem.innerHTML);
		}, false);
	}

	for(var i = 0, len = notifications.length; i < len; i++) {
		let cell = notifications[i];
		let id = cell.nextElementSibling.innerHTML;
		let status = cell.nextElementSibling.nextElementSibling.innerHTML;
		if (status == 0) {
			btn.style.backgroundColor = 'lightcoral';
			btn.style.color = 'white';
			cell.style.backgroundColor = 'lightgray';
			cell.style.color = 'black';
			cell.addEventListener('click', function(ev) {
				cell.style.backgroundColor = 'white';
				cell.style.color = 'dimgray';
				cell.style.borderBottom = '1px solid lightgray';
				readNotification(id, cell);
				// ev.preventDefault();
			}, false);
		} else {
			cell.style.backgroundColor = 'white';
			cell.style.color = 'dimgray';
			cell.style.borderBottom = '1px solid lightgray';
		}
	}

	// AJAX request for read notification
	function readNotification(id, cell) {
		var xhr = new XMLHttpRequest();
		var url = "http://localhost:8888/users/notification";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
				if (xhr.readyState == 4 && xhr.status == 200) {
						cell.nextElementSibling.nextElementSibling.innerHTML = 1;
						console.log('Notification read with success!');
						checkUnreadNotifs(notifications);
				}
		}
		xhr.send("id=" + id);
	}

	// Check if there is some notifs unread and if yes then change color if the main button
	function checkUnreadNotifs(arr) {
		for (var i = 0, len = arr.length; i < len; i++) {
			let cell = arr[i];
			let status = cell.nextElementSibling.nextElementSibling.innerHTML;
			console.log(status);
			if (status == 0)
				return;
		}
		let btn = document.querySelector('.dropdown-toggle');
		btn.style.backgroundColor = 'transparent';
		btn.style.color = '#777';
	}

	var socket = io();

})();
