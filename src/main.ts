import { BinaryTree } from './maze/algorithms/binary-tree/binary-tree';
import { Sidewinder } from './maze/algorithms/sidewinder/sidewinder';
import { MazeAlgorithm } from './maze/algorithms/types';
import { Grid } from './maze/grid/grid';
import { Maze } from './maze/maze';
import { AsciiRenderer } from './maze/renderer/ascii-renderer';
import { SVGRenderer } from './maze/renderer/svg-renderer';
import { MazeRenderer } from './maze/renderer/types';

type AlgorithmOption = { name: string; value: string; algorithm: MazeAlgorithm };
type RendererOption = { name: string; value: string; renderer: MazeRenderer };

function init() {
  const defaultRows = 5;
  const defaultColumns = 5;

  const renderTarget = document.getElementById('render-target');
  if (!renderTarget) {
    return;
  }

  const RENDER_OPTIONS: RendererOption[] = [
    { name: 'SVG', value: 'svg', renderer: new SVGRenderer(renderTarget, 50) },
    { name: 'ASCII', value: 'ascii', renderer: new AsciiRenderer(renderTarget) },
  ];
  const ALGORITHM_OPTIONS: AlgorithmOption[] = [
    { name: 'Binary Tree', value: 'binary-tree', algorithm: new BinaryTree() },
    { name: 'Sidewinder', value: 'sidewinder', algorithm: new Sidewinder() },
  ];

  const form = document.getElementById('render');
  const rowsInput = document.getElementById('rows') as HTMLInputElement;
  rowsInput.value = defaultRows.toString();
  const columnsInput = document.getElementById('columns') as HTMLInputElement;
  columnsInput.value = defaultColumns.toString();

  // Add render options
  const algorithmSelect = document.getElementById('algorithm');
  for (const option of ALGORITHM_OPTIONS) {
    const el = document.createElement('option');
    el.textContent = option.name;
    el.value = option.value;
    algorithmSelect?.appendChild(el);
  }

  // Add render options
  const renderSelect = document.getElementById('renderer');
  for (const option of RENDER_OPTIONS) {
    const el = document.createElement('option');
    el.textContent = option.name;
    el.value = option.value;
    renderSelect?.appendChild(el);
  }

  const algorithm = ALGORITHM_OPTIONS[0].algorithm;
  const renderer = RENDER_OPTIONS[0].renderer;
  const grid = new Grid({ rows: defaultRows, columns: defaultColumns });
  const maze = new Maze({ grid, renderer, algorithm });

  maze.generate();
  maze.render();

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    const rows = Number(data.get('rows'));
    const columns = Number(data.get('columns'));
    maze.grid.rows = rows;
    maze.grid.columns = columns;

    const algorithm = ALGORITHM_OPTIONS.find((option) => option.value === data.get('algorithm'))!.algorithm;
    maze.setAlgorithm(algorithm);

    const renderer = RENDER_OPTIONS.find((option) => option.value === data.get('renderer'))!.renderer;
    maze.setRenderer(renderer);

    maze.generate();
    maze.render();
  });
}

init();
