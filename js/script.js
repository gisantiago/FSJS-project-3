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