// function to make api call
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

function makeTable(id) {
    var data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + id)

    var lunch = {
        first: 'player.first_name',
        last: 'player.last_name',
        team: 'team.abbreviation',
        pts: 'pts',
        rebs: 'reb',
        asst: 'ast'
    };

    var col = Object.values(lunch);

    var tableDiv = document.getElementById('table' + id);

    tableGuy = document.createElement('table'); 

    data2.data.forEach(function (obj) {                                   // for each object obj in company_info
        var tr = tableGuy.insertRow(-1);                                          // create a row for it
        col.forEach(function (value) {                                            // and for each key in col
            var tabCell = tr.insertCell(-1);                                     // create a cell
            tabCell.textContent = obj.value
        })
    })
    tableDiv.appendChild(tableGuy);
}

document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        var modal = document.getElementById('myModal');
        var span = modal.getElementsByClassName('close')[0];
        modal.style.display = "block";
        span.addEventListener('click', event => {
            modal.style.display = 'none'
        })
        var parent = item.parentNode;
        makeTable(parent.id);
    })
})