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
        var parent = item.parentNode;

        var data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + parent.id)

        var tableBody = document.querySelector('tBody');

        for (i = 0; i < data2.data.length; i++) {

            var parsedData = data2.data[i];

            var row = tableBody.insertRow(-1);

            var cellNames = row.insertCell(-1);
            var cellTeam = row.insertCell(-1);
            var cellPts = row.insertCell(-1);
            var cellRebs = row.insertCell(-1);
            var cellAsst = row.insertCell(-1);

            cellNames.innerHTML = parsedData.player.first_name + ' ' + parsedData.player.last_name;
            cellTeam.innerHTML = parsedData.team.abbreviation;
            cellPts.innerHTML = parsedData.pts;
            cellRebs.innerHTML = parsedData.reb;
            cellAsst.innerHTML = parsedData.ast;
        }
    })
})