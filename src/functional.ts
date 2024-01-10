// type Block = { width: number; height: number; id: number };
// type Coordinate = { top: number; left: number; right: number; bottom: number; initialOrder: number };

// function findOptimalPlacement(blocks: Block[], containerWidth: number, containerHeight: number): Coordinate[] {
//     blocks.sort((a, b) => (b.width * b.height) - (a.width * a.height));

//     let placements: Coordinate[] = [];
//     let occupied: boolean[][] = Array.from({ length: containerHeight }, () => Array(containerWidth).fill(false));

//     for (let i = 0; i < blocks.length; i++) {
//         let block = blocks[i];
//         let placed = false;

//         for (let x = 0; x <= containerWidth - block.width; x++) {
//             for (let y = 0; y <= containerHeight - block.height; y++) {
//                 if (canPlaceBlock(x, y, block.width, block.height, occupied)) {
//                     placeBlock(x, y, block.width, block.height, occupied);
//                     placements.push({ 
//                         top: y, 
//                         left: x, 
//                         right: x + block.width, 
//                         bottom: y + block.height, 
//                         initialOrder: block.id 
//                     });
//                     placed = true;
//                     break;
//                 }
//             }
//             if (placed) break;
//         }

//         if (!placed) {
//             for (let x = 0; x <= containerWidth - block.height; x++) {
//                 for (let y = 0; y <= containerHeight - block.width; y++) {
//                     if (canPlaceBlock(x, y, block.height, block.width, occupied)) {
//                         placeBlock(x, y, block.height, block.width, occupied);
//                         placements.push({ 
//                             top: y, 
//                             left: x, 
//                             right: x + block.height, 
//                             bottom: y + block.width, 
//                             initialOrder: block.id 
//                         });
//                         placed = true;
//                         break;
//                     }
//                 }
//                 if (placed) break;
//             }
//         }

//         if (!placed) {
//             console.log(`Block ${block.id} could not be placed.`);
//         }
//     }

//     return placements;
// }

// function canPlaceBlock(x: number, y: number, width: number, height: number, occupied: boolean[][]): boolean {
//     for (let i = x; i < x + width; i++) {
//         for (let j = y; j < y + height; j++) {
//             if (occupied[j][i]) return false;
//         }
//     }
//     return true;
// }

// function placeBlock(x: number, y: number, width: number, height: number, occupied: boolean[][]): void {
//     for (let i = x; i < x + width; i++) {
//         for (let j = y; j < y + height; j++) {
//             occupied[j][i] = true;
//         }
//     }
// }

// // Тестування алгоритму
// const blocks: Block[] = [
//     { width: 90, height: 90, id: 1 },
//     { width: 60, height: 115, id: 2 },
//     { width: 75, height: 80, id: 3 },
//     { width: 120, height: 70, id: 4 },
//     { width: 50, height: 50, id: 5 },
//     // { width: 90, height: 90, id: 6 },
//     // { width: 60, height: 115, id: 7 },
//     // { width: 75, height: 80, id: 8 },
//     // { width: 120, height: 70, id: 9 },
//     // { width: 50, height: 50, id: 10 },
// ];
// const containerWidth = 350;
// const containerHeight = 300;

// const blockCoordinates = findOptimalPlacement(blocks, containerWidth, containerHeight);
// console.log(blocks);
// console.log(blockCoordinates);

