import unittest
import tkinter as tk
import calculadora

class TestCalculadora(unittest.TestCase):
    def setUp(self):
        calculadora.limpar()

    def test_clicar_e_calcular_basico(self):
        calculadora.clicar('1')
        calculadora.clicar('0')
        calculadora.clicar('+')
        calculadora.clicar('5')
        self.assertEqual(calculadora.expressao, '10+5')
        self.assertEqual(calculadora.texto_visor.get(), '10+5')
        calculadora.calcular()
        self.assertEqual(calculadora.expressao, '15')
        self.assertEqual(calculadora.texto_visor.get(), '15')

    def test_porcentagem_numero_simples(self):
        # Ex: 50% deve resultar em 0.5
        calculadora.clicar('5')
        calculadora.clicar('0')
        calculadora.porcentagem()
        self.assertEqual(float(calculadora.texto_visor.get()), 0.5)
        self.assertEqual(float(calculadora.expressao), 0.5)

    def test_porcentagem_de_um_valor(self):
        # Ex: 15% de 200 -> 200 * 15 seguido de % deve resultar em 30.0
        calculadora.clicar('2')
        calculadora.clicar('0')
        calculadora.clicar('0')
        calculadora.clicar('*')
        calculadora.clicar('1')
        calculadora.clicar('5')
        calculadora.porcentagem()
        self.assertEqual(float(calculadora.texto_visor.get()), 30.0)
        self.assertEqual(float(calculadora.expressao), 30.0)

    def test_porcentagem_em_expressao_vazia(self):
        # Clicar em % com o visor vazio não deve causar erro
        calculadora.porcentagem()
        self.assertEqual(calculadora.expressao, '')
        self.assertEqual(calculadora.texto_visor.get(), '')

    def test_ponto_decimal(self):
        # Testar uso do ponto decimal
        calculadora.clicar('2')
        calculadora.clicar('.')
        calculadora.clicar('5')
        calculadora.clicar('+')
        calculadora.clicar('1')
        calculadora.clicar('.')
        calculadora.clicar('5')
        calculadora.calcular()
        self.assertEqual(float(calculadora.texto_visor.get()), 4.0)

    def test_apagar_ultimo_caractere(self):
        # Testar botão backspace (⌫)
        calculadora.clicar('1')
        calculadora.clicar('2')
        calculadora.clicar('3')
        calculadora.apagar()
        self.assertEqual(calculadora.expressao, '12')
        self.assertEqual(calculadora.texto_visor.get(), '12')
        calculadora.apagar()
        self.assertEqual(calculadora.expressao, '1')
        calculadora.apagar()
        self.assertEqual(calculadora.expressao, '')
        calculadora.apagar() # Testar apagar com string vazia
        self.assertEqual(calculadora.expressao, '')

    def test_inverter_sinal(self):
        # Testar botão +/-
        calculadora.clicar('4')
        calculadora.clicar('2')
        calculadora.inverter_sinal()
        self.assertEqual(calculadora.texto_visor.get(), '-42')
        calculadora.inverter_sinal()
        self.assertEqual(calculadora.texto_visor.get(), '42')

    def test_divisao_por_zero(self):
        calculadora.clicar('1')
        calculadora.clicar('0')
        calculadora.clicar('/')
        calculadora.clicar('0')
        calculadora.calcular()
        self.assertEqual(calculadora.texto_visor.get(), 'Erro: Divisão por 0')

    def test_limpar(self):
        calculadora.clicar('9')
        calculadora.clicar('9')
        calculadora.limpar()
        self.assertEqual(calculadora.expressao, '')
        self.assertEqual(calculadora.texto_visor.get(), '')

    def test_interacao_botoes_gui(self):
        # Procura e clica diretamente nos botões da interface Tkinter
        botoes_por_texto = {}
        for widget in calculadora.janela.winfo_children():
            if isinstance(widget, tk.Button):
                botoes_por_texto[widget.cget('text')] = widget

        # Verificar se todos os botões esperados existem na janela
        esperados = ['C', '⌫', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '=']
        for texto in esperados:
            self.assertIn(texto, botoes_por_texto, f"Botão '{texto}' não encontrado na interface.")

        # Testar clique de botões da interface: 8, 0, %, =
        botoes_por_texto['8'].invoke()
        botoes_por_texto['0'].invoke()
        self.assertEqual(calculadora.texto_visor.get(), '80')

        botoes_por_texto['%'].invoke()
        self.assertEqual(calculadora.texto_visor.get(), '0.8')

        botoes_por_texto['⌫'].invoke() # apaga o '8' de '0.8'
        self.assertEqual(calculadora.texto_visor.get(), '0.')

        botoes_por_texto['C'].invoke()
        self.assertEqual(calculadora.texto_visor.get(), '')

if __name__ == '__main__':
    unittest.main()
