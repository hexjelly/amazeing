import Rand from 'rand-seed';
import { Cell } from '../../cell/cell';
import { Grid } from '../../grid/grid';
import { MazeAlgorithm } from '../types';

export type SidewinderOptions = {
  seed?: string;
};

export class Sidewinder implements MazeAlgorithm {
  private _seed?: string;

  public constructor(options?: SidewinderOptions) {
    if (options?.seed) {
      this._seed = options.seed;
    }
  }

  public generateMaze(grid: Grid) {
    const seed = this._seed ? `${this._seed}-${grid.rows}-${grid.columns}` : undefined;
    console.debug('Generating Sidewinder maze', seed);
    const prng = new Rand(seed);
    grid.forEachRow((row) => {
      const run: Cell[] = [];
      row.forEach((cell) => {
        run.push(cell);
        const atEasternBoundary = !cell.neighbors.east;
        const atNorthernBoundary = !cell.neighbors.north;
        const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && prng.next() < 0.5);
        if (shouldCloseOut) {
          const member = run[Math.floor(prng.next() * run.length)];
          if (member.neighbors.north) {
            member.link(member.neighbors.north);
          }
          run.length = 0;
        } else {
          cell.link(cell.neighbors.east);
        }
      });
    });
  }
}
