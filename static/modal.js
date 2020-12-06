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
        for (i = 0; i < data2.data.length; i++) {
            var tableBody = document.getElementsByTagName('tbody');
            var parsedData = data2.data[i];
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            var names = parsedData.player.first_name + ' ' + parsedData.player.last_name;
            cell.appendChild(names);
            row.appendChild(cell);
            statsList = ['.player.first_name', '.player.last_name', '.team.abbreviation', '.pts', '.reb', '.ast']
            statsList.forEach(item => {
                let cell = document.createElement('td');
                var text = parsedData + statsList[item];
                cell.appendChild(text);
                row.appendChild(cell);
            })
            tableBody.appendChild(row)
        }
        // modal.children[0].children[1].innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
        //CreateTableFromJSON(data2.data, modal.children[0].children[1])
    })
})