$(document).ready(function(){

    // Apply the focus to the name field every time the form is loaded.
    $('#name').focus();

    $('#title').change(function() {
        if($("#title option:selected").val() === 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });
    
    //Hide the color dropdown until the design theme is selected. 
    $('#colors-js-puns').hide();

    /**
     * This function filter all the color selections according to the theme selected.
     * It hides\shows the color options by theme. 
    **/
    
    $('#design').change(function() {
        var punsFocus = $('#color').val('cornflowerblue');
        $('#colors-js-puns').show();
        
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

    /**
     * Credit Card option is selected by default.
     * This function filter all the payment options.
     * It hides\shows payments. If a payment is selected, the others will be hidden.  
    **/

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
     *  Iterates over the checkboxes (Register for Activities) and add the values of each workshop selected (checked).  
     *  For this function to work properly I had to add a value attribute with the $$$ cost for each workshop.
    * **/

    const calAndShowTotalCheckbox = () => {
        var total = 0;
        $('#total')
        .addClass('total')
        .focus()
        .show()

        $('input:checkbox:checked').each(function() {
            total +=  parseInt($(this).attr('value')) || 0;
        });
        
        $('#total input').val("Total Activities Selected: $" + total);

        if (total === 0) {
            hideTotal();
        }
    }

    /*** 
     *  Iterates over the checkboxes (Register for Activities) and add the unavailable label if the
     *  activity conflicts with another. I created a custom class and css code for this.
    * **/

    $('input[type=checkbox]').click(function() {
        calAndShowTotalCheckbox();

        // Dynamically adds the class "unavailable" to visually show when a workshop is not available. 
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

    /*** 
     *  validate name for empty field when the submit button is clicked.
    * **/
    const validateName = () => {
        var name = $('#name').val();
        var valid = true;

        if (name === "") {
            if ($('#validate-name').length === 0) {
                $('#name').before('<p class="validateForm" id="validate-name">Name must be filled out</p>');
            }
            valid = false;     
        } else {
            $('#validate-name').remove();
            valid = true;
        } 
        return valid;
    }

    /*** 
     *  validate email for empty field when the submit button is clicked.
    * **/
    const validateEmail = (mail) => {
        var mail = $('#mail').val();
        var valid = true;

        if (mail === ""){
            if ($('#validate-mail').length === 0){
                $('#mail').before('<p class="validateForm" id="validate-mail">Please enter a valid email: example@domain.com</p>');
            }   
            valid = false;
        } else {
            $('#validate-mail').remove();
            valid = true;
        } 
        return valid;
    }

    // Validates email field in real-time ---checks for correct email format---
    $('#mail').on('keyup', function() {
        var emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var valid = true;

        if(!$(this).val().match(emailRegex)) {
            if ($('#validate-mail').length === 0) { 
                $('#mail').before('<p class="validateForm" id="validate-mail">Please enter a valid email: example@domain.com</p>');
            }
            return false
        } else {
            $('#validate-mail').remove();
            valid = true;
        }
        return valid;
    });

    // Validates the checkboxes options and if none is selected it prompts a window alert with a message when the form is submitted.
    const validateCheckbox = () => {
        var valid = true;

        if ($('input:checkbox:checked').length === 0){
            if ($('#validate-checkbox').length === 0){
                $('#total').before('<p class="validateForm" id="validate-checkbox">At least one activity must be selected before submitting the form!</p>');
            }   
            valid = false;
        } else {
            $('#validate-checkbox').remove();
            valid = true;
        } 
        return valid;
    }

    // Removes the error message if at least one of the checkboxes is checked.
    $('input:checkbox').change(function () {
        if ($('input:checkbox:checked').length > 0) {
            if ($('#validate-checkbox').length > 0){ 
                $('#validate-checkbox').remove();
                return true;
            }
        }
    });
    

    /*** 
     *  Validates the credit card fields and ensures none of the fields are empty. 
     *  It also validate for the correct C.C. # (13-16 digits), zip code(5 digits) and cvv(3 digits). 
    * **/

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
                    message += $('#credit-card').after('<p class="validateForm" id="validate-cc">Credit Card fields are required!</p>');
                }
                valid = false;
            } else {
                $('#validate-cc').remove();
                valid = true;
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
            } else {
                valid = true;
            }
            return valid;
            console.log(valid);
        }

        if($('#payment option:selected').val() === 'paypal' || $('#payment option:selected').val() === 'bitcoin') { 
            $('#validate-cc').remove();
            return true;
        }
    }

    
    // reset the form if all inputs are valid (true)
    const resetForm = () => {
        if (validateName() === true && validateEmail() === true && validateCheckbox() === true && validateCreditCard() === true) {
            $('#form')[0].reset();
            hideTotal();
            return true;
        }
    }

    // Form submit button - calls all other function 
    $('button').click(function () {
        validateName();
        validateEmail();
        validateCheckbox();
        validateCreditCard();
        event.preventDefault();
        resetForm();
       
    });
});