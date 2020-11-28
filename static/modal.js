document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        var parent = item.parentNode;
        console.log(parent.id)
    })
})