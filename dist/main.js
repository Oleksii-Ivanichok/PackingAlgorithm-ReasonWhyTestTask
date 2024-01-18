import importedBlocks from "./input.json.proxy.js";
import {addBlocksToContainer, showFullness} from "./painting.js";
import {Block, Container} from "./algorithm.js";
const blocks = [];
importedBlocks.forEach((block, index) => {
  blocks.push(new Block(block.width, block.height, index));
});
updateBlocksDisplay(blocks);
window.onresize = () => {
  updateBlocksDisplay(blocks);
};
function updateBlocksDisplay(blocks2) {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const container = new Container(containerWidth, containerHeight);
  const blockCoordinates = container.findOptimalPlacement(blocks2);
  const containerHTML = document.getElementById("container");
  containerHTML.innerHTML = "";
  addBlocksToContainer(blockCoordinates);
  const fullness = container.calculateFullness();
  showFullness(fullness);
  const output = {
    fullness,
    blockCoordinates
  };
  console.log(output);
}
