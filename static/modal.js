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
        modal.style.display = "block";
        span.addEventListener('click', event => {
            modal.style.display = 'none'
        })
        // let cell = document.createElement('td');
        // var names = parsedData.player.first_name + ' ' + parsedData.player.last_name;
        // cell.innerHTML = names;
        // row.appendChild(cell);
        // statsList = ['.player.first_name', '.player.last_name', '.team.abbreviation', '.pts', '.reb', '.ast']
        document.querySelectorAll('tBody').forEach(item => {

            var parent = item.parentNode;
            console.log(parent);

            var data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + parent.parentElement.parentElement.parentElement.parentElement.id)

            var tableBody = document.getElementById('myTableBody');

            for (i = 0; i < data2.data.length; i++) {

                var parsedData = data2.data[i];

                var row = tableBody.insertRow(-1);

                var cellNames = row.insertCell(-1);
                var cellTeam = row.insertCell(-1);
                var cellPts = row.insertCell(-1);
                var cellRebs = row.insertCell(-1);
                var cellAsst = row.insertCell(-1);

                cellNames.innerHTML = parsedData.player.first_name + ' ' + parsedData[i].player.last_name;
                cellTeam.innerHTML = parsedData.team.abbreviation;
                cellPts.innerHTML = parsedData.pts;
                cellRebs.innerHTML = parsedData.reb;
                cellAsst.innerHTML = parsedData.ast;
            }

            // tableBody.appendChild(row)
        })
    })

    // modal.children[0].children[1].innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
    //CreateTableFromJSON(data2.data, modal.children[0].children[1])
})