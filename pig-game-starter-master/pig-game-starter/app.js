/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Selecting Elements
const player0El = document.querySelector('.player-0-panel');
player0El.classList.add('hidden');
const player1El = document.querySelector('.player-1-panel');
player1El.classList.add('hidden');
const score0El = document.getElementById('score-0'); 
const score1El = document.getElementById('score-1'); 
const current0El = document.getElementById('current-0'); 
const current1El = document.getElementById('current-1');

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

const btnNew = document.querySelector('.btn-new');
btnNew.classList.add('hidden');

const btnRoll = document.querySelector('.btn-roll');
btnRoll.classList.add('hidden');

const btnHold = document.querySelector('.btn-hold');
btnHold.classList.add('hidden');

const btnTarget = document.querySelector('.btn-target');
btnTarget.classList.add('hidden');

// const conffeti = document.getElementById('canvas');
// conffeti.classList.add('hidden');

const btnStart = document.querySelector('.btn-start');
const btnBack = document.getElementById('hideform');
const start = document.getElementById('startGame');

let formP1 = document.getElementById('player1_name');
let formP2 = document.getElementById('player2_name');
let formP3 = document.getElementById('raceto');

[formP1, formP2, formP3].forEach(element => {
  element.addEventListener('focusout', () => {
    element.value ? element.classList.add("has-value") : element.classList.remove("has-value")
  })
});

let scores, currentScore, activePlayer, playing;

// formP1.textContent = p1namelabel;

const rollingDice = new Audio('rolling_dice.mp3');
const winningSound = new Audio('winning_sound.mp3');
const lossingSound = new Audio('lossing_sound.wav');

const formElem = document.getElementById('form');

// submit handler
formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();
});

// if (!this.form_p1_name.value ||
//     !this.form_p2_name.value ||
//     !this.form_target_score_isvalid) {
//     return null;
// }

document.querySelector(".initial-panel-form").style.display = "none"

start.addEventListener('click', () => {
  diceEl.classList.remove('hidden');
  btnNew.classList.remove('hidden');
  btnTarget.classList.remove('hidden');
  btnRoll.style.visibility = "visible";
  btnHold.style.visibility = "visible";
  player0El.classList.remove('hidden');
  player1El.classList.remove('hidden');
  document.querySelector('.initial-panel').style.display = "none";
  
  let formP1 = document.getElementById('player1_name').value;
  let formP2 = document.getElementById('player2_name').value;
  let formP3 = document.getElementById('raceto').value;

  document.getElementById('name-0').innerHTML = formP1;
  document.getElementById('name-1').innerHTML = formP2;
  let raceTo = document.querySelector('.btn-target');
  raceTo.childNodes[1].textContent = `Race TO ${formP3}`
})

//Start Button
btnStart.addEventListener('click', () => {
  document.querySelector(".initial-panel-navigation").style.display = "none";
  document.querySelector(".initial-panel-form").style.display = "";

  init();
});

btnBack.addEventListener('click', () => {
  document.querySelector(".initial-panel-navigation").style.display = "";
  document.querySelector(".initial-panel-form").style.display = "none";
});

// Rolling dice functionality 
btnRoll.addEventListener('click', () => { 
    if (playing) {

      // 1. Generating a random dice roll 
      const dice = Math.trunc(Math.random() * 6) + 1;
    
      // 2. Display dice 
      // diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`; 
    
      // 3. Check for rolled 1 
      if (dice !== 1) { 
        
        // Add dice to current score 
        currentScore += dice; 
        document.getElementById( 
          `current-${activePlayer}` 
        ).textContent = currentScore;
      } else { 
        
        // Lossing Sound
        lossingSound.play()
        
        // Switch to next player 
        switchPlayer()

      } 
    };

    document.querySelector(".dice").className = "dice";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelector(".dice").className = "dice changing";
      });
    });

    // Sound Effect
    rollingDice.play();
  });

  const switchPlayer = () => { 
    document.getElementById(`current-${activePlayer}`).textContent = 0; 
    currentScore = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0; 
    player0El.classList.toggle('active'); 
    player1El.classList.toggle('active');
  };

  btnHold.addEventListener('click', () => { 
    if (playing) { 
      
      // 1. Add current score to active player's score 
      scores[activePlayer] += currentScore; 
      // scores[1] = scores[1] + currentScore 
    
      document.getElementById(`score-${activePlayer}`) 
        .textContent = scores[activePlayer];

      let formP3 = document.getElementById('raceto').value;

      // 2. Check if player's score is >= 100 
      if (scores[activePlayer] >= `${formP3}`) { 
        
        // Finish the game 
        playing = false; 
        diceEl.classList.add('hidden');

        // conffeti.classList.remove('hidden');

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

        document.getElementById(`score-${activePlayer}`).style.display = "none"
        document.getElementById(`box1`).style.display = "none"
        document.getElementById(`box2`).style.display = "none"

        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');

        // Winning Sound
        winningSound.play()

        // Conffeti Effect
        let canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        document.querySelector('.winner').appendChild(canvas)
        const canvasEl = document.getElementById('canvas');
        const w = canvasEl.width = window.innerWidth;
        const h = canvasEl.height = window.innerHeight * 2;
        
        function loop() {
          requestAnimationFrame(loop);
          ctx.clearRect(0,0,w,h);
          
          confs.forEach((conf) => {
          conf.update();
          conf.draw();
        })
      }
      
      function Confetti () {
        
        //construct confetti
        const colours = ['#fde132', '#009bde', '#ff6b00'];
        this.x = Math.round(Math.random() * w);
        this.y = Math.round(Math.random() * h)-(h/2);
        this.rotation = Math.random()*360;
        
        const size = Math.random()*(w/60);
        this.size = size < 15 ? 15 : size;
        this.color = colours[Math.floor(colours.length * Math.random())];
        this.speed = this.size/7;
        this.opacity = Math.random();
        this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
      }

      Confetti.prototype.border = function() {
        if (this.y >= h) {
          this.y = h;
        }
      }

      Confetti.prototype.update = function() {
        this.y += this.speed;
  
        if (this.y <= h) {
          this.x += this.shiftDirection/3;
          this.rotation += this.shiftDirection*this.speed/100;
        }

        if (this.y > h) this.border();
      };

      Confetti.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
      };

      const ctx = canvasEl.getContext('2d');
      const confNum = Math.floor(w / 4);
      const confs = new Array(confNum).fill().map(_ => new Confetti());

      loop();
  
    } else { 
        
        // Switch to the next player 
        switchPlayer(); 
      } 
    } 
  });
  
// Starting conditions 
const init = function () { 
    scores = [0, 0]; 
    currentScore = 0; 
    activePlayer = 0; 
    playing = true; 
    
    score0El.textContent = 0; 
    score1El.textContent = 0; 
    current0El.textContent = 0; 
    current1El.textContent = 0; 
    
    // diceEl.classList.add('hidden'); 
    player0El.classList.remove('winner'); 
    player1El.classList.remove('winner'); 
    player0El.classList.add('active'); 
    player1El.classList.remove('active');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');

    winningSound.pause();
    winningSound.currentTime = 0;

    let canvas = document.getElementById('canvas');
    canvas.remove();

    document.getElementById(`score-0`).style.display = ""
    document.getElementById(`score-1`).style.display = ""
    document.getElementById(`box1`).style.display = ""
    document.getElementById(`box2`).style.display = ""
  }; 

  btnNew.addEventListener('click', init);