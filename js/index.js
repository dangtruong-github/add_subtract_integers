function resetNumberLine () {
    // Change number
    var numberDivCall = document.querySelector('.numberContainer');

    var leftDiv = document.createElement('div');
    leftDiv.className = 'numberLeftEnd';
    numberDivCall.appendChild(leftDiv);

    for (var i = -10; i <= 10; i++) {
        var id = "num" + i;
        var innerDiv = document.getElementById(id);
        innerDiv.classList.remove('active');
        innerDiv.classList.remove('active-first');
    }
}

function resetSteps () {
    // delete image
    var containerDiv = document.getElementById('step-1-wrap');
    var imgElements = containerDiv.getElementsByTagName('img');

    // Loop through all img elements and remove them
    while (imgElements.length > 0) {
        imgElements[0].parentNode.removeChild(imgElements[0]);
    }

    // blank all p
    document.getElementById("step-1-message").innerHTML = "";
    document.getElementById("step-1-expression").innerHTML = "";
    document.getElementById("step-2").innerHTML = "";
    document.getElementById("step-3").innerHTML = "";
    document.getElementById("step-final").innerHTML = "";
}

function finalStep (result, numeroDos, sign) {
    // Final: Conclude the result
    var message = `Như vậy, kết quả của phép tính là: ${result}`;
    document.getElementById("step-final").innerHTML = message;

    // expression    
    var numeroUno = sign == "plus" ? result - numeroDos : result + numeroDos;
    var signToString = sign == "plus" ? "+" : "-";

    expression = numeroUno + " " + signToString + " ";
    expression += numeroDos < 0 ? "(" + numeroDos + ")" : numeroDos;
    expression += " = " + result;
    document.getElementById("expression").innerHTML = expression;
}

function dynamicNumberLine (current, limit, numeroDos, sign) {
    var innerDiv = document.getElementById("num" + current);    

    if (current == limit) {
        innerDiv.classList.add('active');
        setTimeout(finalStep, 1000, limit, numeroDos, sign);
    } else {
        var newVal = current < limit ? current + 1 : current - 1;
        function removeClass (divVar) {
            divVar.classList.remove('active');
            dynamicNumberLine(newVal, limit, numeroDos, sign);
        }

        innerDiv.classList.add('active');
        setTimeout(removeClass, 1000, innerDiv);
    }
}

function thirdStep (numeroUno, numeroDos, sign) {
    // Step 3: Move the number to the desire direction (left for minus, right for plus)
    var result = sign == "plus" ?  numeroUno + numeroDos : numeroUno - numeroDos;
    var message = `Bước 3: Dịch chuyển ${Math.abs(numeroDos)} lần về phía bên ${numeroDos < 0 ? "trái" : "phải"}. Ta được số ${result}`;
    if (Math.abs(numeroDos) == 0) {
        message = `Bước 3: Vì ${sign == "plus" ? "cộng" : "trừ"} 0 nên không cần phải dịch chuyển`;
    }
    document.getElementById("step-3").innerHTML = message;
    
    dynamicNumberLine(current=numeroUno, limit=result, numeroDos=numeroDos, sign=sign);
}

function secondStep (numeroUno, numeroDos, sign) {
    // Step 2: Put the first number (numeroUno) into the number line
    var message = `Bước 2: Đặt số thứ nhất trong phép tính vào trục số. Ở đây, ta đặt số ${numeroUno}`;
    document.getElementById("step-2").innerHTML = message;
    
    // Set the number to active
    var innerDiv = document.getElementById("num" + numeroUno); 
    innerDiv.classList.add('active-first');
    
    setTimeout(thirdStep, 1000, numeroUno, numeroDos, sign);
}

function firstStep (numeroUno, numeroDos, sign) {
    // Step 1: If the second number is negative, change it (+- => -+ & -- => ++)
    
    var numeroDosNueva = numeroDos;
    var message = "Bước 1: ";
    var signToString = sign == "plus" ? "+" : "-";
    if (numeroDos < 0) {
        numeroDosNueva = numeroDos * (-1); 

        var step1Wrap = document.querySelector('#step-1-wrap');
        var img = document.createElement('img');
        img.src = `./img/Rule_${sign == "plus" ? 1 : 2}.png`;
        img.width = 300;
        img.height = 64;
        step1Wrap.appendChild(img);

        signToString = sign == "plus" ? "-" : "+";
        var expression = numeroUno + " " + signToString + " " + numeroDosNueva + " = ?";

        message = `Bước 1: Áp dụng luật thứ ${sign == "plus" ? 1 : 2}:`;
        document.getElementById("step-1-message").innerHTML = message;
        document.getElementById("step-1-expression").innerHTML = `Phép tính được chuyển thành: ${expression}`;
    } else {
        var expression = numeroUno + " " + signToString + " " + numeroDos + " = ?";
        message = `Bước 1: Vì số thứ hai trong phép tính là số dương, nên ta giữ nguyên phép tính:`;
        document.getElementById("step-1-message").innerHTML = message;
        document.getElementById("step-1-expression").innerHTML = expression;
    }
    

    setTimeout(secondStep, 1000, numeroUno, numeroDos, sign);
}

function calculate (event) {
    event.preventDefault();
    
    resetNumberLine();
    resetSteps();

    // Access form elements by their IDs
    const numeroUno = parseInt(document.getElementById('numero-uno').value);
    const numeroDos = parseInt(document.getElementById('numero-dos').value);
    const sign = document.getElementById('sign').value;

    const result = sign == "plus" ?  numeroUno + numeroDos : numeroUno - numeroDos;

    var signToString = sign == "plus" ? "+" : "-";

    // Calculation steps by steps for students
    // Show the calculation
    var expression = numeroUno + " " + signToString + " ";
    expression += numeroDos < 0 ? "(" + numeroDos + ")" : numeroDos;
    expression += " = ?";
    document.getElementById("expression").innerHTML = expression;

    // First step
    setTimeout(firstStep, 1000, numeroUno, numeroDos, sign);

    // Perform any processing or validation here
    // For simplicity, just displaying an alert with the entered data
    document.getElementById("result-box").innerHTML = result;
}