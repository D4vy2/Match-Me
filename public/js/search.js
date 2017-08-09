(function() {

    // Partie Sort et Filter
    var formSort = document.querySelector('#form-sort');
    var formFilter = document.querySelector('#form-filter');
    var filterContainer = document.querySelector('#filter-container')

    filterContainer.addEventListener('mouseover', function(ev) {
        formSort.setAttribute('action', '/search/sort')
        formFilter.setAttribute('action', '/search/filter');
    })

    var searchAge = document.querySelector('#searchAge');
    var searchDistance = document.querySelector('#searchDistance');
    var searchPopularity = document.querySelector('#searchPopularity');
    var searchTags = document.querySelector('#searchTags');
    var btnSearch = document.querySelector('#btn-search-submit');
    searchAge.addEventListener('change', function(ev) {
        btnSearch.style.display = 'inline';
    })
    searchDistance.addEventListener('change', function(ev) {
        btnSearch.style.display = 'inline';
    })
    searchPopularity.addEventListener('change', function(ev) {
        btnSearch.style.display = 'inline';
    })
    searchTags.addEventListener('change', function(ev) {
        btnSearch.style.display = 'inline';
    })

})()