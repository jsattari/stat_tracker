// function to make api call
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

// function to get table and insert data
function makeTable(id) {
    var data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + id)

    var tableDiv = document.getElementById('table' + id);

    tableGuy = document.createElement('table');

    for (var i = 0; i < data2.data.length; i++) {
        var chunk = data2.data[i];
        var tr = tableGuy.insertRow(-1);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = chunk.player.first_name;
        tabCell.innerHTML = chunk.last_name;
        tabCell.innerHTML = chunk.team.abbreviation;
        tabCell.innerHTML = chunk.player.pts;
        tabCell.innerHTML = chunk.player.reb;
        tabCell.innerHTML = chunk.player.ast;
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