// function to make api call
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

// date formatter
function dateChanger(date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  formattedDate = newDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: '2-digit',
    year: 'numeric'
  })
  return formattedDate
}

// gametime formatter
function gametime(time, qtr, status) {
  if (time == "" & qtr == 0) {
    return `Game Start Time: ${status}`;
  } else if (time == "" & qtr == 4) {
    return `${status}`
  } else if (time == "" & qtr > 4) {
    return qtr - 4 + "OT | " + status
  } else {
    return `${time} | Q${qtr} | ${status}`
  }
}

//Comparer Function    
function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}

// dates for api pulls
var date = new Date();
var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
date.setDate(date.getDate() - 1);
var startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

// variable to hold data
var data = httpGet('https://www.balldontlie.io/api/v1/games?start_date=' + startDate + '&end_date=' + endDate);

// order json array by date
var data2 = data.data.sort(GetSortOrder("date"))

// create flexbox
var flex = document.createElement('div');

// set class name of flexbox
flex.className = 'flex-container';

// loop through json array and get each game
for (let i = 0; i < data2.length; i++) {
  var cow = data2[i];

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

  dateDiv.innerText = dateChanger(cow.date);

  homeDiv.innerHTML = cow.home_team.abbreviation + ': ' + cow.home_team_score;

  visDiv.innerHTML = cow.visitor_team.abbreviation + ': ' + cow.visitor_team_score;

  period.innerHTML = gametime(cow.time, cow.period, cow.status);

  modContent.innerHTML =
    `<div id='statsheet'>STATS</div><span class="close">×</span><div id=table${cow.id}></div>`;

  btnDiv.innerHTML = '<button id="myBtn">Get More Stats</button>';

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