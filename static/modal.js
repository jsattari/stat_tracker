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

    var tableGuy = document.createElement('table');

    tableGuy.insertRow(0).innerHTML = 
        `<thead><th>Name</th>
        <th>Team</th>
        <th>Min Played</th>
        <th>Points</th>
        <th>FG%</th>
        <th>Rebs</th>
        <th>Assts</th>
        <th>Blocks</th>
        <th>Steals</th></thead>`;

    tableGuy.insertRow(1).innerHTML = `<tr><th>HOME</th></tr>`;

    for (let i = 0; i < data2.data.length; i++) {
        var chunk = data2.data[i];
        tableGuy.insertRow(i + 2).innerHTML =
            `<td>${chunk.player.first_name} ${chunk.player.last_name}</td>
            <td>${chunk.team.abbreviation}</td>
            <td>${chunk.min}</td>
            <td>${chunk.pts}</td>
            <td>${chunk.fg_pct}</td>
            <td>${chunk.reb}</td>
            <td>${chunk.ast}</td>
            <td>${chunk.blk}</td>
            <td>${chunk.stl}</td>`;
    }
    tableGuy.insertRow(tableGuy.rows.length).innerHTML =
        `<tr><th>AWAY</th></tr>`;
    tableDiv.appendChild(tableGuy);
}

document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        let modal = item.parentNode.parentNode.lastElementChild;
        var span = modal.getElementsByClassName('close')[0];
        modal.style.display = "block";
        span.addEventListener('click', event => {
            modal.style.display = 'none'
        })
        makeTable(item.parentNode.id);
    })
})