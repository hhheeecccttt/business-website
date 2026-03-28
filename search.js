const menu = [
  ["Margarita", "Pizza", "Maria's", "Kitchen", "Italian", "Cuisine", "cheesy", "classic"],
  ["Steak", "Vegetables", "Westend", "Grill", "House", "grilled", "protein", "dinner"],
  ["Salad", "Seafood", "Cafe", "Landwehr", "fresh", "light", "healthy"],
  ["Chocolate", "Crepes", "CrepeStar", "Dessert", "Bistro", "sweet", "chocolate"],
  ["Burger", "Fries", "Smash", "Kitchen", "Bar", "fastfood", "classic"],
  ["Kebab", "Combo", "Little", "House", "Kebobs", "grilled", "middleeastern"],
  ["Shrimp", "Egg", "Ramen", "Kinton", "noodles", "japanese", "soup"],
  ["French", "Toast", "Fruit", "Cafe", "Louise", "BakeHouse", "breakfast", "sweet"],
];

const multipliers = [3, 3, 2, 1, 1, 1, 1, 1, 1, 1];

const prefixScores = [7, 4, 3];

function prefixMatching(text1, text2) {
  let score = 0;
  for (let n = 0; n < prefixScores.length; n++) {
    if (text1.charAt(n) === text2.charAt(n)) {
      score += prefixScores[n];
    } else {
      break;
    }
  }
  return score;
}

function levenshteinDistance(text1, text2) {
  const grid = Array.from({ length: text1.length + 1 }, (_, i) =>
    Array.from({ length: text2.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let x = 1; x <= text1.length; x++) {
    for (let y = 1; y <= text2.length; y++) {
      const sub = text1[x - 1] === text2[y - 1] ? 0 : 1;
      grid[x][y] = Math.min(grid[x-1][y] + 1, grid[x][y-1] + 1, grid[x-1][y-1] + sub);
    }
  }
  const maxLen = Math.max(text1.length, text2.length);
  return maxLen === 0 ? 10 : Math.max(0, 10 * (1 - grid[text1.length][text2.length] / maxLen));
}

function scoreItem(query, keywords) {
  return keywords.reduce((sum, word, i) => {
    const multiplier = multipliers[i] ?? 1;
    const raw = prefixMatching(query, word.toLowerCase()) + 2 * levenshteinDistance(query, word.toLowerCase());
    return sum + raw * multiplier;
  }, 0) / keywords.length;
}

const MIN_SCORE = 6;

function filterCards(query) {
  const cards = document.querySelectorAll('.card');
  const noResults = document.querySelector('.no-results');

  if (!query) {
    cards.forEach(card => card.style.display = '');
    noResults.style.display = 'none';
    return;
  }

  const q = query.toLowerCase();
  const scores = menu.map(keywords => scoreItem(q, keywords));
  const max = Math.max(...scores);
  const factor = Math.min(0.8 + query.length * 0.05, 1);
  const threshold = Math.max(max * factor, MIN_SCORE);

  cards.forEach((card, i) => {
    card.style.display = scores[i] >= threshold ? '' : 'none';
  });

  const anyVisible = [...cards].some(c => c.style.display !== 'none');
  noResults.style.display = anyVisible ? 'none' : 'block';
}
