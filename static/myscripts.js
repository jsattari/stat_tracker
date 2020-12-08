// function to make api call
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

// dates for api pulls
var date = new Date();
var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
date.setDate(date.getDate() - 90);
var startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

// variable to hold data
var data = httpGet('https://www.balldontlie.io/api/v1/games?start_date=' + startDate + '&end_date=' + endDate);

// create flexbox
var flex = document.createElement('div');

// set class name of flexbox
flex.className = 'flex-container';

for (let i = 0; i < data.data.length; i++) {
    var cow = data.data[i];

    var smallDiv = document.createElement('div');

    smallDiv.className = 'block';

    smallDiv.setAttribute('id', cow.id);

    var dateDiv = document.createElement('div');

    var homeDiv = document.createElement('div');

    var visDiv = document.createElement('div');

    var period = document.createElement('div');

    var myModal = document.createElement('div');

    myModal.setAttribute('id', 'myModal');

    var modContent = document.createElement('div');

    // var spanner = document.createElement('span')

    var btnDiv = document.createElement('div')

    homeDiv.className = 'homeDiv';

    visDiv.className = 'visDiv';

    period.className = 'period';

    dateDiv.className = 'dates';

    myModal.className = 'modal';

    modContent.className = 'modal-content';

    modContent.setAttribute('id', 'modContent');

    // spanner.className = 'close';

    btnDiv.className = 'button-div';

    dateDiv.innerText = cow.date;

    homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

    visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;

    period.innerHTML = cow.time + ' | ' + cow.period + 'Q | ' + cow.status + ' ';

    modContent.innerHTML =
        `<span class="close">×</span><div class="divTable" id=${cow.id}></div>`;
        
    btnDiv.innerHTML = '<button id="myBtn">Open Modal</button>';

    smallDiv.appendChild(dateDiv);

    smallDiv.appendChild(homeDiv);

    smallDiv.appendChild(visDiv);

    smallDiv.appendChild(period);

    smallDiv.appendChild(btnDiv);

    btnDiv.setAttribute('id', cow.id);

    // modContent.appendChild(spanner);

    myModal.appendChild(modContent);

    smallDiv.appendChild(myModal);

    flex.appendChild(smallDiv);

    document.body.appendChild(flex);

}
