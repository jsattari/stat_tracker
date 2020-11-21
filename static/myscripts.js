function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

function getModal(gameId) {

    data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + gameId)
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

var date = new Date();
var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
date.setDate(date.getDate() - 90);
var startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

data = httpGet('https://www.balldontlie.io/api/v1/games?start_date=' + startDate + '&end_date=' + endDate);

var flex = document.createElement('div');

flex.className = 'flex-container';

for (let i = 0; i < data.data.length; i++) {
    var cow = data.data[i];

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block';

    // smallDiv.innerHTML = i;

    var homeDiv = document.createElement('div');

    var visDiv = document.createElement('div');

    var period = document.createElement('div');

    var myModal = document.createElement('div');

    var modContent = document.createElement('div');

    var spanner = document.createElement('span')

    var btnDiv = document.createElement('div')

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    period.className = 'period';

    myModal.className = 'modal';

    modContent.className = 'modal-content';

    spanner.className = 'close';

    btnDiv.className = 'button-div';

    homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

    visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;

    period.innerHTML = cow.time + ' | ' + cow.period + 'Q | ' + cow.status + ' ' + cow.id;

    spanner.innerHTML = "&times;";

    btnDiv.innerHTML = '<button id="myBtn">Open Modal</button>';

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    smallDiv.appendChild(period);

    smallDiv.appendChild(btnDiv);

    myModal.appendChild(modContent);

    myModal.appendChild(spanner);

    smallDiv.appendChild(myModal);

    flex.appendChild(smallDiv);

}

document.body.appendChild(flex);