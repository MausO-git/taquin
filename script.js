let nb
const mode = document.querySelector('.mode');
const buttons = document.querySelectorAll('.zone button');
const gameZone = document.querySelector('.game-zone');

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
            if(i === ((nb **2) -1)){
                tile.classList.add('empty')
            };         
            tile.dataset.index = i+1;
            gameZone.appendChild(tile)
        }

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