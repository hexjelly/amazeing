import Rand from 'rand-seed';
import { Grid } from '../../grid/grid';
import { MazeAlgorithm } from '../types';

export type BinaryTreeOptions = {
  seed?: string;
};

export class BinaryTree implements MazeAlgorithm {
  private _seed?: string;

  public constructor(options?: BinaryTreeOptions) {
    if (options?.seed) {
      this._seed = options.seed;
    }
  }

  public generateMaze(grid: Grid) {
    const seed = this._seed ? `${this._seed}-${grid.rows}-${grid.columns}` : undefined;
    console.debug('Generating Binary Tree maze', seed);
    const prng = new Rand(seed);
    grid.forEachCell((cell) => {
      const neighbors = [];
      if (cell.neighbors.north) {
        neighbors.push(cell.neighbors.north);
      }
      if (cell.neighbors.east) {
        neighbors.push(cell.neighbors.east);
      }
      if (neighbors.length) {
        const index = Math.floor(prng.next() * neighbors.length);
        cell.link(neighbors[index]);
      }
    });
  }
}
