import { BinaryTree } from './maze/algorithms/binary-tree/binary-tree';
import { Grid } from './maze/grid/grid';
import { AsciiRenderer } from './maze/renderer/ascii-renderer';

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

  const bt = new BinaryTree();
  const renderer = new AsciiRenderer();
  let grid = new Grid({ rows: defaultRows, columns: defaultColumns, algorithm: bt, renderer });
  grid.generateMaze();
  grid.render(renderTarget);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const rows = Number(data.get('rows'));
    const columns = Number(data.get('columns'));
    renderTarget.removeChild(renderTarget.lastChild as Node);
    grid = new Grid({ rows, columns, algorithm: bt, renderer });
    grid.generateMaze();

    grid.render(renderTarget);
  });
}

init();
