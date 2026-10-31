import React, { useState } from 'react';
import { Calculator as CalcIcon, Code2, Sparkles, Delete, RotateCcw } from 'lucide-react';

export const VisualCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/' | null>(null);
  const [pythonTrace, setPythonTrace] = useState<string>(
    '# Pressione os botões para ver a tradução direta para funções Python!'
  );
  const [waitingForNext, setWaitingForNext] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForNext) {
      setDisplay('0.');
      setWaitingForNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: '+' | '-' | '*' | '/') => {
    const current = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      executeCalc(prevValue, current, operation);
    }

    setOperation(op);
    setWaitingForNext(true);

    const funcName =
      op === '+' ? 'somar' :
      op === '-' ? 'subtrair' :
      op === '*' ? 'multiplicar' : 'dividir';

    setPythonTrace(`num1 = ${current}\n# Aguardando segundo número para chamar: ${funcName}(${current}, ...)`);
  };

  const executeCalc = (n1: number, n2: number, op: '+' | '-' | '*' | '/') => {
    let res = 0;
    let trace = '';

    if (op === '+') {
      res = n1 + n2;
      trace = `# Chamando função Python:\\ndef somar(a, b):\\n    return a + b\\n\\nresultado = somar(${n1}, ${n2})\\n# resultado -> ${res}`;
    } else if (op === '-') {
      res = n1 - n2;
      trace = `# Chamando função Python:\\ndef subtrair(a, b):\\n    return a - b\\n\\nresultado = subtrair(${n1}, ${n2})\\n# resultado -> ${res}`;
    } else if (op === '*') {
      res = n1 * n2;
      trace = `# Chamando função Python:\\ndef multiplicar(a, b):\\n    return a * b\\n\\nresultado = multiplicar(${n1}, ${n2})\\n# resultado -> ${res}`;
    } else if (op === '/') {
      if (n2 === 0) {
        setDisplay('Erro');
        setPrevValue(null);
        setOperation(null);
        setWaitingForNext(true);
        setPythonTrace(
          `# Chamando função Python:\\ndef dividir(a, b):\\n    if b == 0:\\n        return "Erro: Impossível dividir por zero!"\\n\\nresultado = dividir(${n1}, 0)\\n# Retorno: "Erro: Impossível dividir por zero!"`
        );
        return;
      }
      res = n1 / n2;
      trace = `# Chamando função Python:\\ndef dividir(a, b):\\n    if b == 0: return ...\\n    return a / b\\n\\nresultado = dividir(${n1}, ${n2})\\n# resultado -> ${res}`;
    }

    // Clean up floating precision
    const formatted = Number.isInteger(res) ? res : Number(res.toFixed(6));
    setDisplay(String(formatted));
    setPrevValue(formatted);
    setPythonTrace(trace);
  };

  const handleEquals = () => {
    if (prevValue !== null && operation !== null) {
      const current = parseFloat(display);
      executeCalc(prevValue, current, operation);
      setOperation(null);
      setWaitingForNext(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNext(false);
    setPythonTrace('# Calculadora limpa. Digite um número...');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Visual Calculator keypad (Left/Col 5) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-sm mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalcIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Calculadora Visual</h3>
          </div>
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors"
          >
            Limpar (C)
          </button>
        </div>

        {/* Display */}
        <div className="bg-slate-900 rounded-xl p-4 mb-4 text-right border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 h-4">
            {prevValue !== null && operation !== null && `${prevValue} ${operation}`}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight overflow-x-auto">
            {display}
          </div>
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
          <button
            onClick={handleClear}
            className="col-span-2 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Limpar (C)
          </button>
          <button
            onClick={() => setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))}
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOp('/')}
            className={`p-3 rounded-xl transition-colors font-mono text-base ${
              operation === '/' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            /
          </button>

          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOp('*')}
            className={`p-3 rounded-xl transition-colors font-mono text-base ${
              operation === '*' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            *
          </button>

          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOp('-')}
            className={`p-3 rounded-xl transition-colors font-mono text-base ${
              operation === '-' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            -
          </button>

          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOp('+')}
            className={`p-3 rounded-xl transition-colors font-mono text-base ${
              operation === '+' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            +
          </button>

          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 transition-colors"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-base shadow-xs transition-colors"
          >
            =
          </button>
        </div>
      </div>

      {/* Real-time Python Code Bridge (Right/Col 7) */}
      <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between min-h-[400px]">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Code2 className="w-4 h-4" />
              <span>Tradução em Tempo Real para Python</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Código gerado</span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-3">
              Toda vez que você clica em um botão na calculadora ao lado, é exatamente este código que o Python executaria por baixo dos panos:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs sm:text-sm text-amber-300 leading-relaxed whitespace-pre overflow-x-auto">
              {pythonTrace}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-blue-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Por que isso ajuda a aprender?</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Muitas pessoas usam calculadoras gráficas no dia a dia sem perceber que qualquer app comercial é composto por pequenas funções como <code className="text-sky-300 font-mono">somar(a, b)</code>, parâmetros e retornos!
          </p>
        </div>
      </div>
    </div>
  );
};
