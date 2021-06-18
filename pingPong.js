var pontoj1= 0;
var pontoj2 = 0;
var key = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}
var mover = {
    mover2: 100,
    mover: 100,
    SPEED: 5,
}
var bola= {
    posicaoY:150,
    posicaoX : 350,
    dirX : -1, 
    dirY:-1,
    mod : 0.2,
    speed : 4 
}
var keyp = [];

/*qual tecla foi presionada*/ 
document.addEventListener("keyup", parar);
document.addEventListener("keydown", precionar);
/*andar*/ 
function precionar(event) {

    keyp[event.keyCode] = true;
}
/*parar*/
function parar(event) {
    keyp[event.keyCode] = false;
}


/*função para mover jogardor. verifica qual tecla foi selecionada*/
function moverJogador() {
    moverBola();
    if (keyp[key.DOWN]) {
        if (mover.mover2 < 226) {
            mover.mover2 += mover.SPEED;
            document.getElementById("jogador2").style.top = mover.mover2 + "px";
        }
    } else if (keyp[key.UP]) {
        if (mover.mover2 > 0) {
            mover.mover2 -= mover.SPEED;
            document.getElementById("jogador2").style.top = mover.mover2 + "px";
        }
    }
    if (keyp[key.S]) {
       if(mover.mover < 226){
        mover.mover += mover.SPEED;
        document.getElementById("jogador1").style.top = mover.mover + "px"; 
       }
    }else if (keyp[key.W]) {
        if (mover.mover > 0) {
            mover.mover -= mover.SPEED;
            document.getElementById("jogador1").style.top = mover.mover + "px";
        }
}
}


/*mover a bola e colisão com jogador*/
function moverBola(){
    /*assim que a bola colidir com o jogador a bola muda de diração*/ 

    if(bola.posicaoX < 27 && bola.posicaoY >= mover.mover && bola.posicaoY <= mover.mover + 70){
        /*bola diraão x = 1 para a bola mover na direção positiva, no eixo X;*/ 
        bola.dirX = 1; 
        /*sempre que a bola bater no jogador 1, aumenta a velocidade da bola*/
        bola.speed += bola.mod
        
    }
    else if (bola.posicaoX > 668 && bola.posicaoY >= mover.mover2 && bola.posicaoY <= mover.mover2 + 70){
        /*bola diraão x = 1 para a bola mover na direção negativa, no eixo X*/ 
        bola.dirX = -1 
    }

    /*caso a bola bater em baixo ou em cima, movmentação no eixo Y. caso bata em cima vai para baixo*/
    if(bola.posicaoY <= 1){
      bola.dirY = 1
    }else if (bola.posicaoY >= 299){
        bola.dirY = -1
    }
    /*calculo para definir posição da bola*/ 
    bola.posicaoY = (bola.speed * bola.dirY)+ bola.posicaoY;
    bola.posicaoX =  (bola.speed *  bola.dirX) + bola.posicaoX ;
    
    /*movimento da bola*/
    document.getElementById("ball").style.left = bola.posicaoX + "px";
    document.getElementById("ball").style.top = bola.posicaoY + "px";
    
    /*caso a bola passar por algum jogador, setar ponto*/
    if(bola.posicaoX < 10){
          ++pontoj2;
          newGmae("p")
    }
    else if(bola.posicaoX > 690){
        ++pontoj1;
        newGmae("player 1")
    }   
}
  

function newGmae(ponto){
  if(ponto == "player 1"){
      document.getElementById("ponto").innerHTML = pontoj1;
      recomecar(-1)
  }else{
    document.getElementById("ponto2").innerHTML = pontoj2;
    recomecar(1)
  }
}
function recomecar(dir){
     bola.speed = 4;
     bola.posicaoX = 350;
     bola.posicaoY = 150;
     bola.dirX =dir;
     document.getElementById("ball").style.left = bola.posicaoX +"px";
     document.getElementById("ball").style.top = bola.posicaoY +"px";

}
setInterval(moverJogador, 20);
