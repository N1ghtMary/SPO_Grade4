const surname = 'Поздышева'; // 13 68 
const paragraph = document.getElementById('task21Paragraph').innerHTML;
const someSentences = document.getElementById('task23SomeSentences').innerHTML;

window.onload = function()
{
    document.getElementById('task21CountLetters').style.display = 'none';
    document.getElementById('task22CountWords').style.display = 'none';

}

/*
    Task 2 - 1 
*/

function task21CountLetters()
{
    var firstLetter = surname.charAt(0).toLowerCase(); 
    var secondLetter = surname.charAt(1).toLowerCase();
    var countCaseInsensitiveFirstLetter = 0;
    var countCaseInsensitiveSecondLetter = 0;
    var countCaseSensitiveFirstLetter = 0;
    var countCaseSensitiveSecondLetter = 0;
    
    var indexLetter = paragraph.indexOf(firstLetter);
    while (indexLetter !== -1) 
    {
        countCaseInsensitiveFirstLetter++;
        indexLetter = paragraph.indexOf(firstLetter, indexLetter + 1);
    }
    indexLetter = paragraph.indexOf(secondLetter);
    while (indexLetter !== -1) 
    {
        countCaseInsensitiveSecondLetter++;
        indexLetter = paragraph.indexOf(secondLetter, indexLetter + 1);
    }

    firstLetter = firstLetter.toUpperCase();
    secondLetter = secondLetter.toUpperCase();
    for (var i = 0; i < paragraph.length; i++) 
    {
        if (paragraph.charAt(i) == firstLetter) countCaseSensitiveFirstLetter++;
    }
    countCaseSensitiveSecondLetter = paragraph.split(secondLetter).length - 1;

    document.getElementById('task21CountLetters').style.display = 'block';
    document.getElementById('task21CountLetters').innerText = 
            `'п': ${countCaseInsensitiveFirstLetter}
             'о': ${countCaseInsensitiveSecondLetter}
             'П': ${countCaseSensitiveFirstLetter}
             'О': ${countCaseSensitiveSecondLetter}`;
}

/*
    Task 2 - 2
*/

function task22CountWords()
{
    var wordsArray = paragraph.trim().split(/\s+/);

    document.getElementById('task22CountWords').style.display = 'block';
    document.getElementById('task22CountWords').innerHTML = `Amount of words: ${wordsArray.length}`;
}

/*
    Task 2 - 3 - 1
*/

function task231EvenOddReverse()
{
    var wordsArray = someSentences.trim().split(/\s+/);
    
    var reversedWords = wordsArray.map((word, index) => {
        return (index % 2 === 0) ? word.toUpperCase() : word.toLowerCase();
    });

    document.getElementById('task23SomeSentences').innerText = reversedWords.join(' ');
}

/*
    Task 2 - 3 - 2
*/

function task232RemoveFourthLetter()
{
    var regexpFourthLetter = new RegExp(surname.charAt(3).toLowerCase(), 'gi');
    var modifiedSomeSentences = someSentences.replace(regexpFourthLetter, '');
    document.getElementById('task23SomeSentences').innerHTML = modifiedSomeSentences;
}

/*
    Task 2 - 4
*/

function task24StandardFileType()
{
    var fileName = document.getElementById('task24StandardFileType').value;
    var messageResult = document.getElementById('task24StandardFileTypeResult');
    var standardFileTypePattern = /^(?!.*\..*\..*$)[\w\-. ]+\.(doc|xls|ppt)$/i;

    if (standardFileTypePattern.test(fileName)) 
    {
        messageResult.textContent = "File name with extension correct";
        messageResult.className = "alert alert-success task14Error";
    } 
    else 
    {
        messageResult.textContent = "File name with extension incorrect";
        messageResult.className = "alert alert-danger task14Error";
    }
}