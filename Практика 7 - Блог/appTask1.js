var fabricNamesList = [];
var fabricList = [];
const fabricResult = document.getElementById('task15SearchFabricResult');

window.onload = function()
{
    document.getElementById('task11ObjectCommonFabric').innerHTML =
    `<div class="card change-bg mb-3">
        <div class="card-header change-bg-header">Commonfabric:</div>
        <div class="card-body">
            <p class="card-text">Manufacturer Country: ${commonfabric.manufacturerCountry}</p>
            <p class="card-text">Type: ${commonfabric.type}</p>
            <p class="card-text">Density: ${commonfabric.density}</p>
            <p class="card-text">Width: ${commonfabric.width}</p>
            <p class="card-text">Usage: ${commonfabric.usage}</p>
        </div>
    </div>`;

    fabricNamesList.forEach(element => {
        document.getElementById('task14ChildrenName').innerHTML
            +=`<p class="card-text">${element.species}</p>`   
    });
    
    fabricResult.style.visibility='hidden';
}

/*
    Task 1 - 1
*/

var commonfabric =
{
    manufacturerCountry: 'China', 
    type: 'Cotton', 
    density: 120,
    width: 145, 
    usage: 'Home textiles',

    /*
        Task 1 - 3
    */

    getCollectionAge: function() 
    {
        var currentYear = new Date().getFullYear();
        return (currentYear - this.collectionYear) > 0 ? (currentYear - this.collectionYear)
                : 'less than 1';
    },

    getInfo: function() {
        return "Fabric type " + this.type + 
                ", its species " + this.species + 
                " with width " + this.width + 
                ". Made in " + this.manufacturerCountry 
                + " and used in " + this.usage;
    }
};

/*
    Task 1 - 2
*/

var fabric01 = Object.create(commonfabric);
fabric01.collectionYear = 2009;
fabric01.species = 'Cambric';
fabric01.color = 'Cool grey';
fabric01.pattern = 'Geometry';
fabricNamesList.push(fabric01);

var fabric02 = Object.create(commonfabric);
fabric02.collectionYear = 2015;
fabric02.species = 'Flannel';
fabric02.color = 'Pumkin';
fabric02.pattern = 'Square';
fabricNamesList.push(fabric02);

var fabric03 = Object.create(commonfabric);
fabric03.collectionYear = 2022;
fabric03.species = 'Foule';
fabric03.color = 'Canyon';
fabric03.pattern = 'Boil effect';
fabricNamesList.push(fabric03);

var fabric04 = Object.create(commonfabric);
fabric04.collectionYear = 2011;
fabric04.species = 'Muslin';
fabric04.color = 'Light Breeze';
fabric04.pattern = 'Stars';
fabricNamesList.push(fabric04);

/*
    Task 1 - 5
*/

function task15SearchFabric()
{
    var fabricSpecies = prompt('Enter fabric species:').toLowerCase().trim();

    var findFabric = fabricNamesList.find(function(fabric) 
    {
        return fabric.species.toLowerCase() === fabricSpecies;
    });
    fabricResult.style.visibility='visible';
    if (findFabric) 
    {
        fabricResult.innerHTML = findFabric.getInfo() + '<br>Collection age: ' + findFabric.getCollectionAge() + ' year(s)';
    } 
    else 
    {
        fabricResult.innerHTML = 'No such fabric';
    }
}

function taskAdditAddFabric()
{
    var collectionYear = Number(document.getElementById('addCollectionYear').value);
    var species = document.getElementById('addSpecies').value;
    var color = document.getElementById('addColor').value;
    var pattern = document.getElementById('addPattern').value;
    if(collectionYear && species && color && pattern)
    {
        var findFabric = fabricNamesList.find(function(fabric) 
        {
            return fabric.species.toLowerCase() === species;
        });
        if(!findFabric)
        {
            var newFabric = Object.create(commonfabric);
            newFabric.collectionYear = collectionYear;
            newFabric.species = species;
            newFabric.color = color;
            newFabric.pattern = pattern;
            fabricNamesList.push(newFabric);
            document.getElementById('task14ChildrenName').innerHTML = '';
            fabricNamesList.forEach(element => {
                document.getElementById('task14ChildrenName').innerHTML
                    +=`<p class="card-text">${element.species}</p>`   
            });
        }
        else alert('This is already exist')

    }
    else alert('1 or more fields are empty');
}