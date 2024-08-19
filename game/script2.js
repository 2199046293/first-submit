const canvas = document.getElementById('canvas');  
const ctx = canvas.getContext('2d');  

const ballRadius = 20;  
const ballPadding = 10;  
const ballsPerRow = 10; // 每行的小球数量  
const totalBalls = 18; // 生成的小球总数  

function calculateBoxSize(numBalls, ballsPerRow) {  
    const rows = Math.ceil(numBalls / ballsPerRow); // 计算行数  
    const boxWidth = ballsPerRow * (ballRadius * 2 + ballPadding);  
    const boxHeight = rows * (ballRadius * 2 + ballPadding);  
    return { boxWidth, boxHeight };  
}  

function drawBalls() {  
    const { boxWidth, boxHeight } = calculateBoxSize(totalBalls, ballsPerRow);  
    
    // 清空画布  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    
    // 计算盒子的位置  
    const boxX = (canvas.width - boxWidth) / 2;  
    const boxY = (canvas.height - boxHeight) / 2;  

    // 绘制盒子  
    ctx.strokeStyle = 'black';  
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);  

    // 绘制小球  
    for (let i = 0; i < totalBalls; i++) {  
        const row = Math.floor(i / ballsPerRow);  
        const col = i % ballsPerRow;  
        const x = boxX + col * (ballRadius * 2 + ballPadding) + ballRadius;  
        const y = boxY + row * (ballRadius * 2 + ballPadding) + ballRadius;  
        
        ctx.fillStyle = 'green';  
        ctx.beginPath();  
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);  
        ctx.fill();  
    }  
}  

// 绘制小球和盒子  
drawBalls();