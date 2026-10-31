export interface CodeLineExplanation {
  line: number;
  code: string;
  category: 'funcao' | 'operacao' | 'fluxo' | 'entrada' | 'validacao' | 'comentario';
  title: string;
  explanation: string;
  whyImportant: string;
  tip?: string;
}

export const PYTHON_CALCULATOR_CODE = `# ========================================================
# CALCULADORA BÁSICA EM PYTHON
# Ideal para quem está começando na programação!
# Operações: Adição (+), Subtração (-), Multiplicação (*), Divisão (/)
# ========================================================

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto da multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão do primeiro número pelo segundo.
    Faz a verificação para evitar erro de divisão por zero!"""
    if b == 0:
        return "Erro: Impossível dividir por zero!"
    return a / b

def exibir_menu():
    """Exibe as opções disponíveis para o usuário."""
    print("\\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON")
    print("=" * 32)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("0 - Sair")
    print("=" * 32)

def calculadora():
    """Função principal que orquestra a calculadora."""
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (0 a 4): ")

        # Condição de parada do programa
        if opcao == "0":
            print("\\nObrigado por usar a calculadora! Bons estudos em Python! 🐍")
            break

        # Verifica se o usuário escolheu uma operação válida
        if opcao in ["1", "2", "3", "4"]:
            try:
                # O input() recebe texto, o float() converte para número decimal
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("\\n⚠️ Entrada inválida! Digite apenas números válidos (ex: 10 ou 4.5).")
                continue

            # Executa a função correspondente à escolha
            if opcao == "1":
                resultado = somar(num1, num2)
                print(f"\\n✅ Resultado: {num1} + {num2} = {resultado}")
            elif opcao == "2":
                resultado = subtrair(num1, num2)
                print(f"\\n✅ Resultado: {num1} - {num2} = {resultado}")
            elif opcao == "3":
                resultado = multiplicar(num1, num2)
                print(f"\\n✅ Resultado: {num1} * {num2} = {resultado}")
            elif opcao == "4":
                resultado = dividir(num1, num2)
                if isinstance(resultado, str):
                    print(f"\\n⚠️ {resultado}")
                else:
                    print(f"\\n✅ Resultado: {num1} / {num2} = {resultado}")
        else:
            print("\\n❌ Opção inválida! Escolha um número entre 0 e 4.")

# Ponto de entrada padrão em scripts Python
if __name__ == "__main__":
    calculadora()
`;

export const PYTHON_CALCULATOR_SIMPLE = `# ==========================================
# VERSÃO INICIANTE (PASSO A PASSO DIRETO)
# Ideal para entender o fluxo sequencial sem loop
# ==========================================

print("=== CALCULADORA BÁSICA ===")
print("Operações disponíveis:")
print("+ : Adição")
print("- : Subtração")
print("* : Multiplicação")
print("/ : Divisão")

operador = input("Escolha a operação (+, -, *, /): ")
num1 = float(input("Digite o 1º número: "))
num2 = float(input("Digite o 2º número: "))

if operador == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")
elif operador == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")
elif operador == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")
elif operador == "/":
    if num2 == 0:
        print("Erro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
else:
    print("Operador inválido!")
`;

export const CODE_EXPLANATIONS: Record<number, { title: string; category: string; description: string; detail: string; tip: string }> = {
  7: {
    title: "Declaração de Função (def somar)",
    category: "Funções",
    description: "Cria uma função reutilizável chamada 'somar' que recebe dois parâmetros: a e b.",
    detail: "A palavra-chave 'def' avisa ao Python que estamos definindo uma função. Funções evitam repetição de código e organizam a lógica.",
    tip: "Dê nomes claros e autoexplicativos para suas funções e variáveis."
  },
  9: {
    title: "Comando return",
    category: "Funções",
    description: "Devolve o resultado do cálculo para quem chamou a função.",
    detail: "O 'return' encerra a execução da função e envia o valor de volta. Sem return, a função devolveria 'None' por padrão.",
    tip: "Pense no return como a resposta que a função entrega após fazer seu trabalho."
  },
  11: {
    title: "Função subtrair(a, b)",
    category: "Funções",
    description: "Recebe dois números e calcula a subtração a - b.",
    detail: "Mantemos uma função dedicada para cada operação básica matemática.",
    tip: "No Python, o operador de subtração é simplesmente '-'."
  },
  15: {
    title: "Função multiplicar(a, b)",
    category: "Funções",
    description: "Recebe dois números e devolve o produto a * b.",
    detail: "Em linguagens de programação, o asterisco '*' representa a multiplicação.",
    tip: "Lembre-se: em Python, um único asterisco '*' multiplica, e dois '**' calculam potência (ex: 2**3 = 8)."
  },
  19: {
    title: "Função dividir(a, b) com Validação",
    category: "Funções & Validação",
    description: "Executa a divisão, mas primeiro verifica se o divisor é zero.",
    detail: "Na matemática real e no computador, dividir por zero é impossível. Se tentarmos 5 / 0 em Python sem verificar, o programa quebra com 'ZeroDivisionError'.",
    tip: "Sempre valide os dados que podem quebrar o programa antes de executar a conta."
  },
  22: {
    title: "Verificação if b == 0",
    category: "Condicional",
    description: "Checa se o segundo número recebido é exatamente igual a 0.",
    detail: "Usamos dois sinais de igual '==' para comparação de igualdade (um único sinal '=' serve para atribuição de variáveis).",
    tip: "Regra básica: '=' guarda um valor na variável; '==' pergunta se dois valores são iguais."
  },
  26: {
    title: "Função exibir_menu()",
    category: "Interface / Menu",
    description: "Imprime na tela um menu textual com as opções disponíveis.",
    detail: "O código '\\n' pula uma linha. O comando '=' * 32 multiplica o caractere '=' 32 vezes, criando uma linha divisória perfeita.",
    tip: "Em Python, você pode multiplicar strings por números inteiros para repeti-las!"
  },
  37: {
    title: "Função principal calculadora()",
    category: "Estrutura",
    description: "Concentra o fluxo principal do programa (o loop de repetição e as interações).",
    detail: "Separar o programa em funções menores deixa seu código limpo, fácil de testar e bem estruturado.",
    tip: "Esta é uma boa prática da engenharia de software chamada 'Modularidade'."
  },
  39: {
    title: "Loop Infinito (while True)",
    category: "Repetição",
    description: "Mantém a calculadora aberta rodando continuamente até o usuário decidir sair.",
    detail: "O 'while True' só para quando executamos um comando 'break' explicitamente dentro dele.",
    tip: "Se não tivéssemos esse loop, a calculadora faria uma única conta e fecharia imediatamente."
  },
  41: {
    title: "Captura de Entrada (input)",
    category: "Entrada de Dados",
    description: "Pede ao usuário para digitar algo no teclado e aguarda a resposta.",
    detail: "ATENÇÃO: A função input() SEMPRE retorna o que foi digitado como texto (string), mesmo que você digite números!",
    tip: "Por isso comparamos opcao == '0' entre aspas, pois '0' é texto, não o número 0."
  },
  45: {
    title: "Comando break",
    category: "Controle de Fluxo",
    description: "Interrompe e encerra o loop 'while' imediatamente.",
    detail: "Quando o usuário digita '0', o programa agradece e o 'break' finaliza a calculadora com segurança.",
    tip: "O break é o freio de emergência de qualquer loop em Python."
  },
  48: {
    title: "Verificação de Opções com 'in'",
    category: "Condicional",
    description: "Checa se a opção digitada está na lista ['1', '2', '3', '4'].",
    detail: "O operador 'in' é muito legível em Python: lê-se 'se a opção está dentro da lista'.",
    tip: "Isso é muito mais limpo do que escrever: if opcao == '1' or opcao == '2' or ..."
  },
  49: {
    title: "Tratamento de Exceções (try / except)",
    category: "Tratamento de Erros",
    description: "Protege o programa se o usuário digitar letras no lugar de números.",
    detail: "O bloco 'try' tenta executar a conversão float(). Se o usuário digitar 'abc', ocorre um 'ValueError'. O bloco 'except' captura isso sem deixar o programa travar.",
    tip: "Programas profissionais sempre usam try/except para lidar com entradas imprevisíveis do usuário."
  },
  51: {
    title: "Conversão para Decimal (float)",
    category: "Tipos de Dados",
    description: "Transforma o texto digitado pelo usuário em um número decimal (ponto flutuante).",
    detail: "Usamos float() em vez de int() porque calculadoras devem aceitar tanto números inteiros (como 5) quanto quebrados (como 4.5 ou 10.75).",
    tip: "Em Python e na programação internacional, usa-se ponto (.) para decimais, não vírgula (,)."
  },
  60: {
    title: "Estrutura if / elif / else",
    category: "Condicional",
    description: "Testa qual operação o usuário escolheu e chama a função matemática correspondente.",
    detail: "O 'elif' é a abreviação de 'else if' (senão, se). O Python só testa o próximo caso se os anteriores forem falsos.",
    tip: "Use if/elif quando você tem várias alternativas mutuamente exclusivas."
  },
  62: {
    title: "f-string (Formatação Moderna)",
    category: "Saída de Dados",
    description: "Imprime o resultado formatando variáveis dentro do texto de forma elegante.",
    detail: "Colocando um 'f' antes das aspas (f'Texto {variavel}'), você pode inserir variáveis e expressões diretamente dentro das chaves {}.",
    tip: "As f-strings surgiram no Python 3.6 e são a forma mais rápida e legível de formatar texto."
  },
  78: {
    title: "O Idioma if __name__ == '__main__':",
    category: "Boas Práticas",
    description: "Garante que a calculadora só execute se o arquivo for rodado diretamente.",
    detail: "Se alguém importar este arquivo em outro script Python, a calculadora não iniciará automaticamente, permitindo reutilizar as funções somar(), subtrair(), etc.",
    tip: "Você verá isso em quase todos os arquivos de projetos profissionais em Python!"
  }
};

export const BEGINNER_CONCEPTS = [
  {
    id: 'funcoes',
    title: 'Funções (def e return)',
    icon: 'Terminal',
    tag: 'Organização',
    summary: 'Blocos de código que realizam uma tarefa específica e podem ser chamados várias vezes.',
    explanation: 'Imagine uma função como uma receita ou uma máquina: você insere ingredientes (parâmetros como a e b), ela processa, e te devolve o bolo pronto (return).',
    example: `def somar(a, b):\\n    return a + b\\n\\nresultado = somar(5, 3) # resultado vale 8`
  },
  {
    id: 'tipos',
    title: 'Entrada e Conversão (input e float)',
    icon: 'Layers',
    tag: 'Dados',
    summary: 'A função input() sempre lê texto ("str"). Para fazer contas, precisamos converter para "float" ou "int".',
    explanation: 'Se você somar "5" + "3" como texto, o Python junta eles e dá "53"! Ao converter com float("5") + float("3"), ele calcula 8.0 corretamente.',
    example: `texto = input("Digite: ")      # Tipo str (texto)\\nnumero = float(texto)         # Converte para número decimal`
  },
  {
    id: 'condicionais',
    title: 'Condicionais (if, elif, else)',
    icon: 'GitFork',
    tag: 'Decisões',
    summary: 'Permitem que o computador tome decisões baseadas em condições verdadeiras ou falsas.',
    explanation: 'Se (if) o usuário digitou 1, faz adição. Senão, se (elif) digitou 2, faz subtração. Senão (else), avisa que a opção é inválida.',
    example: `if opcao == "1":\\n    somar()\\nelif opcao == "2":\\n    subtrair()\\nelse:\\n    print("Inválido")`
  },
  {
    id: 'loops',
    title: 'Laço de Repetição (while True e break)',
    icon: 'RotateCw',
    tag: 'Fluxo',
    summary: 'Executa um bloco de instruções repetidamente até encontrar uma condição de parada.',
    explanation: 'O "while True" cria um ciclo contínuo para que a calculadora não feche na primeira conta. O "break" é o comando que interrompe o ciclo quando o usuário digita "0".',
    example: `while True:\\n    opcao = input()\\n    if opcao == "0":\\n        break # Sai do programa`
  },
  {
    id: 'erros',
    title: 'Tratamento de Erros (try / except)',
    icon: 'ShieldCheck',
    tag: 'Segurança',
    summary: 'Evita que o programa trave com telas vermelhas de erro quando o usuário digita algo inesperado.',
    explanation: 'Se alguém digitar "olá" quando pedimos um número, o float() causa um ValueError. O try/except captura esse problema gentilmente e avisa o usuário sem fechar o app.',
    example: `try:\\n    num = float(input("Número: "))\\nexcept ValueError:\\n    print("Por favor, digite só números!")`
  }
];

export const LEARNING_QUIZ = [
  {
    id: 1,
    question: "O que acontece se somarmos duas variáveis obtidas diretamente de input() sem usar float()?",
    options: [
      { text: "O Python calcula a soma matemática normalmente", correct: false, explanation: "Não, porque input() sempre retorna uma string (texto)." },
      { text: "Os textos são concatenados (ex: '2' + '3' vira '23')", correct: true, explanation: "Exato! Em Python, somar textos junta eles ('2' + '3' = '23')." },
      { text: "O computador gera um erro e desliga", correct: false, explanation: "Não, somar strings com o operador + é perfeitamente válido em Python, apenas não faz a conta matemática." }
    ]
  },
  {
    id: 2,
    question: "Por que a função de divisão verifica se 'b == 0'?",
    options: [
      { text: "Porque zero não é um número válido em Python", correct: false, explanation: "Zero é um número válido em qualquer operação, exceto no divisor de uma divisão." },
      { text: "Porque na matemática e no computador a divisão por zero é indefinida e geraria um erro", correct: true, explanation: "Correto! Dividir por zero lançaria um 'ZeroDivisionError' e travaria o programa." },
      { text: "Para forçar o resultado a ser sempre positivo", correct: false, explanation: "Não tem relação com sinal positivo ou negativo." }
    ]
  },
  {
    id: 3,
    question: "Qual comando é responsável por sair de um loop 'while True'?",
    options: [
      { text: "stop", correct: false, explanation: "Em Python não existe a instrução 'stop'." },
      { text: "break", correct: true, explanation: "Muito bem! O 'break' interrompe e encerra imediatamente o loop em execução." },
      { text: "exit()", correct: false, explanation: "exit() encerra o script Python inteiro, enquanto 'break' apenas sai do laço com elegância." }
    ]
  },
  {
    id: 4,
    question: "Qual a diferença entre o operador '=' e o operador '==' em Python?",
    options: [
      { text: "'=' atribui valor a uma variável; '==' compara se dois valores são iguais", correct: true, explanation: "Perfeito! 'x = 10' guarda 10 em x, enquanto 'x == 10' pergunta: x é igual a 10?" },
      { text: "São idênticos, você pode usar qualquer um", correct: false, explanation: "São completamente diferentes na sintaxe do Python!" },
      { text: "'==' atribui valor e '=' é apenas para números decimais", correct: false, explanation: "Incorreto. '=' é atribuição universal e '==' é teste lógico de igualdade." }
    ]
  }
];

export const CODING_CHALLENGES = [
  {
    title: "1. Adicionar Potenciação (**)",
    level: "Fácil",
    desc: "Crie uma função def potencia(a, b): return a ** b e adicione a opção 5 no menu para calcular expoentes (ex: 2³ = 8).",
    hint: "Use o operador duplo asterisco (**)."
  },
  {
    title: "2. Adicionar Resto da Divisão (%)",
    level: "Fácil",
    desc: "Crie uma função def resto(a, b): return a % b para saber o que sobra de uma divisão inteira (muito usado para saber se um número é par ou ímpar).",
    hint: "O operador de módulo em Python é o sinal de porcentagem (%)."
  },
  {
    title: "3. Guardar Histórico de Contas",
    level: "Intermediário",
    desc: "Crie uma lista vazia historico = [] fora do loop e, a cada cálculo feito com sucesso, guarde a string formatada usando historico.append(). Adicione uma opção no menu para exibir o histórico!",
    hint: "Use uma lista em Python com o método .append()."
  }
];
