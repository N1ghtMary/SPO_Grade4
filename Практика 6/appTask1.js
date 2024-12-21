const cambricPrice = 340;
const flanelPrice = 560;
const foulePrice = 640;
const fleecePrice = 780;
const thermoPrice = 960;
const quiltedPrice = 1090;

const cottonSpecies = ["Cambric - " + cambricPrice, "Flannel - " + flanelPrice, "Foule - " + foulePrice];
const syntheticSpecies = ["Fleece - " + fleecePrice, "Thermo - " + thermoPrice, "Quilted - " + quiltedPrice];

window.onload = function()
{
    document.getElementById('task15MessageError').style.display = 'none';
    document.querySelectorAll('.task14Error').forEach(function(element) 
    {
        element.style.display = 'none';
    });
}

/* 
    Task 1 - 2 
*/

function task12ChangeFabricType() 
{
    var fabricTypeRadioButton = document.querySelector('input[name="fabricType"]:checked').value;
    var fabricSpeciesComboBox = document.getElementById('task12FabricSpecies');
    fabricSpeciesComboBox.innerHTML = '';
    var fabricSpecies = fabricTypeRadioButton === 'cotton' ? cottonSpecies : syntheticSpecies;

    fabricSpecies.forEach(species => 
    {
        var fabricSpeciesComboBoxItem = document.createElement('option');
        fabricSpeciesComboBoxItem.value = species;
        fabricSpeciesComboBoxItem.textContent = species;
        fabricSpeciesComboBox.appendChild(fabricSpeciesComboBoxItem);
    });
}

/*
    Task 1 - 4
*/

function task14RegexPostcode()
{
    var postcode = document.getElementById('task14Postcode').value;
    var postcodeError = document.getElementById('task14PostCodeError');
    var postcodePattern = /^[45]\d{6}$/;

    if (!postcodePattern.test(postcode)) 
    {
        postcodeError.innerHTML = 'Should starts from 4 or 5 with 7 numbers length';
        postcodeError.style.display = 'block';
        return 0;
    }
    else 
    {
        postcodeError.style.display = 'none';
        return 1;
    }
}

function task14RegexDeliveryDate()
{
    var deliveryDateError = document.getElementById('task14DeliveryDateError');
    var deliveryDate = document.getElementById('task14DeliveryDate').value;
    var deliveryDatePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}|\d{2})$/;

    if (!deliveryDatePattern.test(deliveryDate))
    {        
        deliveryDateError.innerHTML = 'Should be DD-MM-YYYY or DD-MM-YY';
        deliveryDateError.style.display = 'block';
        return 0;
    }    
    else 
    {
        deliveryDateError.style.display = 'none';
        return 1;
    }
}

function task14RegexNameSurname()
{
    var nameSurnameError = document.getElementById('task14NameSurnameError');
    var nameSurname = document.getElementById('task14NameSurname').value;
    var nameSurnameLengthPattern = /^.{5,35}$/;

    if(!nameSurnameLengthPattern.test(nameSurname))
    {        
        nameSurnameError.innerHTML = 'Enter from 5 to 35 symbols';
        nameSurnameError.style.display = 'block';
        return 0;
    }    
    else 
    {
        nameSurnameError.style.display = 'none';
        return 1;
    }
}

function task14RegexPBX()
{
    var phoneError = document.getElementById('task14PBXError');
    phoneError.style.display = 'none';
    var phone = document.getElementById('task14PBX').value;

    if (/^(?:\d{2}-\d{2}-\d{2}|\d+|\d{2}-\d{2}-\d{3})$/.test(phone)) 
    {
        var formattedNumber;
        if (phone.length === 6 || phone.length === 7)
            formattedNumber = phone.replace(/(\d{2})(\d{2})(\d{2}|\d{3})/, '$1-$2-$3');
        else formattedNumber = phone;
    
        document.getElementById('task14PBX').value = formattedNumber;
        return 1;
    }
    else
    {
        phoneError.innerHTML = 'Should be 1+ number or PBX 99-99-99 | 99-99-999';
        phoneError.style.display = 'block';
        return 0;
    }


}

function task14RegexEmail()
{
    var emailError = document.getElementById('task14EmailError');
    var email = document.getElementById('task14Email').value;
    var emailPattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

    if(!emailPattern.test(email)) 
    {        
        emailError.innerHTML = 'Should be example@example.ru';
        emailError.style.display = 'block';
        return 0;
    }    
    else
    {        
        emailError.style.display = 'none';
        return 1;
    }
}
// /^([a-z0-9_\-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
// /^(?!.*\.\.)(?!.*\.$)(?!^\.)(?!.*-$)(?!^.-)[a-zA-Z0-9._-]{3,33}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/*  The onBlur event is fired when you have moved away 
    from an object without necessarily having changed its value.
    The onChange event is only called when you have changed the 
    value of the field and it loses focus.*/

/*
    Task 1 - 5
*/

function task15PlaceOrder()
{
    document.getElementById('task15OrderInfo').innerHTML = '';
    document.getElementById('task15MessageError').innerHTML = '';
    document.getElementById('task15MessageError').style.display = 'none';

    if(!task14RegexPostcode() 
        || !task14RegexDeliveryDate() 
        || !task14RegexNameSurname()
        || !task14RegexPBX()
        || !task14RegexEmail())
    {
        document.getElementById('task15MessageError').innerHTML = '1 or more fields contain errors';
        document.getElementById('task15MessageError').style.display = 'block';
    }
    else if(!document.querySelector('input[name="fabricType"]:checked'))
    { 
        document.getElementById('task15MessageError').innerHTML = 'Choose fabric type';
        document.getElementById('task15MessageError').style.display = 'block';       
    }
    else if(document.getElementById('task1Amount').value < 0.3 || !(/^\d+(\.\d{1,2})?$/.test(document.getElementById('task1Amount').value)))
    {
        document.getElementById('task15MessageError').innerHTML = 'Amount of fabric must be > 0.3';
        document.getElementById('task15MessageError').style.display = 'block';  
    }
    else
    {
        var advancedComboBox = (document.getElementById('task12FabricSpecies').value).split(' - ');
        document.getElementById('task15OrderInfo').innerHTML = 
        `<div class="card text-bg-warning mb-3" style="max-width: 18rem;">
            <div class="card-header">Order</div>
            <div class="card-body">
                <p class="card-text">Fabric type: ${document.querySelector('label[for=\''+document.querySelector('input[name="fabricType"]:checked').value+'\']').textContent}</p>
                <p class="card-text">Fabric species: ${advancedComboBox[0]}</p>
                <p class="card-text">${document.getElementById('task13CheckboxWrapper').checked ? 'With gift wrapper' : 'Without gift wrapper'}</p>
                <p class="card-text">Amount of fabric, m: ${document.getElementById('task1Amount').value}</p>
                <p class="card-text">Total price: ${Math.round(document.getElementById('task1Amount').value * advancedComboBox[1], 2)}</p>
            </div>
        </div>`;
    }
}
