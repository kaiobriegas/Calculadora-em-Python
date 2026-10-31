import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Terminal as TerminalIcon, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'menu' | 'prompt' | 'input' | 'output-success' | 'output-error' | 'output-info';
  text: string;
}

type SimulatorState = 
  | { stage: 'MENU_OPTION' }
  | { stage: 'GET_NUM1'; option: string }
  | { stage: 'GET_NUM2'; option: string; num1: number }
  | { stage: 'EXITED' };

export const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [state, setState] = useState<SimulatorState>({ stage: 'MENU_OPTION' });
  const [stats, setStats] = useState({ totalCalcs: 0, additions: 0, subtractions: 0, multiplications: 0, divisions: 0 });
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getMenuText = () => [
    '================================',
    '      CALCULADORA EM PYTHON     ',
    '================================',
    '1 - Adição (+)',
    '2 - Subtração (-)',
    '3 - Multiplicação (*)',
    '4 - Divisão (/)',
    '0 - Sair',
    '================================',
  ];

  // Initialize terminal
  const resetTerminal = () => {
    const initialLines: TerminalLine[] = [
      { id: '1', type: 'system', text: 'Python 3.12.0 (main, Calculadora Interativa - AI Studio)' },
      { id: '2', type: 'system', text: 'Executando: python calculadora.py ...' },
      ...getMenuText().map((txt, idx) => ({
        id: `menu-${idx}`,
        type: 'menu' as const,
        text: txt,
      })),
      { id: 'prompt-1', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
    ];
    setLines(initialLines);
    setState({ stage: 'MENU_OPTION' });
    setCurrentInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    resetTerminal();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleProcessInput = (rawValue: string) => {
    const value = rawValue.trim();
    if (!value && state.stage !== 'EXITED') return;

    if (state.stage === 'EXITED') {
      resetTerminal();
      return;
    }

    // Record user's typed input
    const inputLine: TerminalLine = {
      id: String(Date.now()),
      type: 'input',
      text: value,
    };

    if (state.stage === 'MENU_OPTION') {
      if (value === '0') {
        setLines(prev => [
          ...prev,
          inputLine,
          {
            id: `bye-${Date.now()}`,
            type: 'output-info',
            text: 'Obrigado por usar a calculadora! Bons estudos em Python! 🐍',
          },
          {
            id: `exit-${Date.now()}`,
            type: 'system',
            text: '[Processo finalizado com código 0. Pressione Enter para reiniciar]',
          },
        ]);
        setState({ stage: 'EXITED' });
        setCurrentInput('');
        return;
      }

      if (['1', '2', '3', '4'].includes(value)) {
        setLines(prev => [
          ...prev,
          inputLine,
          {
            id: `prompt-num1-${Date.now()}`,
            type: 'prompt',
            text: 'Digite o primeiro número: ',
          },
        ]);
        setState({ stage: 'GET_NUM1', option: value });
        setCurrentInput('');
        return;
      }

      // Invalid option
      setLines(prev => [
        ...prev,
        inputLine,
        {
          id: `err-${Date.now()}`,
          type: 'output-error',
          text: '❌ Opção inválida! Escolha um número entre 0 e 4.',
        },
        ...getMenuText().map((txt, idx) => ({
          id: `menu-re-${Date.now()}-${idx}`,
          type: 'menu' as const,
          text: txt,
        })),
        {
          id: `prompt-retry-${Date.now()}`,
          type: 'prompt',
          text: 'Escolha uma opção (0 a 4): ',
        },
      ]);
      setCurrentInput('');
      return;
    }

    if (state.stage === 'GET_NUM1') {
      const parsed = Number(value.replace(',', '.'));
      if (isNaN(parsed) || value === '') {
        // Simulates ValueError in Python
        setLines(prev => [
          ...prev,
          inputLine,
          {
            id: `val-err-${Date.now()}`,
            type: 'output-error',
            text: '⚠️ Entrada inválida! Digite apenas números válidos (ex: 10 ou 4.5).',
          },
          ...getMenuText().map((txt, idx) => ({
            id: `menu-re-${Date.now()}-${idx}`,
            type: 'menu' as const,
            text: txt,
          })),
          {
            id: `prompt-re-${Date.now()}`,
            type: 'prompt',
            text: 'Escolha uma opção (0 a 4): ',
          },
        ]);
        setState({ stage: 'MENU_OPTION' });
        setCurrentInput('');
        return;
      }

      setLines(prev => [
        ...prev,
        inputLine,
        {
          id: `prompt-num2-${Date.now()}`,
          type: 'prompt',
          text: 'Digite o segundo número: ',
        },
      ]);
      setState({ stage: 'GET_NUM2', option: state.option, num1: parsed });
      setCurrentInput('');
      return;
    }

    if (state.stage === 'GET_NUM2') {
      const parsed = Number(value.replace(',', '.'));
      if (isNaN(parsed) || value === '') {
        setLines(prev => [
          ...prev,
          inputLine,
          {
            id: `val-err2-${Date.now()}`,
            type: 'output-error',
            text: '⚠️ Entrada inválida! Digite apenas números válidos (ex: 10 ou 4.5).',
          },
          ...getMenuText().map((txt, idx) => ({
            id: `menu-re-${Date.now()}-${idx}`,
            type: 'menu' as const,
            text: txt,
          })),
          {
            id: `prompt-re-${Date.now()}`,
            type: 'prompt',
            text: 'Escolha uma opção (0 a 4): ',
          },
        ]);
        setState({ stage: 'MENU_OPTION' });
        setCurrentInput('');
        return;
      }

      const n1 = state.num1;
      const n2 = parsed;
      let outputText = '';
      let isError = false;

      if (state.option === '1') {
        const res = n1 + n2;
        outputText = `✅ Resultado: ${n1} + ${n2} = ${res}`;
        setStats(s => ({ ...s, totalCalcs: s.totalCalcs + 1, additions: s.additions + 1 }));
      } else if (state.option === '2') {
        const res = n1 - n2;
        outputText = `✅ Resultado: ${n1} - ${n2} = ${res}`;
        setStats(s => ({ ...s, totalCalcs: s.totalCalcs + 1, subtractions: s.subtractions + 1 }));
      } else if (state.option === '3') {
        const res = n1 * n2;
        outputText = `✅ Resultado: ${n1} * ${n2} = ${res}`;
        setStats(s => ({ ...s, totalCalcs: s.totalCalcs + 1, multiplications: s.multiplications + 1 }));
      } else if (state.option === '4') {
        if (n2 === 0) {
          outputText = '⚠️ Erro: Impossível dividir por zero!';
          isError = true;
        } else {
          const res = n1 / n2;
          // Format neatly if clean decimal or float
          const formatted = Number.isInteger(res) ? res : Number(res.toFixed(6));
          outputText = `✅ Resultado: ${n1} / ${n2} = ${formatted}`;
          setStats(s => ({ ...s, totalCalcs: s.totalCalcs + 1, divisions: s.divisions + 1 }));
        }
      }

      setLines(prev => [
        ...prev,
        inputLine,
        {
          id: `res-${Date.now()}`,
          type: isError ? 'output-error' : 'output-success',
          text: outputText,
        },
        ...getMenuText().map((txt, idx) => ({
          id: `menu-loop-${Date.now()}-${idx}`,
          type: 'menu' as const,
          text: txt,
        })),
        {
          id: `prompt-loop-${Date.now()}`,
          type: 'prompt',
          text: 'Escolha uma opção (0 a 4): ',
        },
      ]);

      setState({ stage: 'MENU_OPTION' });
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleProcessInput(currentInput);
    }
  };

  // Preset execution shortcuts for beginners
  const runPreset = (opt: string, val1: string, val2: string) => {
    resetTerminal();
    setTimeout(() => {
      // Simulate automated interaction sequence
      setLines(prev => {
        const n1 = Number(val1);
        const n2 = Number(val2);
        let res = '';
        let isErr = false;

        if (opt === '1') res = `✅ Resultado: ${n1} + ${n2} = ${n1 + n2}`;
        if (opt === '2') res = `✅ Resultado: ${n1} - ${n2} = ${n1 - n2}`;
        if (opt === '3') res = `✅ Resultado: ${n1} * ${n2} = ${n1 * n2}`;
        if (opt === '4') {
          if (n2 === 0) {
            res = '⚠️ Erro: Impossível dividir por zero!';
            isErr = true;
          } else {
            res = `✅ Resultado: ${n1} / ${n2} = ${n1 / n2}`;
          }
        }

        return [
          ...prev,
          { id: 'p1', type: 'input', text: opt },
          { id: 'p2', type: 'prompt', text: 'Digite o primeiro número: ' },
          { id: 'p3', type: 'input', text: val1 },
          { id: 'p4', type: 'prompt', text: 'Digite o segundo número: ' },
          { id: 'p5', type: 'input', text: val2 },
          { id: 'p6', type: isErr ? 'output-error' : 'output-success', text: res },
          ...getMenuText().map((txt, idx) => ({
            id: `p-menu-${idx}`,
            type: 'menu' as const,
            text: txt,
          })),
          { id: 'p-last', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
        ];
      });
      setState({ stage: 'MENU_OPTION' });
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Top terminal bar */}
      <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            terminal: python calculadora.py
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            Contas realizadas: <strong className="text-emerald-400">{stats.totalCalcs}</strong>
          </span>
          <button
            onClick={resetTerminal}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors font-mono text-[11px]"
            title="Reiniciar programa Python"
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Preset interactive triggers */}
      <div className="bg-slate-950/70 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Testes rápidos:
        </span>
        <button
          onClick={() => runPreset('1', '15', '27')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors shrink-0 font-mono"
        >
          ➕ 15 + 27
        </button>
        <button
          onClick={() => runPreset('2', '100', '42')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors shrink-0 font-mono"
        >
          ➖ 100 - 42
        </button>
        <button
          onClick={() => runPreset('3', '8', '9')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors shrink-0 font-mono"
        >
          ✖️ 8 × 9
        </button>
        <button
          onClick={() => runPreset('4', '50', '4')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors shrink-0 font-mono"
        >
          ➗ 50 ÷ 4
        </button>
        <button
          onClick={() => runPreset('4', '10', '0')}
          className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/70 border border-rose-800/50 text-rose-300 transition-colors shrink-0 font-mono"
        >
          ⚠️ Divisão por 0
        </button>
      </div>

      {/* Terminal log output */}
      <div 
        className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-1.5 min-h-[360px] max-h-[500px] select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => {
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-slate-500 italic">
                {line.text}
              </div>
            );
          }
          if (line.type === 'menu') {
            return (
              <div key={line.id} className="text-cyan-400/90 whitespace-pre">
                {line.text}
              </div>
            );
          }
          if (line.type === 'prompt') {
            return (
              <div key={line.id} className="text-amber-400 font-semibold pt-1">
                {line.text}
              </div>
            );
          }
          if (line.type === 'input') {
            return (
              <div key={line.id} className="text-white flex items-center gap-2 pl-2">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className="bg-slate-800/80 px-2 py-0.5 rounded text-amber-200 font-medium">
                  {line.text}
                </span>
              </div>
            );
          }
          if (line.type === 'output-success') {
            return (
              <div key={line.id} className="text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-800/40 my-1">
                {line.text}
              </div>
            );
          }
          if (line.type === 'output-error') {
            return (
              <div key={line.id} className="text-rose-400 font-semibold bg-rose-950/30 p-2 rounded border border-rose-800/40 my-1">
                {line.text}
              </div>
            );
          }
          if (line.type === 'output-info') {
            return (
              <div key={line.id} className="text-indigo-300 font-medium bg-indigo-950/30 p-2 rounded border border-indigo-800/40 my-1">
                {line.text}
              </div>
            );
          }
          return null;
        })}

        {/* Active prompt & input line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={state.stage === 'EXITED'}
            placeholder={
              state.stage === 'EXITED'
                ? 'Script finalizado. Pressione "Reiniciar" acima.'
                : state.stage === 'MENU_OPTION'
                ? 'Digite a opção (0, 1, 2, 3 ou 4) e tecle Enter...'
                : 'Digite o valor e tecle Enter...'
            }
            className="flex-1 bg-transparent text-white font-mono focus:outline-hidden placeholder:text-slate-600 text-xs sm:text-sm"
            autoFocus
          />
          <button
            onClick={() => handleProcessInput(currentInput)}
            disabled={!currentInput.trim() || state.stage === 'EXITED'}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white rounded text-xs font-mono font-medium transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Enviar</span>
          </button>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Helpful terminal tips footer */}
      <div className="bg-slate-950 p-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-slate-400">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>
            {state.stage === 'MENU_OPTION' && 'Digite 1 para somar, 2 para subtrair, 3 para multiplicar, 4 para dividir ou 0 para sair.'}
            {state.stage === 'GET_NUM1' && 'Digite o primeiro número (inteiro ou com ponto decimal, ex: 15.5) e aperte Enter.'}
            {state.stage === 'GET_NUM2' && 'Digite o segundo número. Dica: digite 0 na divisão para ver a proteção de erro!'}
            {state.stage === 'EXITED' && 'O programa finalizou! Clique em Reiniciar para rodar novamente.'}
          </span>
        </span>
        <span className="text-slate-400 font-mono">Terminal Interativo Python</span>
      </div>
    </div>
  );
};
