import { SVG } from '@svgdotjs/svg.js';
import { Grid } from '../grid/grid';
import { MazeRenderer } from './types';

export class SVGRenderer implements MazeRenderer {
  private _container: HTMLElement;
  private _cellSize = 10;

  constructor(into: HTMLElement, cellSize: number = 10) {
    this._container = into;
    this._cellSize = cellSize;
  }

  public render(grid: Grid) {
    if (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }

    const strokeOptions = { width: 2, color: '#000' };
    const draw = SVG()
      .addTo(this._container)
      .size(
        grid.columns * this._cellSize + strokeOptions.width * 2,
        grid.rows * this._cellSize + strokeOptions.width * 2
      );

    grid.forEachCell((cell) => {
      const { row, col } = cell.coordinate;
      const xOffset = col === 0 ? strokeOptions.width : 0;
      const yOffset = row === 0 ? strokeOptions.width : 0;
      const x1 = col * this._cellSize + xOffset;
      const y1 = row * this._cellSize + yOffset;
      const x2 = (col + 1) * this._cellSize;
      const y2 = (row + 1) * this._cellSize;

      if (!cell.neighbors.north) {
        draw.line(x1, y1, x2, y1).stroke(strokeOptions);
      }
      if (!cell.neighbors.west) {
        draw.line(x1, y1, x1, y2).stroke(strokeOptions);
      }
      if (!cell.linkedTo(cell.neighbors.south)) {
        draw.line(x1, y2, x2, y2).stroke(strokeOptions);
      }
      if (!cell.linkedTo(cell.neighbors.east)) {
        draw.line(x2, y1, x2, y2).stroke(strokeOptions);
      }
    });
  }
}
