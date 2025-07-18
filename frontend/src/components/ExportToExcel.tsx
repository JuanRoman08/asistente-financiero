// frontend/src/components/ExportToExcel.tsx
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const ExportToExcel = ({ transactions }: Props) => {
  const exportToExcel = () => {
    const ws = utils.json_to_sheet(transactions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Transacciones');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'historial_transacciones.xlsx');
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded shadow"
    >
      📤 Exportar a Excel
    </button>
  );
};

export default ExportToExcel;