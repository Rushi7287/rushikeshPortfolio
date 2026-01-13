const react_2 = `# React Hooks

Hooks let you use state and lifecycle in function components.

## Common Hooks
- \`useState\` - State management
- \`useEffect\` - Side effects
- \`useContext\` - Context API
- \`useMemo\` - Memoization

## Custom Hooks
Create reusable logic by building custom hooks.`;

// md/index.js - Central MD file registry
const mdFiles = {
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