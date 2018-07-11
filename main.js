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
    // basically main function
    //
    let inputLen = document.getElementsByClassName("inputX").length;
    let inputsX = document.getElementsByClassName("inputX");
    let inputsY = document.getElementsByClassName("inputY");
    let inputsP = document.getElementsByClassName("inputPower");

    let bx = document.getElementById("inputBX").value;
    let by = document.getElementById("inputBY").value;
    let ex = document.getElementById("inputEX").value;
    let ey = document.getElementById("inputEY").value;

    let circles = [];
    let greenCircles = [];
    let redCircles = [];

    

    // create an array of circles.
    for(let i = 0; i < inputLen; i++) {
        let circle = { x: inputsX[i].value, y: inputsY[i].value, power: inputsP[i].value, greenLight: false };
        
        // check in which circle/s beginning point is. then give them greenLight
        circle.greenLight = checkIfPointIsInside(bx, by, circle);
        if(circle.greenLight) {
            greenCircles.push(circle);
        } else {
            redCircles.push(circle);
        }
        circles.push(circle);
    }   
    console.log("circles: ",circles,"green circles: ",greenCircles, "red circles: ",redCircles);

    for(let i = 0; i < greenCircles.length; i++) {
        if(redCircles.length > 1){
            for(let j = 0; j < redCircles.length; j++) {
                if(checkIfCirclesIntersect(greenCircles[i],redCircles[j])){
                  greenCircles.push(redCircles[j]);
                  redCircles.splice(j,1);
                  console.log("greens: ", greenCircles[i], "reds: ", redCircles[j])
                } else {
                    console.log("false");
                }
                console.log("hey: ", greenCircles[i], redCircles[j], checkIfCirclesIntersect(greenCircles[i],redCircles[j]))
            }
        }
    }

    console.log("circles: ",circles,"green circles: ",greenCircles, "red circles: ",redCircles);
    for(let i = 0; i < greenCircles.length; i++) {
        if(checkIfPointIsInside(ex,ey,greenCircles[i])){
            console.log("wygranko");
            let forTheWin = document.createElement("label");
            forTheWin.innerText = "bezpieczny przelot jest możliwy"
            return
        }
    }
    let forTheWin = document.createElement("label");
    forTheWin.innerText = "bezpieczny przelot nie jest możliwy"
    console.log(circles);
}

    // point x, point y, circle 
function checkIfPointIsInside(px, py, c){
    // checks if given point lies within given circle.
    let y = Math.abs(py - c.y);
    let x = Math.abs(px - c.x);
    let p = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    if(isNaN(p)) {
        p = 0;
    }
    console.log(x, y, p);
    if (p <= c.power){
        return true;
    } else {
        return false;
    }
}
    // circles
function checkIfCirclesIntersect(c1, c2) {
    // checks if the two circles intersect and then sets the other one as the one as good to go.
    let x = Math.abs(c1.x - c2.x);
    let y = Math.abs(c1.y - c2.y);
    let p = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)); // returns NaN instead of x
    let cp = parseInt(c1.power) + parseInt(c2.power);
    if(isNaN(p)) {
        p = 0;
    }
    console.log("intersecting: ",x,y,p,cp);
    if (p <= cp) {
        return true;
    } else {
        return false;
    }
}

function giveGreenLight(c1) {
    c1.greenLight = true;
}
