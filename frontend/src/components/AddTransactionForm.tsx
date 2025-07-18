import { useState, FormEvent } from 'react';
import { addTransaction } from '../services/api';
import { toast } from 'react-toastify';

interface Props {
  onSuccess: () => void; // para recargar la lista después de agregar
}

const AddTransactionForm = ({ onSuccess }: Props) => {
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'Ingreso' | 'Gasto'>('Ingreso');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fecha || !descripcion || !monto) {
      toast.error('Completa todos los campos');
      return;
    }

    try {
      await addTransaction({ fecha, descripcion, monto, tipo });
      toast.success('Transacción agregada');
      setFecha('');
      setDescripcion('');
      setMonto('');
      setTipo('Ingreso');
      onSuccess();
    } catch {
      toast.error('Error al guardar la transacción');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-6 rounded-lg mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
      />
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
      />
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as 'Ingreso' | 'Gasto')}
        className="p-3 rounded bg-white/10 border border-white/20 text-white col-span-1 sm:col-span-2 md:col-span-1"
      >
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded col-span-full"
      >
        Agregar transacción
      </button>
    </form>
  );
};

export default AddTransactionForm;