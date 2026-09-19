using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;

namespace CartomanteApp
{
    public partial class MainWindow : Window
    {
        private GameState _gameState;
        private readonly string _saveFilePath = "cartomante_save.json";
        private Random _rng = new Random();

        public MainWindow()
        {
            InitializeComponent();
            for (int i = 1; i <= 20; i++) CboLevel.Items.Add(i);
            LoadGame();
        }

        private void LoadGame()
        {
            if (File.Exists(_saveFilePath))
            {
                string json = File.ReadAllText(_saveFilePath);
                _gameState = JsonSerializer.Deserialize<GameState>(json);
                CboLevel.SelectedItem = _gameState.Level;
            }
            else
            {
                _gameState = new GameState { Level = 1, Hand = new List<Card>(), DiscardPile = new List<Card>() };
                CboLevel.SelectedItem = 1;
                GenerateFullDeck();
            }
            UpdateUI();
        }

        private void GenerateFullDeck()
        {
            _gameState.Deck = GetCardsForLevel(_gameState.Level);
            // Evita duplicar cartas caso você aumente de nível e a carta já esteja na mão ou descarte
            _gameState.Deck.RemoveAll(c => _gameState.Hand.Any(h => h.Id == c.Id) || _gameState.DiscardPile.Any(d => d.Id == c.Id));
            ShuffleDeck();
        }

        private void ShuffleDeck()
        {
            int n = _gameState.Deck.Count;
            while (n > 1)
            {
                n--;
                int k = _rng.Next(n + 1);
                var value = _gameState.Deck[k];
                _gameState.Deck[k] = _gameState.Deck[n];
                _gameState.Deck[n] = value;
            }
        }

        private void CboLevel_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (CboLevel.SelectedItem != null)
            {
                _gameState.Level = (int)CboLevel.SelectedItem;
                GenerateFullDeck();
                UpdateUI();
            }
        }

        private void LongRest_Click(object sender, RoutedEventArgs e)
        {
            _gameState.Deck.AddRange(_gameState.Hand);
            _gameState.Deck.AddRange(_gameState.DiscardPile);
            _gameState.Hand.Clear();
            _gameState.DiscardPile.Clear();

            ShuffleDeck();

            int pb = GetProficiencyBonus(_gameState.Level);
            for (int i = 0; i < pb; i++)
            {
                DrawSingleCard();
            }
            UpdateUI();
        }

        private void DrawCard_Click(object sender, RoutedEventArgs e)
        {
            DrawSingleCard();
            UpdateUI();
        }

        private void DrawSingleCard()
        {
            if (_gameState.Deck.Count > 0)
            {
                var card = _gameState.Deck[0];
                _gameState.Deck.RemoveAt(0);
                _gameState.Hand.Add(card);
            }
            else
            {
                MessageBox.Show("O Grimório está sem cartas! Faça um Descanso Longo.", "Aviso", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        private void PlayCard_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is Card cardToPlay)
            {
                _gameState.Hand.Remove(cardToPlay);
                _gameState.DiscardPile.Add(cardToPlay);
                UpdateUI();
            }
        }

        private void UpdateUI()
        {
            HandItemsControl.ItemsSource = null;
            HandItemsControl.ItemsSource = _gameState.Hand;

            DiscardItemsControl.ItemsSource = null;
            DiscardItemsControl.ItemsSource = _gameState.DiscardPile;

            // Mostra o Grimório (Todas as cartas que a classe permite naquele nível)
            LevelCardsControl.ItemsSource = null;
            LevelCardsControl.ItemsSource = GetCardsForLevel(_gameState.Level);

            TxtDeckInfo.Text = $"Cartas no Baralho: {_gameState.Deck.Count}";
            TxtProficiency.Text = $"Bônus de Proficiência: +{GetProficiencyBonus(_gameState.Level)}";
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            string json = JsonSerializer.Serialize(_gameState);
            File.WriteAllText(_saveFilePath, json);
        }

        private int GetProficiencyBonus(int level)
        {
            if (level >= 17) return 6;
            if (level >= 13) return 5;
            if (level >= 9) return 4;
            if (level >= 5) return 3;
            return 2;
        }

        // Mapeamento das cartas e ícones
        private List<Card> GetCardsForLevel(int level)
        {
            var cards = new List<Card>
            {
                new Card { Id = 0, Name = "0 - O Louco", Icon = "🃏" },
                new Card { Id = 1, Name = "I - O Mago", Icon = "🔮" }
            };
            if (level >= 2) cards.Add(new Card { Id = 2, Name = "II - A Sacerdotisa", Icon = "🌙" });
            if (level >= 3) { cards.Add(new Card { Id = 3, Name = "III - A Imperatriz", Icon = "👑" }); cards.Add(new Card { Id = 4, Name = "IV - O Imperador", Icon = "🛡️" }); cards.Add(new Card { Id = 5, Name = "V - O Hierofante", Icon = "📜" }); }
            if (level >= 4) cards.Add(new Card { Id = 6, Name = "VI - Os Enamorados", Icon = "💖" });
            if (level >= 5) { cards.Add(new Card { Id = 7, Name = "VII - O Carro", Icon = "🐎" }); cards.Add(new Card { Id = 8, Name = "VIII - A Força", Icon = "🦁" }); }
            if (level >= 6) cards.Add(new Card { Id = 9, Name = "IX - O Eremita", Icon = "🏮" });
            if (level >= 7) cards.Add(new Card { Id = 10, Name = "X - A Roda da Fortuna", Icon = "☸️" });
            if (level >= 8) cards.Add(new Card { Id = 11, Name = "XI - A Justiça", Icon = "⚖️" });
            if (level >= 9) { cards.Add(new Card { Id = 12, Name = "XII - O Enforcado", Icon = "⏳" }); cards.Add(new Card { Id = 13, Name = "XIII - A Morte", Icon = "💀" }); }
            if (level >= 10) cards.Add(new Card { Id = 14, Name = "XIV - A Temperança", Icon = "🍷" });
            if (level >= 11) cards.Add(new Card { Id = 15, Name = "XV - O Diabo", Icon = "🐐" });
            if (level >= 13) cards.Add(new Card { Id = 16, Name = "XVI - A Torre", Icon = "🌩️" });
            if (level >= 15) cards.Add(new Card { Id = 17, Name = "XVII - A Estrela", Icon = "✨" });
            if (level >= 17) cards.Add(new Card { Id = 18, Name = "XVIII - A Lua", Icon = "🌕" });
            if (level >= 18) cards.Add(new Card { Id = 19, Name = "XIX - O Sol", Icon = "☀️" });
            if (level >= 19) cards.Add(new Card { Id = 20, Name = "XX - O Julgamento", Icon = "🎺" });
            if (level >= 20) cards.Add(new Card { Id = 21, Name = "XXI - O Mundo", Icon = "🌍" });
            return cards;
        }
    }

    public class GameState
    {
        public int Level { get; set; }
        public List<Card> Deck { get; set; }
        public List<Card> Hand { get; set; }
        public List<Card> DiscardPile { get; set; }
    }

    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; } // Nova Propriedade para os Ícones
    }
}