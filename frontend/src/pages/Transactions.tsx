// frontend/src/pages/Transactions.tsx
import { useEffect, useState } from 'react';
import { getTransactions, addTransaction } from '../services/api';
import { toast } from 'react-toastify';
import Chatbot from '../components/Chatbot';
import TransactionsChart from '../components/TransactionsChart';
import ExportToExcel from '../components/ExportToExcel';
import { Transaction } from '../types';

interface Props {
  onLogout: () => void;
}

const Transactions = ({ onLogout }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'Ingreso' | 'Gasto'>('Ingreso');

  const ingresos = transactions
    .filter(tx => tx.tipo === 'Ingreso')
    .reduce((acc, tx) => acc + parseFloat(tx.monto), 0);

  const gastos = transactions
    .filter(tx => tx.tipo === 'Gasto')
    .reduce((acc, tx) => acc + parseFloat(tx.monto), 0);

  const saldo = ingresos - gastos;

  const fetchData = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch {
      toast.error('Error al obtener transacciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!fecha || !descripcion || !monto) {
      toast.error('Completa todos los campos');
      return;
    }

    const nueva = { fecha, descripcion, monto, tipo };
    try {
      await addTransaction(nueva);
      toast.success('Transacción guardada');
      setFecha('');
      setDescripcion('');
      setMonto('');
      setTipo('Ingreso');
      fetchData();
    } catch {
      toast.error('Error al guardar la transacción');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 to-black text-white flex justify-center items-start p-6 sm:p-12">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Historial de Transacciones</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Dashboard financiero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-500/90 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Ingresos</h3>
            <p className="text-2xl font-bold">S/ {ingresos.toFixed(2)}</p>
          </div>
          <div className="bg-red-500/90 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Gastos</h3>
            <p className="text-2xl font-bold">S/ {gastos.toFixed(2)}</p>
          </div>
          <div className="bg-blue-600/90 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Saldo Actual</h3>
            <p className="text-2xl font-bold">S/ {saldo.toFixed(2)}</p>
          </div>
        </div>

        {/* Exportar + Gráfico */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <ExportToExcel transactions={transactions} />
        </div>
        <TransactionsChart transactions={transactions} />

        {/* Recomendaciones */}
        <div className="bg-white/10 p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-2">Recomendaciones Inteligentes</h2>
          <ul className="list-disc pl-5 text-sm space-y-1 text-gray-200">
            {saldo < 0 && (
              <li>⚠️ Tu saldo está en negativo. Considera reducir gastos innecesarios.</li>
            )}
            {gastos > ingresos && (
              <li>📉 Estás gastando más de lo que ganas. Establece un presupuesto mensual.</li>
            )}
            {saldo > 0 && saldo < 100 && (
              <li>💡 Tu saldo es positivo pero bajo. Intenta ahorrar aunque sea un poco.</li>
            )}
            {saldo > 500 && (
              <li>✅ ¡Buen trabajo! Considera crear un fondo de emergencia.</li>
            )}
            {ingresos === 0 && (
              <li>ℹ️ No se han registrado ingresos. Verifica si es un descuido.</li>
            )}
            {gastos === 0 && ingresos > 0 && (
              <li>🔍 No se han registrado gastos. ¿Está todo actualizado?</li>
            )}
            {!(
              saldo < 0 ||
              gastos > ingresos ||
              (saldo > 0 && saldo < 100) ||
              saldo > 500 ||
              ingresos === 0 ||
              (gastos === 0 && ingresos > 0)
            ) && (
              <li>✔️ Tu situación financiera es estable por ahora. ¡Sigue así!</li>
            )}
          </ul>
        </div>

        {/* Formulario */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full sm:w-1/4 p-2 rounded text-black"
          />
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            className="w-full sm:w-1/3 p-2 rounded text-black"
          />
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Monto"
            className="w-full sm:w-1/4 p-2 rounded text-black"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'Ingreso' | 'Gasto')}
            className="w-full sm:w-1/4 p-2 rounded text-black"
          >
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded mb-10"
        >
          Agregar transacción
        </button>

        {/* Tabla de transacciones */}
        {loading ? (
          <p>Cargando...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-300">No hay transacciones registradas.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/20 text-white">
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4">Monto</th>
                <th className="py-3 px-4">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4">{tx.fecha}</td>
                  <td className="py-3 px-4">{tx.descripcion}</td>
                  <td className="py-3 px-4">S/ {tx.monto}</td>
                  <td
                    className={`py-3 px-4 font-bold ${
                      tx.tipo === 'Ingreso' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {tx.tipo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Chatbot flotante */}
        <Chatbot saldo={saldo} ingresos={ingresos} gastos={gastos} />
      </div>
    </div>
  );
};

export default Transactions;