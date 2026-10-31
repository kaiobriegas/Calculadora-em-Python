import tkinter as tk

# ========================================================
# CALCULADORA EM PYTHON (COM BOTÕES USANDO TKINTER)
# Para iniciantes: este script cria uma janela com botões
# que realizam as 4 operações básicas da matemática.
# ========================================================

# 1. Cria a janela principal da calculadora
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("280x380")
janela.resizable(False, False)

# Variável de texto que armazena a conta digitada
expressao = ""

# 2. Função acionada ao clicar em um número ou operador (+, -, *, /)
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

# 4. Função para limpar o visor ao clicar em 'C'
def limpar():
    global expressao
    expressao = ""
    texto_visor.set("")

# 5. Visor da calculadora onde os números aparecem
texto_visor = tk.StringVar()
visor = tk.Entry(janela, textvariable=texto_visor, font=("Arial", 22), justify="right", bd=8)
visor.grid(row=0, column=0, columnspan=4, padx=10, pady=12, sticky="nsew")

# 6. Organização dos botões em formato de grade (Texto, Linha, Coluna)
botoes = [
    ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
    ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
    ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
    ('C', 4, 0), ('0', 4, 1), ('=', 4, 2), ('+', 4, 3),
]

# 7. Cria cada botão visual na janela com cores intuitivas
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

# 8. Ajusta as linhas e colunas para preencher a janela por igual
for i in range(5):
    janela.grid_rowconfigure(i, weight=1)
for j in range(4):
    janela.grid_columnconfigure(j, weight=1)

# Inicia o loop da janela da calculadora
if __name__ == "__main__":
    janela.mainloop()
