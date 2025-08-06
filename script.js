let nb
const mode = document.querySelector('.mode');
const buttons = document.querySelectorAll('.zone button');
const gameZone = document.querySelector('.game-zone');
let board = []
let firstGame = true
document.addEventListener('DOMContentLoaded', ()=>{
    mode.style.transform = 'translate(0,0)';
})

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        gameZone.innerHTML = ''

        board = [];

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
                alert("victoire")
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