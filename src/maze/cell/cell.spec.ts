import { describe, expect, it } from 'bun:test';
import { Cell } from './cell';

describe('Cell', () => {
  it('should link cells bidirectionally', () => {
    const cell1 = new Cell({ row: 0, col: 0 });
    const cell2 = new Cell({ row: 0, col: 1 });

    cell1.link(cell2);

    expect(cell1.linkedTo(cell2)).toBe(true);
    expect(cell2.linkedTo(cell1)).toBe(true);
  });

  it('should unlink cells bidirectionally', () => {
    const cell1 = new Cell({ row: 0, col: 0 });
    const cell2 = new Cell({ row: 0, col: 1 });

    cell1.link(cell2);

    expect(cell1.linkedTo(cell2)).toBe(true);
    expect(cell2.linkedTo(cell1)).toBe(true);

    cell1.unlink(cell2);

    expect(cell1.linkedTo(cell2)).toBe(false);
    expect(cell2.linkedTo(cell1)).toBe(false);
  });
});
