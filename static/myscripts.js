function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

data = httpGet('https://www.balldontlie.io/api/v1/games?start_date=2020-09-01&end_date=2020-09-09');

var flex = document.createElement('div');

flex.className = 'flex-container';

// var i = 0;

for (i = 0; i < data.data.length; i++) {
    var cow = data.data[i]

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block'

    // smallDiv.innerHTML = i;

    var homeDiv = document.createElement('div');

    var visDiv = document.createElement('div');

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

    visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;;

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);