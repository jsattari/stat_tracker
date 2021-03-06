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

    tableGuy.className = 'tableGuy'

    tableGuy.insertRow(0).innerHTML =
        `<thead><th>Name</th>
        <th>Team</th>
        <th>Mins</th>
        <th>Points</th>
        <th>FG%</th>
        <th>Rebs</th>
        <th>Assts</th>
        <th>Blocks</th>
        <th>Steals</th></thead>`;

    tableGuy.insertRow(1).innerHTML =
        `<tr><th>HOME</th></tr>`;

    for (let i = 0; i < data2.data.length; i++) {
        var chunk = data2.data[i];
        if (chunk.game.home_team_id == chunk.team.id) {
            tableGuy.insertRow(tableGuy.rows.length).innerHTML =
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
    }

    tableGuy.insertRow(tableGuy.rows.length).innerHTML =
        `<tr><th>AWAY</th></tr>`;

    for (let i = 0; i < data2.data.length; i++) {
        var piece = data2.data[i];
        if (piece.game.visitor_team_id == piece.team.id) {
            tableGuy.insertRow(tableGuy.rows.length).innerHTML =
                `<td>${piece.player.first_name} ${piece.player.last_name}</td>
                <td>${piece.team.abbreviation}</td>
                <td>${piece.min}</td>
                <td>${piece.pts}</td>
                <td>${piece.fg_pct}</td>
                <td>${piece.reb}</td>
                <td>${piece.ast}</td>
                <td>${piece.blk}</td>
                <td>${piece.stl}</td>`;
        }
    }

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