$(function (){
    $(".dateTime").datetimepicker({
        lang:'ch',
        format:	'Y-m-d H:i',
        step:10,
        minDate: 0, // today,
        todayHighlight: true
    });

    $(".date").datetimepicker({
        lang:'ch',
        format: 'Y-m-d',
        step:10,
        todayHighlight: true,
        timepicker:false
    });
});