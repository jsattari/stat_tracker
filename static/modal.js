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
        var span = document.getElementsByClassName("close")[0];
        var parent = item.parentNode;
        data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + parent.id)
        modal.style.display = "block";
        modal.innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
        console.log(parent.id)
    })
})