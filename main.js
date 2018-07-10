function setNumberOfTransmitters() {
    let parent = document.getElementById("parentElement");
    let value = document.getElementById("numberOfTransmitters").value;
    console.log(value);

    for (let i = 1; i <= value; i++) {
        let div = document.createElement("div");
        let label = document.createElement("label");
        let inputX = document.createElement("input");
        let inputY = document.createElement("input");
        let inputPower = document.createElement("input");
        
        label.setAttribute("id","lbl"+i);
        inputX.setAttribute("id","inputX"+i);
        inputY.setAttribute("id","inputY"+i);
        inputPower.setAttribute("id","inputPower"+i);

        inputX.setAttribute("class","inputX");
        inputY.setAttribute("class","inputY");
        inputPower.setAttribute("class","inputPower");

        label.innerText = "Transmitter no.: " + i;
        inputX.setAttribute("placeholder", "x");
        inputY.setAttribute("placeholder", "y");
        inputPower.setAttribute("placeholder", "power");

        inputX.setAttribute("type", "number");
        inputY.setAttribute("type", "number");
        inputPower.setAttribute("type", "number");
        
        parent.appendChild(div);
        div.appendChild(label);
        div.appendChild(inputX);
        div.appendChild(inputY);
        div.appendChild(inputPower);
    }
}

function getDataFromInputs() {
    let inputLen = document.getElementsByClassName("inputX").length;
    let inputsX = document.getElementsByClassName("inputX");
    let inputsY = document.getElementsByClassName("inputY");
    let inputsP = document.getElementsByClassName("inputPower");
    for(let i = 0; i < inputLen; i++) {
        let circle = {}
        console.log(inputsX[i].value);
    }   
}

    // point x, point y, transmitter x, transmitter y, transmitter power
function checkIfPointIsInside(px, py, tx, ty, tp){
    // checks if given point lies within givn circle.
    let y = Math.sqrt(Math.pow(py - ty));
    let x = Math.sqrt(Math.pow(px - tx));
    let p = Math.sqrt(Math.pow(x + y));
    if (p <= tp){
        return true;
    }
}
    // circles
function giveGreenLight(c1, c2) {
    // checks if the two circles intersect and then sets the other one as the one as good to go.
    let x = Math.sqrt(Math.pow(c1.x - c2.x));
    let y = Math.sqrt(Math.pow(c1.y - c2.y));
    let p = Math.sqrt(Math.pow(x + y));
    let cp = c1.p + c2.p;
    if (p <= cp) {
        c1.greenLight = true;
        c2.greenLight = true;
    }
}


