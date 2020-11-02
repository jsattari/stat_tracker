var flex = document.createElement('div');

flex.className = 'flex-container';

// var i = 0;

for (i = 1; i < 33; i++) {

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block'

    smallDiv.innerHTML = i;

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);