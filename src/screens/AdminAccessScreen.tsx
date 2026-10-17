import React, { useState } from 'react';
import { ArrowLeft, KeyRound, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react';

interface AdminAccessScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

const generateAdminPassword = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const AdminAccessScreen: React.FC<AdminAccessScreenProps> = ({ onBack, onSuccess }) => {
  const [generatedPassword, setGeneratedPassword] = useState(generateAdminPassword);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== generatedPassword) {
      setError('That password does not match. Try again or generate a new password.');
      return;
    }

    setError('');
    onSuccess();
  };

  const handleRegenerate = () => {
    setGeneratedPassword(generateAdminPassword());
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center font-sans">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 sm:p-8 shadow-2xl animate-enter">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Admin access</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A one-time demo password has been generated for this visit. Enter it below to continue.
        </p>

        <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-purple-800">
            <KeyRound className="h-4 w-4" />
            Generated demo password
          </div>
          <code className="block break-all rounded-xl bg-white px-3 py-3 text-sm font-bold tracking-wider text-slate-900">
            {generatedPassword}
          </code>
          <button
            type="button"
            onClick={handleRegenerate}
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-purple-800 transition hover:text-purple-950"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Generate a new password
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label htmlFor="admin-password" className="block text-sm font-bold text-slate-800">
            Enter the generated password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder="Enter the password shown above"
            required
          />
          {error && (
            <p role="alert" className="text-sm font-medium text-rose-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/15 transition hover:bg-purple-800 active:scale-[0.99]"
          >
            <ShieldCheck className="h-4 w-4" />
            Unlock admin dashboard
          </button>
        </form>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Demo-only access gate. Real admin authentication must be verified by a secure backend.
        </p>
      </div>
    </div>
  );
};
