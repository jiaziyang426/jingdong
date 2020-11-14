//获取详情中的商品信息
console.log(location.search);
let arr = location.search;
let arr1 = arr.split("=");
console.log(arr1[1]);
$.ajax({
    type: "get", //请求方式
    url: "http://jx.xuzhixiang.top/ap/api/detail.php",
    data: {
        id: arr1[1]
    },
    success: function(data) {
        console.log(data.data)
        let a = data.data;
        img.src = a.pimg;
        console.log(a.pname);
        $("#name").html(a.pname)
        $("h2").html(a.pprice)
    }
})




//点击添加商品 给用户购物车中添加商品 
let uid = localStorage.getItem("a");

let pid = arr1[1];
$(".btn").click(function() {
    let pnum = $('.ipt').val();
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/add-product.php",
        data: {
            uid,
            pid,
            pnum
        },
        success: function(res) {
            console.log(res);
            alert("添加成功")
            location.href = "cart.html"
        }
    });
})