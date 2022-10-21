$(".btn1").click(
    function() {
        $(this).text("gogogo");
        $(this).addClass(".buyed");
    window.location.assign("https://www.tpex.org.tw/web/psb/");
    }
);

$(".btn2").click(
    function() {
        $(this).text("gogogo");
        $(this).addClass(".buyed");
    window.location.assign("https://www.tpex.org.tw/web/bond/sustainability/index.php?l=zh-tw");
    }
);
setTimeout(
    function() {
        $(".btn1").css("visibility", "visible");
        $(".btn2").css("visibility", "visible");
    }  
,1);
