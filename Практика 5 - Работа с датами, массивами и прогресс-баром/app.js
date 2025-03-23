/*
    Task 1
*/
const task5BeforeFilter = [38, 29, NaN, 0, 15, false, 78, 25, NaN, -14, '', undefined, 53, null, 34, null, 39];
const task5BeforeFilterStringify = task5StringifyArray(task5BeforeFilter);

window.onload=function()
{
    var date = new Date(2024,1,1);
    var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth()+1) <= 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    document.getElementById('task1').innerHTML = 
        `Today is ${day + "." + month + "." + date.getFullYear()}`;
    
    task3Function();

    
    var task5AfterFilter = task5FilterArray(task5BeforeFilter);
    document.getElementById('task5BeforeFilter').innerText = `Array before filter: ${JSON.stringify(task5BeforeFilterStringify)}`;
    document.getElementById('task5AfterFilter').innerText = `Array after filter: \n${JSON.stringify(task5AfterFilter)}`;

    task6TortureArray();

    document.getElementById('task7Grade').innerText = 'Enrollee';
    document.getElementById('task7Congrats').style.visibility = 'hidden'; 
}

/*
    Task 2
*/

function task2StartTimer() 
{
    var secondsInput = parseInt(document.getElementById('task2Seconds').value);
    
    if (isNaN(secondsInput)) 
    {
        alert('Incorrect input');
        return;
    }

    document.getElementById('task2Button').disabled = true;

    var timerInterval = setInterval(() => 
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
}

function task3Advanced()
{
    var userDate = new Date(document.getElementById('task3BirthdayAdvancedInput').value);
    if(userDate.getFullYear() >= 2025)
    {
        var year = (userDate.getMonth() >= 8 && userDate.getDate() > 15) ? userDate.getFullYear()+1 : userDate.getFullYear();
        console.log(userDate.getMonth());
        var dateMyBirthday = new Date(year, 8, 15);
        if(dateMyBirthday.getFullYear() === userDate.getFullYear() &&
            dateMyBirthday.getMonth() === userDate.getMonth() &&
            dateMyBirthday.getDate() === userDate.getDate()) document.getElementById("task3BirthdayAdvancedResult").innerHTML = 'Today is my birthday';
        else
        {
            var delta = dateMyBirthday - userDate;
            document.getElementById("task3BirthdayAdvancedResult").innerHTML = 
            `My next birthday ${dateMyBirthday.getDate() <= 9 ? '0' + dateMyBirthday.getDate() : dateMyBirthday.getDate()}.${(dateMyBirthday.getMonth() + 1) <= 9 ? '0' + (dateMyBirthday.getMonth() + 1) : (dateMyBirthday.getMonth() + 1)}.${dateMyBirthday.getFullYear()}, 
            it'll be in ${Math.ceil(delta/24/60/60/1000)} days`;
        }
    }
    else document.getElementById("task3BirthdayAdvancedResult").innerHTML = "Year must be more than 2024";
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

var task7ColorInterval;
const task7Grade = document.getElementById('task7Grade');
const task7Congrats = document.getElementById('task7Congrats');
function task7StartLearning() 
{
    var task7Progress = 0;
    var task7Interval;

    task7Congrats.style.visibility = 'hidden';
    document.getElementById('task7MaiBar').style.width = '0%';
    document.getElementById('task7StartLearning').disabled = true;

    task7Interval = setInterval(() => 
    {
        var increaseProgressBar = Math.min(10, 100 - task7Progress);
        task7Progress += increaseProgressBar;
        document.getElementById('task7MaiBar').style.width = task7Progress + '%';

        if (task7Progress < 25) task7Grade.innerText = '1st Grade';
        else if (task7Progress < 50) task7Grade.innerText = '2nd Grade';
        else if (task7Progress < 75) task7Grade.innerText = '3rd Grade';
        else if (task7Progress < 100) task7Grade.innerText = '4th Grade';
        else 
        {
            clearInterval(task7Interval);
            task7ChangeColor();
            task7Congrats.style.visibility = 'visible';
        }
    }, 500);
}

function task7ChangeColor()
{
    var changeColor = true;
    task7ColorInterval = setInterval(() =>
    {
        document.getElementById('task7Table').style.backgroundColor = 
                                                changeColor ? '#5c4537' : '#a1826e';
        changeColor = !changeColor;
    }, 1000);
}

function task7Graduate() {
    clearInterval(task7ColorInterval);
    // task7Congrats.style.visibility = 'hidden'; 
    // document.getElementById('task7StartLearning').disabled = false;
    // task7Grade.innerText = 'Enrollee';
    // document.getElementById('task7MaiBar').style.width = '0%';
    // document.getElementById('task7Table').style.backgroundColor = '#fae1c7';

}