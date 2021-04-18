let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let sx =  8 * box, sy = 8 * box;

let direction = "right";

snake[0] = {
    x: sx, 
    y: sy
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){ 
    /* Cria background */
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box);
    /*16*box pq 16*32 = 512 = tamanho da tela lá no html*/
}

function criarCobrinha(){
    /* Desenha a cobrinha */
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/* Recebe a tecla apertada e chama a função update com o valor */
document.addEventListener('keydown', update);

function update(event){
    /* Recebe a tecla apertada e muda a direção apenas quando
    ela não é o extremo posto da atual */
    if(event.keyCode == 37 && direction != "right")
        direction = "left";
    
    if(event.keyCode == 38 && direction != "down")
        direction = "up";

    if(event.keyCode == 39 && direction != "left")
        direction = "right";

    if(event.keyCode == 40 && direction!= "up")
        direction = "down";       
}

function drawFood(){
    /* Desenha a comida */
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box);
}

function attFood(){
    /* Gera outra coordenada aleatoria para a comida */
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

function atravessaParede() {
    
    /* Se a cabeça da cobrinha atravessar alguma parede,
    seta ela para o extremo oposto */

    if(snake[0].x > 15 * box)
        snake[0].x = 0;
    if(snake[0].x < 0)
        snake[0].x = 16 * box;

    if(snake[0].y > 15 * box)
        snake[0].y = 0;
    if(snake[0].y < 0)
        snake[0].y = 16 * box;

}

function verificaColisao() {
    /* Verifica se a cabeça se chocou com outra parte. 
    Se sim, entao encerra. */
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            alert("Game over!!!!");
            clearInterval(inicia);
        }
    }
}

function attDirection() {
    if(direction == "right")
        sx += box;
    if(direction == "left")
        sx -= box;
    if(direction == "up")
        sy -= box;
    if(direction == "down")
        sy += box;
}

function iniciarJogo(){

    if(snake[0].x > 15 * box)
        snake[0].x = 0;
    if(snake[0].x < 0)
        snake[0].x = 16 * box;

    if(snake[0].y > 15 * box)
        snake[0].y = 0;
    if(snake[0].y < 0)
        snake[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    drawFood();

    sx = snake[0].x;
    sy = snake[0].y;

    attDirection();

    let newHead = {
        x: sx,
        y: sy
    }

    /*Unshift add newHead na frente de todos os valores do array snake*/
    snake.unshift(newHead);
    
    /* Se pegar a comida, então a cobrinha cresce e gera outra comida.
    Pra crescer é só não apagar a ultima posição */

    if(snake[0].x != food.x || snake[0].y != food.y)
        snake.pop();
    else {
        /*Função pra gerar outra comida*/
        attFood();
    }

    verificaColisao();
  
}

/* Atualiza a tela a cada 75ms chamando novamente a função */
let inicia = setInterval(iniciarJogo, 75);