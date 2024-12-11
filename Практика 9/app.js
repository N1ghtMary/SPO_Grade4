const EARLIEST_DATE = new Date(2024, 0, 1);
const VACATION_LENGTH = 28;
const TODAY = new Date();
const CONVERT_TO_DAY = (1000*60*60*24);
const NEXT_YEAR = 2025;

$(function() //window onload
{

    var buttonStartCalculatingVacations = $('#buttonStartCalculatingVacations');
    var inputDateOfEmployment = $('#dateOfEmployment');
    var checkBoxIsManualEntry = $('#checkBoxIsManualEntry');
    var wishesErrorsList = $('#wishesErrorsList');
    var divParentWishes = $('#divParentWishes');
    var monthListForSelects = [];
    for(var i=0; i<12; i++ )
    {
        monthListForSelects.push(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(NEXT_YEAR, i, 1)));
    }
    var sumWishDaysPerMonth = {};
    var wishDaysPerMonth = {};

    $('.alert').hide();
    $('#buttonAddVacationPeriod').prop('disabled',true);
    $('#divVacationDates').find('span, input').prop('disabled',true);
    $('#vacationInfoAndActions').hide();
    $('#divManualEntry').hide();
    checkBoxIsManualEntry.prop('checked', false);
    wishesErrorsList.hide().text('');
    
    $('#divInputWishes').append(
        `            
            <div class="input-group mb-3 input-group-lg">
                <label class="input-group-text" for="inputGroupSelectWish1">Month</label>
                <select class="form-select" id="inputGroupSelectWish1">
                </select>
                <span class="input-group-text">Duration</span>
                <input 
                    type="number" 
                    class="form-control duration" 
                    min="1"
                    max="31"
                    id="durationWish1">
                <button 
                    class="btn btn-outline-danger fs-4 buttonRemoveWish" 
                    type="button" 
                    id="buttonRemoveWish1">
                    Remove
                </button>
            </div>
        `
    );
    $.each(monthListForSelects, function(i, month)
    {
        $('#inputGroupSelectWish1').append($('<option>',
            {
                value: i++,
                text: month
            }
        ))
    })
    divParentWishes.hide();
    
    checkBoxIsManualEntry.on('click', function()
    {
        $('#divManualEntry').toggle(this).checked;
    });

    buttonStartCalculatingVacations.on('click', function()
    {
        var dateOfEmployment = inputDateOfEmployment.val();
        var parsedDateOfEmployment = new Date(dateOfEmployment);
        var nextYear = new Date(TODAY.getFullYear()+1, 11, 31);

        if(parsedDateOfEmployment < EARLIEST_DATE || parsedDateOfEmployment > TODAY || !dateOfEmployment)
        {
            alert(`Date of employment can\'t be earlier ${formatDate(EARLIEST_DATE)} and later ${formatDate(TODAY)}`);
            return;
        }

        // $('#buttonAddVacationPeriod').prop('disabled',false);

        $('#buttonAddVacationPeriod').prop('disabled', false);
        $('#vacationStartDate').prop('disabled',false);
        $('#vacationEndDate').prop('disabled',false);
        inputDateOfEmployment.prop('disabled',true);
        var vacationsPeriodsStorage = localStorage.getItem('vacationPeriods');
        var parsedVacationPeriodsStorage = JSON.parse(vacationsPeriodsStorage) || [];
        if(parsedVacationPeriodsStorage[dateOfEmployment])
        {
            divParentWishes.show();
            $('#vacationInfoAndActions').show();
            $('#vacationInfoAndActions .alert').show();
            var vacationDurationPlanned = 0;
            parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(element => 
            {
                vacationDurationPlanned += element.duration;
            });
            $('#pVacationDaysPlanned').text(`${vacationDurationPlanned}`);
            $('#pVacationDaysLeft').text(`${(28 - (vacationDurationPlanned)) <
            0 ? 0 : 
            (28 - (vacationDurationPlanned))}`);
            $('#vacationDatesTable tbody').empty();
            parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(period =>
            {
                $('#vacationDatesTable tbody').append(
                    `<tr>
                        <td scope="row">${formatDate(new Date(period.start))}</td>
                        <td>${formatDate(new Date(period.end))}</td>
                        <td>${period.duration}</td>
                        <td><button class="btn btn-outline-danger fs-4 container-fluid removeVacation"  type="button" 
                    >Remove</button></td>
                    </tr>`
                )
            });
            if($('#pVacationDaysPlanned').text() >= 28)
            {
                $('#buttonAddVacationPeriod').prop('disabled', true);
                $('#vacationStartDate').prop('disabled',true);
                $('#vacationEndDate').prop('disabled',true);
                divParentWishes.hide();
            }
            $(this).prop('disabled',false);
            inputDateOfEmployment.prop('disabled',false);
        }
        else
        {
            // $('.alert').hide();
            $('#divVacationDates').find('span, input').prop('disabled',true);
            $('#vacationInfoAndActions').hide();
            $(this).prop('disabled',true);
            divParentWishes.show();
            $('#divVacationDates').find('span, input').prop('disabled',false);
        }
        $('#pVacationBalance').closest('.alert').show();
        $('#pVacationBalance').text(balanceVacationDays(parsedDateOfEmployment, nextYear).toFixed(2));
        $('#pVacationDuration').closest('.alert').show();


    });

    $('#vacationStartDate, #vacationEndDate').on('change', function()
    {
        var vacationStartDate = new Date($('#vacationStartDate').val());
        var vacationEndDate = new Date($('#vacationEndDate').val());
        if($('#vacationStartDate').val() && $('#vacationEndDate').val())
        {
            $('#pVacationDuration').text(Math.ceil
                (Math.abs(vacationStartDate - vacationEndDate) / CONVERT_TO_DAY) + 1);
        }
        else $('#pVacationDuration').text(0);
    });

    $('#buttonAddVacationPeriod').on('click', function()
    {
        var vacationsPeriodsStorage = localStorage.getItem('vacationPeriods');
        var parsedVacationPeriodsStorage = JSON.parse(vacationsPeriodsStorage) || [];
        var dateOfEmployment = inputDateOfEmployment.val();
        var parsedDateOfEmployment = new Date(dateOfEmployment);
        var startDate = new Date($('#vacationStartDate').val());
        var endDate = new Date($('#vacationEndDate').val());


        $('#vacationErrorsList').empty();
        var errorList = [];

        if(!$('#vacationStartDate').val() || !$('#vacationEndDate').val())
        {
            errorList.push('One or more date fields are empty.');
        }
        if(parsedVacationPeriodsStorage[dateOfEmployment])
        {
            var start;
            var end;
            if(parsedVacationPeriodsStorage[dateOfEmployment].vacations.some(period =>
            {
                start = new Date(period.start);
                end = new Date(period.end);
                return (startDate <= new Date(period.end)) && (endDate >= new Date(period.start))
            }))
            {
                // var periodAdditional = parsedVacationPeriodsStorage[dateOfEmployment].vacations.filter(
                //     period =>
                //     {
                        
                //     }
                // )
                errorList.push(`U can\'t add this vacation bc it crosses with the dates already added vacations: ${start.toDateString()} - ${end.toDateString()}`);
            }
        }
        if(endDate < startDate)
        {
            errorList.push("The end date of the vacation can\'t be earlier than the start date.");
        }
        if(parsedVacationPeriodsStorage[dateOfEmployment])
        {
            if(parsedVacationPeriodsStorage[dateOfEmployment].vacations.some(period => new Date(period.start) > startDate))
            {
                errorList.push("U need to create vacations in order & u already have created vacations for a later date");
            }
        }
        if(startDate < new Date(TODAY.getFullYear()+1,0,1) || endDate > new Date(TODAY.getFullYear()+1,11,31) + 1)
        {
            errorList.push(`It\'s possible to plan only within ${TODAY.getFullYear()+1}`);
        }

        var vacationDuration = Math.ceil((endDate - startDate) / CONVERT_TO_DAY) + 1;
        var availableBalance = balanceVacationDays(parsedDateOfEmployment, endDate);

        var vacationDurationPlanned = 0;
        
        if(parsedVacationPeriodsStorage[dateOfEmployment])
        {
            parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(element => 
            {
                vacationDurationPlanned += element.duration;
            });
        }
        
        var finalBalance = availableBalance - vacationDurationPlanned - vacationDuration;
        if(finalBalance < -5)
        {
            errorList.push(`Not enough balance days to taking this vacation period.
                 U can\'t go into the negative for more than 5 days, but u have ${finalBalance.toFixed(2)}
                 days left at the end of ur vacation period.`);
        }

        if(errorList.length)
        {
            $('#vacationErrorsList').show();
            errorList.forEach(error =>
                $('#vacationErrorsList').append(`<div>${error}</div>`)
            );
            $('#vacationErrorsList').removeClass('alert-success').addClass('alert-danger');
            return;
        }

        var vacationsInfoList = [];
        
        if(vacationsPeriodsStorage)
        {
            if(parsedVacationPeriodsStorage[dateOfEmployment])
            {
                parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(period =>
                {
                    vacationsInfoList.push({start: period.start, end: period.end, duration: period.duration})
                });
                vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});
            }
            else vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});

        }
        else vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});
        
        if (vacationsPeriodsStorage) {
            var parsedData = parsedVacationPeriodsStorage;
            parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
        } else {
            var parsedData = {};
            parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
        }

        localStorage.setItem('vacationPeriods', JSON.stringify(parsedData));
        $('#vacationErrorsList').show().text('Vacation added succesfully.');
        $('#vacationErrorsList').removeClass('alert-danger').addClass('alert-success');
        // $('#vacationErrorsList').addClass('alert-success');
        $('#vacationDatesTable tbody').empty();
        $('#vacationInfoAndActions').show();
        $('#pVacationDaysPlanned').text(`${vacationDurationPlanned+vacationDuration}`);
        $('#pVacationDaysLeft').text(`${(28 - (vacationDurationPlanned+vacationDuration)) <
            0 ? 0 : 
            (28 - (vacationDurationPlanned+vacationDuration))}`);

        parsedData[dateOfEmployment].vacations.forEach(period =>
        {
            $('#vacationDatesTable tbody').append(
                `<tr>
                    <td scope="row">${formatDate(new Date(period.start))}</td>
                    <td>${formatDate(new Date(period.end))}</td>
                    <td>${period.duration}</td>
                    <td><button 
                        class="btn btn-outline-danger fs-4 container-fluid removeVacation" 
                    >Remove</button></td>
                </tr>`
            )
        });


        $('#vacationInfoAndActions .alert').show();
        $('#vacationEndDate').val('');
        $('#vacationStartDate').val('');
    });

    $('#buttonClearAll').on('click', function()
    {
        localStorage.clear();
        $('#vacationDatesTable tbody').empty();
        $('#vacationInfoAndActions, .alert').hide();
        $('#buttonAddVacationPeriod').prop('disabled',true);
        $('#divVacationDates').find('span, input').prop('disabled',true).val('');
        inputDateOfEmployment.prop('disabled',false).val('');
        buttonStartCalculatingVacations.prop('disabled',false);
        // $('#pVacationBalance').closest('.alert').hide();
        // location.reload();
    });
   

    $('#buttonEndPlanning').on('click', function()
    {
        console.log($('#pVacationDaysPlanned').text())
        if($('#pVacationDaysPlanned').text() >= 28)
        {
            $('#buttonAddVacationPeriod').prop('disabled', true);
            inputDateOfEmployment.prop('disabled',false);
            $('#vacationStartDate').prop('disabled',true);
            $('#vacationEndDate').prop('disabled',true);
            alert('Congrats! Uve succesfully planned ur vacation!');
            buttonStartCalculatingVacations.prop('disabled',false);
        }
        else
        {
            alert('Sorry, but we need to rest a minimum of 28 vacation days for the next year');
        }
    });

    $(document).on('click', '.removeVacation', function()
    {
        var index = $(this).data('index');
        var dateOfEmployment = inputDateOfEmployment.val();
        var vacationsPeriodsStorage = localStorage.getItem('vacationPeriods');
        var parsedVacationPeriodsStorage = JSON.parse(vacationsPeriodsStorage) || [];

        if(parsedVacationPeriodsStorage[dateOfEmployment])
        {
            parsedVacationPeriodsStorage[dateOfEmployment].vacations.splice(index, 1);
            localStorage.setItem('vacationPeriods', JSON.stringify(parsedVacationPeriodsStorage));
            updateVacationCounts(dateOfEmployment, parsedVacationPeriodsStorage);

            
            $('#vacationDatesTable tbody').empty();
            parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach((period, index) =>
            {
                $('#vacationDatesTable tbody').append(
                    `<tr data-index="${index}">
                        <td scope="row">${formatDate(new Date(period.start))}</td>
                        <td>${formatDate(new Date(period.end))}</td>
                        <td>${period.duration}</td>
                        <td><button 
                            class="btn btn-outline-danger fs-4 container-fluid removeVacation"
                            data-index="${index}"
                        >Remove</button></td>
                    </tr>`
                );
            });

            if(parsedVacationPeriodsStorage[dateOfEmployment].vacations.length === 0) {
                $('#vacationInfoAndActions').hide();
            }
        }
    });

    var uniqueWishes = 2;
    $('#buttonAddWish').on('click', function()
    {
        var amountOfWishes = $('div > select').length;
        if(amountOfWishes < 5)
        {
            $('#divInputWishes').append(
                `
                <div class="input-group mb-3 input-group-lg">
                    <label class="input-group-text" for="inputGroupSelectWish${uniqueWishes}">Month</label>
                    <select class="form-select" id="inputGroupSelectWish${uniqueWishes}">
                    </select>
                    <span class="input-group-text">Duration</span>
                    <input 
                        type="number" 
                        class="form-control duration" 
                        min="1"
                        max="31">
                    <button 
                        class="btn btn-outline-danger fs-4 buttonRemoveWish" 
                        type="button">
                        Remove
                    </button>
                </div>
                `
            );
            
            $.each(monthListForSelects, function(i, month)
            {
                $(`#inputGroupSelectWish${uniqueWishes}`).append($('<option>',
                    {
                        value: i++,
                        text: month
                    }
                ));
            });
            uniqueWishes++;
        }
        else alert('U can add <= 5 wishes');
    });

    $('#divInputWishes').on('input','.duration', function()
    {
        validateDays($(this));
    });

    $('#buttonShowVacation').on('click', function()
    {
        uniqueWishes=2;
        var wishesVacationErrorsList = $('#wishesVacationErrorsList');
        var dateOfEmployment = inputDateOfEmployment.val();
        var parsedDateOfEmployment = new Date(dateOfEmployment);
  
        var availableBalanceNewYear = balanceVacationDays(parsedDateOfEmployment, new Date(NEXT_YEAR, 11, 31)).toFixed(2);
        var errorList = [];
        var sumWishDays = 0;
        var vacationWishDates = [];
        var vacationDuration = 0;
        var availableBalance = 0;
        var vacationDurationPlanned = 0;

        sumWishDaysPerMonth = {};
        wishDaysPerMonth = {};


        wishesVacationErrorsList.hide().removeClass('alert-success').removeClass('alert-danger');
        wishesVacationErrorsList.text('');

        $('.input-group').each(function()
        {
            var parentTmp = $(this);
            var monthTmp = parentTmp.find('.form-select').val();
            var daysTmp = parseInt(parentTmp.find('.duration').val());
            if(!isNaN(daysTmp))
            {
                sumWishDays += daysTmp;
                if(!sumWishDaysPerMonth[monthTmp]) 
                {
                    sumWishDaysPerMonth[monthTmp] = 0;
                    wishDaysPerMonth[monthTmp] = [];
                }
                sumWishDaysPerMonth[monthTmp] += daysTmp;
                wishDaysPerMonth[monthTmp].push(daysTmp);
            }
        });

        if(sumWishDays <= 28 ) errorList.push('U should add more than 28 days.');
        if(sumWishDays > availableBalanceNewYear) errorList.push(`U should add less than ur available balance at 31.12 - ${availableBalanceNewYear}.`);

        for(var month in sumWishDaysPerMonth)
        {
            if(sumWishDaysPerMonth[month] > 28) errorList.push(`Total wish days for ${monthListForSelects[month]} exceed 28 days.`);
        }

        if(!errorList.length)
        {
            var vacationsPeriodsStorage = localStorage.getItem('vacationPeriods');
            var parsedVacationPeriodsStorage = JSON.parse(vacationsPeriodsStorage) || [];
            
            
            for(var month in wishDaysPerMonth)
            {
                var amountOfDaysInMonth = getAmountOfDaysInMonth(month);
                var remainingDaysInMonth = amountOfDaysInMonth - wishDaysPerMonth[month].reduce((a,b) => a+b, 0);//- sumWishDaysPerMonth[month];
                var startDay = 1;

                //wishDaysPerMonth[month].sort((a,b) => b-a);
                wishDaysPerMonth[month].forEach(function(days)
                {
                    //var maxAvailableDaysInMonth = amountOfDaysInMonth - (wishDaysPerMonth[month].reduce((a,b) => a+b, 0) - days) + 1;
                    var randomDateInMonth = getRandomDateInMonth(parseInt(month), startDay, remainingDaysInMonth);
                    var startDate = new Date(randomDateInMonth);
                    var endDate = new Date(randomDateInMonth);
                    endDate.setDate(endDate.getDate() + days - 1);

                    vacationDuration = Math.ceil((endDate - startDate) / CONVERT_TO_DAY) + 1;
                    availableBalance = balanceVacationDays(parsedDateOfEmployment, endDate);
    
                    vacationDurationPlanned = 0;
                    
                    if(parsedVacationPeriodsStorage[dateOfEmployment])
                    {
                        parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(element => 
                        {
                            vacationDurationPlanned += element.duration;
                        });
                    }
                    
                    var finalBalance = availableBalance - vacationDurationPlanned - vacationDuration;
                    if(finalBalance < -5)
                    {
                        errorList.push(`Not enough balance days to taking this vacation period in ${monthListForSelects[month]}.
                            U can\'t go into the negative for more than 5 days, but u have ${finalBalance.toFixed(2)}
                            days left at the end of ur vacation period.`);
                    }

                    vacationWishDates.push({ start: startDate, end: endDate, duration: days});
                    startDay = endDate.getDate() + 1;
                    remainingDaysInMonth += days;
                });

                if(errorList.length)
                {
                    wishesVacationErrorsList.show().removeClass('alert-success').addClass('alert-danger');
                    errorList.forEach(error =>
                        wishesVacationErrorsList.append(`<div>${error}</div>`)
                    );
                    break;
                }
            }

            if(!errorList.length)
            {
                console.log(vacationWishDates);

                vacationWishDates.sort((a,b) => b.startDate-a.startDate);
                vacationWishDates.forEach(periodWish =>
                {
                    if(parsedVacationPeriodsStorage[dateOfEmployment])
                    {
                        var startAdditionalTask8;
                        var endAdditionalTask8;
                        if(parsedVacationPeriodsStorage[dateOfEmployment].vacations.some(period =>
                        {
                            startAdditionalTask8 = new Date(period.start);
                            endAdditionalTask8 = new Date(period.end);
                            return (periodWish.startDate <= new Date(period.end)) && (periodWish.endDate >= new Date(period.start))
                        }))
                        {
                            errorList.push(`U can\'t add this vacation bc it crosses with the dates already added vacations: ${formatDate(startAdditionalTask8)} - ${formatDate(endAdditionalTask8)}`);
                        }
                    }

                    if(periodWish.endDate < periodWish.startDate)
                    {
                        errorList.push("The end date of the vacation can\'t be earlier than the start date.");
                    }

                    if(parsedVacationPeriodsStorage[dateOfEmployment])
                    {
                        if(parsedVacationPeriodsStorage[dateOfEmployment].vacations.some(period => new Date(period.start) > periodWish.startDate))
                        {
                            errorList.push("U need to create vacations in order & u already have created vacations for a later date");
                        }
                    }
                    if(periodWish.startDate < new Date(NEXT_YEAR,0,1) || periodWish.endDate > new Date(NEXT_YEAR,11,31) + 1)
                    {
                        errorList.push(`It\'s possible to plan only within ${NEXT_YEAR}`);
                    }
                });

                if(!errorList.length)
                {
                    var vacationsInfoList = [];
            
                    console.log(vacationWishDates)
                    vacationWishDates.forEach(periodWish =>
                    {
                        if(vacationsPeriodsStorage)
                        {
                            if(parsedVacationPeriodsStorage[dateOfEmployment])
                            {
                                parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(period =>
                                {
                                    vacationsInfoList.push({start: period.start, end: period.end, duration: period.duration})
                                });
                                vacationsInfoList.push({start: periodWish.start.toISOString().split('Z')[0], end: periodWish.end.toISOString().split('Z')[0], duration: periodWish.duration});
                            }
                            else vacationsInfoList.push({start: periodWish.start.toISOString().split('Z')[0], end: periodWish.end.toISOString().split('Z')[0], duration: periodWish.duration});
                        }
                        else vacationsInfoList.push({start: periodWish.start.toISOString().split('Z')[0], end: periodWish.end.toISOString().split('Z')[0], duration: periodWish.duration});
                        vacationDurationPlanned += periodWish.duration;
                    });

                    if (vacationsPeriodsStorage) 
                    {
                        var parsedData = parsedVacationPeriodsStorage;
                        parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
                    } 
                    else 
                    {
                        var parsedData = {};
                        parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
                    }

                    localStorage.setItem('vacationPeriods', JSON.stringify(parsedData));

                    wishesVacationErrorsList.show().text('Vacation added succesfully.');
                    wishesVacationErrorsList.removeClass('alert-danger').addClass('alert-success');
                    // $('#vacationErrorsList').addClass('alert-success');
                    $('#vacationDatesTable tbody').empty();
                    $('#vacationInfoAndActions').show();
                    $('#pVacationDaysPlanned').text(`${vacationDurationPlanned}`);
                    $('#pVacationDaysLeft').text(`${(28 - (vacationDurationPlanned)) <
                        0 ? 0 : 
                        (28 - (vacationDurationPlanned))}`);

                    parsedData[dateOfEmployment].vacations.forEach(period =>
                    {
                        $('#vacationDatesTable tbody').append(
                            `<tr>
                                <td scope="row">${formatDate(new Date(period.start))}</td>
                                <td>${formatDate(new Date(period.end))}</td>
                                <td>${period.duration}</td>
                                <td><button 
                                    class="btn btn-outline-danger fs-4 container-fluid removeVacation" 
                                >Remove</button></td>
                            </tr>`
                        )
                    });


                    $('#vacationInfoAndActions .alert').show();
                }
                
                
            }
            
            // var startDate = new Date($('#vacationStartDate').val());
            // var endDate = new Date($('#vacationEndDate').val());
            // 

            // if(errorList.length)
            // {
            //     $('#vacationErrorsList').show();
            //     errorList.forEach(error =>
            //         $('#vacationErrorsList').append(`<div>${error}</div>`)
            //     );
            //     $('#vacationErrorsList').removeClass('alert-success').addClass('alert-danger');
            //     return;
            // }

            // 
            


            // 
            // 
            // $('#vacationEndDate').val('');
            // $('#vacationStartDate').val('');
        }
        else 
        {
            wishesVacationErrorsList.show().removeClass('alert-success').addClass('alert-danger');
            errorList.forEach(error =>
                wishesVacationErrorsList.append(`<div>${error}</div>`)
            );
        }
    });

    $(document).on('click', '.buttonRemoveWish', function()
    {
        $(this).closest('div.input-group').remove();
    });
});



function balanceVacationDays(dateOfEmployment, periodEnd)
{
    var balance = periodEnd - dateOfEmployment;
    return ((VACATION_LENGTH/365) * (Math.ceil(balance/24/60/60/1000)+1));
}

function formatDate(date)
{
    var day =  date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth()+1) <= 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    var year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function updateVacationCounts(dateOfEmployment, parsedData) 
{
    var vacationDurationPlanned = 0;
    
    if(parsedData[dateOfEmployment]) {
        parsedData[dateOfEmployment].vacations.forEach(period => 
        {
            vacationDurationPlanned += period.duration;
        });
    }

    $('#pVacationDaysPlanned').text(`${vacationDurationPlanned}`);
    $('#pVacationDaysLeft').text(`${(28 - vacationDurationPlanned) < 0 ? 0 : (28 - vacationDurationPlanned)}`);
    $('#buttonAddVacationPeriod').prop('disabled', false);
    $('#vacationStartDate').prop('disabled',false);
    $('#vacationEndDate').prop('disabled',false);
    $('#pVacationDuration').text('0');
}

function getAmountOfDaysInMonth(month) 
{
    return new Date(NEXT_YEAR, month + 1, 0).getDate();
}

function validateDays(inputDuration) 
{
    var wishesErrorsList = $('#wishesErrorsList');
    wishesErrorsList.hide().text('');
    var parentDiv = inputDuration.closest('.input-group');
    var selectedMonth = parseInt(parentDiv.find('.form-select').val());
    var maxDays = getAmountOfDaysInMonth(selectedMonth);
    var inputDays = parseInt(inputDuration.val());

    if (inputDays > maxDays) 
    {
        inputDuration.addClass('is-invalid');
        wishesErrorsList.show();
        wishesErrorsList.append(`${parentDiv.find('.form-select option:selected').text()} has only ${maxDays} days.`);
        return false;
    }
    inputDuration.removeClass('is-invalid');
    return true;
}

function getRandomDateInMonth(month, minDate, maxDate)
{
    minDate++;
    //var start = new Date(NEXT_YEAR, month, minDate);
    var randomDay = Math.floor(Math.random() * (maxDate - minDate +1))+minDate;
    return new Date(NEXT_YEAR, month, randomDay);
    //return start.setDate(randomDay);
    // var amountOfDaysInMonth = getAmountOfDaysInMonth(month);
    // var endRange = amountOfDaysInMonth - maxDays;
    // var randomDay = Math.floor(Math.random() * (endRange - endDate.getDate() +1) + endDate.getDate())+1;
    // return new Date(NEXT_YEAR, month, endDate.getDate()).setDate(randomDay);
}