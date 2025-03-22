document.addEventListener("DOMContentLoaded", function() {
  // Nawigacja - przełączanie zakładek
  const navItems = document.querySelectorAll('.nav-menu li');
  const sections = document.querySelectorAll('main > section');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-section');
      sections.forEach(section => {
        if(section.id === target) {
          section.classList.remove('hidden');
          section.classList.add('active');
        } else {
          section.classList.remove('active');
          section.classList.add('hidden');
        }
      });
    });
  });
  
  // Przełączanie motywów
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.body.classList.remove('light-theme', 'dark-theme');
      if(theme === 'light') {
        document.body.classList.add('light-theme');
      } else if(theme === 'dark') {
        document.body.classList.add('dark-theme');
      }
    });
  });
  
  // Obsługa formularza dodawania transakcji
  document.getElementById('addTransactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('transactionName').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const data = { name, amount: parseFloat(amount), date };
    
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(response.ok) {
        alert('Transakcja dodana!');
        document.getElementById('addTransactionForm').reset();
      } else {
        alert('Błąd podczas dodawania transakcji.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Błąd podczas dodawania transakcji.');
    }
  });
  
  // Obsługa formularza usuwania transakcji
  document.getElementById('deleteTransactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('transactionId').value;
    
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'DELETE'
      });
      if(response.ok) {
        alert('Transakcja usunięta!');
        document.getElementById('deleteTransactionForm').reset();
      } else {
        alert('Błąd podczas usuwania transakcji.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Błąd podczas usuwania transakcji.');
    }
  });
});
