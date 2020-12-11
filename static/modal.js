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
        var tr = document.createElement('tr');
        var fname = document.createElement('td');
        var lname = document.createElement('td');
        var tname = document.createElement('td');
        var ptsstat = document.createElement('td');
        var rebstat = document.createElement('td');
        var aststat = document.createElement('td');
        fname.innerHTML = chunk.player.first_name;
        lname.innerHTML = chunk.player.last_name;
        tname.innerHTML = chunk.team.abbreviation;
        ptsstat.innerHTML = chunk.pts;
        rebstat.innerHTML = chunk.reb;
        aststat.innerHTML = chunk.ast;
        tr.appendChild(fname);
        tr.appendChild(lname);
        tr.appendChild(tname);
        tr.appendChild(ptsstat);
        tr.appendChild(rebstat);
        tr.appendChild(aststat);
        tableGuy.appendChild(tr);
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
        console.log(parent.id)
        makeTable(parent.id);
    })
})