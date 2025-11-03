// Example interactions
    document.getElementById('change-text-btn').addEventListener('click', () => {
      document.querySelector('.description').textContent = "Text changed using DOM!";
    });

    document.getElementById('color-btn').addEventListener('click', () => {
      document.body.style.background = 
        document.body.style.background === 'lightblue' ? 'red' : 'lightblue';
    });

    document.getElementById('toggle-visibility-btn').addEventListener('click', () => {
      const img = document.getElementById('sample-image');
      img.classList.toggle('hidden');
    });

    document.getElementById('hover-box').addEventListener('mouseover', () => {
      document.getElementById('hover-box').style.background = 'orange';
    });
    document.getElementById('hover-box').addEventListener('mouseout', () => {
      document.getElementById('hover-box').style.background = '#ddd';
    });

    document.getElementById('add-item-btn').addEventListener('click', () => {
      const li = document.createElement('li');
      li.textContent = "New Task " + (document.querySelectorAll('#todo-list li').length + 1);
      li.className = 'task';
      document.getElementById('todo-list').appendChild(li);
    });

    document.getElementById('toggle-done-btn').addEventListener('click', () => {
      document.querySelectorAll('#todo-list li').forEach(li => li.classList.toggle('done'));
    });

    document.getElementById('add-row-btn').addEventListener('click', () => {
      const tbody = document.querySelector('#user-table tbody');
      const row = document.createElement('tr');
      const id = tbody.rows.length + 1;
      row.innerHTML = `<td>${id}</td><td>User ${id}</td><td>${20 + id}</td>`;
      tbody.appendChild(row);
    });

    document.getElementById('delete-row-btn').addEventListener('click', () => {
      const tbody = document.querySelector('#user-table tbody');
      if (tbody.rows.length > 0) tbody.deleteRow(tbody.rows.length - 1);
    });