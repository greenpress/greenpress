console.log(location);
const code = (new URL(location.href)).searchParams.get('code');


async function authorize() {
  const returnUrl = location.href.replace(location.search, '');
  const token = (new URL(location.href)).searchParams.get('token');

  await fetch('/api/authorize', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      returnUrl,
      token
    })
  })
}

async function fetchTodos() {
  const res = await fetch('/api/todos', {
    headers: {
      code
    }
  });

  const todos = await res.json()

  document.querySelector('#app').innerHTML = `<add-todo>ADD</add-todo>` + todos.map(todo => {
    return `<div class="box">
                <h3>${todo.name}</h3>
                <div>${todo.content}</div>
            </div>`
  }).join('')
}

class AddTodoButton extends HTMLElement {
  async add() {
    const name = prompt('choose a name');
    const content = prompt('add content');
    if (!(name && content)) {
      return;
    }

    await fetch('/api/add-todos', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        code
      },
      body: JSON.stringify({
        name,
        content
      })
    });

    await fetchTodos();
  }
  constructor() {
    super();
    this.addEventListener('click', () => this.add());
  }
}

customElements.define('add-todo', AddTodoButton)

await authorize()
await fetchTodos();

