(function() {
	var age = document.querySelector('#age');

	function checkAge(age) {
		if (/^[0-9]+$/.test(age) == false) {
			return (false);
		} else if (parseInt(age) < 18 || parseInt(age) > 100 || age == undefined) {
			return (false);
		}
		return (true);
	}

	age.addEventListener('focusout', function(ev) {
		if (checkAge(age.value.trim()) == false) {
			alert('Your age seems incorrect, please fix it.');
			age.value = "";
			ev.preventDefault();
		}
	})    


})();