var flex = document.createElement('div');

flex.className = 'flex-container';

// var i = 0;

for (i = 1; i < 33; i++) {

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block'

    smallDiv.innerHTML = i;

    flex.appendChild(smallDiv);

    var q = 0

    for (q = 1; q < 3; q++) {

        var homeDiv = document.createElement('div');

        var visDiv = document.createElement('div');

        homeDiv.className = 'homeDiv';

        visDiv.className = 'visDiv';

        homeDiv.innerHTML = 'home_score';

        visDiv.innerHTML = 'visitor_score';

        smallDiv.appendChild(homeDiv);

        smallDiv.appendChild(visDiv);

    }

}

document.body.appendChild(flex);