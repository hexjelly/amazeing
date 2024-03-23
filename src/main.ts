import { BinaryTree } from './maze/algorithms/binary-tree/binary-tree';
import { Grid } from './maze/grid/grid';
import { AsciiRenderer } from './maze/renderer/ascii-renderer';

function init() {
  const defaultRows = 3;
  const defaultColumns = 3;

  const body = document.getElementsByTagName('body')[0];
  const form = document.getElementById('render');

  const rowsInput = document.getElementById('rows') as HTMLInputElement;
  rowsInput.value = defaultRows.toString();
  const columnsInput = document.getElementById('columns') as HTMLInputElement;
  columnsInput.value = defaultColumns.toString();

  const bt = new BinaryTree();
  let grid = new Grid(defaultRows, defaultColumns, bt);
  grid.generateMaze();

  const maze = new AsciiRenderer(grid);

  maze.render(body);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const rows = Number(data.get('rows'));
    const columns = Number(data.get('columns'));
    grid = new Grid(rows, columns, bt);
    grid.generateMaze();
    const maze = new AsciiRenderer(grid);

    body.removeChild(body.lastChild as Node);
    maze.render(body);
  });
}

init();
