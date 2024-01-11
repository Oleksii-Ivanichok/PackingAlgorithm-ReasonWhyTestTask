import {Coordinate} from "./algorithm";
const container = document.getElementById('container');

function generateRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export function addBlocksToContainer(blockCoordinates: Coordinate[]) {
    const colorMap = new Map<string, string>();

    blockCoordinates.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');

        const width = block.right - block.left;
        const height = block.bottom - block.top;
        const sizeKey = `${width}x${height}`;

        if (!colorMap.has(sizeKey)) {
            colorMap.set(sizeKey, generateRandomColor());
        }

        blockElement.style.backgroundColor = colorMap.get(sizeKey)!;
        blockElement.style.top = `${block.top}px`;
        blockElement.style.left = `${block.left}px`;
        blockElement.style.width = `${width}px`;
        blockElement.style.height = `${height}px`;

        blockElement.innerText = block.initialOrder.toString();

        container?.appendChild(blockElement);
    });
}

export function showFullness(fullness: number) {
    const fullnessHTML = document.createElement('div');
    const fullnessToShow = fullness * 100;
    fullnessHTML.innerText = `Fullness ${(fullnessToShow.toFixed(2))}`;
    fullnessHTML.classList.add('block');
    container?.appendChild(fullnessHTML);
}