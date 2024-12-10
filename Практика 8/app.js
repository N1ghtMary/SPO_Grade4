const EARLIEST_DATE = new Date(2024, 0, 1);
const VACATION_LENGTH = 28;
const TODAY = new Date();
const CONVERT_TO_DAY = (1000*60*60*24);

$(function() //window onload
{

    var buttonStartCalculatingVacations = $('#buttonStartCalculatingVacations');
    var inputDateOfEmployment = $('#dateOfEmployment');

    $('.alert').hide();
    $('#buttonAddVacationPeriod').prop('disabled',true);
    $('#divVacationDates').find('span, input').prop('disabled',true);
    $('#vacationInfoAndActions').hide();

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



        // console.log(1);
        // var vacationsPeriodsStorage = localStorage.getItem('vacationPeriods');
        // var parsedVacationPeriodsStorage = JSON.parse(vacationsPeriodsStorage) || [];
        // var dateOfEmployment = inputDateOfEmployment.val();
        // var parsedDateOfEmployment = new Date(dateOfEmployment);
        // var startDate = new Date($('#vacationStartDate').val());
        // var endDate = new Date($('#vacationEndDate').val());
    
        // var parsedData = parsedVacationPeriodsStorage;
        // parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
        // var vacationsInfoList = [];
        
        // var row = $(this).closest('tr'); 
        // var rowData = [];
    
        // row.find('td').each(function() {
        //     rowData.push($(this).text().trim()); 
        // });
    
        // console.log(rowData);
        // console.log(parsedData);
        // console.log(parsedData.vacations);
    
        // if(vacationsPeriodsStorage)
        // {
        //     if(parsedVacationPeriodsStorage[dateOfEmployment])
        //     {
        //         parsedVacationPeriodsStorage[dateOfEmployment].vacations.forEach(period =>
        //         {
        //             vacationsInfoList.push({start: period.start, end: period.end, duration: period.duration})
        //         });
        //         vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});
        //     }
        //     else vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});
    
        // }
        // else vacationsInfoList.push({start: startDate, end: endDate, duration: vacationDuration});
        
        
        // } else {
        //     var parsedData = {};
        //     parsedData[dateOfEmployment] = { vacations: vacationsInfoList };
        // }
    
        //localStorage.setItem('vacationPeriods', JSON.stringify(parsedData));
    
        // parsedData[dateOfEmployment].vacations.forEach(period =>
        //     {
        //         $('#vacationDatesTable tbody').append(
        //             `<tr>
        //                 <td scope="row">${formatDate(new Date(period.start))}</td>
        //                 <td>${formatDate(new Date(period.end))}</td>
        //                 <td>${period.duration}</td>
        //                 <td><button class="btn btn-outline-danger fs-4 container-fluid"  type="button" 
        //                 id="removeVacation">Remove</button></td>
        //             </tr>`
        //         )
        //     });
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