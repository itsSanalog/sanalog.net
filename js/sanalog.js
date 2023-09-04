////// NAVBAR //////
const button = document.getElementById("burger");
button.addEventListener("click", () => {
    // To make the button work on first click, navmenu is set to -380px in inline html. Thus the sequence is 0?1:0. The rest, the default is set to whatever value fits 0 state in the css file. Thus, sequence is 1?0:1
    document.getElementById("navmenu").style.transform =
        (document.getElementById("navmenu").style.transform == "translateX(-380px)") ? "translateX(0)" : "translateX(-380px)";
    document.getElementsByClassName("yellow")[0].style.opacity =
        (document.getElementsByClassName("yellow")[0].style.opacity == "1") ? "0" : "1";
    document.getElementById("burger").style.color =
        (document.getElementById("burger").style.color == "yellow") ? "black" : "yellow";
    document.getElementsByClassName("menu_bg")[0].style.opacity =
        (document.getElementsByClassName("menu_bg")[0].style.opacity == "1") ? "0" : "1";
    document.getElementsByClassName("menu_bg")[0].style.pointerEvents =
        (document.getElementsByClassName("menu_bg")[0].style.pointerEvents == "auto") ? "none" : "auto";
});

////// SCROLLER //////
const scrollers = [
    { element: document.getElementById('scroller0'), showThreshold: 0 },
    { element: document.getElementById('scroller1'), showThreshold: 30 },
    { element: document.getElementById('scroller2'), showThreshold: 60 },
    { element: document.getElementById('scroller3'), showThreshold: 90 }
];

function showHide(scrollPercentage) {
    scrollers.forEach(function (scroller) {
        if (scrollPercentage >= scroller.showThreshold && scrollPercentage < scroller.showThreshold + 30) {
            scroller.element.classList.remove('hidden');
        } else {
            scroller.element.classList.add('hidden');
        }
    });
}

showHide(0);

window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    console.log(scrollPercentage);
    showHide(scrollPercentage);
});





