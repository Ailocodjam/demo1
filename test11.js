$(document).ready(function(){
    var libar = new Libra($("#libra")),
        BALL_COUNT = 12,
        r = Math.floor(Math.random()*BALL_COUNT); 
    
    result_ball_list = [];
    
    for(var i=0;i<BALL_COUNT;i++){
        idx = i+1;  
        ball = new Ball(libra,$("#balls ul"),idx);
        if(i==r){
            ball.rndWeight(); 
            libra.r_ball = ball;
        }
        result_ball_list.push(["<option value='>"+idx+"'>",idx,"'>"].join(""));
    }

    $("#ball-idx").html(result_ball_list.join('\n'));

    $("#btn-submit").click(function(){
        ...  
    });
    
    //....

    

});


var Libra = function(id){
        
}

function Ball(libra,parent,idx){
    this.libra = libra;
    this.parent = parent;
    this.idx = idx;
    this.weight = 10;
    //...
    this.init();

}
Ball.r = 30;

Ball.prototype = {
    init:function(){
                       
    }

};
