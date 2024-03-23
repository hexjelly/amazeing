import { describe, expect, it } from 'bun:test';
import { Grid } from './grid';

describe('Grid', () => {
  describe('.size', () => {
    it.each([
      { rows: 3, columns: 3, size: 9 },
      { rows: 12, columns: 10, size: 120 },
    ])('$rows x $columns = $size', ({ rows, columns, size }) => {
      const grid = new Grid(rows, columns);

      expect(grid.size).toBe(size);
    });
  });

  describe('.getCell', () => {
    it('should return null for out of bounds cells', () => {
      const grid = new Grid(3, 3);

      expect(grid.getCell(-1, 0)).toBeNull();
      expect(grid.getCell(0, -1)).toBeNull();
      expect(grid.getCell(3, 0)).toBeNull();
      expect(grid.getCell(0, 3)).toBeNull();
    });

    it('should return the cell at the specified coordinates', () => {
      const grid = new Grid(3, 3);
      const cell = grid.getCell(1, 1);

      expect(cell!.coordinate).toEqual({ row: 1, col: 1 });
    });
  });

  describe('.rows', () => {
    it('should return number of rows', () => {
      const grid = new Grid(3, 3);

      expect(grid.rows).toBe(3);
    });
  });

  describe('.columns', () => {
    it('should return number of columns', () => {
      const grid = new Grid(3, 3);

      expect(grid.columns).toBe(3);
    });
  });

  describe('.eachRow', () => {
    it('should iterate over each row', () => {
      const grid = new Grid(3, 3);
      const result: Set<string> = new Set();

      grid.forEachRow((row) => {
        const coordinate = row.map((cell) => `${cell.coordinate.row}-${cell.coordinate.col}`).join(',');
        result.add(coordinate);
      });

      expect(result.size).toBe(3);
      expect(result.has('0-0,0-1,0-2')).toBe(true);
      expect(result.has('1-0,1-1,1-2')).toBe(true);
      expect(result.has('2-0,2-1,2-2')).toBe(true);
    });
  });

  describe('.forEachCell', () => {
    it('should iterate over each cell', () => {
      const grid = new Grid(3, 3);
      const result: Set<string> = new Set();
      grid.forEachCell((cell) => {
        result.add(`${cell.coordinate.row}-${cell.coordinate.col}`);
      });

      expect(result.size).toBe(9);
      expect(result.has('0-0')).toBe(true);
      expect(result.has('0-1')).toBe(true);
      expect(result.has('0-2')).toBe(true);
      expect(result.has('1-0')).toBe(true);
      expect(result.has('1-1')).toBe(true);
      expect(result.has('1-2')).toBe(true);
      expect(result.has('2-0')).toBe(true);
      expect(result.has('2-1')).toBe(true);
      expect(result.has('2-2')).toBe(true);
    });
  });
});
