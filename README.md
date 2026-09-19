# 🔮 TarotDeckD&D - Gerenciador da Classe Cartomante

**TarotDeckD&D** é um aplicativo de mesa (Desktop) moderno e temático desenvolvido em **C# (WPF)**. Ele foi criado para automatizar e gerenciar os recursos da classe customizada (homebrew) "A Cartomante" para o sistema de RPG *Dungeons & Dragons 5ª Edição*.

O aplicativo possui uma interface mística e elegante, oferecendo controle total sobre o baralho (Grimório), a mão atual do jogador e a pilha de descarte, com salvamento automático para que nenhuma carta se perca no meio de uma campanha.

---

## 📜 Sobre a Classe "A Cartomante"

A Cartomante é uma classe conjuradora que canaliza suas magias através do tarô[cite: 6]. Em vez de possuir "espaços de magia" tradicionais, a classe utiliza um baralho de cartas mágico, onde cada carta sacada dita o nível da magia que pode ser conjurada[cite: 6]. Ficar sem cartas na mão esgota, na prática, seus espaços de magia[cite: 6].

Este aplicativo automatiza as seguintes regras fundamentais da classe:

* **Tamanho do Baralho e Progressão:** No 1º nível, o baralho possui apenas duas cartas (0 - O Louco e I - O Mago), e o tamanho do baralho aumenta progressivamente conforme a tabela de nível do personagem[cite: 6]. O aplicativo adiciona automaticamente as cartas correspondentes ao nível selecionado no seletor do Grimório.
* **Saque por Bônus de Proficiência:** Após terminar um descanso longo, o jogador compra uma quantidade de cartas igual ao seu bônus de proficiência[cite: 6]. O aplicativo calcula esse bônus (de +2 a +6, dependendo do nível[cite: 6]) e saca a quantidade exata com um único clique.
* **Descarte de Cartas:** Uma carta jogada deve conjurar uma magia de seu nível correspondente, e após ser jogada, ela deve ser descartada[cite: 6]. Ela não pode ser usada novamente até que retorne ao baralho após um descanso longo[cite: 6].
* **Descanso Longo:** Durante um descanso longo, as cartas descartadas e a mão atual são embaralhadas de volta ao deck principal[cite: 6]. O botão "Descanso Longo" do aplicativo limpa a mão e o descarte, embaralha o deck de forma aleatória e gera a nova mão inicial do personagem.

---

## ✨ Funcionalidades do Aplicativo

* **Seletor de Nível (1 ao 20):** Ajusta automaticamente o Bônus de Proficiência e desbloqueia as cartas permitidas para o nível atual.
* **O Grimório (Cartas Disponíveis):** Mostra de forma transparente todas as cartas que o personagem pode ter no baralho.
* **Mão Dinâmica:** Exibe as cartas sacadas pelo jogador com botões de "Invocar", que enviam a carta diretamente para o descarte após o uso.
* **Pilha de Descarte & Contagem:** Mantém o registro exato de quantas cartas restam no baralho fechado e quais já foram utilizadas.
* **Memória Persistente (Save State):** O aplicativo salva o estado exato da mesa (mão, descarte e nível) no arquivo `cartomante_save.json` ao ser fechado. Perfeito para sessões de RPG interrompidas, garantindo que você retorne exatamente de onde parou.
* **Interface Mística (UI):** Desenvolvida com WPF, conta com efeitos de sombra (DropShadow), gradientes escuros e fontes com serifa para imersão total.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** C#
* **Framework:** WPF (.NET 6.0 ou superior)
* **Design:** XAML com UI Responsiva (Viewbox)
* **Serialização:** System.Text.Json (Para salvar o estado da sessão)

---

## 🚀 Como Executar e Jogar

**Para Jogadores:**
1. Vá até a aba **Releases** deste repositório (ou baixe a pasta principal se fornecida via .zip).
2. Execute o arquivo único `TarotDeckD&D.exe`. Não é necessário instalar nada, o aplicativo é autossuficiente (Self-Contained).

**Para Desenvolvedores e IA (Google AI Studio):**
Se você deseja inspecionar o código, refatorar ou adicionar novas regras (como automatizar o Baralho do Ceifador ou da Fortuna[cite: 6]):
1. Clone este repositório: `git clone https://github.com/SEU-USUARIO/TarotDeckDnD.git`
2. Abra a solução no **Visual Studio 2022**.
3. O código principal de interface encontra-se em `MainWindow.xaml` e a lógica de embaralhamento e instâncias da classe Cartomante estão em `MainWindow.xaml.cs`.
4. O documento de referência original de regras D&D 5e encontra-se anexado na raiz do projeto (`Cartomancer (1).pdf`).

---
*Este aplicativo é uma ferramenta feita de fã para fã. As regras automatizadas referem-se a um conteúdo Homebrew de Dungeons & Dragons.*
