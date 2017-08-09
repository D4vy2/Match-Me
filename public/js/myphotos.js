(function(){

        var imgAll = document.querySelectorAll('img')
        var del_button = document.getElementById('btn-delete');
        var btnSetMain = document.getElementById('btn-setmain');
        var setMain = document.querySelector('#setmain');
        var hidden = document.querySelector('#hidden');
        var btnContainer = document.querySelector('#btn-container');

        function selectImage(elem){
                btnContainer.style.display = "block";
                for (var i = 0; i < imgAll.length; i++) {
                        imgAll[i].style.border = "none";
                }
                // put the image selected in the button value
                hidden.setAttribute('value', elem);
                setMain.setAttribute('value', elem);
        }

        // Effet selection image
        for (var i = 0; i < imgAll.length; i++) {
                imgAll[i].addEventListener('click', function(ev){
                var test = this.getAttribute('src');
                selectImage(test);
                this.style.border = "8px solid #B8FFB0";
                this.style.borderRadius = "5px";
                this.style.transition = "0.3s";
                }, false);
        }
})();