var checkTags = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (/^#[a-za-z]+$/.test(arr[i]) == false) {
			return (false);
		}
	}
	return (true);
}

var checkPosition = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (/^[0-9.-]+$/.test(arr[i]) == false) {
			return (false);
		}
	}
	return (true);
}

function checkAge(age) {
	if (/^[0-9]+$/.test(age) == false) {
		return (false);
	} else if (parseInt(age) < 18 || parseInt(age) > 100 || age == undefined) {
		return (false);
	}
	return (true);
}

module.exports = function(req, res, next) {
	let error = undefined;

	let gender = req.body.gender;
	let first = req.body.firstName;
	let last = req.body.lastName;
	let age = req.body.age;
	let email = req.body.email;
	let sexPref = req.body.sexpref;
	let bio = req.body.bio;
	let tags = req.body.tags.split(',');
	let position = req.body.position.split(',');

	if (gender.trim() == "" || first.trim() == "" || last.trim() == "" || age.trim() == "" | email.trim() == "" || sexPref.trim() == "" || bio.trim() == "") {
		error = "All fields are required";
	} else if (gender != "Male" && gender != "Female" && sexPref != "Straight" && sexPref != "Gay" && sexPref != "Bisexual") {
		error = "An error occured, please fix this before submit the form";
	} else if (/\s/.test(gender) || /\s/.test(first) || /\s/.test(last) || /\s/.test(email) || /\s/.test(sexPref)) {
		error = 'No space characters are authorized';
	} else if (checkTags(tags) == false) {
		error = "There is a problem in your tags, please fix it before resubmit the form";
	} else if (tags.length < 3 || tags.length > 12) {
		error = "The number of tags is incorrect";
	} else if (checkPosition(position) == false) {
		error = "There is a problem with your location, please check it before submit";
	} else if (checkAge(age) == false) {
		error = "Your age seems incorrect, please check it before submit";
	}
	res.locals.error = error;
	next();
};
