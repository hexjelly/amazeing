import { Grid } from '../grid/grid';
import { MazeRenderer } from './types';

export class AsciiRenderer implements MazeRenderer {
  private _maze: Grid;

  constructor(maze: Grid) {
    this._maze = maze;
  }

  public render(into: HTMLElement) {
    const pre = document.createElement('pre');
    let ascii = `+${'---+'.repeat(this._maze.columns)}\n`;
    this._maze.forEachRow((row) => {
      let top = '|';
      let bottom = '+';
      row.forEach((cell) => {
        const east = cell.linkedTo(cell.neighbors.east) ? ' ' : '|';
        const south = cell.linkedTo(cell.neighbors.south) ? '   ' : '---';
        top += '   ' + east;
        bottom += south + '+';
      });
      ascii += top + '\n';
      ascii += bottom + '\n';
    });

    pre.innerHTML = ascii;
    into.appendChild(pre);
  }
}
