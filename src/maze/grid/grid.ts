import { Cell } from '../cell/cell';

export type GridConstructorOptions = {
  rows: number;
  columns: number;
};

export class Grid {
  private _rows: number;
  private _columns: number;
  private _grid: Cell[][] = [];

  constructor(options: GridConstructorOptions) {
    this._rows = options.rows;
    this._columns = options.columns;
    this.prepareGrid();
    this.configureCells();
  }

  private prepareGrid() {
    this._grid = Array.from({ length: this._rows }, (_, row) => {
      return Array.from({ length: this._columns }, (_, col) => {
        return new Cell({ row, col });
      });
    });
  }

  private configureCells() {
    this.forEachCell((cell) => {
      const { row, col } = cell.coordinate;

      const north = this.getCell(row - 1, col);
      const south = this.getCell(row + 1, col);
      const west = this.getCell(row, col - 1);
      const east = this.getCell(row, col + 1);

      cell.neighbours = { north, south, west, east };
    });
  }

  public reset() {
    this.prepareGrid();
    this.configureCells();
  }

  public getCell(row: number, col: number) {
    if (row < 0 || row >= this._rows) {
      return null;
    }

    if (col < 0 || col >= this._columns) {
      return null;
    }

    return this._grid[row][col];
  }

  public get rows() {
    return this._rows;
  }

  public get columns() {
    return this._columns;
  }

  public set rows(rows: number) {
    this._rows = rows;
    this.reset();
  }

  public set columns(columns: number) {
    this._columns = columns;
    this.reset();
  }

  public getRandomCell() {
    const row = Math.floor(Math.random() * this._rows);
    const col = Math.floor(Math.random() * this._columns);

    return this.getCell(row, col);
  }

  public get size() {
    return this._rows * this._columns;
  }

  public forEachCell(callback: (cell: Cell) => void) {
    this._grid.forEach((row) => {
      row.forEach(callback);
    });
  }

  public forEachRow(callback: (row: Cell[]) => void) {
    this._grid.forEach(callback);
  }
}
