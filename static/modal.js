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

    //var col = Object.values(lunch);

    var tableDiv = document.getElementById('table' + id);

    tableGuy = document.createElement('table'); 

    for (var i = 0; i < data2.data.length; i++) {
        var chunk = data2.data[i];
        var tr = tableGuy.insertRow(-1);

        Object.keys(lunch).forEach(function (item) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = chunk.lunch[item];
        })
    }
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