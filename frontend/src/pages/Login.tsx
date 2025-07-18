// frontend/src/pages/Login.tsx
import { useState, FormEvent } from 'react';
import { login } from '../services/api';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      const token = res?.data?.access;
      if (token) {
        localStorage.setItem('token', token);
        onLogin();
        navigate('/home');
      } else {
        alert('Token no recibido');
      }
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl w-[420px] shadow-2xl flex flex-col gap-6"
    >
      <div className="flex justify-center">
        <div className="bg-white/10 rounded-full p-4">
          <EnvelopeIcon className="w-10 h-10 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
      <input
        className="p-3 text-base rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="p-3 text-base rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition rounded p-3 text-base font-semibold"
      >
        Entrar
      </button>
    </form>
  );
};

export default Login;