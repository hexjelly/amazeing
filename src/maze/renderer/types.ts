import { Grid } from '../grid/grid';

export abstract class MazeRenderer {
  public abstract render(grid: Grid): void;
}
