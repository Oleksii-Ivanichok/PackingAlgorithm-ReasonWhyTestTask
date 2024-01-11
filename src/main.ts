import importedBlocks from './input.json';
import {addBlocksToContainer, showFullness} from "./painting";
import {Block, Container} from "./algorithm";

const blocks: Block[] = [];

importedBlocks.forEach((block, index) => {
    blocks.push(new Block(block.width, block.height, index));
})


updateBlocksDisplay(blocks);

window.onresize = () => {
    updateBlocksDisplay(blocks)
};


function updateBlocksDisplay(blocks: Block[]) {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const container = new Container(containerWidth, containerHeight);
    const blockCoordinates = container.findOptimalPlacement(blocks);

    const containerHTML = document.getElementById('container');
    containerHTML!.innerHTML = '';
    addBlocksToContainer(blockCoordinates);

    const fullness = container.calculateFullness();
    showFullness(fullness);

    const output = {
        fullness: fullness,
        blockCoordinates: blockCoordinates
    };
    console.log(output)
}