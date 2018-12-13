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

// Hide the div that contains the input with the workshop totals
const hideTotal = () => {
    $('#total')
    .hide()
    .removeClass('total');
}
hideTotal();

/*** 
 *  This function iterates over the checkboxes (Register for Activities) and add the values of each workshop selected (checked).
 *  For this function to work properly I had to add a value attribute with the $$$ cost for each workshop.
* **/

const calAndShowTotalCheckbox = () => {
    var total = 0;
    $('#total')
    .addClass('total')
    .show()

    $('input:checkbox:checked').each(function() {
        total +=  parseInt($(this).attr('value')) || 0;
    });
     
    $('#total input').val("Total Activities Selected: $" + total);

    if (total === 0) {
        hideTotal();
    }
}

 
$('input[type=checkbox]').click(function() {
    calAndShowTotalCheckbox();

    // Dinamically adds the class "unavailable" to visually show when a workshop is not available. 
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

const validateName = () => {
    var name = $('#name').val();
    if (name === "") {
        if ($('#validate-name').length === 0) {
            $('#name').after('<p class="validateForm" id="validate-name">Name must be filled out</p>');
            return false;
        }     
    } else {
        $('#validate-name').remove();
    } 
}

const validateEmail = (mail) => {
    var mail = $('#mail').val();
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

    if (!regex.test(mail)){
        if ($('#validate-mail').length === 0){
            $('#mail').after('<p class="validateForm" id="validate-mail">Please enter a valid email: example@domain.com</p>');
            return false;
        }   
    } else {
        $('#validate-mail').remove();
        return true;
    } 

    // if (mail === "") {
    //     if ($('#validate-mail').length === 0) {
    //         $('#mail').after('<p class="validateForm" id="validate-mail">Email must be filled out</p>');
    //         return false;
    //     } 
    // }  else {
    //     $('#validate-mail').remove();
    //     return true;
    // } 
}

const validateCheckbox = () => {
    $('input:checkbox').each(function(){
        if ($(this).prop('checked') === false){ 
            alert('At least one activity must be selected before submitting the form!');
            return false;
        } 
    });
}

const validateCreditCard = () => {
    var message = "";
    var valid = true;

    if($('#payment option:selected').val() === 'credit card'){
        var ccNum = $('#cc-num').val();
        var ccRegex = /^[0-9]{13,16}$/
        var zip = $('#zip').val()
        var zipRegex = /^[0-9]{5,5}$/;
        var cvv = $('#cvv').val()
        var cvvRegex = /^[0-9]{3,3}$/;
        
        if (ccNum === "" || zip === "" || cvv === "") {
            if ($('#validate-cc').length === 0) {
                message += $('#credit-card').before('<p class="validateForm" id="validate-cc">Credit Card fields are required!</p>');
                //alert('Credit Card fields are required!');
                valid =  false;
            }
        } else {
            $('#validate-cc').remove();
        }
        if (ccNum.length > 0 || zip.length > 0 || cvv.length > 0) {
            if (!ccRegex.test(ccNum)) {
                alert('Credit Card Number is Invalid! The number should be between 13-16 digits.');
                valid = false;
            }
            if ( !zipRegex.test(zip) ) {
                alert('ZIP CODE is Invalid!!!!!!!!!!!!');
                valid = false;
            }
            if ( !cvvRegex.test(cvv) ) {
                alert('CVV is Invalid!!!!!!!!!!!!');
                //$('#cvv').css('border-color', 'red');
                valid = false;
            }
        }
        
    }
    return valid;
}

$('button').click(function () {
    validateName();
    validateEmail();
    validateCheckbox();
    validateCreditCard();
    event.preventDefault();
    
});