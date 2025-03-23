const images = ['dog.jpg', 'farm.jpg', 'farmplots.jpg', 'gardenkit.jpg', 'goldenrod.jpg',
    'home.jpg', 'hugh.jpg', 'land.jpg', 'shop.jpg'
]
var selectedImage = "";

class Blog
{
    signature = '- Written by the last survivor';

    constructor(body, date, image)
    {
        this.body = body;
        this.date = new Date(date);
        this.image = image || "";
    }

    containsText(searchText)
    {
        return this.body.toLowerCase().indexOf(searchText.toLowerCase()) !== -1; 
    }

    toHTML(index)
    {
        var day = this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate();
        var month = (this.date.getMonth()+1) <= 9 ? '0' + (this.date.getMonth()+1) : (this.date.getMonth()+1);
        var backgroundOrBorder = "";
        var textColorGreen = "";
        var hasImageTag = this.image ?
            `<div class="col-md-4">
                <div class="note-image-container">
                    <img src="${this.image}" class="img-fluid rounded-start" alt="${this.image}">
            
                </div>
            </div>
            <div class="col-md-8">` 
            : "<div>";
        if(index % 2 == 0) backgroundOrBorder = "text-bg-success";
        else
        {
            backgroundOrBorder = "border-succes";
            textColorGreen = "text-success";
        }

        var htmlText = 
        `<div class="card mb-3 notes-main-div ${backgroundOrBorder}" >
            <div class="row g-0">
                ${hasImageTag}
                    <div class="card-body ${textColorGreen}">
                    <h5 class="card-title">${day}.${month}.${this.date.getFullYear()}</h5>
                    <p class="card-text">${this.body}</p>
                    <p class="card-text"><small>${this.signature}</small></p>
                    </div>
                </div>
            </div>
        </div>`;
        
        return htmlText;
    }

    toString()
    {
        var day = this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate();
        var month = (this.date.getMonth()+1) <= 9 ? '0' + (this.date.getMonth()+1) : (this.date.getMonth()+1);
        return `[${day}:${month}:${this.date.getFullYear()}] ${this.body} ${this.signature}`;     
    }
}

var blog =[
    new Blog('Проснулись в каком-то лесу без шмоток и памяти. Благо, рядом был рюкзак с провизией и какой-то книжкой.', '2034.05.24', 'backpack.jpg'),
    new Blog('Книжка вся помокла, буквы смазались, но прочитать удалось. Думаем отправиться в город.', '2034.05.29'),
    new Blog('Поели грибов, словили отравление. Потом прочитали, что всю пищу надо термически обрабатывать в чистой воде. Ползали в поисках золотарника.', '2034.05.27', 'goldenrod.jpg'),
    new Blog('Долго думали и решили, что будем изучать фермерство. Класс показался очень скучным и простым. Самое то для старта. Еще и вкусно поедим скоро.', '2034.06.01'),
    new Blog('Оказалось, что найти алоэ в городе - как искать снег в пустыне. Учимся быстро бегать с палкой и тряпками. Со всех сторон нас пытаются сделать обедом, а обещали наоборот.', '2034.06.15'),
    new Blog('Изучили заправку. Маленькая и холодная, подойдет для разового ночлега в обычную ночь. Решили не рисковать почками и спать на холодной сухой земле. Дождь не ожидается.', '2034.06.06'),
    new Blog('Стартовый город выглядит несуразно. Крепких зданий нет, почему-то 3 полицейских участка и 5 мастерских на 20 домов. Архитектор тоже память потерял? Что за планировка... Кто-то, кажется, хотел выкупить участок, но мы его опередили. Больше не придется таскать с собой все подряд.', '2034.06.08', 'land.jpg'),
    new Blog('Семена! Семена! У нас будет еда! Свежая! Настоящая! Через пару месяцев...', '2034.06.20'),
    new Blog('Отважились сходить в хозяйственный магазин. Радости не было предела - отличного качества лопата и мотыга. В несколько заходов собрали весь инвентарь. Теперь дела пойдут быстрее. Еще бы удобрений.', '2034.06.17', 'gardenkit.jpg'),
    new Blog('Целый день мотались по ближайшим поселениям в поисках супермаркетов. Никого не встретили, но кто-то съел все вкусняшки.', '2034.07.09', 'shop.jpg'),
    new Blog('Нашли торговца. Суровый дядька. Сначала не поверил, что это люди, потом предложил подзаработать. Странные задания и награды странные. И на ночь не пускает. Но костер теплый, хорошо у него.', '2034.06.29')
]

window.onload = function()
{
    document.getElementById('alertSearch').style.display = 'none';
    document.getElementById('footerSign').innerHTML = `&copy; ${new Date().getFullYear()} Pozdysheva M.A.`;
    sortBlogEntries();
    showBlog(5);
}

function showBlog(numEntries=blog.length) 
{
    var i = 0; 
    var blogText = "";
    while (i < blog.length && i < numEntries) 
    {
        blogText += blog[i].toHTML(i);
        i++;
    }
    document.getElementById('notesList').innerHTML = blogText;
}

function sortBlogEntries() 
{ 
    blog.sort((a, b) => b.date - a.date); 
}

function searchBlog() 
{ 
    var searchInputClass = document.getElementById('searchInput');
    var searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    searchInput = searchInput.replace(/\s{2,}/g, ' ');
    searchInputClass.classList.remove('is-invalid');
    var searchFailElement = document.getElementById('alertSearch');  
    searchFailElement.style.display = 'none';

    if(searchInput.length < 3) 
    {
        searchInputClass.classList.add('is-invalid');
        searchFailElement.style.display = 'block';
        searchFailElement.textContent = 'Enter more than 2 symbols'; 
        return;
    }

    var foundElementsList = blog.filter(element => 
    {
        return element.containsText(searchInput)
    });
    
    if(foundElementsList.length > 0) 
    {  
        alert(`Notes found:\n${foundElementsList.map(element => element.toString()).join('\n')}`);
        searchFailElement.textContent = "";  
    }
    else 
    {
        searchFailElement.textContent = 'No matches.'; 
        searchInputClass.classList.add('is-invalid');
        searchFailElement.style.display = 'block';
    }
}

function randomNote() 
{ 
    var randomIndex = Math.floor(Math.random() * blog.length); 
    var randomEntry = blog[randomIndex]; 
    var entryText = randomEntry.toString(); 
    alert(`Random note:\n${entryText}`);
}

function addBlogEntry(body, date, image) 
{ 
    blog.push(new Blog(body, date, image)); 
    sortBlogEntries(); 
    showBlog(5); 
} 

function showImagesChBox(checkboxImages)
{
    var imagesContainer = document.getElementById('imageContainer');
    imagesContainer.style.display = 'block';
    var imagesList = "";
    if(checkboxImages.checked)
    {
        for(var i=0; i < images.length; i++)
        {
            imagesList += `<img src="${images[i]}" alt="element" id="${images[i]}" class="image-check-margin" width="20%" height="20%" onclick="selectImage(this.id)">`
        }
    }
    else imagesContainer.style.display = 'none';
    imagesContainer.innerHTML = imagesList;
}

function selectImage(image)
{
    selectedImage = image;
}

function addNote()
{
    var newNoteText = document.getElementById('newNoteText');
    var newNoteDateHtml = document.getElementById('newNoteDate');
    var newNoteDate = new Date(newNoteDateHtml.value);
    newNoteText.classList.remove('is-invalid');
    newNoteDateHtml.classList.remove('is-invalid');
    if(!newNoteDateHtml.value)
    {
        newNoteDateHtml.classList.add('is-invalid');
        alert('Empty date');
        return;
    }
    if((newNoteDate.getDate() < 24 && newNoteDate.getMonth() < 5) || 
        newNoteDate.getFullYear() < 2034)
    {
        newNoteDateHtml.classList.add('is-invalid');
        alert('U woke up on May 24th, 2034. Cannot enter earlier date');
        return;
    }
    if(!newNoteText.value.trim() || newNoteText.value.length <3 )
    {
        newNoteText.classList.add('is-invalid');
        alert('Enter more than 2 symbols');
        return;
    }
    addBlogEntry(newNoteText.value.trim(), newNoteDate, selectedImage);
    selectedImage="";
    var imagesContainer = document.getElementById('imageContainer');
    imagesContainer.style.display = 'none';
    document.getElementById('checkboxImages').checked = false;
    newNoteText.value = "";
    newNoteDateHtml.value = "";
}