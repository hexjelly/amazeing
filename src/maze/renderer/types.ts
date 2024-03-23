import { Grid } from '../grid/grid';

export abstract class MazeRenderer {
  public abstract render(into: HTMLElement, grid: Grid): void;
}
