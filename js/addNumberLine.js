function addNumberLine () {
    // Data
    var biggestNum = 10, smallestNum = -10;

    // Generate number line
    var numberLineDiv = document.querySelector('.lineContainer');

    // Draw lines
    for (var i = smallestNum; i <= biggestNum + 1; i++) {
        var innerDiv = document.createElement('div');
        innerDiv.className = i > biggestNum ? 'line lineRightEnd line-positive' : (i < 0 ? 'line line-negative' : (i > 0 ? 'line line-positive' : "line line-0"));
        numberLineDiv.appendChild(innerDiv);
    }

    // Draw numbers
    var numberDiv = document.createElement('div');
    numberDiv.className = 'numberContainer';
    numberLineDiv.appendChild(numberDiv);

    var numberDivCall = document.querySelector('.numberContainer');

    var leftDiv = document.createElement('div');
    leftDiv.className = 'numberLeftEnd';
    numberDivCall.appendChild(leftDiv);

    for (var i = smallestNum; i <= biggestNum; i++) {
        var innerDiv = document.createElement('div');
        innerDiv.className = 'number'; 
        innerDiv.id = 'num' + i;
        innerDiv.textContent = i;
        numberDivCall.appendChild(innerDiv);
    }
}

addNumberLine();