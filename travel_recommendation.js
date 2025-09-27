fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Get DOM elements
    const searchInput = document.querySelector('nav input[type="text"]');
    const navButtons = document.querySelectorAll('nav button');
    const searchButton = navButtons[0]; // First button is "Search"
    const clearButton = navButtons[1];  // Second button is "Clear"
    let resultsDiv = document.getElementById('recommendation-results');
    if (!resultsDiv) {
      resultsDiv = document.createElement('div');
      resultsDiv.id = 'recommendation-results';
      document.body.appendChild(resultsDiv);
    }

    // Search logic
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
      }
    });
    searchButton.addEventListener('click',  () => {
      const keyword = searchInput.value.trim().toLowerCase();
      resultsDiv.innerHTML = ''; 

      if (keyword === 'beach' || keyword === 'beaches') {
        data.beaches.slice(0,2).forEach(beach => {
          resultsDiv.innerHTML += `
            <div class="recommendation-card">
              <h3>${beach.name}</h3>
              <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width:300px;">
              <p>${beach.description}</p>
            </div>
          `;
        });
      } else if (keyword === 'temple' || keyword === 'temples') {
        data.temples.slice(0,2).forEach(temple => {
          resultsDiv.innerHTML += `
            <div class="recommendation-card">
              <h3>${temple.name}</h3>
              <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width:300px;">
              <p>${temple.description}</p>
            </div>
          `;
        });
      } else if (keyword === 'country' || keyword === 'countries') {
        data.countries.slice(0,2).forEach(country => {
          country.cities.slice(0,1).forEach(city => {
            resultsDiv.innerHTML += `
              <div class="recommendation-card">
                <h3>${city.name}</h3>
                <img src="${city.imageUrl}" alt="${city.name}" style="max-width:300px;">
                <p>${city.description}</p>
              </div>
            `;
          });
        });
      } else {
        resultsDiv.innerHTML = '<p>No recommendations found. Try "beach", "temple", or "country".</p>';
      }
    });

    // Clear logic
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      resultsDiv.innerHTML = '';
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });