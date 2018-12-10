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
        $("#color option[value='cornflowerblue']").show();
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
    }
});