const EARLIEST_DATE = new Date(2024, 0, 1);
const VACATION_LENGTH = 28;
const TODAY = new Date();
const CONVERT_TO_DAY = (1000*60*60*24);

$(function() //window onload
{
    var vacationPeriodsStorage = JSON.parse(localStorage.getItem('vacationPeriods')) || [];
//     $('button').on('click', function()
// {
//     alert('Test');
// })
// const employmentDateField = $('#employmentDate');
// function startCalculatingVacations()
// {
//     console.log(employmentDateField)
// }
    $('.alert').hide();
    $('#buttonAddVacationPeriod').prop('disabled',true);
    $('#divVacationDates').find('span, input').prop('disabled',true);
    $('#vacationInfoAndActions').hide();

    $('#buttonStartCalculatingVacations').on('click', function()
    {
        var dateOfEmployment = new Date($('#dateOfEmployment').val());
        var nextYear = new Date(TODAY.getFullYear()+1, 11, 31);

        if(dateOfEmployment < EARLIEST_DATE || dateOfEmployment > TODAY || !$('#dateOfEmployment').val())
        {
            alert(`Date of employment can\'t be earlier ${formatDate(EARLIEST_DATE)} and later ${formatDate(TODAY)}`);
            return;
        }

        $('#buttonAddVacationPeriod').prop('disabled',false);
        $(this).prop('disabled',true);
        $('#dateOfEmployment').prop('disabled',true);
        $('#pVacationBalance').text(balanceVacationDays(dateOfEmployment, nextYear));
        $('#pVacationBalance').closest('.alert').show();
        $('#pVacationDuration').closest('.alert').show();
        $('#divVacationDates').find('span, input').prop('disabled',false);

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
        var startDate = new Date($('#vacationStartDate').val());
        var endDate = new Date($('#vacationEndDate').val());
        $('#vacationErrorsList').empty();
        var errorList = [];

        if(!$('#vacationStartDate').val() || !$('#vacationEndDate').val())
        {
            errorList.push('One or more date fields are empty.');
        }
        if(vacationPeriodsStorage.some(period =>
            (startDate < new Date(period.end)) && (endDate > new Date(period.start))))
        {
            errorList.push("U can\'t add this vacation bc it crosses with the dates already added vacations.");
        }
        if(endDate < startDate)
        {
            errorList.push("The end date of the vacation can\'t be earlier than the start date.");
        }
        if(vacationPeriodsStorage.some(period => new Date(period.start) > startDate))
        {
            errorList.push("U need to create vacations in order & u already have created vacations for a later date.");
        }
        if(startDate < new Date(TODAY.getFullYear()+1,0,1) || endDate > new Date(TODAY.getFullYear()+1,11,31) + 1)
        {
            errorList.push(`It\'s possible to plan only within ${TODAY.getFullYear()+1}`);
        }

        var dateOfEmployment = new Date($('#dateOfEmployment').val());
        var vacationDuration = Math.ceil((endDate - startDate) / CONVERT_TO_DAY) + 1;
        var availableBalance = balanceVacationDays(dateOfEmployment, endDate);
        console.log(availableBalance)
        var vacationDurationPlanned = 0;
        vacationPeriodsStorage.forEach(element => {
            vacationDurationPlanned += 
                Math.ceil(Math.abs(new Date(element.start) - 
                new Date(element.end)) / CONVERT_TO_DAY) + 1;
        });
        
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
            $('#vacationErrorsList').removeClass('alert-success');
            $('#vacationErrorsList').addClass('alert-danger');
            return;
        }

        var vacationTestObject =
        {
            employment: dateOfEmployment,
            vacations: [{ start: startDate, end: endDate, duration: vacationDuration}]
        }

        if(vacationPeriodsStorage)

        vacationPeriodsStorage.push({employment: dateOfEmployment, vacations: [{}]});
        localStorage.setItem('vacationPeriods', JSON.stringify(vacationPeriodsStorage));
        $('#vacationErrorsList').show().text('Vacation added succesfully.');
        $('#vacationErrorsList').removeClass('alert-danger');
        $('#vacationErrorsList').addClass('alert-success');

        $('#vacationInfoAndActions').show();
        $('#pVacationDaysPlanned').text(`${vacationDurationPlanned+vacationDuration}`);
        $('#pVacationDaysLeft').text(`${(28 - (vacationDurationPlanned+vacationDuration)) <
            0 ? 0 : 
            (28 - (vacationDurationPlanned+vacationDuration))}`);

        vacationPeriodsStorage.vacations.forEach(period =>
        {
            if(vacationPeriodsStorage.employment == dateOfEmployment)
                {
                    $('#vacationDatesTable tbody').append(
                        `<tr>
                            <td scope="row">${formatDate(new Date(period.vacations.start))}</td>
                            <td>${formatDate(new Date(period.vacations.end))}</td>
                            <td>${period.vacations.duration}</td>
                        </tr>`
                    )
                }
        }


        );


        $('#vacationInfoAndActions .alert').show();
    });

    $('#buttonClearAll').on('click', function()
    {
        localStorage.clear();
    });

    if(vacationPeriodsStorage.length)
    {
        console.log(vacationPeriodsStorage)
        $('#dateOfEmployment').val((vacationPeriodsStorage.employment).split('T')[0]);
        $('#vacationInfoAndActions').show();
        $('#vacationInfoAndActions .alert').show();
        vacationPeriodsStorage.forEach(period =>
            $('#vacationDatesTable tbody').append(
                `<tr>
                    <td scope="row">${formatDate(new Date(period.vacations.start))}</td>
                    <td>${formatDate(new Date(period.vacations.end))}</td>
                    <td>${period.vacations.duration}</td>
                </tr>`
            )
        );
    }
});

function balanceVacationDays(dateOfEmployment, periodEnd)
{
    var balance = periodEnd - dateOfEmployment;
    return ((VACATION_LENGTH/365) * Math.ceil(balance/24/60/60/1000)).toFixed(2);
}

function formatDate(date)
{
    var day =  date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth()+1) <= 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
    var year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
