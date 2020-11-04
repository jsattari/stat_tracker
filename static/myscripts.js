var flex = document.createElement('div');

flex.className = 'flex-container';

// var i = 0;

for (i = 1; i < 33; i++) {

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block'

    smallDiv.innerHTML = i;

    var homeDiv = document.createElement('div');

    var visDiv = document.createElement('div');

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    homeDiv.innerHTML = 'home_score';

    visDiv.innerHTML = 'visitor_score';

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);