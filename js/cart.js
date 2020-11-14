//查询用户购物车中的商品
let id = localStorage.getItem("a")
let arr
    // console.log(id);
$.ajax({
    type: "get",
    url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
    data: {
        id,
    },
    success: function(res) {
        // console.log(res.data);
        arr = res.data
        let html = "";
        $.each(arr, function(i, v) {
            // console.log(i, v);
            // console.log(v.pnum);
            html += `
          
            <li>
                <input type="checkbox"class="dan-sel" del-pid="${v.pid}">
                <img src="${v.pimg}" alt="">
                <p>${v.pname}</p>
                <p>${v.pprice}</p>
                <div>
                   
                    <button class="input1"del-pid="${v.pid}">增加</button>

                    <input type="text" value="${v.pnum}" class="input2"del-pid="${v.pid}">

                 
                    <button class="input3" del-pid="${v.pid}">减少</button>
                </div>
                <button class="button" del-pid="${v.pid}">删除</button>
            </li>
            
            `

        });
        $(".list").html(html)
        deleteDate()
        updateCart()
        selFn()


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

//给购物车按钮加点击
function updateCart() {
    let input2 = document.querySelectorAll('.input2')
    let inputadds = document.querySelectorAll('.input1')
    let inputsubs = document.querySelectorAll('.input3')
    inputadds.forEach((inputadd) => {
        // console.log(inputadd);
        inputadd.onclick = async function() {
            // console.log(inputadd);
            // console.log(inputadd.nextElementSibling.value);
            let num = parseInt(inputadd.nextElementSibling.value) + 1;
            // console.log(num);
            inputadd.nextElementSibling.value = num
            let pid = inputadd.getAttribute('del-pid')
                // console.log(pid);
                // console.log(arr);
            let pobj = arr.find((v) => v.pid == pid);
            // console.log(pobj);
            let num2 = parseInt(pobj.pnum) + 1;
            // console.log(num2)
            let url1 = `http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=${id}&pid=${pid}&pnum=${num2}`
                // let params = {
                //     uid: id,
                //     pid,
                //     pnum: num2
                // }
            try {
                let res = await axios.get(url1)
                    // console.log(res)
                inputadd.nextElementSibling.value = num2;
                pobj.pnum = num2;
            } catch (error) {
                console.log(error)
            }
            // console.log(num2);
            countPrice()
                // cc()
        }

    })


    //添加商品
    inputsubs.forEach((inputsub) => {
        // console.log(inputadd);
        inputsub.onclick = async function() {
            // console.log(inputadd);
            // console.log(inputsub.previousElementSibling.value);
            let num = parseInt(inputsub.previousElementSibling.value) - 1;
            // console.log(num);
            if (num >= 1) {
                inputsub.previousElementSibling.value = num
            }

            let pid = inputsub.getAttribute('del-pid')
                // console.log(pid);

            let pobj = arr.find((v) => v.pid == pid);
            // console.log(pobj);
            let num2 = parseInt(pobj.pnum) - 1;
            if (num2 == 0) {
                return;
            }
            let url1 = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php'
            let params = {
                uid: id,
                pid,
                pnum: num2
            }
            try {
                let res = await axios.get(url1, {
                    params
                })
                inputsub.previousElementSibling.value = num2;
                pobj.pnum = num2;

            } catch (error) {
                console.log(error)
            }
            countPrice()
        }

    })



}

//全选框
function selFn() {
    let allsel = document.querySelector('#all-sel'); //多选框
    // console.log(allsel);
    let dansels = document.querySelectorAll('.dan-sel'); //单选框

    // console.log(dansels);
    allsel.checked = false;
    allsel.onchange = function() {
        // console.log(allsel.checked);
        $(".dan-sel").prop('checked', $("#all-sel").prop('checked'))

        countPrice()


    };
    $(".dan-sel").change(function() {
        let id = $(this).attr("del-pid");
        console.log(id);
        $(this).prop('checked')
        console.log($(this).prop('checked'));
        let ppot = arr.find(v => v.pid == id)
        console.log(ppot);
        ppot.checked = $(this).prop('checked')
        let flag = arr.every(v => v.checked == true)
        $("#all-sel").prop("checked", flag)
            // let allFlag = arr.every(v => v.checked == true)
            // console.log(allFlag);
            // $('#all-sel').prop('checked', allFlag)
        countPrice()
    })
}
//     var allFlag
//     dansels.forEach((dansel) => {
//         dansel.onchange = function() {
//             let pid = dansel.getAttribute('del-pid')
//             console.log(pid);
//             let pobj = arr.find(v => v.pid == pid);
//             pobj.checked = dansel.checked;

//             countPrice()

//             allFlag = []
//             allFlag = arr.every(v => v.checked == true)
//             allsel.checked = allFlag
//         }
//     })
//     allsel.checked = allFlag
// }
//判断多选

// $.each($(".list li #dan-sel"), (i, v) => {
//     if (v.checked == true) {
//         $("#all-sel").prop('checked', true)
//     }
// })

// //////////////////////////////////////////////////////////////////////

function countPrice() {
    let countNum = 0;
    arr.forEach((v) => {
        if (v.checked == true) {
            countNum += parseInt(v.pnum);
        }
    });
    // console.log(countNum);
    let cn = document.querySelector('#count-num');
    cn.innerHTML = countNum;

    let countPrice = 0;
    arr.forEach((v) => {
        if (v.checked == true) {
            countPrice += parseInt(v.pnum) * v.pprice;
        }
    });
    console.log(countPrice);
    let cp = document.querySelector('#count-price')
    cp.innerHTML = "￥" + parseInt(countPrice);
}