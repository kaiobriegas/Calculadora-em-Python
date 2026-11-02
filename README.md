# 🧮 Calculadora Simples em Python (Tkinter)

Uma calculadora simples com interface gráfica desenvolvida em **Python** utilizando a biblioteca nativa **Tkinter**. Projeto ideal para iniciantes em programação praticarem conceitos de lógica, funções, tratamento de exceções e interfaces gráficas (GUI).

---

## 🚀 Funcionalidades

- ➕ **Adição**
- ➖ **Subtração**
- ✖️ **Multiplicação**
- ➗ **Divisão** (com proteção contra divisão por zero)
- 📊 **Cálculo de Porcentagem** (botão `%`)
- ⌫ **Apagar último caractere** (botão `⌫`)
- 🔄 **Inverter sinal** (botão `+/-`)
- 🧹 **Limpar visor** (botão `C`)
- 🔢 Suporte a números inteiros e decimais (botão `.`)
- 🎨 Interface limpa com botões coloridos organizados em grade (`grid`)

---

## 📖 Exemplos de Uso

| Operação | Como fazer | Resultado no Visor |
| :--- | :--- | :--- |
| **Porcentagem simples** | Digite `50` e clique em `%` | `0.5` |
| **Porcentagem de um valor** | Digite `200 * 15` e clique em `%` | `30.0` *(15% de 200)* |
| **Apagar dígito errado** | Digite `123` e clique em `⌫` | `12` |
| **Inverter sinal** | Digite `42` e clique em `+/-` | `-42` |
| **Contas com decimais** | Digite `2.5 + 1.5` e clique em `=` | `4.0` |

---

## 🛠️ Tecnologias Utilizadas

- **Python 3.x**
- **Tkinter** (módulo nativo da biblioteca padrão do Python — nenhuma instalação adicional necessária)

---

## 📋 Pré-requisitos

Apenas ter o [Python 3](https://www.python.org/) instalado em seu computador (Windows, Linux ou macOS).

---

## 💻 Como Executar o Projeto

1. Clone este repositório ou baixe o arquivo `calculadora.py`:
   ```bash
   git clone https://github.com/kaiobriegas/Calculadora-em-Python.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd Calculadora-em-Python
   ```

3. Execute o script:
   ```bash
   python calculadora.py
   ```
   *(No Linux/Mac, utilize `python3 calculadora.py` se necessário)*

4. Para rodar os testes automatizados:
   ```bash
   python test_calculadora.py
   ```

---

## 📂 Estrutura do Código

```plaintext
Calculadora-em-Python/
│
├── calculadora.py       # Código-fonte principal com a interface Tkinter
├── test_calculadora.py  # Testes unitários das funções e botões
├── LICENSE              # Licença de uso do projeto (MIT)
└── README.md            # Documentação do projeto
```

### Principais Funções:
- `clicar(botao)`: Concatena o número, operador ou ponto decimal clicado à expressão matemática.
- `calcular()`: Avalia a expressão com tratamento de erros (`ZeroDivisionError`) e exibe o resultado.
- `porcentagem()`: Calcula a porcentagem do valor ou produto atual dividindo por 100.
- `apagar()`: Remove o último caractere digitado (backspace).
- `inverter_sinal()`: Inverte o sinal positivo/negativo do número.
- `limpar()`: Zera o visor para iniciar uma nova conta.

---

## 💡 Próximas Melhorias (Roadmap)

- [x] Adicionar cálculo de porcentagem (`%`)
- [x] Adicionar botão de inverter sinal (`+/-`)
- [x] Adicionar botão de apagar último caractere (`⌫`)
- [x] Adicionar botão de ponto decimal (`.`)
- [ ] Adicionar histórico das últimas contas realizadas
- [ ] Suporte a atalhos do teclado físico

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se livre para estudar, modificar e compartilhar!
