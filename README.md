# 🧮 Calculadora Simples em Python (Tkinter)

Uma calculadora simples com interface gráfica desenvolvida em **Python** utilizando a biblioteca nativa **Tkinter**. Projeto ideal para iniciantes em programação praticarem conceitos de lógica, funções, tratamento de exceções e interfaces gráficas (GUI).

---

## 🚀 Funcionalidades

- ➕ **Adição**
- ➖ **Subtração**
- ✖️ **Multiplicação**
- ➗ **Divisão** (com proteção contra divisão por zero)
- 🧹 **Limpar visor** (botão `C`)
- 🔢 Suporte a números inteiros e decimais
- 🎨 Interface limpa com botões coloridos organizados em grade (`grid`)

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
   git clone https://github.com/SEU-USUARIO/calculadora-python.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd calculadora-python
   ```

3. Execute o script:
   ```bash
   python calculadora.py
   ```
   *(No Linux/Mac, utilize `python3 calculadora.py` se necessário)*

---

## 📂 Estrutura do Código

```plaintext
calculadora-python/
│
├── calculadora.py       # Código-fonte principal com a interface Tkinter
└── README.md            # Documentação do projeto
```

### Principais Funções:
- `clicar(botao)`: Concatena o número ou operador clicado à expressão matemática.
- `calcular()`: Avalia a expressão com tratamento de erros (`ZeroDivisionError`) e exibe o resultado.
- `limpar()`: Zera o visor para iniciar uma nova conta.

---

## 💡 Próximas Melhorias (Roadmap)

- [ ] Adicionar cálculo de porcentagem (`%`)
- [ ] Adicionar botão de inverter sinal (`+/-`)
- [ ] Adicionar histórico das últimas contas realizadas
- [ ] Suporte a atalhos do teclado físico

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se livre para estudar, modificar e compartilhar!
