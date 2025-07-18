// frontend/src/components/Chatbot.tsx
import { useState } from 'react';

interface Props {
  saldo: number;
  ingresos: number;
  gastos: number;
}

const Chatbot = ({ saldo, ingresos, gastos }: Props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages([...messages, { from: 'user', text: userMsg }]);
    setInput('');

    let response = "No entendí tu pregunta. Intenta con: saldo, gastos o ingresos.";

    const lower = userMsg.toLowerCase();
    if (lower.includes('saldo')) {
      response = `Tu saldo actual es S/ ${saldo.toFixed(2)}.`;
    } else if (lower.includes('ingres')) {
      response = `Tus ingresos totales son S/ ${ingresos.toFixed(2)}.`;
    } else if (lower.includes('gast')) {
      response = `Tus gastos totales son S/ ${gastos.toFixed(2)}.`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: response }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 bg-white text-black rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-bold">Asistente Virtual</h3>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto h-60 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`text-left ${msg.from === 'user' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                {msg.from === 'user' ? 'Tú: ' : 'Bot: '}
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t p-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm"
              placeholder="Escribe algo..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="text-blue-600 font-bold">Enviar</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;