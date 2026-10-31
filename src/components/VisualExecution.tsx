import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Play, RotateCcw, Cpu, Sparkles, Check, AlertCircle } from 'lucide-react';

export const VisualExecution: React.FC = () => {
  const [op, setOp] = useState<'somar' | 'subtrair' | 'multiplicar' | 'dividir'>('somar');
  const [valA, setValA] = useState<number>(12);
  const [valB, setValB] = useState<number>(4);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const getSteps = () => {
    const isDivByZero = op === 'dividir' && valB === 0;

    const opSymbol = op === 'somar' ? '+' : op === 'subtrair' ? '-' : op === 'multiplicar' ? '*' : '/';
    const computedVal = 
      op === 'somar' ? valA + valB :
      op === 'subtrair' ? valA - valB :
      op === 'multiplicar' ? valA * valB :
      isDivByZero ? null : valA / valB;

    if (isDivByZero) {
      return [
        {
          title: '1. Chamada da Função Principal',
          code: `opcao = "4"\\nnum1 = ${valA}.0\\nnum2 = ${valB}.0\\nresultado = dividir(num1, num2)`,
          explanation: 'O programa chama a função dividir() passando os valores digitados como argumentos.',
          stateDesc: `num1 = ${valA}.0, num2 = ${valB}.0`,
          highlight: 'chamada'
        },
        {
          title: '2. Escopo Local e Parâmetros',
          code: `def dividir(a, b):\\n    # Memória local da função:\\n    # a = ${valA}.0\\n    # b = 0.0`,
          explanation: 'Os parâmetros "a" e "b" recebem os valores passados. Eles existem apenas dentro desta função.',
          stateDesc: `Parâmetro a = ${valA}.0 | Parâmetro b = 0.0`,
          highlight: 'parametros'
        },
        {
          title: '3. Verificação de Segurança (if b == 0)',
          code: `if b == 0:  # 0.0 == 0 é VERDADEIRO (True)!\\n    return "Erro: Impossível dividir por zero!"`,
          explanation: 'A condição if testa se b é igual a zero. Como é True, o código entra no bloco do if e executa o return imediatamente!',
          stateDesc: `Condição if b == 0 -> True (Erro evitado)`,
          highlight: 'validacao'
        },
        {
          title: '4. Retorno da Mensagem de Erro',
          code: `resultado = "Erro: Impossível dividir por zero!"\\nif isinstance(resultado, str):\\n    print(f"⚠️ {resultado}")`,
          explanation: 'A função devolve o texto de erro. O programa principal reconhece que é um aviso e exibe para o usuário sem quebrar!',
          stateDesc: `resultado = 'Erro: Impossível dividir por zero!'`,
          highlight: 'retorno'
        }
      ];
    }

    return [
      {
        title: '1. Captura e Chamada da Função',
        code: `num1 = ${valA}.0\\nnum2 = ${valB}.0\\nresultado = ${op}(num1, num2)`,
        explanation: `O usuário escolheu a operação. O Python localiza a função "${op}" e passa os dois números como argumentos.`,
        stateDesc: `Variáveis globais: num1 = ${valA}.0, num2 = ${valB}.0`,
        highlight: 'chamada'
      },
      {
        title: '2. Parâmetros Recebidos no Escopo da Função',
        code: `def ${op}(a, b):\\n    # Na memória da função:\\n    # a = ${valA}.0\\n    # b = ${valB}.0`,
        explanation: 'Os argumentos são atribuídos aos nomes "a" e "b". Cada função tem seu próprio espaço de memória isolado.',
        stateDesc: `Escopo local: a = ${valA}.0, b = ${valB}.0`,
        highlight: 'parametros'
      },
      {
        title: '3. Avaliação da Expressão Matemática',
        code: `return a ${opSymbol} b\\n# Calculando: ${valA}.0 ${opSymbol} ${valB}.0 -> ${computedVal}`,
        explanation: `O processador calcula a expressão matemática "${valA}.0 ${opSymbol} ${valB}.0" que resulta em ${computedVal}.`,
        stateDesc: `Expressão calculada: ${computedVal}`,
        highlight: 'calculo'
      },
      {
        title: '4. Comando return e Atribuição do Resultado',
        code: `resultado = ${computedVal}\\nprint(f"✅ Resultado: {num1} ${opSymbol} {num2} = {resultado}")`,
        explanation: 'O comando return envia o valor de volta. A variável "resultado" recebe esse valor e o comando print() formata na tela.',
        stateDesc: `Tela: ✅ Resultado: ${valA}.0 ${opSymbol} ${valB}.0 = ${computedVal}`,
        highlight: 'retorno'
      }
    ];
  };

  const steps = getSteps();
  const current = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Como o Python Executa Passo a Passo</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Veja na prática como parâmetros, memória de funções e retornos funcionam nos bastidores.
          </p>
        </div>

        {/* Operation Picker */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(['somar', 'subtrair', 'multiplicar', 'dividir'] as const).map((operation) => {
            const labels = {
              somar: 'Adição (+)',
              subtrair: 'Subtração (-)',
              multiplicar: 'Multiplicação (*)',
              dividir: 'Divisão (/)',
            };
            return (
              <button
                key={operation}
                onClick={() => {
                  setOp(operation);
                  setCurrentStep(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  op === operation
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labels[operation]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Values Selection */}
      <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700">Número a:</label>
            <input
              type="number"
              value={valA}
              onChange={(e) => {
                setValA(Number(e.target.value));
                setCurrentStep(0);
              }}
              className="w-20 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:outline-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700">Número b:</label>
            <input
              type="number"
              value={valB}
              onChange={(e) => {
                setValB(Number(e.target.value));
                setCurrentStep(0);
              }}
              className="w-20 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800 focus:outline-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {op === 'dividir' && (
            <button
              onClick={() => {
                setValB(0);
                setCurrentStep(0);
              }}
              className="px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
            >
              Testar com b = 0
            </button>
          )}
          <button
            onClick={() => {
              setValA(20);
              setValB(5);
              setCurrentStep(0);
            }}
            className="px-2.5 py-1 text-xs font-medium bg-slate-200/70 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Redefinir (20 e 5)
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {steps.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              idx === currentStep
                ? 'bg-indigo-50/80 border-indigo-300 text-indigo-900 shadow-xs'
                : idx < currentStep
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Etapa {idx + 1}</span>
              {idx < currentStep && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </div>
            <span className="text-[11px] font-medium line-clamp-1">
              {st.title.split('. ')[1] || st.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Python Code execution card */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl p-5 border border-slate-800 flex flex-col justify-between text-white font-mono">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs text-slate-400">
              <span className="text-emerald-400 font-bold">{current.title}</span>
              <span>Python 3.12 Runtime</span>
            </div>
            <pre className="text-xs sm:text-sm text-amber-300 leading-relaxed overflow-x-auto whitespace-pre">
              {current.code}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="font-sans text-xs text-slate-300">
              {current.explanation}
            </span>
          </div>
        </div>

        {/* Memory & Variable State Card */}
        <div className="lg:col-span-5 bg-indigo-950/20 rounded-xl p-5 border border-indigo-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-indigo-200/50">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                Estado da Memória (Variáveis)
              </h3>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                  Valores no Momento Atual:
                </span>
                <span className="font-mono text-xs font-semibold text-slate-800 block">
                  {current.stateDesc}
                </span>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200/60">
                <span className="text-[11px] font-bold text-indigo-600 uppercase block mb-1">
                  Conceito Aplicado:
                </span>
                <p className="text-xs text-indigo-950 leading-relaxed font-sans">
                  {currentStep === 0 && 'Parâmetros são passados por valor para a função, isolando variáveis do restante do sistema.'}
                  {currentStep === 1 && 'As variáveis locais "a" e "b" são criadas na pilha (call stack) e descartadas quando a função termina.'}
                  {currentStep === 2 && 'O Python realiza a operação aritmética usando a precisão de ponto flutuante (float).'}
                  {currentStep === 3 && 'O comando return encerra a execução e passa o resultado de volta para o chamador.'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-indigo-200/40">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 hover:bg-slate-100 transition-colors"
            >
              ← Anterior
            </button>

            <span className="text-xs font-mono font-semibold text-slate-500">
              Passo {currentStep + 1} de {steps.length}
            </span>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>Próximo Passo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(0)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Passo a Passo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
