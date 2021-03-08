window.onload = function () {
    var focus = document.querySelector('.focus');
    var lsArrows = document.querySelectorAll('.arrow-1');

    var ol_root = document.querySelector('.circle');
    for (var i = 0; i < ol_root.length; i++) {
        ol_root.removeChild(ol_root.childNodes(i));
    }


    focus.addEventListener('mouseover', function () {
        for (let i = 0; i < lsArrows.length; i++) {
            lsArrows[i].style.display = 'block';
        }
    });

    focus.addEventListener('mouseout', function () {
        for (let i = 0; i < lsArrows.length; i++) {
            lsArrows[i].style.display = 'none';
        }
    });
}