

// 基本逻辑：
// 实现功能1： 页面渲染：创建12个小球，每个小球随机生成红蓝绿三种颜色之一，当一种颜色的小球数量达到4个时，则重新选择颜色，确保每种颜色的颜色的小球都有4个
//实现功能2： 点击事件：当点击小球时，将其从篮子里面删掉，同时在槽里面找到一个空槽，将点击的小球克隆一份放入槽中，当非空小槽的数量大于等于3时候，判断它的上一个小槽以及上上个小槽中放的小球的颜色跟它是否相同，如果相同，则从槽容器中将这三个小球给删除掉。
//实现功能4： 移出功能：当点击移出按钮时，判断是否可以移出，可以则移出最后一个小球，并将其克隆到篮子中，否则显示提示框，提示观看30秒广告后才能继续移出，点击确定，看30秒广告，点取消，不会显示广告，但是再次点击移出按钮仍然无法移出，只有当计时器计时结束才能有移出机会。
// 实现功能5： 广告提示：点击计时器上的取消按钮时，跳出提示框，观看30秒广告才能移出。
// 初始化小球，初始化页面，随机生成12个4种颜色的小球  start
const colors = ['color1', 'color2', 'color3']; // 定义小球的颜色数组
const colorCounts = { color1: 0, color2: 0, color3: 0 }; // 记录每种颜色的小球数量
let time1=undefined;
let scores;
let level=0;
let ballcounts=12
function generateBalls() {
    // 定义颜色
    const colors = ['color1', 'color2', 'color3']; // 定义小球的颜色数组
    // 初始化一个数组来保存小球
    let balls = [];

    // 循环为每种颜色添加小球
    for (let color of colors) {
        // 计算每种颜色需要多少个小球
        let count = Math.floor((50 / colors.length) / 3) * 3;
        // 将小球添加到数组中
        for (let i = 0; i < count; i++) {
            balls.push({ color: color });
        }
    }

    // 返回小球数组
    return balls;
}


// 随机返回colors数组中的颜色的函数，确保每种颜色的小球不超过4个，利用对象来记录颜色数量，
function getRandomColor() {
    let color;
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (colorCounts[color] > 3); // 如果该颜色的小球数量已经达到4个，则重新选择颜色
    colorCounts[color]++; // 增加该颜色小球的数量
    return color;
}

const itemsContainer = document.querySelector('.items'); // 获取小球容器

// 创建12个小球，设计每个小球的颜色，并设计类名

function initShow(step,count){
    scores=step*20
    document.getElementById('next-level-count').innerHTML=`你的分数为:${scores}分`
    for(let i=0;i<count;i++){
        const ball = document.createElement('div'); // 创建小球元素
        ball.innerHTML = '🐏'; // 设置小球的显示内容
        // // 生成小球
        let ballArray = generateBalls();
        ballArray.sort(function() {
            return Math.random() - 0.5;
        });
        ball.className = `item ${ballArray[i].color}`; // 设置小球的类名
        // ball.style.backgroundColor = ballArray[i].color;
        itemsContainer.appendChild(ball); // 将小球添加到容器中
    }

}


initShow(level,ballcounts)

//end 生成小球结束

const basket = document.getElementById('basket'); // 获取篮子元素
let items = document.querySelectorAll('.item'); // 获取所有小球元素
items = Array.from(items); // 将NodeList转换为数组

const slotContainer = document.querySelector('.slot-container'); // 获取槽容器
let slots = slotContainer.children; // 获取所有槽
slots = Array.from(slots); // 将HTMLCollection转换为数组
let hasClickedOnce = false; // 记录是否已经点击过移除按钮
let adPlaying = false; // 记录广告是否正在播放

//end
//这是关卡2的函数
// for(let i=0;i<50;i++){
//    let div= document.createElement('div');
//    let ball= document.querySelector('.box').appendChild(div)
//    document.body.style.display='flex';
//    ball.style.width = '50px';
//    ball.style.height = '50px';
//    ball.style.borderRadius = '50%';
//    ball.classList.add('ball');
// }
//end

window.onload = function() {
    

// 显示广告的函数，第一次可以点击，第二次点击就需要看广告，只有广告结束，才能继续点击1次，当点击第2次的时候，遮罩加计时器窗口显示广告。
// 只有看了30秒广告，遮罩消失，可以点击移出按钮，但凡30秒计时任务没有结束，都不会获取移出的机会。
//点击计时器窗口的关闭窗口，跳出提示框，必须等待30秒结束。
    function showAd() {
        adPlaying = true; // 设置广告正在播放
        const overlay = document.getElementById('overlay'); // 获取遮罩层
        overlay.style.display = 'flex'; // 显示遮罩层

        const timerElement = document.getElementById('timer'); // 获取计时器元素
        let timeLeft = 8; // 设置广告时长

        // 设置计时器
        const intervalId = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(intervalId); // 清除计时器
                adPlaying = false; // 设置广告结束
                hasClickedOnce = false; // 重置点击状态
                overlay.style.display = 'none'; // 隐藏遮罩层
                console.log('可以再次移除');
            } else {
                timerElement.textContent = timeLeft--; // 更新计时器显示
            }
        }, 1000);

        // 关闭广告的点击事件
        document.querySelector('.close-ad').addEventListener('click', () => {
            if (timeLeft > 0) {
            //   confirm('确定要关闭广告吗？'); // 提示等待广告结束
              alert('请等待广告结束后再关闭');
            } else {
                clearInterval(intervalId); // 清除计时器
                overlay.style.display = 'none'; // 隐藏遮罩层
            }
        });
    }

// 事件委派，页面点击事件监听，如果点击的是小球，判断所有小槽中是否有小球，即是否有子节点，如果全都有小球，return终止后面代码的执行，只有至少有一个小槽为空，则可以点击小球，实现移除功能，否则不能从篮子里面将小球移除。同时，在空小槽中加入对应颜色的小球
//小槽判断，当槽中的数量大于等于3时，判断上一个槽和上上个槽中放的小球的颜色跟点击的小球是否相同，如果相同，则删除这3个小球。
    document.addEventListener('click', (event) => {
        const target = event.target; // 获取点击目标
        // 如果点击的是小球
        if (target.classList.contains('item')) {
           if(slots.every((slot,i,slots)=>{
               return slot.hasChildNodes()
            })){
            //    target.disabled=true;
               //终止事件的执行，这个return表示终止的是当前点击的item事件的执行,将不会继续item事件中后面程序的执行，而非整个dom节点。
                return;
            }
            target.classList.remove('glow-and-grow');
        
            // 强制重绘
            void target.offsetWidth;

            // 添加动画效果
            target.classList.add('glow-and-grow');
            target.remove(); // 移除小球
            if(itemsContainer.children.length== 0){
               document.getElementById('next-level').style.display='block'
               setTimeout(()=>{
                 document.getElementById('next-level').style.display='none'
                 
               },1000)
               level++
               ballcounts=ballcounts+12
                initShow(level,ballcounts)
           }else{
             console.log('桌面还没被清空')
            }
            console.log('点击的小球被移除');

            // 获取当前小球的颜色
            const clickedItemColor = target.classList[1];
            let slotFound = false;

            // 寻找空槽并放入小球
            for (let slot of slots) {
            // slots.forEach((slot,i,slots)=>{
                if (!slot.hasChildNodes()) {
                        slot.appendChild(target);
                        slotFound = true;
                        break; 
                }
            }

            // 如果找到空槽
            if (slotFound) {
                let colors = [];
                for (let slot of slots) {
                    if (slot.hasChildNodes()) {
                        colors.push(slot.firstChild.classList[1]);
                    }
                }

//难点： 每添加了一个小球，判断上一个小球和上上一个小球是否有相同颜色，有则删除这3个小球：从后往前寻找非空小槽，每次判断小槽的颜色是否跟点击小球的颜色相同，只判断3次，利用了一个count++计时，当count<3时可以删除同颜色的小球，限制只删除三个同颜色的小球，且是连续的小球。jquery ui库，实现抖动消失的效果。target.remove()方法，从父节点删除点击的小球，在购物车中是利用filter过滤的函数删除内容，也可以用父节点.removeChild()方法，但是remove()方法更简单一点。
if (colors.length >= 3 && colors.slice(-3).every(color => color === clickedItemColor)) {  
    // Remove up to three consecutive balls of the same color  
    const targetColor = clickedItemColor;  
    let removedCount = 0;  
    const removeBall = (slot) => {  
        return new Promise((resolve) => {  
            const audio = new Audio('./puff.mp3');
            $(slot.firstChild).effect("puff", { pieces: 20 }, 500, () => {  
                audio.play(); 
                setTimeout(() => {
                    slot.removeChild(slot.firstChild); 
                    audio.pause();  
                    audio.currentTime = 0;
                    resolve();    
                }, 100);  
            });  
        });  
    };  
    
    const removeBalls = async () => {  
        const removalPromises = [];  
    
        for (let i = slots.length - 1; i >= 0; i--) {  
            const slot = slots[i];  
            if (slot.hasChildNodes() && slot.firstChild.classList.contains(targetColor)) {  
                if (removedCount < 3) {  
                    removalPromises.push(removeBall(slot));  
                    removedCount++;  
                }  
            }  
        }  
    
        // 等待所有的 removeBall Promise 完成  
        await Promise.all(removalPromises);  
    };  
    
    removeBalls();  
}
            }
        }

        // 如果点击的是移除按钮
        else if (target.classList.contains('remove-action')) {
            if (!hasClickedOnce) {
                // 第一次点击，直接允许移除
                hasClickedOnce = true;
                console.log('可以直接移除');
            } else if (!adPlaying) {
                // 第二次点击，显示提示框
                const shouldContinue = confirm('请观看30秒广告后才能继续移出');
                if (!shouldContinue) {
                    return;
                }
                showAd(); // 显示广告
            }

            // 找到有子节点的槽，移除最后一个子节点，并将其克隆到itemsContainer中
            let arr = slots.filter(slot => slot.hasChildNodes());
            const child = arr[arr.length - 1].lastChild.cloneNode(true);
            itemsContainer.appendChild(child);
            arr[arr.length - 1].removeChild(arr[arr.length - 1].lastChild);
            console.log('移除成功');
        }
        else if(target.classList.contains('daluan-action')){
            console.log('点击了打劫按钮')
            //刷新一下itemsContainer现有里面小球的颜色
            let arr = itemsContainer.children;
            arr=Array.from(arr);
           let test= arr.map(item=>{
                return item.classList[1]
            })
            test.sort(function() {
                return Math.random() - 0.5;
            });
            console.log(test)
            arr.forEach((item,index)=>{
                item.classList.remove(item.classList[1])
                item.classList.add(test[index])
            }) 
        }
})
}

//随机生成3种不同颜色的小球，要求小球的数量是50个，且每种颜色的小球的数量是3的倍数，帮我写一个js逻辑

