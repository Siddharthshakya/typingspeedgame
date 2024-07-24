const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');



//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph= ["The best way to compile inaccurate information that no one wants is to make it up.","It is better to know some of the questions than all of the answers."," If you find serenity and happiness, some people may be jealous. Be happy anyway.", "Good company and good discourse are the very sinews of virtue.","The people who are regarded as moral luminaries are those who forego ordinary pleasures themselves and find compensation in interfering with the pleasures of others.",  "Don't give advice. It will come back and bite you in the [butt].", "Don't take anyone's advice. So, my advice to you is to be true to yourself and everything will be fine.", "The greatest pleasure in life is doing what people say you cannot do.","Lorem ipsum dolor sit amet consectetur adipisicing elit.","Doloremque, dolor neque quos totam earum iure quibusdam?"];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML-'';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{
        input.focus()})
}

//Handle user input
function initTyping(){
   const char = typingText.querySelectorAll('span');
   const typedChar = input.value.charAt(charIndex);
   if(charIndex < char.length && timeLeft >0){
     
    if(!isTyping){
        timer = setInterval(initTime,1000);
        isTyping = true;
    }

    if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add('correct');
        console.log("correct");
    } else{
        mistake++;
        char[charIndex].classList.add('incorrect');
        console.log("incorrect");
    }
    charIndex++;
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
   } 
   else{
    clearInterval(timer);
    input.value='';
   }
  
}
function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText-timeLeft;
        const wpmVal = Math.round(((charIndex - mistake)/5)/ (maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value ='';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);

loadParagraph();