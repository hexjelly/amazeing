import { Grid } from '../grid/grid';
import { MazeRenderer } from './types';

export class AsciiRenderer implements MazeRenderer {
  public render(into: HTMLElement, grid: Grid) {
    const pre = document.createElement('pre');
    let ascii = `+${'---+'.repeat(grid.columns)}\n`;
    grid.forEachRow((row) => {
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
