/*
    Task 1
*/
const task5BeforeFilter = [38, 29, NaN, 0, 15, false, 78, 25, NaN, -14, '', undefined, 53, null, 34, null, 39];
const task5BeforeFilterStringify = task5StringifyArray(task5BeforeFilter);

window.onload=function()
{
    var date = new Date();
    var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth()+1) <= 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    document.getElementById('task1').innerHTML = 
        `Today is ${day + "." + month + "." + date.getFullYear()}`;
    
    task3Function();

    
    var task5AfterFilter = task5FilterArray(task5BeforeFilter);
    document.getElementById('task5BeforeFilter').innerText = `Array before filter: ${JSON.stringify(task5BeforeFilterStringify)}`;
    document.getElementById('task5AfterFilter').innerText = `Array after filter: \n${JSON.stringify(task5AfterFilter)}`;

    task6TortureArray();
}

/*
    Task 2
*/

var timerInterval;

function task2StartTimer() 
{
    var secondsInput = parseInt(document.getElementById('task2Seconds').value);
    
    if (isNaN(secondsInput)) {
        alert('Incorrect input');
        return;
    }

    document.getElementById('task2Button').disabled = true;

    timerInterval = setInterval(() => 
        {
            if (secondsInput <= 0) 
            {
                clearInterval(timerInterval);
                alert('Time\'s up');
                document.getElementById('task2Button').disabled = false;
                document.getElementById('task2Seconds').value = "";
                return;
            }

            secondsInput--;
            document.getElementById('task2Timer').textContent = formatTime(secondsInput);
        }, 1000); // 1000 ms = 1 s
}

function formatTime(secondsInput) 
{
    var hours = Math.floor(secondsInput / 3600);
    var minutes = Math.floor((secondsInput % 3600) / 60);
    var seconds = secondsInput % 60;

    return `${checkZero(hours)}:${checkZero(minutes)}:${checkZero(seconds)}`;
}

function checkZero(num) 
{
    return num < 10 ? '0' + num : num;
}

/*
    Task 3
*/

function task3Function()
{
    var date = new Date();
    var dateMyBirthday = new Date(2025, 8, 15);
    var delta = dateMyBirthday - date;
    console.log(delta);
    document.getElementById("task3Birthday").innerHTML = 
        `My next birthday 15.09.2025, it'll be in ${Math.ceil(delta/24/60/60/1000)} days`;
    //setTimeout( 'window.location.reload();', 10000 );
}

/*
    Task 4
*/

var task4Array = [];
var task4UserElement = document.getElementById("task4ArrayElements");
var task4ShowArray = document.getElementById("task4Array");

function task4Add()
{
    var newElement = task4UserElement.value.trim(); 
    if (newElement) 
    { 
        task4Array.push(newElement); 
        task4UserElement.value = ''; 
    }
}

function task4Show()
{
    task4ShowArray.innerHTML = ''; 
    task4Array.forEach((item, index) => 
    {
        task4ShowArray.innerHTML += `Element ${index} = [${item}]<br>`;
    });
}

/*
    Task 5
*/

function task5FilterArray(arr) 
{
    return arr.filter(item => 
        // item !== null && 
        // item !== 0 && 
        // item !== '' && 
        // item !== false && 
        // item !== undefined && 
        // !Number.isNaN(item) &&
        // item !== NaN
        item // wth
    );
}

function task5StringifyArray(arr) 
{
    return arr.map(item => 
    {
        if (Number.isNaN(item)) return 'NaN';
        if (item === undefined) return 'undefined';
        return item;
    });
}


/*
    Task 6
*/

function task6TortureArray()
{
    var beforeTortureArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 20) + 1);
    document.getElementById("task6BeforeTortureArray").innerText = 
        `Before torture:\n${JSON.stringify(beforeTortureArray)}`;

    var halfArray = beforeTortureArray.map(element => element / 2);

    var dividedArray = halfArray.filter(element => element % 3 === 1);
    document.getElementById("task6Divided").innerText = 
        `Divide into 3 with residue 1:\n${JSON.stringify(dividedArray)}`;


    var multiplicatedArray = beforeTortureArray.reduce((accumulator, currentValue) => accumulator * currentValue, 1); // initial value = 1
    document.getElementById("task6MultiplicatedArray").innerText = 
        `Multiplicate all array's elements:\n${JSON.stringify(multiplicatedArray)}`;
}

/*
    Task 7
*/

var task7Progress = 0;
var task7Interval;
var task7ColorInterval;
const task7Grade = document.getElementById('task7Grade');

function task7StartLearning() {
    task7Progress = 0;
    document.getElementById('task7MaiBar').style.width = '0%';
    document.getElementById('task7Grade').innerText = 'Enrollee';

    task7Interval = setInterval(() => {
        var increaseProgressBar = Math.min(10, 100 - task7Progress);
        task7Progress += increaseProgressBar;
        document.getElementById('task7MaiBar').style.width = task7Progress + '%';

        if (task7Progress < 25) task7Grade.innerText += '1st Grade';
        else if (task7Progress < 50) task7Grade.innerText += '2nd Grade';
        else if (task7Progress < 75) task7Grade.innerText += '3rd Grade';
        else if (task7Progress < 100) task7Grade.innerText += '4th Grade';
        else 
        {
            clearInterval(interval);
            startColorChange();
            document.getElementById('finishButton').style.display = 'block'; // Показываем кнопку завершения
        }
    }, 500);
}

function startColorChange() {
    const colorTable = document.getElementById('colorTable');
    let toggle = true;

    colorInterval = setInterval(() => {
        colorTable.style.backgroundColor = toggle ? '#ffcccc' : '#ccffcc'; // Переключаем цвета
        toggle = !toggle;
    }, 1000); // Каждую секунду
}

function stopColorChange() {
    clearInterval(colorInterval);
    document.getElementById('finishButton').style.display = 'none'; // Скрываем кнопку завершения
}