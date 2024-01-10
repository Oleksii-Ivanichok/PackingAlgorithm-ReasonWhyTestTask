class Block {
    width: number;
    height: number;
    id: number;

    constructor(width: number, height: number, id: number) {
        this.width = width;
        this.height = height;
        this.id = id;
    }

    get area(): number {
        return this.width * this.height;
    }
}

class Coordinate {
    top: number;
    left: number;
    right: number;
    bottom: number;
    initialOrder: number;

    constructor(top: number, left: number, right: number, bottom: number, initialOrder: number) {
        this.top = top;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.initialOrder = initialOrder;
    }
}

class Container {
    width: number;
    height: number;
    private occupied: boolean[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.occupied = Array.from({ length: height }, () => Array(width).fill(false));
    }

    private canPlaceBlock(x: number, y: number, block: Block): boolean {
        // Перевірка на вміщення блоку в задані координати
        for (let i = x; i < x + block.width && i < this.width; i++) {
            for (let j = y; j < y + block.height && j < this.height; j++) {
                if (this.occupied[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }

    private placeBlock(x: number, y: number, block: Block): void {
        for (let i = x; i < x + block.width; i++) {
            for (let j = y; j < y + block.height; j++) {
                this.occupied[j][i] = true;
            }
        }
    }

    findOptimalPlacement(blocks: Block[]): Coordinate[] {
        blocks.sort((a, b) => b.area - a.area);

        let placements: Coordinate[] = [];

        for (let block of blocks) {
            let placed = false;

            for (let x = 0; x <= this.width - block.width; x++) {
                for (let y = 0; y <= this.height - block.height; y++) {
                    if (this.canPlaceBlock(x, y, block)) {
                        this.placeBlock(x, y, block);
                        placements.push(new Coordinate(y, x, x + block.width, y + block.height, block.id));
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }

            if (!placed) {
                [block.width, block.height] = [block.height, block.width]; // Поворот блоку
                for (let x = 0; x <= this.width - block.width; x++) {
                    for (let y = 0; y <= this.height - block.height; y++) {
                        if (this.canPlaceBlock(x, y, block)) {
                            this.placeBlock(x, y, block);
                            placements.push(new Coordinate(y, x, x + block.width, y + block.height, block.id));
                            placed = true;
                            break;
                        }
                    }
                    if (placed) break;
                }
            }

            if (!placed) {
                console.log(`Block ${block.id} could not be placed.`);
            }
        }

        return placements;
    }
    calculateFullness(): number {
        let totalBlockArea = 0;
        this.occupied.forEach(row => {
            totalBlockArea += row.filter(cell => cell).length;
        });
        const totalArea = this.width * this.height;
        const emptySpace = totalArea - totalBlockArea;
        return 1 - (emptySpace / totalArea);
    }
}


function generateRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// Функція для додавання блоків у контейнер
function addBlocksToContainer(blockCoordinates: Coordinate[]) {
    const container = document.getElementById('container');
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

function updateBlocksDisplay(blocks: Block[]) {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const container = new Container(containerWidth, containerHeight);
    const blockCoordinates = container.findOptimalPlacement(blocks);
    const containerElement = document.getElementById('container');
    containerElement!.innerHTML = '';
    addBlocksToContainer(blockCoordinates);

    const fullness = container.calculateFullness();
    const fullnessDisplay = document.createElement('div');
    fullnessDisplay.innerText = `Fullness ${fullness.toFixed(2)}`;
    fullnessDisplay.classList.add('block');
    containerElement?.appendChild(fullnessDisplay);
}

// Тестування алгоритму
const blocks = [
    new Block(53, 98, 1),
    new Block(53, 98, 2),
    new Block(119, 90, 3),
    new Block(58, 85, 4),
    new Block(97, 84, 5),
    new Block(62, 89, 6),
    new Block(92, 63, 7),
    new Block(35, 83, 8),
    new Block(30, 93, 9),
    new Block(21, 101, 10),
];


updateBlocksDisplay(blocks);

window.onresize = () => {
    updateBlocksDisplay(blocks)
};