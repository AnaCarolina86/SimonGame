var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var levelList = [0];

var startGame = false;
var level = 0;

$(document).keypress(function() { //when any keyboard is pressed it calls nextSequence
    
    if(!startGame){
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;
    }                
});

$(".btn").on("click", function(){

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour); //store the buttons that the use clicks   
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
        
});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }                
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        levelList.push(level);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("h3").text("Maximum score is " + maxScore(levelList));
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    playSequence(gamePattern);
               
}

function playSequence(gamePattern) {
    
    for(let i=1; i<gamePattern.length+1; i++){
        
        setTimeout(function() {
            playSound(gamePattern[i-1]);
            animatePress(gamePattern[i-1]);      
        }, 1000*i);          
    }
}

function startOver(){
    
    level = 0;
    gamePattern = [];
    startGame = false;
}

function compareNumbers(a, b) {
    return a - b;
}

function maxScore(levelList){

    levelList.sort(compareNumbers);
    console.log(levelList);
    return levelList[levelList.length - 1];
}

$(".reset").on("click", function(){
    levelList = [];
    $("h3").text(" ");
});

// Play Sounds and effects
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
      

