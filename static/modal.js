// function to make api call
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

function CreateTableFromJSON(array, element) {
    var table = document.createElement("table");                             // the table elements

    var col = Object.keys(array[0]);                                         // the columns names (I think taking the keys of the first object will suffice)

    // HEADER:
    var tr = table.insertRow(-1);                                            // the header row
    col.forEach(function (key) {                                              // for each key in col
        var th = document.createElement("th");                                 // create a header cell
        th.textContent = key;                                                  // use textContent instead of innerHTML (it's better)
        tr.appendChild(th);
    });

    // ROWS:
    array.forEach(function (obj) {                                            // for each object obj in company_info
        var tr = table.insertRow(-1);                                          // create a row for it
        col.forEach(function (key) {                                            // and for each key in col
            var tabCell = tr.insertCell(-1);                                     // create a cell
            if (Array.isArray(obj[key])) {                                       // if the current value is an array, then
                obj[key].forEach(function (contact) {                               // for each entry in that array
                    var div = document.createElement("div");                         // create a div and fill it
                    div.textContent = contact.first_name + " " + contact.last_name + ", " + contact.position;
                    tabCell.appendChild(div);                                        // then add the div to the current cell
                });
            } else {                                                             // otherwise, if the value is not an array (it's a string)
                tabCell.textContent = obj[key];                                    // add it as text
            }
        });
    });

    var divContainer = document.getElementsByTagName('p')
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        var modal = document.getElementById('myModal');
        var span = modal.getElementsByClassName('close')[0];
        var parent = item.parentNode;
        data2 = httpGet('https://www.balldontlie.io/api/v1/stats?game_ids[]=' + parent.id)
        modal.style.display = "block";
        span.addEventListener('click', event => {
            modal.style.display = 'none'
        })
        // modal.children[0].children[1].innerHTML = data2.data[0].player.first_name + ' ' + data2.data[0].player.last_name
        CreateTableFromJSON(data2.data)
    })
})