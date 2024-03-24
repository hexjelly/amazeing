import { MazeAlgorithm } from './algorithms/types';
import { Grid } from './grid/grid';
import { MazeRenderer } from './renderer/types';

export class Maze {
  public grid: Grid;
  private _renderer: MazeRenderer;
  private _algorithm: MazeAlgorithm;

  constructor(options: { grid: Grid; renderer: MazeRenderer; algorithm: MazeAlgorithm }) {
    this.grid = options.grid;
    this._renderer = options.renderer;
    this._algorithm = options.algorithm;
  }

  public generate() {
    this._algorithm.generateMaze(this.grid);
  }

  public render() {
    this._renderer.render(this.grid);
  }

  public setRenderer(renderer: MazeRenderer) {
    this._renderer = renderer;
  }

  public setAlgorithm(algorithm: MazeAlgorithm) {
    this._algorithm = algorithm;
  }
}
