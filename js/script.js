$(document).ready(function(){

    // Apply the focus to the name field every time the form is loaded.
    $('#name').focus();
    $('#other-title').hide();

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
            event.preventDefault();
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
        var emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var valid = true;

        if (mail === ""){
            if ($('#validate-mail').length === 0){
                $('#mail').before('<p class="validateForm" id="validate-mail">Please enter a valid email: example@domain.com</p>');
            }   
            valid = false;
            event.preventDefault();
        } else if (!emailRegex.test(mail)){
            valid = false;
            event.preventDefault();
        }else {
            $('#validate-mail').remove();
            valid = true;
        } 
        return valid;
    }

    // Validates email field in real-time ---checks for correct email format---
    $('#mail').on('keyup', function() {
        var emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        
        if(!$(this).val().match(emailRegex)) {
            if ($('#validate-mail').length === 0) { 
                $('#mail').before('<p class="validateForm" id="validate-mail">Please enter a valid email: example@domain.com</p>');
            }
        } else {
            $('#validate-mail').remove();
        } 
    });
    
        
    // Validates the checkboxes options and if none is selected it prompts a window alert with a message when the form is submitted.
    const validateCheckbox = () => {
        var valid = true;

        if ($('input:checkbox:checked').length === 0){
            if ($('#validate-checkbox').length === 0){
                $('#total').before('<p class="validateForm" id="validate-checkbox">At least one activity must be selected before submitting the form!</p>');
            }   
            valid = false;
            event.preventDefault();
        } else {
            $('#validate-checkbox').remove();
            valid = true;
        } 

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
    * **/

    const validateCreditCard = () => {
        var message = "";
        var valid = true;

        if($('#payment option:selected').val() === 'credit card'){
            var ccNum = $('#cc-num').val();
            var ccRegex = /^[0-9]{13,16}$/;
            var zip = $('#zip').val();
            var zipRegex = /^[0-9]{5,5}$/;
            var cvv = $('#cvv').val();
            var cvvRegex = /^[0-9]{3,3}$/;
            
            if (ccNum === "" || zip === "" || cvv === "" ) {
                if ($('#validate-cc').length === 0) {
                    message += $('#payment').before('<p class="validateForm" id="validate-cc">Credit Card fields are required!</p>');
                }
                valid = false;
                event.preventDefault();
            } else if (!ccRegex.test(ccNum) || !zipRegex.test(zip) || !cvvRegex.test(cvv)){
                valid = false;
                event.preventDefault();
            } else {
                $('#validate-cc').remove();
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


    // Validates credit card number field in real-time ---checks for correct email format--- (13-16 digits)
    $('#cc-num').on('keyup', function () {
        var ccNum = $('#cc-num').val();
        var ccRegex = /^[0-9]{13,16}$/;
        
        if (!ccRegex.test(ccNum)) {
            if ($('#validate-num').length === 0) {
                $('#cc-num').before('<p class="validateForm" id="validate-num">Credit Card Number is Invalid! The number should be between 13-16 digits.</p>'); 
            }
        }else {
            $('#validate-num').remove();
        } 
    });


    // Validates zip code field in real-time ---checks for correct email format--- (5 digits)
    $('#zip').on('keyup', function () {
        var zipRegex = /^[0-9]{5,5}$/;

        if (!$(this).val().match(zipRegex)) {
            if ($('#validate-zip').length === 0) {
                $('#zip').before('<p class="validateForm" id="validate-zip">**ZIP CODE is Invalid. Must be 5 digits**</p>'); 
            }
        } else {
            $('#validate-zip').remove();
        }
    });

    

    // Validates cvv field in real-time ---checks for correct email format--- (3 digits)
    $('#cvv').on('keyup', function () {
        var cvvRegex = /^[0-9]{3,3}$/;
        
        if (!$(this).val().match(cvvRegex)) {
            if ($('#validate-cvv').length === 0) {
                $('#cvv').before('<p class="validateForm" id="validate-cvv">**CVV is Invalid. Must be 3 digits**</p>');
                //$('#cvv').css('border-color', 'red');
            }
        }else {
            $('#validate-cvv').remove();

        }
    });

    // Form submit button - calls all other function 
    $('button').click(function () {
        validateName();
        validateEmail();
        validateCheckbox();
        validateCreditCard();
    });
});