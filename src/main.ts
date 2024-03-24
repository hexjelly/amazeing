import { BinaryTree } from './maze/algorithms/binary-tree/binary-tree';
import { Sidewinder } from './maze/algorithms/sidewinder/sidewinder';
import { MazeAlgorithm } from './maze/algorithms/types';
import { Grid } from './maze/grid/grid';
import { Maze } from './maze/maze';
import { AsciiRenderer } from './maze/renderer/ascii-renderer';

const RENDER_OPTIONS = [{ name: 'ASCII', value: 'ascii', renderer: AsciiRenderer }];
type AlgorithmOption = { name: string; value: string; algorithm: MazeAlgorithm };
const ALGORITHM_OPTIONS: AlgorithmOption[] = [
  { name: 'Binary Tree', value: 'binary-tree', algorithm: new BinaryTree() },
  { name: 'Sidewinder', value: 'sidewinder', algorithm: new Sidewinder() },
];

function init() {
  const defaultRows = 3;
  const defaultColumns = 3;

  const renderTarget = document.getElementById('render-target');
  if (!renderTarget) {
    return;
  }

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

  const algorithm = new BinaryTree();
  const renderer = new AsciiRenderer(renderTarget);
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

    const Renderer = RENDER_OPTIONS.find((option) => option.value === data.get('renderer'))!.renderer;
    maze.setRenderer(new Renderer(renderTarget));
    renderTarget.removeChild(renderTarget.lastChild as Node);

    maze.generate();
    maze.render();
  });
}

init();
