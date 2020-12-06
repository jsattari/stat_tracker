// function to make api call
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        var modal = document.getElementById('myModal');
        var span = modal.getElementsByClassName('close')[0];
        var parent = item.parentNode;
        var data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + parent.id)
        modal.style.display = "block";
        span.addEventListener('click', event => {
            modal.style.display = 'none'
        })
        var tableBody = document.getElementsById('myTableBody');
        var parsedData = data2.data;
        // let cell = document.createElement('td');
        // var names = parsedData.player.first_name + ' ' + parsedData.player.last_name;
        // cell.innerHTML = names;
        // row.appendChild(cell);
        // statsList = ['.player.first_name', '.player.last_name', '.team.abbreviation', '.pts', '.reb', '.ast']
        parsedData.forEach(item => {
            let row = document.createElement('tr');
            
            let cellNames = document.createElement('td');
            let cellTeam = document.createElement('td');
            let cellPts = document.createElement('td');
            let cellRebs = document.createElement('td');
            let cellAsst = document.createElement('td');

            let textNames = parsedData.player.first_name + ' ' + parsedData.player.last_name;
            let textTeam = parsedData.team.abbreviation;
            let textPts = parsedData.pts;
            let textRebs = parsedData.reb;
            let textAsst = parsedData.ast;

            cellNames.innerHTML = textNames;
            cellTeam.innerHTML = textTeam;
            cellPts.innerHTML = textPts;
            cellRebs.innerHTML = textRebs;
            cellAsst.innerHTML = textAsst;

            row.appendChild(cellNames);
            row.appendChild(cellTeam);
            row.appendChild(cellPts);
            row.appendChild(cellRebs);
            row.appendChild(cellAsst);
        })
        tableBody.appendChild(row)

        // modal.children[0].children[1].innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
        //CreateTableFromJSON(data2.data, modal.children[0].children[1])
    })
})