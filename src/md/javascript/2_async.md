const js_2 = `# Asynchronous JavaScript

Handle async operations with promises and async/await.

## Promises
\`\`\`js
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));
\`\`\`

## Async/Await
\`\`\`js
async function getData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  return data;
}
\`\`\``;