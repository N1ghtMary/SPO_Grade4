/*
    Task 1
*/

const TASK_1_ORIGIN = 'Hey';
const TASK_1_CHANGE = 'Bye';

function task1Change()
{
    var textElement = document.getElementById('task1');
    textElement.innerHTML = textElement.innerHTML.replace(TASK_1_ORIGIN, TASK_1_CHANGE);
}

function task1Origin()
{
    var textElement = document.getElementById('task1');
    textElement.innerHTML = textElement.innerHTML.replace(TASK_1_CHANGE, TASK_1_ORIGIN);
}

/*
    Task 2
*/

const BIRTHDAY = new Date('2001-09-15T22:15:00');

function task2Birthday()
{
    var options = 
    {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    };
    var dateBirthday = BIRTHDAY.toLocaleDateString('ru-RU', options);
    //var timeBirthday = BIRTHDAY.toLocaleTimeString();
    var timeZone = - new Date().getTimezoneOffset() / 60;
    var data = `${dateBirthday} (UTC${timeZone >= 0 ? '+' : ''}${timeZone})`;
    document.getElementById('task2').innerHTML = data;
}

/*
    Task 3
*/

function task3Divider()
{
    var num1 = parseFloat(document.getElementById('task3Number1').value);
    var num2 = parseFloat(document.getElementById('task3Number2').value);
    if (isNaN(num1) || isNaN(num2)) 
    {
        alert('We need both of you');
        return;
    }
    if (num2 === 0) 
    {
        alert('DivideZeroException');
        return;
    }
    var divisionResult = num1 / num2;
    alert("Divivsion result: " + divisionResult);
}

/*
    Task 4
*/

function task4ChangeNumber()
{
    var userNumber = prompt('Введите число:');
    var parsedNumber = parseFloat(userNumber);
    if (isNaN(parsedNumber)) 
    {
        alert('Incorrect number');
        return;
    }
    var result = (9 / 14) * parsedNumber;
    alert(`9/14 from ${parsedNumber} number: ${result}`);
}

/*
    Task 5
*/

function ctg(expression)
{
    return Math.cos(expression) / Math.sin(expression);
}

function task5Math()
{
    var userX = parseFloat(document.getElementById('task5NumberX').value);
    if(isNaN(userX)) 
    {
        alert('Wrong number');
        return;
    }
    var mathExpressionResult = (Math.tan(-6*Math.PI - 5*userX) * Math.cos(( (5 * Math.PI) / 4) + 8 * userX))
                                /(Math.sin(Math.PI + 8 * userX) * ctg( ((7 * Math.PI) / 3) + userX)) - 12 * userX;
    alert(`Result: ${mathExpressionResult}`);
}