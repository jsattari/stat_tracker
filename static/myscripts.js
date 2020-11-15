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

// https://www.balldontlie.io/api/v1/games?start_date=2020-09-09&end_date=2020-09-09

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

    var period = document.createElement('div');

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    period.className = 'period';

    homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

    visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;

    period.innerHTML = cow.time + ' | ' + cow.period + 'Q | ' + cow.status

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    smallDiv.appendChild(period);

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);

var card = document.querySelector(".block");
var playing = false;

card.addEventListener('click', function () {
    if (playing)
        return;

    playing = true;
    anime({
        targets: card,
        scale: [{
            value: 1
        }, {
            value: 1.4
        }, {
            value: 1,
            delay: 250
        }],
        rotateY: {
            value: '+=180',
            delay: 200
        },
        easing: 'easeInOutSine',
        duration: 400,
        complete: function (anim) {
            playing = false;
        }
    });
});