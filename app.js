// cache the DOM

let userScore = 0;
let computerScore = 0;
const userScore_span =  document.getElementById("user-score");
const computerScore_span =  document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div  = document.getElementById("p");
const scissors_div  = document.getElementById("s");

function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter){
    if(letter === "r") return "Rock";
    if(letter === "p") return "Paper";
    else return "Scissors";
}

function win(userChoice, computerChoice){

    const userChoice_div = document.getElementById(userChoice);
    //update user score and result message
    userScore++;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You Win !`;

    //add green glow to score board and user choice button
    scoreBoard_div.classList.add('green-glow');
    userChoice_div.classList.add('green-glow');

    //remove green glow from score board and user choice button 
    setTimeout(() => {
        userChoice_div.classList.remove('green-glow');
        scoreBoard_div.classList.remove('green-glow');
    }, 300);

}

function lose(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);

    //update computer score and result message
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} loses to ${convertToWord(computerChoice)}. You Lost !`;

    //add red glow to score board and user choice button
    scoreBoard_div.classList.add('red-glow');
    userChoice_div.classList.add('red-glow');

    //remove red glow from score board and user choice button 
    setTimeout(() => {
        userChoice_div.classList.remove('red-glow');
        scoreBoard_div.classList.remove('red-glow');
    }, 300);
}

function draw(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);

    //update result message
   result_p.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. It's a draw !`;

   //add gray glow to score board and user choice button
   scoreBoard_div.classList.add('gray-glow');
   userChoice_div.classList.add('gray-glow');

   //remove gray glow from score board and user choice button 
   setTimeout(() => {
       userChoice_div.classList.remove('gray-glow');
       scoreBoard_div.classList.remove('gray-glow');
   }, 300);
}
 
function game(userChoice){
    const computerChoice =  getComputerChoice();
    
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;

        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;

        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

function main(){

    rock_div.addEventListener('click', () => game('r'));
    
    paper_div.addEventListener('click', () => game('p'));
    
    scissors_div.addEventListener('click', () =>game('s'));
}

main();