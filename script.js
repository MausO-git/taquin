let nb
const mode = document.querySelector('.mode');
const buttons = document.querySelectorAll('.zone button');
const gameZone = document.querySelector('.game-zone');
let board = []
document.addEventListener('DOMContentLoaded', ()=>{
    mode.style.transform = 'translate(0,0)';
})

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        if (button.classList.contains('x3')){
            nb = 3;
        }else{
            nb = 4;
        };

        gameZone.style.gridTemplateColumns = `repeat(${nb}, 1fr)`;
        gameZone.style.gridTemplateRows = `repeat(${nb}, 1fr)`;

        for(let i = 0; i<(nb ** 2); i++){
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = i+1;

            if(i === ((nb **2) -1)){
                tile.classList.add('empty')
            };         
            board.push(i + 1);
            gameZone.appendChild(tile)
        }

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
                // Échange les classes 'empty' et le background
                emptyTile.classList.remove('empty');
                clickedTile.classList.add('empty');

                // Échange les styles de background
                const tempBg = clickedTile.style.backgroundPosition;
                clickedTile.style.backgroundPosition = '';
                emptyTile.style.backgroundPosition = tempBg;
            }

            [board[clickedIndex], board[emptyIndex]] = [board[emptyIndex], board[clickedIndex]];

            const solved = board.every((val, index) => val === index+1);

            if(solved){
                alert("victoire")
            }
        });


        const tiles = document.querySelectorAll('.tile')

        tiles.forEach((tile, index)=>{
            const x = index % nb;
            const y = Math.floor(index / nb);
            tile.style.backgroundPosition = `-${x * tile.clientWidth}px -${y * tile.clientHeight}px`;   
        })
        mode.style.transform = 'translate(0,-100%)';
    })
})

// x3.addEventListener('click', ()=>{
//     mode.style.transform = 'translate(0,-100%)';
//     nb = 3;
//     gameZone.style.gridTemplateColumns = `repeat(${nb}, 1fr)`;
//     gameZone.style.gridTemplateRows = `repeat(${nb}, 1fr)`;
//     for(let i = 0; i<(nb ** 2); i++){
//         const tile = document.createElement('div');
//         tile.classList.add('tile');
//         tile.dataset('index', i+1);
//         gameZone.appendChild(tile)
//     }
// })

// x4.addEventListener('click', ()=>{
//     mode.style.transform = 'translate(0,-100%)';
//     nb = 4;
// })