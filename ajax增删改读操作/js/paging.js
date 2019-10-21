(function() {
    var static = {
        page: 1,
        perpage: 5,
        totalpage: 6,
        total: 36,
        callback: null
    }

    var lhPage = function(id, config) {

        var target = document.getElementById(id);

        var page = config.page || static.page;
        var perpage = config.perpage || static.perpage;
        var totalpage = 0;
        if (config.totalpage) {
            totalpage = config.totalpage;
        } else if (config.total) {
            totalpage = Math.ceil(config.total / perpage);
        } else {
            totalpage = static.totalpage;
        }

        var temp = '';
        if (page > 1) {
            temp += '<button class="prev">上一页</button>';
        } else {
            temp += '<button class="prev disabled" >上一页</button>';
        }
        for (var p = 1; p <= totalpage; p++) {
            var active = (p == page ? 'active' : '');
            temp += '<button class="' + active + '">' + p + '</button>';
        }
        if (page < totalpage) {
            temp += '<button class="next">下一页</button>';
        } else {
            temp += '<button class="next disabled" >下一页</button>';
        }


        target.innerHTML = temp;

        var btns = target.querySelectorAll('button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].onclick = function() {
                if (this.className.indexOf('disabled') > -1) return;
                if (this.className.indexOf('prev') > -1) {
                    page--;
                } else if (this.className.indexOf('next') > -1) {
                    page++;
                } else {
                    page = i;
                }
                config.page = page;
                config.callback && config.callback(page)
                lhPage(id, config);
            }
        }


    }
    window.lhPage = lhPage;
}());