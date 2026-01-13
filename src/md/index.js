const cpp_1 = `# Getting Started with C++

C++ is a powerful general-purpose programming language.

## Key Features
- Object-oriented programming
- Low-level memory manipulation
- High performance

## Hello World
\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello World!";
    return 0;
}
\`\`\``;

const cpp_2 = `# Pointers and Memory Management

Pointers are variables that store memory addresses.

## Basic Pointer Syntax
\`\`\`cpp
int x = 10;
int* ptr = &x;
\`\`\`

## Dynamic Memory
- Use \`new\` to allocate
- Use \`delete\` to free memory`;

const cpp_3 = `# Standard Template Library

The STL provides powerful data structures.

## Common Containers
- \`vector\` - Dynamic array
- \`map\` - Key-value pairs
- \`set\` - Unique elements

## Example
\`\`\`cpp
vector<int> numbers = {1, 2, 3};
\`\`\``;

const js_1 = `# JavaScript Fundamentals

JavaScript is the language of the web.

## Variables
\`\`\`js
let name = 'John';
const age = 30;
\`\`\`

## Functions
\`\`\`js
const greet = (name) => {
  return \`Hello \${name}\`;
};
\`\`\``;

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

const react_1 = `# React Basics

React is a JavaScript library for building UIs.

## Components
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
\`\`\`

## State Management
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\``;

const react_2 = `# React Hooks

Hooks let you use state and lifecycle in function components.

## Common Hooks
- \`useState\` - State management
- \`useEffect\` - Side effects
- \`useContext\` - Context API
- \`useMemo\` - Memoization

## Custom Hooks
Create reusable logic by building custom hooks.`;

export const mdFiles = {
  cpp: {
    '1_getting_started': cpp_1,
    '2_pointers': cpp_2,
    '3_stl': cpp_3
  },
  javascript: {
    '1_fundamentals': js_1,
    '2_async': js_2
  },
  react: {
    '1_basics': react_1,
    '2_hooks': react_2
  }
};