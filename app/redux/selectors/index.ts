import { createSelector } from 'reselect';

// Example input selectors
const selectTodos = (state: { todos: any; }) => state.todos;

// Example transformation logic
const transformTodos = (todos: any[]) => {
    // Perform some transformation on todos if needed
    return todos.map(todo => ({
        ...todo,
        completed: !todo.completed
    }));
};

// Create a selector with transformation logic
createSelector(
    [selectTodos],
    transformTodos
);
