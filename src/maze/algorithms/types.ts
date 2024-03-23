import { Grid } from '../grid/grid';

export abstract class MazeAlgorithm {
  public abstract generateMaze(grid: Grid): void;
}
