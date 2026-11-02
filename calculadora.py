import tkinter as tk

# ========================================================
# CALCULADORA EM PYTHON (COM BOTÕES USANDO TKINTER)
# Para iniciantes: este script cria uma janela com botões
# que realizam operações matemáticas básicas, porcentagem,
# inversão de sinal e edição do visor.
# ========================================================

# 1. Cria a janela principal da calculadora
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("300x420")
janela.resizable(False, False)

# Variável de texto que armazena a conta digitada
expressao = ""

# 2. Função acionada ao clicar em um número ou operador (+, -, *, /, .)
def clicar(botao):
    global expressao
    expressao += str(botao)
    texto_visor.set(expressao)

# 3. Função que calcula o resultado da expressão ao clicar no igual (=)
def calcular():
    global expressao
    try:
        resultado = str(eval(expressao))
        texto_visor.set(resultado)
        expressao = resultado  # Permite continuar calculando a partir do resultado
    except ZeroDivisionError:
        texto_visor.set("Erro: Divisão por 0")
        expressao = ""
    except Exception:
        texto_visor.set("Erro")
        expressao = ""

# 4. Função para limpar todo o visor ao clicar em 'C'
def limpar():
    global expressao
    expressao = ""
    texto_visor.set("")

# 5. Função para apagar apenas o último caractere digitado (Backspace '⌫')
def apagar():
    global expressao
    expressao = expressao[:-1]
    texto_visor.set(expressao)

# 6. Função para calcular porcentagem ao clicar em '%'
def porcentagem():
    global expressao
    if not expressao:
        return
    try:
        # Avalia a expressão atual e divide por 100
        # Exemplos:
        # - "50" com % -> 50 / 100 = 0.5
        # - "200 * 15" com % -> (200 * 15) / 100 = 30.0 (15% de 200)
        resultado = str(eval(expressao) / 100)
        texto_visor.set(resultado)
        expressao = resultado
    except ZeroDivisionError:
        texto_visor.set("Erro: Divisão por 0")
        expressao = ""
    except Exception:
        texto_visor.set("Erro")
        expressao = ""

# 7. Função para inverter o sinal do número atual ao clicar em '+/-'
def inverter_sinal():
    global expressao
    if not expressao:
        return
    try:
        # Multiplica o valor atual por -1 para alternar entre positivo e negativo
        resultado = str(eval(expressao) * -1)
        texto_visor.set(resultado)
        expressao = resultado
    except Exception:
        texto_visor.set("Erro")
        expressao = ""

# 8. Visor da calculadora onde os números aparecem
texto_visor = tk.StringVar()
visor = tk.Entry(janela, textvariable=texto_visor, font=("Arial", 22), justify="right", bd=8)
visor.grid(row=0, column=0, columnspan=4, padx=10, pady=12, sticky="nsew")

# 9. Organização dos botões em formato de grade (Texto, Linha, Coluna)
botoes = [
    ('C', 1, 0), ('⌫', 1, 1), ('%', 1, 2), ('/', 1, 3),
    ('7', 2, 0), ('8', 2, 1), ('9', 2, 2), ('*', 2, 3),
    ('4', 3, 0), ('5', 3, 1), ('6', 3, 2), ('-', 3, 3),
    ('1', 4, 0), ('2', 4, 1), ('3', 4, 2), ('+', 4, 3),
    ('+/-', 5, 0), ('0', 5, 1), ('.', 5, 2), ('=', 5, 3),
]

# 10. Cria cada botão visual na janela com cores intuitivas
for (texto, linha, coluna) in botoes:
    if texto == '=':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#22c55e", fg="white", command=calcular)
    elif texto == 'C':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#ef4444", fg="white", command=limpar)
    elif texto == '⌫':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#f87171", fg="white", command=apagar)
    elif texto == '%':
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#e2e8f0", command=porcentagem)
    elif texto == '+/-':
        btn = tk.Button(janela, text=texto, font=("Arial", 14), bg="#e2e8f0", command=inverter_sinal)
    elif texto in ['+', '-', '*', '/']:
        btn = tk.Button(janela, text=texto, font=("Arial", 14, "bold"), bg="#f97316", fg="white", command=lambda t=texto: clicar(t))
    else:
        btn = tk.Button(janela, text=texto, font=("Arial", 14), bg="#f1f5f9", command=lambda t=texto: clicar(t))

    btn.grid(row=linha, column=coluna, padx=4, pady=4, sticky="nsew")

# 11. Ajusta as linhas e colunas para preencher a janela por igual
for i in range(6):
    janela.grid_rowconfigure(i, weight=1)
for j in range(4):
    janela.grid_columnconfigure(j, weight=1)

# Inicia o loop da janela da calculadora
if __name__ == "__main__":
    janela.mainloop()
