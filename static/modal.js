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
        var parsedData = data2.data;
        // let cell = document.createElement('td');
        // var names = parsedData.player.first_name + ' ' + parsedData.player.last_name;
        // cell.innerHTML = names;
        // row.appendChild(cell);
        // statsList = ['.player.first_name', '.player.last_name', '.team.abbreviation', '.pts', '.reb', '.ast']
        document.querySelectorAll('tBody').forEach(item => {

            var tableBody = document.getElementById('myTableBody');

            let row = tableBody.insertRow(-1);

            let cellNames = row.insertCell(-1);
            let cellTeam = row.insertCell(-1);
            let cellPts = row.insertCell(-1);
            let cellRebs = row.insertCell(-1);
            let cellAsst = row.insertCell(-1);

            let textNames = parsedData[i].player.first_name + ' ' + parsedData[i].player.last_name;
            let textTeam = parsedData[i].team.abbreviation;
            let textPts = parsedData[i].pts;
            let textRebs = parsedData[i].reb;
            let textAsst = parsedData[i].ast;

            cellNames.innerHTML = textNames;
            cellTeam.innerHTML = textTeam;
            cellPts.innerHTML = textPts;
            cellRebs.innerHTML = textRebs;
            cellAsst.innerHTML = textAsst;

            // tableBody.appendChild(row)
        })
    })

    // modal.children[0].children[1].innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
    //CreateTableFromJSON(data2.data, modal.children[0].children[1])
})