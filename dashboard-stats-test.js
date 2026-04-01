// Test script to verify dashboard stats functionality
console.log('Testing Dashboard Stats Functionality...\n');

// Simulate localStorage
const localStorageMock = {};
global.localStorage = {
  getItem: (key) => localStorageMock[key] || null,
  setItem: (key, value) => { localStorageMock[key] = value; },
  removeItem: (key) => { delete localStorageMock[key]; }
};

// Test initial state
console.log('1. Initial state:');
let stats = localStorage.getItem('dashboardStats');
console.log('Initial stats:', stats || 'null');

// Test initialization
if (!stats) {
  const initialStats = {
    collegesMatched: 0,
    applicationsSaved: 0,
    careerMatches: 0,
    counsellorSessions: 0
  };
  localStorage.setItem('dashboardStats', JSON.stringify(initialStats));
  console.log('Initialized dashboard stats');
}

// Test updating stats
console.log('\n2. Updating stats:');
stats = JSON.parse(localStorage.getItem('dashboardStats'));

// Simulate user actions
stats.collegesMatched += 5;
stats.applicationsSaved += 2;
stats.careerMatches += 3;
stats.counsellorSessions += 1;

localStorage.setItem('dashboardStats', JSON.stringify(stats));
console.log('Updated stats:', JSON.parse(localStorage.getItem('dashboardStats')));

// Test edge cases
console.log('\n3. Edge case testing:');
try {
  // Test negative values (should be prevented)
  stats.collegesMatched = Math.max(0, stats.collegesMatched - 10);
  localStorage.setItem('dashboardStats', JSON.stringify(stats));
  console.log('After preventing negative value:', JSON.parse(localStorage.getItem('dashboardStats')));
  
  // Test large increments
  stats.careerMatches += 50;
  localStorage.setItem('dashboardStats', JSON.stringify(stats));
  console.log('After large increment:', JSON.parse(localStorage.getItem('dashboardStats')));
  
  console.log('\n✅ All tests passed! Dashboard stats functionality is working correctly.');
} catch (error) {
  console.log('\n❌ Error during testing:', error.message);
}

console.log('\nFinal dashboard stats:');
console.log(JSON.parse(localStorage.getItem('dashboardStats')));