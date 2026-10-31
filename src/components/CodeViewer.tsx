import React, { useState } from 'react';
import { PYTHON_CALCULATOR_CODE, PYTHON_CALCULATOR_SIMPLE, CODE_EXPLANATIONS } from '../data/pythonCode';
import { Copy, Check, Info, Sparkles, BookOpen, Layers } from 'lucide-react';

interface CodeViewerProps {
  onCopy: (text: string) => void;
  copied: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onCopy, copied }) => {
  const [version, setVersion] = useState<'modular' | 'simple'>('modular');
  const [selectedLine, setSelectedLine] = useState<number>(7); // Default to def somar

  const currentCode = version === 'modular' ? PYTHON_CALCULATOR_CODE : PYTHON_CALCULATOR_SIMPLE;
  const lines = currentCode.split('\n');

  // Syntax highlighting helper for Python code
  const formatPythonLine = (lineText: string) => {
    // If it's a comment
    if (lineText.trim().startsWith('#')) {
      return <span className="text-emerald-400/80 italic">{lineText}</span>;
    }

    // Split keeping delimiters and quotes
    // Simple tokenizer for display
    const keywords = ['def', 'return', 'while', 'break', 'if', 'elif', 'else', 'try', 'except', 'continue', 'in', 'isinstance', 'True', 'False', 'None'];
    const builtins = ['print', 'input', 'float', 'int', 'str', 'len'];

    // Split line by string literals, words, symbols
    const parts = lineText.split(/(".*?"|'.*?'|\b)/g);

    return parts.map((part, index) => {
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={index} className="text-amber-300 font-normal">{part}</span>;
      }
      if (keywords.includes(part)) {
        return <span key={index} className="text-purple-400 font-bold">{part}</span>;
      }
      if (builtins.includes(part)) {
        return <span key={index} className="text-sky-400 font-medium">{part}</span>;
      }
      if (/^\d+(\.\d+)?$/.test(part)) {
        return <span key={index} className="text-orange-300">{part}</span>;
      }
      if (['+', '-', '*', '/', '==', '=', '!=', ':', ','].includes(part)) {
        return <span key={index} className="text-pink-400 font-semibold">{part}</span>;
      }
      return <span key={index} className="text-slate-200">{part}</span>;
    });
  };

  const activeExplanation = version === 'modular' ? CODE_EXPLANATIONS[selectedLine] : null;

  return (
    <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Code Header Bar */}
      <div className="bg-slate-950 px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Modo de Exibição:</span>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => {
                setVersion('modular');
                setSelectedLine(7);
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                version === 'modular'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Completo com Funções (Recomendado)
            </button>
            <button
              onClick={() => {
                setVersion('simple');
                setSelectedLine(0);
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                version === 'simple'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Versão Sequencial Direta
            </button>
          </div>
        </div>

        <button
          onClick={() => onCopy(currentCode)}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors font-mono"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Código</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Split view between Code & Interactive Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Code Lines Viewer (col 7 on desktop) */}
        <div className="lg:col-span-7 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 overflow-x-auto max-h-[580px] overflow-y-auto">
          <div className="p-3 text-[11px] text-slate-400 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {version === 'modular'
                ? '💡 Dica: Clique nas linhas destacadas com o ícone 💡 para ver a explicação detalhada.'
                : 'Código sequencial sem loops, perfeito para seu primeiro contato com Python.'}
            </span>
          </div>

          <table className="w-full font-mono text-xs border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const hasExplanation = version === 'modular' && !!CODE_EXPLANATIONS[lineNum];
                const isSelected = selectedLine === lineNum;

                return (
                  <tr
                    key={lineNum}
                    onClick={() => hasExplanation && setSelectedLine(lineNum)}
                    className={`transition-colors group ${
                      isSelected
                        ? 'bg-blue-900/35 border-l-2 border-blue-500'
                        : hasExplanation
                        ? 'hover:bg-slate-800/60 cursor-pointer'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    {/* Line number */}
                    <td className="w-12 select-none text-right pr-3 pl-2 py-0.5 text-slate-600 group-hover:text-slate-400 font-mono text-[11px]">
                      <div className="flex items-center justify-end gap-1">
                        {hasExplanation && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-amber-400' : 'bg-blue-400/70'
                            }`}
                            title="Linha explicada"
                          />
                        )}
                        <span>{lineNum}</span>
                      </div>
                    </td>

                    {/* Code content */}
                    <td className="py-0.5 px-2 whitespace-pre leading-relaxed font-mono">
                      {formatPythonLine(line)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Interactive Explanation Sidebar / Bottom (col 5 on desktop) */}
        <div className="lg:col-span-5 bg-slate-950/90 p-5 flex flex-col justify-between overflow-y-auto max-h-[580px]">
          {version === 'modular' && activeExplanation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {activeExplanation.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  Linha {selectedLine}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {activeExplanation.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeExplanation.description}
                </p>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  Por que usamos isso em Python?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeExplanation.detail}
                </p>
              </div>

              <div className="bg-amber-950/30 rounded-xl p-3.5 border border-amber-800/40 space-y-1.5">
                <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Dica de Ouro para Iniciantes
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {activeExplanation.tip}
                </p>
              </div>

              {/* Quick links to other key lines */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                  Navegue pelos conceitos do código:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(CODE_EXPLANATIONS).map(([lineStr, exp]) => {
                    const lNum = Number(lineStr);
                    const isCur = lNum === selectedLine;
                    return (
                      <button
                        key={lNum}
                        onClick={() => setSelectedLine(lNum)}
                        className={`text-[11px] px-2 py-1 rounded-md transition-colors ${
                          isCur
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        L{lNum}: {exp.category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Sobre a Versão Sequencial</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Esta versão executa em linha reta do topo para o final:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Ideal para quem está nos <strong>primeiros 2 dias de estudo</strong> de lógica.</li>
                <li>Lê a operação desejada com <code className="text-amber-300 font-mono">input()</code>.</li>
                <li>Lê os números e converte com <code className="text-amber-300 font-mono">float()</code>.</li>
                <li>Usa <code className="text-purple-300 font-mono">if / elif / else</code> para decidir qual conta calcular.</li>
                <li>Imprime o resultado e finaliza o script.</li>
              </ul>
              <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-800/40 text-xs text-blue-200">
                👉 Quando estiver confortável com essa estrutura simples, mude para a <strong>Versão Completa com Funções</strong> para aprender modularidade e repetição!
              </div>
            </div>
          )}

          {/* Quick Python snippet footer */}
          <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="font-mono">python3 calculadora.py</span>
            <span className="text-emerald-400 font-medium">Sintaxe PEP 8</span>
          </div>
        </div>
      </div>
    </div>
  );
};
