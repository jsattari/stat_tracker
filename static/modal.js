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

        var col = Object.keys(data2.data[0]); 

        data2.data.forEach(function (obj) {                                            // for each object obj in company_info
            var tr = tableBody.insertRow(-1);                                          // create a row for it
            col.forEach(function (key) {                                            // and for each key in col
                var tabCell = tr.insertCell(-1);                                     // create a cell
                if (Array.isArray(obj[key])) {                                       // if the current value is an array, then
                    obj[key].forEach(function (player) {                               // for each entry in that array
                        var div = document.createElement("div");                         // create a div and fill it
                        div.textContent = player.first_name + " " + player.last_name;
                        tabCell.appendChild(div);                                        // then add the div to the current cell
                    });
                } else {                                                             // otherwise, if the value is not an array (it's a string)
                    tabCell.textContent = obj[key];                                    // add it as text
                }
            });
        });
    })
})