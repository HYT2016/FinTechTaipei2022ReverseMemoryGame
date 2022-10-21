$().ready(function (){
    $(".collapse").on('show.bs.collapse', function (e){
        let date = $(e.target).data('date');
        console.log(date);
        $.ajaxSetup({
            async: false,
            error: (jqXHR, textStatus, errorThrown) => {
                // console.log(errorThrown+' in ' + jqXHR.url);
            }
        });
        $.getJSON("win/" + date + ".json", function(json) {
            if(json.size === 0){
                return false;
            }
            let target = $(e.target);
            let html = '<div class="card-body">';
            json.forEach(function(data){
                let prizeName = '';
                switch (data.prize){
                    case '3':
                        prizeName = '週週早鳥獎';
                        break;
                    case '2':
                        prizeName = '週週抽好禮獎';
                        break;
                    case '1':
                        prizeName = '幸運抽大獎';
                        break;
                }
                html += prizeName + '&nbsp;' + data.name + '&nbsp;' + data.phone + '<br>';
            });
            html += '</div>'
            target.html(html);
        }).fail(function(){
            // console.log("can't get winner list.");
            return false;
        });
    });
})
