//查询用户购物车中的商品
let id = localStorage.getItem("a")
console.log(id);
$.ajax({
    type: "get",
    url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
    data: {
        id,
    },
    success: function(res) {
        console.log(res.data);
        let arr = res.data
        let html = "";
        $.each(arr, function(i, v) {
            console.log(i, v);
            html += `
          
            <li>
                <input type="checkbox">
                <img src="${v.pimg}" alt="">
                <p>${v.pname}</p>
                <p>${v.pprice}</p>
                <div>
                    <input type="button" value="+" class="input1">
                    <input type="text" value="1" class="input2">
                    <input type="button" value="-" class="input3">
                </div>
                <button class="button" del-pid="${v.pid}">删除</button>
            </li>
            
            `

        });
        $(".list").html(html)
        deleteDate()
    }
});
//--------删除------
function deleteDate() {
    $(".button").click(function(e) {
        if (e.target.classList.contains("button")) {
            e.target.parentNode.remove()
            let pid = e.target.getAttribute("del-pid")
            $.ajax({
                url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                type: "get",
                data: {
                    uid: id,
                    pid
                },
                success: res => {
                    console.log(res);
                    // lengthDate()
                    location.reload()
                }
            })
        }
    })

}