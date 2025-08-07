let nb
const mode = document.querySelector('.mode');
const buttons = document.querySelectorAll('.zone button');
const gameZone = document.querySelector('.game-zone');
let board = [];
let firstGame = true;
let startTime;
let timerInterval;
const timer = document.querySelector('#timer');
const victoryspot = document.querySelector('.abs')
const victoire = document.querySelector('.victoire')
const victorytext = document.querySelector('.victoire h1')
const replays = document.querySelectorAll('div.replay')

let soundOn = true;

mute.addEventListener('click', ()=>{
    if(soundOn){
        soundOn = false
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>'
    }else{
        soundOn = true
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160 64 160c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l67.8 0L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448l0-384z"/></svg>'
    }
});

const playSound = (soundName)=>{
    if(!soundOn) return;

    const son = new Audio('sound_effect/'+soundName+'.mp3')
    son.play()
}

if(!('bestTime' in localStorage)){
    localStorage.setItem('bestTime', '01:30');
};

if(!('bestTime4' in localStorage)){
    localStorage.setItem('bestTime4', '03:30');
}
let bestTime = localStorage.getItem('bestTime');
let bestTime4 = localStorage.getItem('bestTime4')
const btime = document.querySelector('.btime');
const btime2 = document.querySelector('.btime2');
btime.textContent = bestTime;
btime2.textContent = bestTime4;

const startTimer = ()=>{
    startTime = Date.now()
    timerInterval = setInterval(updateTime, 1000);
};

const convertSec = (duree)=>{
    const [minutes, seconds] = duree.split(':').map(Number)
    return minutes * 60 + seconds
};

const updateTime = ()=>{
    const now = Date.now()
    const time = Math.floor((now - startTime) / 1000)

    const min = Math.floor(time / 60)
    const sec = time % 60

    const formMin = min.toString().padStart(2,'0')
    const formSec = sec.toString().padStart(2,'0')

    timer.textContent = `${formMin}:${formSec}`
};

document.addEventListener('DOMContentLoaded', ()=>{
    mode.style.transform = 'translate(0,0)';
});

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        gameZone.innerHTML = ''

        board = [];

        startTimer();

        if (button.classList.contains('x3')){
            nb = 3;
        }else{
            nb = 4;
        };

        const shuffle = (moves)=>{
            let emptyIndex = board.indexOf(nb ** 2);

            for(let i=0; i<moves; i++){
                const x = emptyIndex % nb;
                const y = Math.floor(emptyIndex / nb);

                const vois = [];

                if(x>0) vois.push(emptyIndex - 1);
                if(x<nb-1) vois.push(emptyIndex+1);
                if(y>0) vois.push(emptyIndex-nb);
                if(y<nb-1) vois.push(emptyIndex+nb);

                const randVois = vois[Math.floor(Math.random() * vois.length)];

                [board[emptyIndex], board[randVois]] = [board[randVois], board[emptyIndex]];
                emptyIndex = randVois;
            }
        }

        gameZone.style.gridTemplateColumns = `repeat(${nb}, 1fr)`;
        gameZone.style.gridTemplateRows = `repeat(${nb}, 1fr)`;

        for(let i = 0; i<(nb ** 2); i++){
            board.push(i+1);
        }

        shuffle(200);

        board.forEach(val =>{
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = val;

            if(val === nb ** 2){
                tile.classList.add('empty');
            }

            gameZone.appendChild(tile)
        })

        gameZone.addEventListener('click', (e) => {
            const clickedTile = e.target;
            if (!clickedTile.classList.contains('tile') || clickedTile.classList.contains('empty')) return;

            const tiles = Array.from(document.querySelectorAll('.tile'));
            const emptyTile = document.querySelector('.tile.empty');

            const clickedIndex = tiles.indexOf(clickedTile);
            const emptyIndex = tiles.indexOf(emptyTile);

            const x1 = clickedIndex % nb;
            const y1 = Math.floor(clickedIndex / nb);

            const x2 = emptyIndex % nb;
            const y2 = Math.floor(emptyIndex / nb);

            const dx = Math.abs(x1 - x2);
            const dy = Math.abs(y1 - y2);

        // Vérifie si la case cliquée est voisine de la case vide
            if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
                playSound('move')
                const emptyData = parseInt(emptyTile.dataset.index, 10);
                const clickedData = parseInt(clickedTile.dataset.index, 10);
                // Échange les classes 'empty' et le background
                emptyTile.classList.remove('empty');
                clickedTile.classList.add('empty');

                emptyTile.dataset.index = clickedData;
                clickedTile.dataset.index = emptyData;

                // Échange les styles de background
                const tempBg = clickedTile.style.backgroundPosition;
                clickedTile.style.backgroundPosition = '';
                emptyTile.style.backgroundPosition = tempBg;
            }

            [board[clickedIndex], board[emptyIndex]] = [board[emptyIndex], board[clickedIndex]];


            const solved = tiles.every((tile, index)=>{
                return parseInt(tile.dataset.index, 10) === index+1;
            })

            if(solved){
                setTimeout(() => {
                    victoryspot.style.transform = 'scale(1)'
                }, 550)
                clearInterval(timerInterval);
                let newTime = timer.textContent;
                if(nb === 3){
                    if(convertSec(newTime) < convertSec(bestTime)){
                        bestTime = newTime
                        localStorage.setItem('bestTime', newTime)
                        playSound('new_record');
                        victorytext.textContent = 'Nouveau record !'
                        victorytext.style.color = 'goldenrod'
                        victoire.style.borderColor = 'goldenrod'
                    }else{
                        playSound('victory');
                        victorytext.textContent = 'Victoire !!!'
                        victorytext.style.color = 'green'
                        victoire.style.borderColor = 'green'
                    }
                }else{
                    if(convertSec(newTime) < convertSec(bestTime4)){
                        bestTime4 = newTime
                        localStorage.setItem('bestTime4', newTime)
                        playSound('new_record');
                        victorytext.textContent = 'Nouveau record !'
                        victorytext.style.color = 'goldenrod'
                        victoire.style.borderColor = 'goldenrod'
                    }else{
                        playSound('victory');
                        victorytext.textContent = 'Victoire !!!'
                        victorytext.style.color = 'green'
                        victoire.style.borderColor = 'green'
                    }
                }
            }
        });


        const tiles = document.querySelectorAll('.tile')

        tiles.forEach((tile) => {
            const val = parseInt(tile.dataset.index, 10) - 1;
            const x = val % nb;
            const y = Math.floor(val / nb);
            tile.style.backgroundPosition = `-${x * tile.clientWidth}px -${y * tile.clientHeight}px`;   
        })
        mode.style.transform = 'translate(0,-100%)';
    })
})

replays.forEach(replay =>{
    replay.addEventListener('click', ()=>{
        mode.style.transform = 'translate(0,0)'
        victoryspot.style.transform = 'scale(0)'
        btime.textContent = bestTime;
        btime2.textContent = bestTime4;
    })
})