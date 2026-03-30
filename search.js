const menu = [
  ["Margarita", "Pizza", "Maria's", "Kitchen", "Italian", "Cuisine", "cheesy", "classic"],
  ["Steak", "Vegetables", "Westend", "Grill", "House", "grilled", "protein", "dinner"],
  ["Salad", "Seafood", "Cafe", "Landwehr", "fresh", "light", "healthy"],
  ["Chocolate", "Crepes", "CrepeStar", "Dessert", "Bistro", "sweet", "chocolate"],
  ["Burger", "Fries", "Smash", "Kitchen", "Bar", "fastfood", "classic"],
  ["Kebab", "Combo", "Little", "House", "Kebobs", "grilled", "middleeastern"],
  ["Ramen", "Egg", "Shrimp", "Kinton", "noodles", "japanese", "soup"],
  ["French", "Toast", "Fruit", "Cafe", "Louise", "BakeHouse", "breakfast", "sweet"],
];

const MIN_SCORE = 1;
const multipliers = [2.5, 2, 1.5, 1, 1, 1, 1, 1, 1, 1];
const prefixScores = [7, 5, 3];

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
  let sum = 0;

  for (let i = 0; i < keywords.length; i++) {
    const word = keywords[i].toLowerCase();
    const multiplier = multipliers[i] ?? 1;

    const prefixScore = prefixMatching(query, word);
    const distanceScore = levenshteinDistance(query, word);

    const rawScore = 2 * prefixScore + distanceScore;

    sum += rawScore * multiplier;
  }

  return sum / keywords.length;
}

function filterCards(query) {
  const cards = document.querySelectorAll('.card');
  const noResults = document.querySelector('.no-results');

  if (!query) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = '';
    }
    noResults.style.display = 'none';
    return;
  }

  query = query.toLowerCase();

  const scores = [];
  for (let i = 0; i < menu.length; i++) {
    scores.push(scoreItem(query, menu[i]));
  }

  let maxScore = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
    }
  }

  const factor = Math.min(0.1 + query.length * 0.1, 0.5);
  const threshold = Math.max(maxScore * factor, MIN_SCORE * query.length);

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = scores[i] >= threshold ? '' : 'none';
  }

  let anyVisible = false;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].style.display !== 'none') {
      anyVisible = true;
      break;
    }
  }

  noResults.style.display = anyVisible ? 'none' : 'block';
}
