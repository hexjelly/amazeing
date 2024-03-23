import { BinaryTree } from './maze/algorithms/binary-tree/binary-tree';
import { Grid } from './maze/grid/grid';
import { AsciiRenderer } from './maze/renderer/ascii-renderer';

function init() {
  const grid = new Grid(4, 4, new BinaryTree());
  grid.generateMaze();
  const maze = new AsciiRenderer(grid);
  const body = document.getElementsByTagName('body')[0];
  maze.render(body);
}

init();
