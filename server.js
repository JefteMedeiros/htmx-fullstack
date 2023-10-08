const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('src'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [];

app.post('/addTask', (req, res) => {
    const task = req.body.q
    tasks.push(task);

    const taskList = tasks.map(task => {
      return `
        <li
          id="${task}"
          class="flex justify-between items-center bg-white p-2 mb-2 shadow-md border-2 w-full rounded-md"
        >
          <span>${task}</span>
          <input class="hover:cursor-pointer" hx-delete="/deleteTask" type="submit" hx-trigger="click" name="${task}">🗑</input>
        </li>
      `
    }).join('');

    res.send(taskList);
});

app.get('/dist/output.css', (req, res) => {
  res.sendFile(__dirname + '/dist/output.css', {
    headers: {
      'Content-Type': 'text/css'
    }
  });
});

app.delete('/deleteTask', (req, res) => {
    const task = req.body.q

    const filteredTasks = tasks.filter(task => {
        return task !== req.body.q
    })

    const taskList = filteredTasks.map(task => {
        return `
          <li
            id="${task}"
            class="flex justify-between items-center bg-white p-2 mb-2 shadow-md border-2 w-full rounded-md"
          >
            <span>${task}</span>
            <input class="hover:cursor-pointer" hx-delete="/deleteTask" type="submit" hx-trigger="click" name="${task}">🗑</input>
          </li>
        `
    }).join('');

    res.send(taskList);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
