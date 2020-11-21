function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

var date = new Date();
var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
date.setDate(date.getDate() - 90);
var startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

data = httpGet('https://www.balldontlie.io/api/v1/games?start_date=' + startDate + '&end_date=' + endDate);

var flex = document.createElement('div');

flex.className = 'flex-container';

// var i = 0;

for (let i = 0; i < data.data.length; i++) {
    var cow = data.data[i];

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block'

    // smallDiv.innerHTML = i;

    var homeDiv = document.createElement('div');

    var visDiv = document.createElement('div');

    var period = document.createElement('div');

    var btn = document.createElement('BUTTON')

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    period.className = 'period';

    btn.className = 'databtn';

    homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

    visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;

    period.innerHTML = cow.time + ' | ' + cow.period + 'Q | ' + cow.status + ' ' + cow.id;

    btn.innerHTML = 'More stats';

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    smallDiv.appendChild(period);

    period.appendChild(btn);

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);