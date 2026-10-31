import React, { useState } from 'react';
import { LEARNING_QUIZ, CODING_CHALLENGES } from '../data/pythonCode';
import { CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = LEARNING_QUIZ.filter(
    (q) => selectedAnswers[q.id] !== undefined && q.options[selectedAnswers[q.id]].correct
  ).length;

  const challengeSolutions: Record<number, string> = {
    0: `# 1. Potenciação
def potencia(a, b):
    return a ** b

# Adicionar no menu:
# print("5 - Potenciação (**)")
# E no if:
# elif opcao == "5":
#     resultado = potencia(num1, num2)
#     print(f"\\n✅ Resultado: {num1} ** {num2} = {resultado}")`,

    1: `# 2. Resto da Divisão (Módulo)
def resto(a, b):
    if b == 0:
        return "Erro: Impossível dividir por zero!"
    return a % b

# Adicionar no menu e chamar resto(num1, num2)`,

    2: `# 3. Histórico de Cálculos com Lista
historico = []

# Após cada cálculo com sucesso:
texto_conta = f"{num1} + {num2} = {resultado}"
historico.append(texto_conta)

# Nova opção no menu:
def ver_historico():
    print("\\n=== HISTÓRICO DE CÁLCULOS ===")
    if not historico:
        print("Nenhuma conta realizada ainda.")
    for conta in historico:
        print("• " + conta)`,
  };

  return (
    <div className="space-y-8">
      {/* Quiz Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900">Quiz: Teste Seus Conhecimentos</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Descubra se você fixou as 4 regras principais da programação em Python!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60">
              Acertos: {correctCount} / {LEARNING_QUIZ.length}
            </span>
            {answeredCount > 0 && (
              <button
                onClick={resetQuiz}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 hover:bg-slate-100 px-2 py-1 rounded"
              >
                <RotateCcw className="w-3 h-3" />
                Refazer
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {LEARNING_QUIZ.map((quiz, qIndex) => {
            const userAnswer = selectedAnswers[quiz.id];
            const isAnswered = userAnswer !== undefined;

            return (
              <div key={quiz.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <span>{quiz.question}</span>
                </h4>

                <div className="space-y-2 pl-7">
                  {quiz.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                    if (isAnswered) {
                      if (option.correct) {
                        optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium';
                      } else if (isSelected && !option.correct) {
                        optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                      } else {
                        optionStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelect(quiz.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 ${optionStyle}`}
                      >
                        <span>{option.text}</span>
                        {isAnswered && option.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !option.correct && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="pl-7 pt-1">
                    <p
                      className={`text-xs p-2.5 rounded-lg border leading-relaxed ${
                        quiz.options[userAnswer].correct
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                          : 'bg-rose-50 text-rose-800 border-rose-200/80'
                      }`}
                    >
                      <strong>
                        {quiz.options[userAnswer].correct ? '🎉 Muito bem!' : '💡 Ops, quase lá:'}
                      </strong>{' '}
                      {quiz.options[userAnswer].explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Challenges */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900">
            Próximos Passos: 3 Desafios para Treinar
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Depois que a calculadora básica estiver funcionando no seu computador, tente implementar estas melhorias:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CODING_CHALLENGES.map((challenge, idx) => {
            const isRevealed = !!revealedSolutions[idx];
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{challenge.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      {challenge.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {challenge.desc}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    💡 Dica: {challenge.hint}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() =>
                      setRevealedSolutions((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{isRevealed ? 'Ocultar Solução' : 'Ver Dica de Código'}</span>
                  </button>

                  {isRevealed && (
                    <div className="mt-2 p-2 bg-slate-900 text-amber-300 font-mono text-[10px] rounded-lg whitespace-pre overflow-x-auto border border-slate-800">
                      {challengeSolutions[idx]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
