import { Grid } from '../grid/grid';

export abstract class MazeRenderer {
  constructor(grid: Grid) {}
  public abstract render(into: HTMLElement, grid: Grid): void;
}
