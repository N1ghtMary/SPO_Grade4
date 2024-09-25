/*
    Task 1
*/

function task1Move(o)
{
    var parent = o.parentNode;
    parent.removeChild(o);
    parent.insertBefore(o, parent.firstChild);
}   

function task1AddElement()
{
    var newElementText = prompt('Enter text for the new element:');
    if (newElementText) 
    {
        var newElement = document.createElement('li');
        newElement.innerText = newElementText;
        newElement.onclick = function() 
        { 
            task1Move(this); 
        };
        document.getElementById('task1__elements-list').appendChild(newElement);

    }
}

function task1RemoveElement()
{
    var elementsList = document.getElementById('task1__elements-list');
    if (elementsList.lastElementChild) elementsList.removeChild(elementsList.lastElementChild);
    else alert('No elemens');
}

/*
    Task 2
*/

let browserName = 'Unknown';
if (navigator.userAgent.indexOf('YaBrowser') > -1) browserName = 'Yandex';
else if (navigator.userAgent.indexOf('Firefox') > -1) browserName = 'Mozilla Firefox';
else if (navigator.userAgent.indexOf('SamsungBrowser') > -1) browserName = 'Samsung Internet';
else if (navigator.userAgent.indexOf('Opera') > -1 || navigator.userAgent.indexOf("OPR") > -1) browserName = 'Opera';
else if (navigator.userAgent.indexOf('Edge') > -1) browserName = 'Microsoft Edge';
else if (navigator.userAgent.indexOf('Chrome') > -1) browserName =' Google Chrome';
else if (navigator.userAgent.indexOf('Safari') > -1) browserName = 'Safari';
document.getElementById('task2__os-info').innerText = window.navigator.userAgentData.platform;
document.getElementById('task2__browser-info').innerText = browserName;
document.getElementById('task2__screen-width').innerText = window.screen.width;
document.getElementById('task2__screen-height').innerText = window.screen.height;
document.getElementById('task2__inner-width').innerText = window.innerWidth;
document.getElementById('task2__inner-height').innerText = window.innerHeight;

function task2ReduceButton(button)
{
    if (button.offsetWidth < 100) 
    {
        alert('Всё! Пикселей больше нет, но вы держитесь!');
        button.disabled = true; 
    }
    else
    {
        button.style.width = (button.offsetWidth - 22) + 'px';
    }
}

function task2LittleRedButton()
{
    var prettierText = document.getElementById('task2__text');
    prettierText.style.color = 'darkred';
    prettierText.style.fontSize = '12pt';
}

function task2BigBrownButton()
{
    var prettierText = document.getElementById('task2__text');
    prettierText.style.color = 'brown';
    prettierText.style.fontSize = '30pt';
}

/*
    Task 3
*/

function task3InsertRow()
{
    var table = document.getElementById('task3__sample-table');
    var amountOfRows = table.rows.length;
    var newRow = table.insertRow(amountOfRows); 
            
    var cellPartOfSurname = newRow.insertCell(0);
    var cellRowNumber = newRow.insertCell(1);
    cellPartOfSurname.innerHTML = 'Pozd';
    cellRowNumber.innerHTML = amountOfRows + 1;
}

/*
    Task 4
*/

function task4GetAttributes()
{
    var link = document.getElementById('task4__example');
    alert(`Link's attributes:\n` +
        `href: ${link.getAttribute('href')}\n` +
        `hreflang: ${link.getAttribute('hreflang')}\n` +
        `rel: ${link.getAttribute('rel')}\n` +
        `target: ${link.getAttribute('target')}\n` +
        `type: ${link.getAttribute('type')}`);
}

/*
    Task 5
*/

function task5CreateTable()
{
    var div = document.getElementById('task5__data-table');
    if (div.querySelector('table')) //  получает первый элемент, соответствующий заданному CSS-селектору
    {
        alert('The surname table exists');
        return;
    }
    var table = document.createElement('table');
    const surnamePiece = 'Позды'; 
    for (let i = 0; i < 3; i++) {
        var row = document.createElement('tr');      
        for (let j = 0; j < 5; j++) {
            var cell = document.createElement('td');
            var surnameLetters = document.createTextNode(surnamePiece[j]);
            cell.appendChild(surnameLetters);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    div.appendChild(table);
}

/*
    Task 6
*/

function task6GetLinkInfo()
{
    var linksDocument = document.links;
    var linksCount = linksDocument.length;
    const firstLink = linksDocument[0] 
                        ? linksDocument[0].href 
                        : 'No links in this page';
    const lastLink = linksDocument[linksCount - 1] 
                        ? linksDocument[linksCount - 1].href 
                        : 'No links in this page';
    alert(`Amount of the links: ${linksCount}\n`+
            `First link: ${firstLink}\n`+
            `Last link: ${lastLink}`);
}