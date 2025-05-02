//Startup Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");
});

//Running the code
function run(){
    let htmlCode = document.getElementById("htmlcode").value;
    let CSSCode = document.getElementById("csscode").value;
    let JSCode = document.getElementById("jscode").value;
    let OutPut = document.getElementById("output");

    OutPut.contentDocument.body.innerHTML = htmlCode + "<style>" + CSSCode + "</style>";
    OutPut.contentWindow.eval(JSCode);
}

