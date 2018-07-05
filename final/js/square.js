var Square= function(){
    //方块数据，4*4的矩阵
    this.data = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    //原点
    this.origin = {
        x: 0,
        y: 0
    };
    //旋转方向
    this.dir = 0;
};

//判断方块是否可以旋转
Square.prototype.canRotate = function (isValid) {
    var d = (this.dir + 1) % 4;
    var text = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
   for(var i = 0; i<this.data.length; i++){
        for(var j = 0; j<this.data[0].length; j++){
            text[i][j] = this.rotates[d][i][j];
        }
   }
    return isValid(this.origin , text);
};

Square.prototype.rotate = function (num) {
    if(!num) num = 1;
    this.dir= (this.dir + num) % 4;
    for(var i = 0; i<this.data.length; i++){
        for(var j = 0; j<this.data[0].length; j++){
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
};
//判断方块是否可以下降
Square.prototype.canDown = function (isValid) {
    var text = {};
    text.x = this.origin.x + 1;
    text.y = this.origin.y;
    return isValid(text, this.data);
};
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
};
//判断方块是否可以左移
Square.prototype.canLeft = function (isValid) {
    var text = {};
    text.x = this.origin.x;
    text.y = this.origin.y - 1;
    return isValid(text, this.data);
};
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
};
//判断方块是否可以右移
Square.prototype.canRight = function (isValid) {
    var text = {};
    text.x = this.origin.x;
    text.y = this.origin.y + 1;
    return isValid(text, this.data);
};
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
};