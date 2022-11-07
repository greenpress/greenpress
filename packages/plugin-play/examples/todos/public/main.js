console.log(location);

async function authorize() {
  const returnUrl = location.href.replace(location.search, '');
  const token = (new URL(location.href)).searchParams.get('token');

  await fetch('/api/authorize', {
    method: 'post',
    body: JSON.stringify({
      returnUrl,
      token
    })
  })
}


authorize()