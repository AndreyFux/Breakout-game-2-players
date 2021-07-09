//СОЗДАЕМ ПЛОЩАДЬ ДЛЯ ИГРЫ И  ЗАДАЕМ КООРДИНАТЫ
	var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;

    //ПЕРВЫЙ ИГРОК

    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth) / 2;

    var rightPressed = false;
    var leftPressed = false;

    //ВТОРОЙ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX1 = (canvas.width-paddleWidth) / 2;

    var rightPressed1 = false;
    var leftPressed1 = false;

    //КОНЕЦ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ДЛЯ ВТОРОГО


    //ПЕРЕМЕННЫЕ ДЛЯ ИГРОВОГО СЧЕТА

    let scoreRed = 0;
    let scoreGreen = 0;
    let scoreDiv;
    let ScoreRed;
    let ScoreBlue; 
    let getMainDiv;

    let numberOfPointsRed = 0;
    let numberOfPointsBlue = 0;
    function resetScoreRed(){
        // удаляем табло, перерисовываем его и добавляем одно очко
        document.querySelector('#score').remove();
        numberOfPointsRed++;
        x = canvas.width/2;
        y = canvas.height-300;
        createGameScore();
    }

    function resetScoreBlue(){
        // удаляем табло, перерисовываем его и добавляем одно очко
        document.querySelector('#score').remove();
        numberOfPointsBlue++;
        x = canvas.width/2;
        y = canvas.height-20;
        createGameScore();
    }

    function createGameScore(){
        scoreDiv = document.createElement('div');
        getMainDiv = document.getElementById('mainDiv');
        getMainDiv.appendChild(scoreDiv);
        scoreDiv.id = "score";
        scoreRed = document.createElement('span');
        scoreBlue = document.createElement('span');

        scoreRedBox = document.createElement('div');
        scoreBlueBox = document.createElement('div');

        scoreDiv.append(scoreBlueBox);
        scoreDiv.append(scoreRedBox);
        scoreRedBox.append(scoreRed);
        scoreBlueBox.append(scoreBlue);

        scoreDiv.style.width = "200px";
        scoreDiv.style.height = "140px";
        scoreDiv.style.border= "1px solid black";
        scoreDiv.style.borderRadius ="10px";
        scoreDiv.style.marginTop = "30px";
        scoreDiv.style.display = "flex"; 
        scoreDiv.style.flexDirection = "column";
        scoreDiv.style.alignItems =  "center";
        scoreDiv.style.justifyContent =  "center"; 
            
        scoreBlueBox.style.width = "130px";
        scoreBlueBox.innerHTML = `<h2>Синий: ${numberOfPointsBlue}</h2> `;
        scoreBlueBox.style.color = "blue";
        scoreBlueBox.style.marginTop = "0";

        scoreRedBox.style.height = "40px";
        scoreRedBox.style.width = "170px";
        scoreRedBox.innerHTML = `<h2>Красный: ${numberOfPointsRed}</h2>`;
        scoreRedBox.style.color = "red";
        

    }
    
    function drawBall(){ //РИСУЕТ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ МЯЧА
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {  //РИСУЕТ НИЖНЕГО ИГРОКА
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle1() { //РИСУЕТ ВЕРХНЕГО ИГРОКА
    ctx.beginPath();
    ctx.rect(paddleX1, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

    function draw() {  //ВЫПОЛНЕНИЕ ВСЕХ ФУНКЦИЙ И ПРОВЕРКА НА УДАР ОБ СТЕНКУ И ОТБИВАНИЕ МЯЧА ОБ ИГРОКОВ
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawPaddle1();
        x += dx;
        y += dy;
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;    
        }
        if(y + dy === canvas.height-ballRadius) { // ПРОВЕРКА НА ПРОИГРЫШ СНИЗУ
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                resetScoreRed();
                console.log("у красного" + numberOfPointsRed + "очков");
                console.log(numberOfPointsRed); 
            }
        }


        if( y + dy === ballRadius) {   // ПРОВЕРКА НА ПРОИГРЫШ СВЕРХУ
                        
            if(x > paddleX1 && x < paddleX1 + paddleWidth) {
                dy = -dy;
            }
            else {
                resetScoreBlue();
                console.log("у синего " + numberOfPointsBlue + "очков");   
            }
            
        }

        if(rightPressed) { //ДВИЖЕНИЕ ИГРОКА
            paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
            }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }

        if(rightPressed1) { //ДВИЖЕНИЕ ИГРОКА
            paddleX1 += 7;
        if (paddleX1 + paddleWidth > canvas.width){
            paddleX1 = canvas.width - paddleWidth;
        }
        }
        else if(leftPressed1) {
            paddleX1 -= 7;
        if (paddleX1 < 0){
                paddleX1 = 0;
        }
        }
}

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    document.addEventListener("keydown", keyDownHandler1, false);
    document.addEventListener("keyup", keyUpHandler1, false);

    function keyDownHandler(e) {
        if(e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "ArrowLeft") {
            leftPressed = true;
        }
        }

    function keyUpHandler(e) {
        if(e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function keyDownHandler1(e) {
    if(e.key == "d" || e.key == "в") {
        rightPressed1 = true;
    }
    else if(e.key == "a" || e.key == "ф") {
        leftPressed1 = true;
    }
}

function keyUpHandler1(e) {

    if(e.key == "d" || e.key == "в") {
        rightPressed1 = false;
    }
    else if(e.key == "a" || e.key == "ф") {
        leftPressed1 = false;
    }
}

     var interval = setInterval(draw, 10);
     createGameScore();