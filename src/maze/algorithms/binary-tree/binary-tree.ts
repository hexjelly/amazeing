import { Grid } from '../../grid/grid';
import { MazeAlgorithm } from '../types';

export class BinaryTree implements MazeAlgorithm {
  public generateMaze(grid: Grid) {
    grid.forEachCell((cell) => {
      const neighbors = [];
      if (cell.neighbors.north) {
        neighbors.push(cell.neighbors.north);
      }
      if (cell.neighbors.east) {
        neighbors.push(cell.neighbors.east);
      }
      if (neighbors.length) {
        const index = Math.floor(Math.random() * neighbors.length);
        cell.link(neighbors[index]);
      }
    });
  }
}
