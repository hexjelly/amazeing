import { Cell } from '../../cell/cell';
import { Grid } from '../../grid/grid';
import { MazeAlgorithm } from '../types';

export class Sidewinder implements MazeAlgorithm {
  public generateMaze(grid: Grid) {
    console.debug('Generating Sidewinder maze');
    grid.forEachRow((row) => {
      const run: Cell[] = [];
      row.forEach((cell) => {
        run.push(cell);
        const atEasternBoundary = !cell.neighbors.east;
        const atNorthernBoundary = !cell.neighbors.north;
        const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && Math.random() < 0.5);
        if (shouldCloseOut) {
          const member = run[Math.floor(Math.random() * run.length)];
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
