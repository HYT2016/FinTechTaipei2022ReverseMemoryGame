//-- 操控 ArticleBlock 的樣版，要顯示哪些欄位
//-- Category的name為Single開頭的

//-- 共同固定顯示欄位 是否上線、排序、上下架時間

//-- Single.FullPic-滿版圖片(寬1920以上)：                      圖片(banner)
//-- Single.RTLP50RT50-大標置右，左圖50% 右文50% (寬800以上)：   標題(繁英簡)、內容(繁英簡)、圖片(banner)
//-- Single.LTRP40LT60-大標置左，右圖40% 左文60% (寬800以上)：   標題(繁英簡)、內容(繁英簡)、圖片(banner)
//-- Single.LTFT2C-大標置左，滿版文字，並有兩欄式子內容：          標題(繁英簡)、內容(繁英簡)
//-- Single.RTFT2C-大標置右，滿版文字，並有兩欄式子內容：          標題(繁英簡)、內容(繁英簡)
//-- Single.LTTFT-大標置左，滿版文字：                         標題(繁英簡)、內容(繁英簡)
//-- Single.ApplyForm-應徵表單：                             標題(繁英簡)、內容(繁英簡)
//-- Single.TLCSR-大標 加 項目連結 (CSR 首頁版型)：             標題(繁英簡)、資料來源
//-- Single.DLNoYear-檔案下載列表 (不顯示年份)：                標題(繁英簡)、資料來源
//-- Single.Columns3-三欄動態數字：                           資料來源
$(function(){
    //-- 單欄版型 不使用 欄數(colNum)、次標題(subTitle)、標題(輸入格式為areaTitle)，固定隱藏
    $(".colNum, .subTitle, .areaTitle").hide();
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
    if(["Single.FullPic","Single.RTLP50RT50","Single.LTRP40LT60"].includes(optName)){
        $("div[class^='bx-attachment-'],div[class*=' bx-attachment-']").show();
    }else{
        $("div[class^='bx-attachment-'],div[class*=' bx-attachment-']").hide();
    }

    if(["Single.FullPic"].includes(optName)){
        $(".title, .content, .source").hide();
    }

    if(["Single.RTLP50RT50","Single.LTRP40LT60","Single.LTFT2C","Single.RTFT2C","Single.LTTFT","Single.ApplyForm"].includes(optName)){
        $(".title, .content").show();
    }

    if(["Single.DLNoYear"].includes(optName)){
        $(".title, .source").show();
        $(".content").hide();
    }

    if(["Single.TLCSR"].includes(optName)){
        $(".title").show();
        $(".source").show();
        $(".content").hide();
    }

    if(["Single.Columns3"].includes(optName)){
        $(".title, .content").hide();
        $(".source").show();
    }
}