// main.js
window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 定义气泡半径范围
    const minRadius = 20;
    const maxRadius = 80;

    // 创建气泡
    let bubbles = [];

    function generateBubble() {
        let radius = minRadius + Math.random() * (maxRadius - minRadius);
        let x = radius + Math.random() * (canvasWidth - 2 * radius);
        let y = radius + Math.random() * (canvasHeight - 2 * radius);

        // 检查是否与已有气泡重叠
        for (let i = 0; i < bubbles.length; i++) {
            let dx = x - bubbles[i].x;
            let dy = y - bubbles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < radius + bubbles[i].radius) {
                // 重叠,重新生成气泡
                return generateBubble();
            }
        }

        // 不重叠,返回新气泡
        return { x, y, radius };
    }

    // 生成8个气泡
    for (let i = 0; i < 8; i++) {
        bubbles.push(generateBubble());
    }

    // 绘制气泡
    function drawBubbles() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < bubbles.length; i++) {
            ctx.beginPath();
            ctx.arc(bubbles[i].x, bubbles[i].y, bubbles[i].radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    // 初始绘制
    drawBubbles();
};