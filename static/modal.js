var collection = document.getElementsByClassName('block');

for (var x = 0; x < collection.length; x++) {

    var button = collection[x].getElementsByClassName('button-div')[0].getElementsByTagName('button')[0];

    button.addEventListener('click', function(click) {
        console.log(collection[x].id)
    }, false)
}