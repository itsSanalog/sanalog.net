////// NAVBAR //////
const button = document.getElementById("burger");
button.addEventListener("click", () => {
    // To make the button work on first click, navmenu is set to -380px in inline html. Thus the sequence is 0?1:0. The rest, the default is set to whatever value fits 0 state in the css file. Thus, sequence is 1?0:1
    // It's been 20 minutes since i wrote that description and it doesn't make sense anymore, how is me in 3 years supposed to understand this
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





