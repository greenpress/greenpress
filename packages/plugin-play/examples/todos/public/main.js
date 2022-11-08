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

  document.querySelector('#app').innerHTML = JSON.stringify(todos);
}


await authorize()
await fetchTodos();

