let url = "http://jx.xuzhixiang.top/ap/api/login.php"


$("#sub").click(function() {
    // console.log(11);
    let username = $('#zh').val()
    let password = $('#pd').val()
    $.ajax({
        url,
        type: "get",
        data: {
            username,
            password
        },
        success: res => {
            console.log(res.data.id);
            alert("登录成功");
            location.href = "home.html"
            localStorage.setItem('uid', res.data.id)
            localStorage.setItem('username', zh.value)

        }
    })
})