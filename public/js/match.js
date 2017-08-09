(function() {
    var thb = document.querySelectorAll('.match-thumbnail');

    // mouseover Event
    for(var i = 0; i < thb.length; i++) {
        let elem = thb[i];
        elem.addEventListener('mouseover', function(ev) {
            elem.style.backgroundColor = 'white';
            elem.style.transition = '0.5s';
            elem.style.transform = "scale(1.1,1.1)";
            elem.style.border = '15px solid lightgrey';
            elem.style.zIndex = '3';
        })
    }
    // mouseleave Event
    for(var i = 0; i < thb.length; i++) {
        let elem = thb[i];
        elem.addEventListener('mouseleave', function(ev) {
            elem.style.backgroundColor = 'lightgrey';
            elem.style.transition = '0.5s';
            elem.style.transform = "scale(1,1)";            
            elem.style.border = '10px solid dimgrey';
            elem.style.zIndex = 'auto';            
        })
    }
    // click Event
    for(var i = 0; i < thb.length; i++) {
        let elem = thb[i];
        elem.addEventListener('click', function(ev) {
            let login = elem.querySelector('h3').innerHTML;
            console.log('THE LOGIN IS ' + login);
            socket.emit('notif', login);
        })
    }

    // Partie Sort et Filter
    var formSort = document.querySelector('#form-sort');
    var formFilter = document.querySelector('#form-filter');
    var selectSortBy = document.querySelector('#sort');
    var filterAge = document.querySelector('#filterAge');
    var filterDistance = document.querySelector('#filterDistance');
    var filterPopularity = document.querySelector('#filterPopularity');
    var filterTags = document.querySelector('#filterTags');
    selectSortBy.addEventListener('change', function(ev) {
        formSort.submit();
    })
    filterAge.addEventListener('change', function(ev) {
        formFilter.submit();
    })
    filterDistance.addEventListener('change', function(ev) {
        formFilter.submit();
    })
    filterPopularity.addEventListener('change', function(ev) {
        formFilter.submit();
    })
    filterTags.addEventListener('change', function(ev) {
        formFilter.submit();
    })

    var displayFilter = function(filter, time) {
        filter.style.visibility = "visible";
        filter.style.opacity = "1";
        filter.style.transition = "opacity " + time + " linear";
    }

    var hideFilter = function(filter, time) {
        filter.style.opacity = "0";
        filter.style.transition = "opacity " + time + " linear";
    }

    // partie filter display
    var btnFilter = document.querySelector('#btn-filter');
    btnFilter.addEventListener('click', function(ev) {
        displayFilter(filterAge, "0.2s");
        displayFilter(filterDistance, "0.4s");
        displayFilter(filterPopularity, "0.7s");
        displayFilter(filterTags, "1.1s");
    })

    var filterContainer = document.querySelector('#filter-container')
    filterContainer.addEventListener('mouseover', function(ev) {
        displayFilter(filterAge, "0.2s");
        displayFilter(filterDistance, "0.4s");
        displayFilter(filterPopularity, "0.7s");
        displayFilter(filterTags, "1.1s");
    })
    filterContainer.addEventListener('mouseleave', function(ev) {
        hideFilter(filterAge, "1.1s");
        hideFilter(filterDistance, "0.7s");
        hideFilter(filterPopularity, "0.4s");
        hideFilter(filterTags, "0.2s");
    })

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


})()