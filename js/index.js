document.addEventListener('DOMContentLoaded', () => {
    const monsterForm = document.createElement('form'),
          monsterContainer = document.getElementById('monster-container'),
          forwardButton = document.getElementById('forward'),
          backButton = document.getElementById('back'),
          monsterUrl = 'http://localhost:3000/monsters',
          limit = 50;
  
    let currentPage = 1;
  
    monsterForm.innerHTML = `
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button>Create</button>
    `;
  
    document.body.prepend(monsterForm);
  
    function fetchMonsters() {
      fetch(`${monsterUrl}/?_limit=${limit}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(showMonsters)
        .catch(error => console.error('Error:', error));
    }
  
    function showMonsters(monsters) {
      monsterContainer.innerHTML = "";
      monsters.forEach(showMonster);
    }
  
    function showMonster(monster) {
      let div = document.createElement('div');
      div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(div);
    }
  
    monsterForm.addEventListener('submit', createMonster);
  
    function createMonster(event) {
      event.preventDefault();
      let configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          age: parseFloat(document.getElementById('age').value),
          description: document.getElementById('description').value
        })
      };
  
      fetch(monsterUrl, configObj)
        .then(resp => resp.json())
        .then(showMonster)
        .catch(error => console.error('Error:', error));
    }
  
    forwardButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters();
    });
  
    backButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters();
      }
    });
  
    fetchMonsters();
  });