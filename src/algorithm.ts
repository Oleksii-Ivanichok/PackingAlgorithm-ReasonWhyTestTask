export class Block {
    width: number;
    height: number;
    id: number;
    rotated: boolean;

    constructor(width: number, height: number, id: number) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.rotated = false;
    }

    get area(): number {
        return this.width * this.height;
    }

    rotate() {
        [this.width, this.height] = [this.height, this.width];
        this.rotated = !this.rotated;
    }
}

export class Coordinate {
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

export class Container {
    width: number;
    height: number;
    private occupied: boolean[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.occupied = Array.from({ length: height }, () => Array(width).fill(false));
    }

    private canPlaceBlock(x: number, y: number, block: Block): boolean {
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

            for (let orientation = 0; orientation < 2; orientation++) {
                if (orientation === 1) block.rotate();

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

                if (placed) break;
                if (orientation === 1) block.rotate();
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

        let internalVoidsArea = this.calculateInternalVoidsArea();
        const totalArea = this.width * this.height;
        return 1 - (internalVoidsArea / (internalVoidsArea + totalBlockArea));
    }

    private calculateInternalVoidsArea(): number {
        let internalVoidsArea = 0;
        let visited = Array.from({ length: this.height }, () => Array(this.width).fill(false));


        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (!this.occupied[i][j] && !visited[i][j]) {
                    this.floodFill(i, j, visited, true);
                }
            }
        }
        visited = visited.map(row => row.map(() => false));

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (!this.occupied[i][j] && !visited[i][j]) {
                    let currentVoidArea = this.floodFill(i, j, visited, false);
                    if (currentVoidArea !== null) {
                        internalVoidsArea += currentVoidArea;
                    }
                }
            }
        }

        return internalVoidsArea;
    }

    private floodFill(x: number, y: number, visited: boolean[][], isBorderCheck: boolean): number | null {
        if (this.occupied[x][y] || visited[x][y]) {
            return null;
        }

        let stack = [[x, y]];
        let area = 0;

        while (stack.length > 0) {
            let [currentX, currentY] = stack.pop() as number[];

            if (currentX < 0 || currentX >= this.height || currentY < 0 || currentY >= this.width || visited[currentX][currentY] || this.occupied[currentX][currentY]) {
                continue;
            }

            visited[currentX][currentY] = true;
            area++;

            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }

        return isBorderCheck && (x === 0 || x === this.height - 1 || y === 0 || y === this.width - 1) ? null : area;
    }
}