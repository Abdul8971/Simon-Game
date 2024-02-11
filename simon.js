let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let highScore=0;
let h2=document.querySelector("h2")

document.addEventListener("keypress",function(){
    if(started==false){
        // console.log("game started");
        started=true;
        levelUp()
    }
   
})

function levelUp(){
    userSeq=[];
    level++
    h2.innerText=`level ${level}`
    let h3=document.querySelector("h3")
    highScore = Math.max(highScore, level - 1);
    h3.innerText =`High score ${highScore}`
    let color=["red","green","yellow","purple"]
    let randomNum=Math.floor(Math.random()*4)
    let randomColor=color[randomNum]
    let randomBtn=document.querySelector(`.${randomColor}`)
    btnFlash(randomBtn)
    saveData(highScore)
   
}


function checkAnswer(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(function(){
                levelUp()
                // saveData()
            },1000);
        }
 
    }else{
        h2.innerText=`Game Over! Your score was ${level} Press any key to start`
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white "
        },250)
        // saveData()
        reset()
    }
}

// function highestValue(){
//         let p=document.querySelector("p")
//     //     // const score = level
//     if(currentscore>highestScore){
//         highestScore=currentscore
//         p.innerText=`heighest Score : ${highestScore}`
//         currentscore=0;
//    }
// }


function btnFlash(randomBtn){
    setTimeout(function(){
        randomBtn.classList.add("flash")
        gameSeq.push(randomBtn.classList[1])
        // console.log(gameSeq)
    },100)
    setTimeout(function(){
        randomBtn.classList.remove("flash")
    },300)
}

let btns=document.querySelectorAll(".btn")

btns.forEach(function(btn){
    btn.addEventListener("click",function(){
        btn.classList.add("btnClicked")
        setTimeout(function(){
            btn.classList.remove("btnClicked")
        },200)
        userSeq.push(btn.classList[1])
        // console.log(userSeq)
        checkAnswer(userSeq.length-1)
    })
})

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

let highestScore=document.querySelector("h3")
//saving highest score 

function   saveData(highScore){
    localStorage.setItem("data",highestScore.innerText);
}

function showTask(){
    highestScore.innerText=localStorage.getItem("data");
}
showTask();