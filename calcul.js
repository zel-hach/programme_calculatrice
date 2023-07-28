let buffer = '0';
let runningTotal = 0;
let previousOperator = null;
function buttonClick(value) {
	if (isNaN(parseInt(value)))
		handelSymbol(value);
	else
		handelNumber(value);
	const val = document.querySelector(".screen");
	val.innerText = buffer;
}




function handelNumber(number) {
	if (buffer === '0')
		buffer = number;
	else
		buffer += number;
}

function handelMath(value) {

	if (buffer === '0')
		return;
	const intBuffer = parseInt(buffer);
	if (runningTotal === 0)
		runningTotal = intBuffer;
	else
		flushOperation(intBuffer);
	previousOperator = value;
	console.log(runningTotal)
	buffer = '0';
}
function flushOperation(intBuffer) {
	if (previousOperator === '+')
		runningTotal += intBuffer;
	else if (previousOperator === '-')
		runningTotal -= intBuffer;
	else if (previousOperator === '*')
		runningTotal *= intBuffer;
	else
		runningTotal /= intBuffer;
}
function handelSymbol(symbol) {
	switch (symbol) {
		case 'C':
			buffer = '0';
			break;
		case '=':
			if (previousOperator === null)
				return;
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		case '←':
			if (buffer.length === 1)
				buffer = '0';
			else
				buffer = buffer.substring(0, buffer.length - 1);
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			handelMath(symbol);
			break;
	}
}


function init() {
	document.querySelector(".calc-buttons")
		.addEventListener("click", function (event) {
			buttonClick(event.target.innerText);
		});
}

init();