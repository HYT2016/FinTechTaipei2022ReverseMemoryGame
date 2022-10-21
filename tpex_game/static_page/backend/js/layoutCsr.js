//-- 操控 ArticleBlock 的樣版，要顯示哪些欄位
//-- Category的name為CSR開頭的

//-- 共同固定顯示欄位 是否上線、排序、上下架時間

//-- CSR.Slogan-Slogan：                                 標題(繁英簡textarea)、次標題(繁英簡)
//-- CSR.TFPBT-上滿版圖片 + 下內文 (寬1920以上)：            內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LTRP50LT50-大標置左，右圖50% 左文50% (寬800以上)：  標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LTLP50RT50-大標置左，左圖50% 右文50% (寬800以上)：  標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LTLP40RT60-大標置左，左圖40% 右文60% (寬800以上)：  標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LTRP40LT60-大標置左，右圖40% 左文60% (寬800以上)：  標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LTFT2C-大標置左，滿版文字，並有兩欄式子內容：         標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LSTFT-小標置左，滿版文字：                         標題(繁英簡)、內容(繁英簡)、圖片(banner)、資料來源
//-- CSR.LSCol3H-小標置左，三欄式直方圖：                   標題(繁英簡)、資料來源
//-- CSR.DLNoYear-檔案下載列表 (不顯示年份)：               標題(繁英簡)、資料來源
//-- CSR.Columns3-三欄動態數字：                          資料來源

$(function (){
    //-- CSR版型 不使用 欄數(colNum)，固定隱藏
    $(".colNum").hide();
    $("textArea[name='titleZh'], textArea[name='titleEn'], textArea[name='titleCh']").prop("disabled", true);

    var currOptName = $("select[name='template'] option:selected").data("name");
    $("#tempName").val(currOptName);
    switchCols(currOptName);

    $("select[name='template']").on("change", function (){
        var optVal= $("select[name='template'] option:selected").val();
        var optName = $("select[name='template'] option:selected").data("name");
        $("#tempName").val(optName);
        switchCols(optName);
    });
});

//-- 配合版型切換欄位顯示
function switchCols(optName){
    if(["CSR.TFPBT", "CSR.Columns3", "CSR.Slogan"].includes(optName)){
        $(".title").hide();
    }else{
        $(".title").show();
    }

    if(["CSR.TFPBT","CSR.LTRP50LT50", "CSR.LTLP50RT50", "CSR.LTLP40RT60", "CSR.LTRP40LT60", "CSR.LTFT2C", "CSR.LSTFT"].includes(optName)){
        $(".content").show();
        $("div[class^='bx-attachment-'],div[class*=' bx-attachment-']").show();
    }else{
        $(".content").hide();
        $("div[class^='bx-attachment-'],div[class*=' bx-attachment-']").hide();
    }

    if(["CSR.Slogan"].includes(optName)){
        $("textArea[name='titleZh'], textArea[name='titleEn'], textArea[name='titleCh']").prop("disabled", false);
        $("input[name='titleZh'], input[name='titleEn'], input[name='titleCh']").prop("disabled", true);
        $(".areaTitle, .subTitle").show();
    }else{
        $("textArea[name='titleZh'], textArea[name='titleEn'], textArea[name='titleCh']").prop("disabled", true);
        $("input[name='titleZh'], input[name='titleEn'], input[name='titleCh']").prop("disabled", false);
        $(".areaTitle, .subTitle").hide();
    }
}

