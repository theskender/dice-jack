/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// IDEMO PRVI PROJEKT !!!!!!
// New CSS button I added to see rules
function ruleBook() {
    alert('Game rules: \n - 2 players, playing in rounds. In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score. \n - BUT, if the player rolls a 1, all his ROUND score gets lost. \n - After that, it\'s the next player\'s turn. The player can choose to "Hold", which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn. \n - The first player to reach 50 points (or however much you set!) on GLOBAL score wins the game!');
}



/* LEKCIJA 1 */

var scores, roundScore, activePlayer, dice, winCondition, gamePlaying, wins, roundlength, dark;

scores = [0,0];
roundScore = 0;  // odjednom postoji 1
activePlayer = 1;  // 0 će biti player 1, 1 će biti player 2
// vezati će se jedno na drugo, pozivati će elemente Arraya gore
wins = [0,0];
roundlength = 50;
dark = false;

// Sad ćemo koristiti Math object, koji je niš drugo nego ugrađeni JS objekt s hrpom ugrađenih Methoda i konstanti
// Math.random ko u Excelu baca između 0 i 1
// Math.floor je method koji briše sve iza decimalne točke

dice = Math.floor((Math.random()*6))+1;  // +1 jer bi ovako nam davalo raspon 0 - 5
console.log(dice);

// Document je objekt, nadobjekt koji ima svoje methods kojima možemo manipulirati čitavim objektom
// Querry Selector - identično selektiranje kao CSS


init();  // Deklarirana na dnu, sve vraća na nulu
//document.querySelector('#current-' + activePlayer).textContent = dice;  // query selectamo promijenjivog akt igrača
// .textContent je method kojim postavljamo plain tekst, ali ne radi za HTML čitavi
// .innerHTML ako trebam html cijeli napisati
//        document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
  // stringovi da js parser zna da <em> nije html kod, a kad baci taj em u HTML, naglasit će ga, skužit da je to tag opet


// querySelector možemo koristiti i da pročitamo neku vrijednost i spremimo ju u varijablu
  //  var x = document.querySelector('#score-0').textContent;
  //  console.log(x);
// Query selector radi kao "setter" i kao "getter", može postavljati i čitati vrijednost

// Ne želimo vidjeti kocku kad te pokrećemo igricu, a pošto možemo i manipulirati CSS s querySelectorom...
// Npr postaviti display property nekog objekta na 'none'
//document.querySelector('.dice').style.display = 'none';  // klasa a ne ID, pa je sad '.dice'





// Postavi sve elemente iz HTML-a na 0:
// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';



/* LEKCIJA 2 */
// Events - notifikacije koje notificiraju naš kod da se nešto desilo na stranici (click, resize, open window, scroll, press key)
// Event listener - pasivna funkcija koja čeka da se neki event dogodi
// Kada se event za koji on čeka dogodi, eventListener postaje aktivni kontekst izvršenja





// argumenti u zagradi event listenera: (događaj, funkcija koju događaj poziva)
// CALLBACK FUNCTION ovdje funkcija nema zagrade jer je to callback funkcija, tj ne pozivamo ju mi u kodu nego ju poziva druga funkcija koja biva triggerana eventom, da smo prije definirali neku funkciju 'btn':
        // document.querySelector('.btn-roll').addEventListener('click', btn);
// ANONYMOUS FUNCTION bi bilo da smo napisali funkciju direktno u zagradu ('click', function(){})
        //anonymous function jer nema ime, pišemo ju direktno, slično kao function expression

        document.querySelector('.btn-roll').addEventListener('click', function(){
    // 1. Random number
    var dice = Math.floor((Math.random()*6))+1;

    document.querySelector('.btn-len').style.display = 'none';
    // 2. Display result
    document.querySelector('.dice').style.display = 'block'; // da opet postane vidljiv
    document.querySelector('.dice').src = 'dice-' + dice + '.png';  // generiramo filename slike da čupa, lukavo smo nazvali slike
    if (document.querySelector('.dice').classList.contains('disappear')){
      document.querySelector('.dice').classList.toggle('disappear');}
      document.querySelector('.btn-hold').innerHTML = '<i class="ion-ios-download-outline"></i>HOLD';
    // 3. Update the round score IF the rolled number was NOT 1

    if (dice !== 1 && document.querySelector('.btn-roll').innerHTML !== '<i class="ion-ios-loop"></i>NEXT PLAYER') 
    {
      // add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      winCondition = roundScore + scores[activePlayer];
    } else if (dice == 1 && document.querySelector('.btn-roll').innerHTML !== '<i class="ion-ios-loop"></i>NEXT PLAYER' ) 
    {
      // next player, plus switch current to "Bust!"
      
      document.querySelector('#current-' + activePlayer).textContent = '0';
      winCondition = roundScore + scores[activePlayer];
      roundScore = 0;
      document.querySelector('.btn-roll').innerHTML = '<i class="ion-ios-loop"></i>NEXT PLAYER';
      document.querySelector('.dice').classList.toggle('disappear');
      
      
      
      

    
    // document.querySelector('.dice').style.display = 'none';

    // Next player semi-step
    } else if (document.querySelector('.btn-roll').innerHTML == '<i class="ion-ios-loop"></i>NEXT PLAYER')
    {
      
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // change player
      document.querySelector('.btn-roll').innerHTML = '<i class="ion-ios-loop"></i>ROLL DICE';
      document.querySelector('.dice').classList.toggle('disappear');
      
      //HTML klase za označiti aktivnog playera
      if (activePlayer == 1) { 
        // change which panel have 'active' class
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');

        //dark mode!!!
        if (dark == true) {
          document.querySelector('.player-0-panel').classList.remove('active-dark');
          document.querySelector('.player-1-panel').classList.add('active-dark');
        }


        // dark mode selector
        // document.querySelector('.custom-switch').classList.remove('custom-control');
        document.querySelector('.custom-switch').classList.add('custom-control2');

      } else if (activePlayer == 0) {
        
        // change which panel have 'active' class
        document.querySelector('.player-1-panel').classList.toggle('active'); // toggle briše ak ima i dodaje ak nema
        document.querySelector('.player-0-panel').classList.toggle('active');


        if (dark == true) {
          document.querySelector('.player-1-panel').classList.remove('active-dark');
          document.querySelector('.player-0-panel').classList.add('active-dark');
        }



        // dark mode selector
        // document.querySelector('.custom-switch').classList.add('custom-control');
        document.querySelector('.custom-switch').classList.remove('custom-control2');
      }
    }

});



// KAJ ŽELIMO:
// iskoristi for petlju iz playera koja regulira da svaki drugi klik radi nešto drugi, npr
// if (i=2 && dice = 1) {pretvori gumb za bacanje kocke u next player, i tek klik na next player će prebacit}
// Onda imaš prostora za animaciju plus međukorak gdje ti je kocka nevidljiva da sljedeći player ne baca na kocku od prošloga






// Hold button
// Koristi scores array! i koristi active player var za popunit!
// Open anonymous function jer ju nećemo definitivno nigdje koristit drugdje kad je jedinstvena za gumb taj
document.querySelector('.btn-hold').addEventListener('click', function(){
  if (document.querySelector('.btn-roll').innerHTML !== '<i class="ion-ios-loop"></i>NEXT PLAYER' && roundScore !== 0 && winCondition < roundlength) {

  
  document.querySelector('#current-' + activePlayer).textContent = '0';
  scores[activePlayer] = scores[activePlayer] + roundScore;     
  roundScore = 0;
  document.querySelector('.btn-roll').innerHTML = '<i class="ion-ios-loop"></i>NEXT PLAYER';
  document.querySelector('.dice').classList.toggle('disappear');
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];


  
} else if (roundScore == 0){
  
  if (document.querySelector('.btn-roll').innerHTML !== '<i class="ion-ios-loop"></i>NEXT PLAYER') 
  {

  
  document.querySelector('.btn-hold').innerHTML = '<i class="ion-ios-download-outline"></i>PLEASE ROLL';
  document.querySelector('.ion-ios-download-outline').classList.toggle('shake');
} else if (document.querySelector('.btn-roll').innerHTML == '<i class="ion-ios-loop"></i>NEXT PLAYER') {
  document.querySelector('.btn-hold').innerHTML = '<i class="ion-ios-download-outline"></i>NEXT PLAYER!';
  document.querySelector('.ion-ios-download-outline').classList.toggle('shake');
}
} else if (winCondition >= roundlength && roundScore !== 0) {
  // inherited, što se događa ovako i onako (spremanje scorea)
  document.querySelector('#current-' + activePlayer).textContent = '0';
  scores[activePlayer] = scores[activePlayer] + roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];



  // Novo, što se dogodi kod pobjede, većina ovog je DRY za New Game (toggle)
  document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
  document.querySelector('.btn-roll').style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'none';
  document.querySelector('.btn-rules').style.display = 'none';
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
  if (dark == true) {
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner-dark');
  }
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  document.querySelector('#name-' + activePlayer).classList.toggle('shakeWin');
  document.querySelector('.dice').classList.toggle('disappear');
  document.querySelector('.btn-new').classList.toggle('bigFont');
  document.querySelector('.btn-len').style.display = 'block';
  document.querySelector('.btn-len').classList.add('lenAfter');

  wins[activePlayer] += 1;
}




})


// New game
document.querySelector('.btn-new').addEventListener('click', init);





// Pokretanje igre
function init () {
  if (dark == false) {
    document.querySelector('.main').classList.add('wrapper');
    document.querySelector('.main').classList.remove('wrapper-dark');
  } else if (dark == true) {
    document.querySelector('.main').classList.add('wrapper-dark');
    document.querySelector('.main').classList.remove('wrapper');
  }
  
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-rules').style.display = 'block';
  document.querySelector('.btn-len').style.display = 'block';
  document.querySelector('.btn-len').classList.remove('lenAfter');

  document.querySelector('#ppw').textContent = 'Points to win: ' + roundlength;


  document.querySelector('.btn-new').classList.remove('bigFont');


  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');


  document.querySelector('#name-' + activePlayer).classList.remove('shakeWin');
  document.getElementById('name-0').innerHTML = 'Player 1';
  document.getElementById('name-1').innerHTML = 'Player 2';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
scores = [0,0];
roundScore = 0;
//activePlayer = 0;

 activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
if (activePlayer == 1) { 
  // za vizualnu promjenu aktivnog igrača (active klasa preko panela)
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');

  // za dark mode element
  // document.querySelector('.custom-switch').classList.remove('custom-control');
  document.querySelector('.custom-switch').classList.add('custom-control2');

} else if (activePlayer == 0) {
  document.querySelector('.player-1-panel').classList.remove('active'); // toggle briše ak ima i dodaje ak nema
  document.querySelector('.player-0-panel').classList.add('active');
  // opet isto to ali za Dark mode element
  // document.querySelector('.custom-switch').classList.add('custom-control');
  document.querySelector('.custom-switch').classList.remove('custom-control2');
}

document.querySelector('.dice').style.display = 'none'; 

document.querySelector('#wins-0').textContent = 'Wins: ' + wins[0];
document.querySelector('#wins-1').textContent = 'Wins: ' + wins[1];


}

// Round lenght selecor btn
var kll = 0;
document.querySelector('.btn-len').addEventListener('click', function(){
  kll = prompt('How many points ends the game?');
  kll = parseInt(kll);
  // document.querySelector('.btn-len').style.display = 'none';
  if (isNaN(kll) == false) {
    roundlength = kll;
    document.querySelector('#ppw').textContent = 'Points to win: ' + roundlength;
  } else if (isNaN(kll) == true) {
    roundlength = 25;
    document.querySelector('#ppw').textContent = 'Please enter a number, reverting to default: ' + roundlength;
  }
  
}
)



// Dark mode switch
// $('#customSwitch1').on('change.Bootstrapswitch', darkMode);


// function darkMode() {
//   var i = 0;
//   dark == true ? dark = false : dark = true;
//   var x = document.querySelectorAll('.player-current-box');
//   var y = document.querySelectorAll('.player-current-label');
//   var xy = document.querySelectorAll('.player-score');
//   var yx = document.querySelectorAll('.player-name');
//   for (i = 0; i < x.length; i++) {
//   x[i].classList.toggle('player-current-box-dark');
//   y[i].classList.toggle('player-current-label-dark');
//   xy[i].classList.toggle('player-score-dark');
//   yx[i].classList.toggle('player-name-dark');
// }
  
  

//   if(dark = true) {
//     document.querySelector('.active').classList.add('active-dark');
//     document.querySelector('.main').classList.remove('wrapper');
//     document.querySelector('.main').classList.add('wrapper-dark');
    
//   } else if(dark = false) {
//     document.querySelector('.player-1-panel').classList.remove('active-dark');
//     document.querySelector('.player-0-panel').classList.remove('active-dark');
//     document.querySelector('.main').classList.remove('wrapper-dark');
//     document.querySelector('.main').classList.add('wrapper');
//   }
  


// }