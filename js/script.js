$('#name').focus();

$('#title').change(function() {
    if($("#title option:selected").val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

$('#design').change(function() {
    var punsFocus = $('#color').val('cornflowerblue');
    
    if($('#design option:selected').val() === 'js puns') {
        punsFocus.focus();
        $("#color option[value='cornflowerblue']").show();
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
    } else if ($('#design option:selected').val() === 'heart js') {
        $('#color').val('tomato').focus();

        $("#color option[value='tomato']").focus();
        $("#color option[value='cornflowerblue']").hide();
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
    } else {
        punsFocus.focus();
        $('#color option').each(function(i) {
            $(this).show();
        });
    }
});

$("#payment option[value='select_method']").prop('disabled', true);
var creditCard = $('#payment').val('credit card');
var creditCardDiv =  $('#credit-card').show();
var paypalDiv = $('#paypal').hide();
var bitcoainDiv = $('#bitcoin').hide();

$('#payment').change(function() {
    if($('#payment option:selected').val() === 'paypal'){
        paypalDiv.show();
        creditCardDiv.hide();
        bitcoainDiv.hide();
    } else if ($('#payment option:selected').val() === 'bitcoin') {
        paypalDiv.hide();
        creditCardDiv.hide();
        bitcoainDiv.show();
    } else {
        paypalDiv.hide();
        creditCardDiv.show();
        bitcoainDiv.hide();
    }
});

/*** 
 *  This function iterates over the input (Register for Activities) and add the values of each workshop selected (checked).
 *  For this function to work properly I had to add a value attribute with the $$$ cost for each workshop.
 * 
 *  Dinamically adds the class "unavailable" to visually show when a workshop is not available. 
* **/


$('input[type=checkbox]').change(function() {
    var total = 0;

    $('input:checkbox:checked').each(function() {
        total +=  parseInt($(this).val());
    });
    console.log(total);

    if ($("input[name=js-frameworks]").prop("checked") === true) {
        $("input[name=express]").prop("disabled", true);
            $("input[name=express]")
            .parent()
            .addClass('unavailable');
    } else {
        $("input[name=express]").prop("disabled", false);
            $("input[name=express]")
            .parent()
            .removeClass('unavailable');
    }
    if ($("input[name=express]").prop("checked") === true) {
        $("input[name=js-frameworks]").prop("disabled", true);
            $("input[name=js-frameworks]")
            .parent()
            .addClass('unavailable');
    } else {
        $("input[name=js-frameworks]").prop("disabled", false);
            $("input[name=js-frameworks]")
            .parent()
            .removeClass('unavailable');
    }
    if ($("input[name=js-libs]").prop("checked") === true) {
        $("input[name=node]").prop("disabled", true);
            $("input[name=node]")
            .parent()
            .addClass('unavailable');
    } else {
        $("input[name=node]").prop("disabled", false);
            $("input[name=node]")
            .parent()
            .removeClass('unavailable');
    }
    if ($("input[name=node]").prop("checked") === true) {
        $("input[name=js-libs]").prop("disabled", true);
            $("input[name=js-libs]")
            .parent()
            .addClass('unavailable');
    } else {
        $("input[name=js-libs]").prop("disabled", false);
            $("input[name=js-libs]")
            .parent()
            .removeClass('unavailable');
    }
     
});

