var Local = function () {
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 300;
    //定义定时器
    var timer = null;
    //时间计时器
    var timeCount = 0;
    //总时间
    var time = 0;
    //绑定键盘事件
    var bindKeyEvent = function (){
        document.onkeydown = function (e) {
              if(e.keyCode == 38){//up
                  game.rotate();
              }else if(e.keyCode == 39){//right
                  game.right();
              }else if(e.keyCode == 40){//down
                  game.down();
              }else if(e.keyCode == 37){//left
                  game.left();
              }else if(e.keyCode == 32){//space
                  game.fall();
              }else if(e.keyCode == 16){
                  game.stop();
              }
        }
    };

    //方块移动
    var move = function () {
        timeFunc();
        if(!game.down()) {
            game.fixd();
            var line = game.checkClear();
            if(line){
                game.addScore(line);
            }
            var gameOver = game.checkGameOver();
            if(gameOver){
                stop();
            }else {
                game.performNext(generateType(), generateDir());
            }
        }
    };
    //随机生成一个方块种类
    var generateType = function () {
        return Math.ceil(Math.random()*7) - 1;
    };
    //计时函数
    var timeFunc = function () {
        timeCount =timeCount + 1;
        if(timeCount ==5){
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
        }
    } 
    //随机生成一个方块旋转次数
    var generateDir = function () {
        return Math.ceil(Math.random()*4) - 1;
    };
    //开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
            timeDiv: document.getElementById('time'),
            scoreDiv: document.getElementById('score')
        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    };
    //结束
    var stop = function () {
        if(timer){
            clearInterval(timer);
            timer = null;
            alert('游戏结束');
        }
        document.onkeydown = null;
    };
    //到处开始ApI
    this.start = start;
};