import type { ReactNode } from 'react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <span className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-900/60 flex items-center justify-center text-white font-black text-2xl">S</span>
          <h1 className="mt-3 text-xl font-extrabold tracking-tight bg-linear-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-transparent">SENA SpaceHub</h1>
        </div>
        <div className="p-7 bg-ink-800/70 border border-violet-400/20 rounded-3xl backdrop-blur-md text-white shadow-2xl shadow-violet-950/60">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <p className="text-xs text-ink-400 text-center mt-1 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
