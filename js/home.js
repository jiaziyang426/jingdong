let cunid = localStorage.getItem("a"); //获取
console.log(cunid); //获取自己的id
$.ajax({
    type: "get",
    url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
    data: {
        uid: cunid //本地存储取出来的用户id
    }, //不止一个

    success: function(res) {
        console.log(res.data); //商品数据
        let arr = res.data
        let html = ""
        $.each(arr, function(i, v) {
            // console.log(i, v);  //i是下标  v是产品值·
            html += `
            <li>
                <a href="item.html?pid=${v.pid}">
                    <img src="${v.pimg}" alt="">
                    <span>${v.pname}
                    </span>
                    <b>￥${v.pprice}</b>
                </a>
            </li>
            `
        });
        $(".liebiao").html(html)
    }
});