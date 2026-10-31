import React, { useState } from 'react';
import { BEGINNER_CONCEPTS } from '../data/pythonCode';
import { BookOpen, Layers, Terminal, Sparkles, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const BeginnerGuide: React.FC = () => {
  const [expandedConcept, setExpandedConcept] = useState<string | null>('funcoes');

  const operators = [
    { symbol: '+', name: 'Adição', example: '10 + 5', result: '15', note: 'Soma dois números.' },
    { symbol: '-', name: 'Subtração', example: '10 - 5', result: '5', note: 'Diminui o segundo número do primeiro.' },
    { symbol: '*', name: 'Multiplicação', example: '10 * 5', result: '50', note: 'Multiplica os valores (usa asterisco).' },
    { symbol: '/', name: 'Divisão', example: '10 / 4', result: '2.5', note: 'Divisão real. Em Python 3 sempre resulta em float.' },
    { symbol: '//', name: 'Divisão Inteira', example: '10 // 4', result: '2', note: 'Retorna apenas a parte inteira do quociente.' },
    { symbol: '%', name: 'Módulo (Resto)', example: '10 % 4', result: '2', note: 'Retorna o resto da divisão (ótimo para saber se é par).' },
    { symbol: '**', name: 'Potenciação', example: '2 ** 3', result: '8', note: 'Eleva a uma potência (2³ = 8).' },
  ];

  return (
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Guia do Iniciante em Programação</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            Entenda Cada Parte da sua Calculadora em Python
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Quando você constrói uma calculadora, você exercita os <strong>5 pilares essenciais</strong> de qualquer linguagem de programação moderna: variáveis, funções, conversão de dados, tomada de decisão e repetição contínua.
          </p>
        </div>
      </div>

      {/* Operators Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Operadores Aritméticos em Python</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Aqui estão os operadores matemáticos básicos e avançados que você pode usar em seus scripts.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Operador</th>
                <th className="py-2.5 px-3 font-semibold">Operação</th>
                <th className="py-2.5 px-3 font-semibold font-mono">Exemplo</th>
                <th className="py-2.5 px-3 font-semibold font-mono">Resultado</th>
                <th className="py-2.5 px-3 font-semibold">O que faz?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {operators.map((op, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600 text-sm">{op.symbol}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{op.name}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 bg-slate-50 rounded px-1.5">{op.example}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-emerald-600">{op.result}</td>
                  <td className="py-2.5 px-3 text-slate-500">{op.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive Concepts Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900">Conceitos Fundamentais Usados no Código</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Clique em cada conceito para abrir a explicação detalhada e exemplos ilustrativos.
        </p>

        <div className="space-y-3">
          {BEGINNER_CONCEPTS.map((concept) => {
            const isExpanded = expandedConcept === concept.id;
            return (
              <div
                key={concept.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/40"
              >
                <button
                  onClick={() => setExpandedConcept(isExpanded ? null : concept.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {concept.id === 'funcoes' && 'def'}
                      {concept.id === 'tipos' && 'str'}
                      {concept.id === 'condicionais' && 'if'}
                      {concept.id === 'loops' && 'for'}
                      {concept.id === 'erros' && 'try'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{concept.title}</h4>
                      <p className="text-xs text-slate-500">{concept.summary}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-200/60 bg-white space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {concept.explanation}
                    </p>

                    <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 text-xs font-mono text-amber-300 whitespace-pre overflow-x-auto">
                      {concept.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Functions vs Single Script Comparison */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          Por que usamos funções em vez de jogar tudo solto no arquivo?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Comparação rápida entre as duas abordagens mais comuns de iniciantes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-rose-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-rose-700 font-bold text-xs uppercase">
              <span>⚠️ Código Sem Funções (Tudo solto)</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 overflow-x-auto">
{`# Difícil de reutilizar e testar
a = float(input())
b = float(input())
print(a + b) # Se precisar somar de novo,
             # tem que reescrever a linha!`}
            </pre>
            <p className="text-xs text-slate-500 mt-2">
              Funciona para scripts rápidos, mas fica confuso e vira "código espaguete" conforme o projeto cresce.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs uppercase">
              <span>✅ Código Com Funções (Modular)</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 overflow-x-auto">
{`def somar(a, b):
    return a + b

# Reutilizável em qualquer lugar:
res1 = somar(10, 5)
res2 = somar(100, 50)`}
            </pre>
            <p className="text-xs text-slate-500 mt-2">
              Você escreve a lógica uma única vez e pode chamar a função quantas vezes quiser!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
