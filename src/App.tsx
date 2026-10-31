import React, { useState } from 'react';
import { Copy, Check, Download, Code2, Calculator, FileText, Sparkles, Terminal } from 'lucide-react';

export const PYTHON_TKINTER_CODE = `import tkinter as tk

# 1. Cria a janela da calculadora
janela = tk.Tk()
janela.title("Calculadora")
janela.geometry("280x380")
janela.resizable(False, False)

expressao = ""

# 2. Quando clica em um botão
def clicar(botao):
    global expressao
    expressao += str(botao)
    texto_visor.set(expressao)

# 3. Quando clica no botão '='
def calcular():
    global expressao
    try:
        resultado = str(eval(expressao))
        texto_visor.set(resultado)
        expressao = resultado
    except ZeroDivisionError:
        texto_visor.set("Erro: Divisão por 0")
        expressao = ""
    except Exception:
        texto_visor.set("Erro")
        expressao = ""

# 4. Quando clica no botão 'C'
def limpar():
    global expressao
    expressao = ""
    texto_visor.set("")

# 5. Visor da calculadora
texto_visor = tk.StringVar()
visor = tk.Entry(janela, textvariable=texto_visor, font=("Arial", 22), justify="right", bd=8)
visor.grid(row=0, column=0, columnspan=4, padx=10, pady=12, sticky="nsew")

# 6. Organização dos botões (Texto, Linha, Coluna)
botoes = [
    ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
    ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
    ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
    ('C', 4, 0), ('0', 4, 1), ('=', 4, 2), ('+', 4, 3),
]

# 7. Criação dos botões
for (texto, linha, coluna) in botoes:
    if texto == '=':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#22c55e", fg="white", command=calcular)
    elif texto == 'C':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#ef4444", fg="white", command=limpar)
    elif texto in ['+', '-', '*', '/']:
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#f97316", fg="white", command=lambda t=texto: clicar(t))
    else:
        btn = tk.Button(janela, text=texto, font=("Arial", 14), bg="#f1f5f9", command=lambda t=texto: clicar(t))

    btn.grid(row=linha, column=coluna, padx=4, pady=4, sticky="nsew")

# 8. Ajuste das proporções
for i in range(5):
    janela.grid_rowconfigure(i, weight=1)
for j in range(4):
    janela.grid_columnconfigure(j, weight=1)

# Inicia o programa
if __name__ == "__main__":
    janela.mainloop()
`;

export default function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [lastAction, setLastAction] = useState<string>('Pronta para calcular');

  // Button click simulator matching Python tkinter logic
  const handleButtonClick = (btn: string) => {
    if (btn === 'C') {
      setDisplay('0');
      setExpression('');
      setLastAction('limpar() chamado: visor zerado');
      return;
    }

    if (btn === '=') {
      setLastAction('calcular() chamado: executando eval(...)');
      try {
        if (!expression) return;
        const safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        if (/\/0(?!\.)/.test(safeExpr) || /\/0\.0*$/.test(safeExpr)) {
          setDisplay('Erro: Divisão por 0');
          setExpression('');
          setLastAction('ZeroDivisionError capturado com sucesso');
          return;
        }

        const result = Function(`"use strict"; return (${safeExpr})`)();
        const formatted = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(6)));
        setDisplay(formatted);
        setExpression(formatted);
        setLastAction(`Resultado calculado: ${formatted}`);
      } catch {
        setDisplay('Erro');
        setExpression('');
        setLastAction('Exceção capturada: Erro na expressão');
      }
      return;
    }

    let newExpr = expression;
    if (expression === '' && ['+', '*', '/'].includes(btn)) {
      return;
    }

    if (expression === '' && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(btn)) {
      newExpr = btn;
    } else {
      newExpr = expression + btn;
    }

    setExpression(newExpr);
    setDisplay(newExpr);
    setLastAction(`clicar('${btn}') chamado -> expressao = "${newExpr}"`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_TKINTER_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([PYTHON_TKINTER_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const buttons = [
    { label: '7', row: 1, col: 0, type: 'num' },
    { label: '8', row: 1, col: 1, type: 'num' },
    { label: '9', row: 1, col: 2, type: 'num' },
    { label: '/', row: 1, col: 3, type: 'op' },

    { label: '4', row: 2, col: 0, type: 'num' },
    { label: '5', row: 2, col: 1, type: 'num' },
    { label: '6', row: 2, col: 2, type: 'num' },
    { label: '*', row: 2, col: 3, type: 'op' },

    { label: '1', row: 3, col: 0, type: 'num' },
    { label: '2', row: 3, col: 1, type: 'num' },
    { label: '3', row: 3, col: 2, type: 'num' },
    { label: '-', row: 3, col: 3, type: 'op' },

    { label: 'C', row: 4, col: 0, type: 'clear' },
    { label: '0', row: 4, col: 1, type: 'num' },
    { label: '=', row: 4, col: 2, type: 'equals' },
    { label: '+', row: 4, col: 3, type: 'op' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800 p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <header className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🐍</span>
            <span>Calculadora em Python (Tkinter)</span>
          </h1>
          <p className="text-xs text-slate-500">
            A calculadora visual e o código Python <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">calculadora.py</code> lado a lado
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 text-xs font-semibold bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar calculadora.py</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCode}
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </header>

      {/* Main Unified View: Calculator + Code Side-by-Side */}
      <main className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-6">
        {/* Left Side: Interactive Tkinter-style Calculator (Col 5) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-xl border border-slate-300 p-5 space-y-4">
            {/* Tkinter Window Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                Calculadora
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              </div>
            </div>

            {/* Display Screen */}
            <div className="bg-slate-900 rounded-xl p-4 text-right border-2 border-slate-800 shadow-inner">
              <div className="text-[11px] font-mono text-slate-400 h-4">
                {expression && expression !== display ? expression : ''}
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight overflow-x-auto whitespace-nowrap">
                {display}
              </div>
            </div>

            {/* 4x4 Grid of Buttons */}
            <div className="grid grid-cols-4 gap-2.5">
              {buttons.map((btn) => {
                let btnStyle = 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200';

                if (btn.type === 'op') {
                  btnStyle = 'bg-amber-500 hover:bg-amber-600 text-white font-bold border-amber-600 shadow-xs';
                } else if (btn.type === 'clear') {
                  btnStyle = 'bg-rose-500 hover:bg-rose-600 text-white font-bold border-rose-600 shadow-xs';
                } else if (btn.type === 'equals') {
                  btnStyle = 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-emerald-700 shadow-xs';
                }

                return (
                  <button
                    key={btn.label}
                    onClick={() => handleButtonClick(btn.label)}
                    className={`h-14 rounded-xl text-lg font-semibold transition-all active:scale-95 border flex items-center justify-center cursor-pointer select-none ${btnStyle}`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>

            {/* Real-time status / function callback trace */}
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="truncate">{lastAction}</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Python Code Included Directly (Col 7) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs">
              <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                calculadora.py (Código em Python)
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Tkinter nativo · 58 linhas
              </span>
            </div>

            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-[440px] overflow-y-auto whitespace-pre p-2 bg-slate-950/80 rounded-xl border border-slate-800">
              {PYTHON_TKINTER_CODE}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O arquivo <strong>calculadora.py</strong> está salvo na raiz do projeto!</span>
            </span>
            <span className="font-mono text-slate-500">python calculadora.py</span>
          </div>
        </div>
      </main>

      {/* Footer with run command */}
      <footer className="max-w-6xl mx-auto w-full bg-white rounded-xl border border-slate-200 p-3.5 text-xs text-slate-600 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-slate-800">Como executar no seu terminal:</span>{' '}
          <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-900 font-bold border border-slate-200">
            python calculadora.py
          </code>
        </div>
        <div className="text-slate-500">
          Usa apenas a biblioteca padrão do Python (sem <code>pip install</code>).
        </div>
      </footer>
    </div>
  );
}
