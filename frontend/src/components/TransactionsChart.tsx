// frontend/src/components/TransactionsChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Transaction } from '../types';

Chart.register(...registerables);

interface Props {
  transactions: Transaction[];
}

const TransactionsChart = ({ transactions }: Props) => {
  const ingresos = transactions.filter(tx => tx.tipo === 'Ingreso');
  const gastos = transactions.filter(tx => tx.tipo === 'Gasto');

  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        label: 'Montos (S/)',
        data: [
          ingresos.reduce((acc, tx) => acc + parseFloat(tx.monto), 0),
          gastos.reduce((acc, tx) => acc + parseFloat(tx.monto), 0)
        ],
        backgroundColor: ['#10b981', '#ef4444']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Comparación de Ingresos y Gastos' }
    }
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-2 text-white">Gráfico de Ingresos vs Gastos</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionsChart;