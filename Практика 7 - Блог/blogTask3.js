
function Blog(body, date, image) {
    if(!(this instanceof Blog)){return new Blog(body,date, image);} // if u r gonna forget new
    this.body = body;
    this.date = new Date(date);
    this.image = image || "";
}

var blog = [
    new Blog("Got the new book I ordered...", "2020.08.28", "backpack.jpg"),
    new Blog("It was a pretty sunny day...", "2020.08.14"),
    new Blog("And now we begin to learn again", "2020.09.01", "dog.jpg"), 
    new Blog("I got a new bicycle and look forward to ride", "2020.09.15")
];

window.onload = function()
{
    addBlogEntry("Test", "2024.11.30"); 

    console.log(blog[0]);
    console.log(blog);
    console.log(blog instanceof Blog);
    console.log(blog[0] instanceof Blog);
    console.log(blog.__proto__);

    document.getElementById('footerSign').innerHTML = `&copy; ${new Date().getFullYear()} Pozdysheva M.A.`;
}

Blog.prototype.containsText = function(searchText) 
{ 
    return this.body.toLowerCase().indexOf(searchText.toLowerCase()) !== -1; 
};

Blog.prototype.toHTML = function() 
{ 
    var day = this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate();
    var month = (this.date.getMonth()+1) <= 9 ? '0' + (this.date.getMonth()+1) : (this.date.getMonth()+1);
    var hasImageTag = "";
    var htmlText = ""; 

    if(this.image) hasImageTag = "<br/><img src='images/" + this.image + "' alt='" + this.image + "' width='200px' height='200px'/>";
    htmlText += "<strong>" + day + "." + month + "." + this.date.getFullYear() + "</strong><br/>" + this.body +
        "<br/><em>" + this.signature + "</em>" + hasImageTag + "</p>"; 
    return htmlText; 
};

Blog.prototype.toString = function() 
{ 
    var day = this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate();
    var month = (this.date.getMonth()+1) <= 9 ? '0' + (this.date.getMonth()+1) : (this.date.getMonth()+1);
    return `[${day}:${month}:${this.date.getFullYear()}] ${this.body} ${this.signature}`; 
};

Blog.prototype.signature = '- Written by the last survivor';

function showBlog(numEntries=blog.length) 
{
    var i = 0; 
    var blogText = "";
    sortBlogEntries();
    while (i < blog.length && i < numEntries) 
    {
        if(i % 2 === 0) blogText += "<p style='background-color:#EEEEEE'>"; 
        else blogText += "<p>";
        blogText += blog[i].toHTML();
        i++;
    }
    document.getElementById("blog").innerHTML = blogText;
}

function sortBlogEntries() 
{ 
    blog.sort((a, b) => b.date - a.date); 
}

function searchBlog() 
{ 
    var searchText = document.getElementById("searchtext").value.toLowerCase().trim();
    searchText = searchText.replace(/\s{2,}/g, ' ');
    var searchFailElement = document.getElementById("searchfail");  

    if(searchText.length < 3) 
    {
        searchFailElement.textContent = "Enter more than 2 symbols"; 
        return;
    }

    var foundElementsList = blog.filter(element => 
    {
        return element.containsText(searchText)
    });
    
    if(foundElementsList.length > 0) 
    {  
        alert(`Notes found:\n${foundElementsList.map(element => element.toString()).join('\n')}`);
        searchFailElement.textContent = "";  
    }
    else searchFailElement.textContent = "No matches."; 
}

function randomBlog() 
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
    showBlog(3); 
} 

// Blog.prototype.formatDate = function(separator='.') 
// {
//     if(isNaN(this.date)) 
//     {
//         return alert('Invalid date');
//     }
//     var day = this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate();
//     var month = (this.date.getMonth()+1) <= 9 ? '0' + (this.date.getMonth()+1) : (this.date.getMonth()+1);
//     return `${day}${separator}${month}${separator}${this.date.getFullYear()}`;
// }

// function showBlog(numEntries) {
//     if (!numEntries) {
//         numEntries = blog.length;
//     }
//     var i = 0, blogText = "";
//     while (i < blog.length && i < numEntries) 
//     {
//         blogText += blog[i].toHTML(i);
//         i++;
//     }
//     document.getElementById("blog").innerHTML = blogText;
// }

// function addBlogEntry(body, date, image) 
// { 
//     blog.push(new Blog(body, date, image)); 
//     sortBlogEntries(); 
//     showBlog(); 
// } 

// function sortBlogEntries() 
// { 
//     blog.sort((a, b) => b.date - a.date); 
// }

// function searchBlog() 
// { 
//     var searchText = document.getElementById("searchtext").value.toLowerCase(); 
//     var searchFailElement = document.getElementById("searchfail"); 
//     var foundElement = false; 
//     for (var i = 0; i < blog.length; i++) 
//     { 
//         // if (blog[i].body.toLowerCase().indexOf(searchText) !== -1 
//         // || formatDate(blog[i].date).indexOf(searchText) !== -1) 
//         // { 
//         //     alert(`Found: ${formatDate(blog[i].date)} - ${blog[i].body}`); 
//         //     foundElement = true; 
//         //     break; 
//         // } 
//         if (blog[i].containsText(searchText)) 
//         { 
//             alert(`Found note: ${blog[i].toString()}`); 
//             foundElement = true; 
//             break; 
//         }
//     } 
//     if (!foundElement) searchFailElement.textContent = "No matches."; 
//     else searchFailElement.textContent = "";  
// }

// function randomBlog() 
// { 
//     var randomIndex = Math.floor(Math.random() * blog.length); 
//     var randomEntry = blog[randomIndex]; 
//     var entryText = randomEntry.toString(); 
//     var newWindow = window.open("", "_blank", "width=400,height=400"); 
//     newWindow.document.write("<pre>" + entryText + "</pre>"); 
// }


// Blog.prototype.containsText = function(searchText) 
// { 
//     var lowerCaseSearchText = searchText.toLowerCase(); 
//     return this.body.toLowerCase().indexOf(lowerCaseSearchText) !== -1 
//         || this.formatDate().indexOf(lowerCaseSearchText) !== -1; 
// };

// Blog.prototype.toHTML = function(index) 
// { 
//     var hasImageTag = "";
//     var htmlText = "<p>"; 
//     if (index % 2 == 0) htmlText += "<p style='background-color:#EEEEEE'>"; 
//     else htmlText += "<p>"; 
//     if(this.image) hasImageTag = "<br/><img src='images/" + this.image + "' alt='" + this.image + "' width='200px' height='200px'/>";
//     htmlText += "<strong>" + this.formatDate() + "</strong><br/>" + this.body +
//         "<br/><em>" + this.signature + "</em>" + hasImageTag + "</p>"; 
//     return htmlText; 
// };

// Blog.prototype.toString = function() 
// { 
//     return `[${this.formatDate(':')}] ${this.body} ${this.signature}`; 
// };

// Blog.prototype.signature = '- Written by the last survivor';