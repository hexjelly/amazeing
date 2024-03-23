export class Cell {
  private _coordinate: { row: number; col: number };
  private _neighbors: { north: Cell | null; east: Cell | null; south: Cell | null; west: Cell | null };
  private _links = new Map<Cell, boolean>();

  constructor(options: { row: number; col: number }) {
    this._coordinate = { row: options.row, col: options.col };
    this._neighbors = { north: null, east: null, south: null, west: null };
  }

  public link(cell: Cell, bidi = true) {
    this.links.set(cell, true);

    if (bidi) {
      cell.link(this, false);
    }
  }

  public unlink(cell: Cell, bidi = true) {
    this.links.delete(cell);

    if (bidi) {
      cell.unlink(this, false);
    }
  }

  public get links() {
    return this._links;
  }

  public linkedTo(cell: Cell | null) {
    if (!cell) return false;
    return this._links.has(cell);
  }

  public get coordinate() {
    return this._coordinate;
  }

  public get neighbors() {
    return this._neighbors;
  }

  public set neighbours(neighbors: { north: Cell | null; east: Cell | null; south: Cell | null; west: Cell | null }) {
    this._neighbors = neighbors;
  }
}
