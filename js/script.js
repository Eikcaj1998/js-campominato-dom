console.log('JS OK')
/* Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica 
del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma
 solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di 
 stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà 
prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al
 massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista 
dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella 
si colora di rosso e la partita termina. Altrimenti la cella cliccata si 
colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge
 il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato 
    tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il 
numero di volte che l’utente ha cliccato su una cella che non era una bomba.


# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.


# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi 
tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti


# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba,
 controllando se il numero di cella è presente nell'array di bombe. Se si, 
 la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console
     che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare
      il punteggio.      
      
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo 
controllare se il punteggio incrementato ha raggiunto il punteggio massimo
 perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è
  scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)


# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata 
cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo.
 Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio
  adeguato in caso di vittoria o sconfitta.

  #BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una 
scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise
 in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 
9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 
7 caselle per 7 righe;


#SUPER BONUS
Se avete finito tutti i bonus potete scrivere all'insegnante o ai tutor per ricevere delle sfide extra! */


//prendo il bottone dal Dom
const playButton = document.getElementById('play-button');
// aggancio l'event listener
function play() {
    //trasformo il testo del button in 'ricomincia'
    this.innerText = 'Ricomincia!';
    //recupero la griglia
    const grid = document.getElementById('grid')

    //svuoto la griglia da eventualli contenuti precedenti 
    grid.innerHTML = '';
    
    //bouns: leggo il valore della tendina per ottenere il livello
    const level = document.getElementById('level-select').value;
    console.log(level);
    
    let rows;
    let cells;

    switch(level){
        case 'Hard':
        rows = 7;
        cells = 7;
        break;
        case 'Normal':
        rows = 9;
        cells = 9;
        break;
        case 'Easy':
        default:
        rows = 10;
        cells = 10;
        break;
    }
    let score = 0;
    const totalBombs = 16;

    const totalCells = rows * cells;
    //punteggio massimo
    const winningPoints = totalCells - totalBombs;


    // mostra il giusto messaggio ed il punteggio di fine partita
    function gameOver(score, hasWon , bombs){
        //costruiamo il messaggio
        const cells= document.querySelectorAll('.cell');

        for(let i = 0; i < cells.length;i++){
           const cellNumber= parseInt(cells[i].innerText)

        let className = bombs.includes(cellNumber) ? 'bomb':'safe'
            cells[i].classList.add('clicked',className);
        }

        let message = hasWon? 'Complimenti,Hai vinto: ' : 'hai perso'

            message +=`Hai totalizzato ${score}punti`
            alert (message)
    }
  /**
    * funzione che verifica se arriviamo al game over 
    * @param {node} cell la cella cliccata
    * @param {number[]} bombs l'array contiene le bombe
    * @param {number[]} score punteggio dell'utente fino a quel momento
    * @param {number[]} winningPoints il punteggio massimo raggiungibile
    * dall'utente
    * @returns {boolean} tru se e game over oppure false
    */ 
    function ceckGameOver (cell , bombs, score, winningPoints){
        //converto il testo della cella cliccata in number
        const cellNumber =parseInt(cell.innerText);

    //controllo se ha beccato una bomba
    if(bombs.includes(cellNumber)){
        cell.classList.add('bomb');
        gameOver(score, false, bombs);
        return true;
    }else{
        cell.classList.add('safe');
        // controlliamo se ha vinto
        if(score +1 === winningPoints){
            gameOver(winningPoints, true,bombs);
            return true;

        }
        return false;
    }
    }

  /**
 * funzione che genera 16+ numeru casuali diversi rappresentsnti le bombe 
 * @param {number} totalBombs numero massimo di numeri da generare
 * @param {number} totalCells numero massimo da randomizzare
 * @returns {number[]} un array di numeri rappresentanti le bombe
 */  
    function generateBombs(totalBombs,totalCells){
        const bombs = [];

        while(bombs.length < totalBombs){
        let randomNumber;
        do{
            randomNumber = Math.floor(Math.random() * totalCells) + 1;
        }
        while(bombs.includes(randomNumber));
        bombs.push(randomNumber);      
    }
        console.log(bombs);
        return bombs;
}
/**
 * funzione per creare una cella
 * @param {number} cellNumber il numero da stampare in cella
 * @param {number} cellPerRow il numero da stampare in cella
 * @returns {Node} un elemento div con classe cell
 */
    function createCell(cellNumber, cellsPerRow){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = cellNumber;

        //calcoliamo  le misure delle celle
        const sideLength = `calc(100% / ${cellsPerRow})`
        cell.style.height = sideLength;
        cell.style.width = sideLength;


        return cell ;
    }
    function  onCellClick(){
    //se gia cliccatp non procedere
    if(this.classList.contains('clicked'))return; 
       
    //se arrivi qui , aggiungi pure la classe
    this.classList.add('clicked');
    console.log(this.innerText);

    //
    const isGmeOver = ceckGameOver(this, bombs,score , winningPoints);
    if(!isGmeOver)score++
    console.log(score);
}
//genero bombe
const bombs = generateBombs(totalBombs , totalCells);

    for(let i = 1 ; i <= totalCells ; i++){
        //genero una cella
        const cell = createCell(i , cells)

        //gestisco il click della cella
        cell.addEventListener('click', onCellClick)  

        //appendo la cella alla griglia
        grid.appendChild(cell);

    }
}
//aggancio l'event listener
playButton.addEventListener('click', play)