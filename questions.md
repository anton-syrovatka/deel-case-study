## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

- `PureComponent` performs props and state shallow comparison on props or state change. If values are equal (primitives have the same value and objects have the same reference) than new render is not happening, wheres for regular `Component` it happens for every props or state change.

- If you mutate prop object (instead of cloning) then `PureComponent` treat it as the same and won't perform render. Also you must be sure that the whole subtree won't be re-rendered as well.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- In modern react even if `parent` component returns `false` in `ShouldComponentUpdate` and not going to perform render, its `child` component may still be re-rendered if component is a consumer of `Context` and its value changes. So The whole subtree can perform unwanted render.

## 3. Describe 3 ways to pass information from a component to its PARENT.

- As function argument defined in parent, then passed as prop to child component.
- Context API
- We can send child component ref information to its parent component.

## 4. Give 2 ways to prevent components from re-rendering.

- use PureComponent or shouldComponentUpdate
- React.memo together with useMemo and useCallback hooks
- React.memo and comparisonFunction

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

- let's simply convert jsx to react functions

```jsx
const c = () => <div>text</div>
equals to
const c = () => React.createElement('div', null, `text`);
```

- Therefore `React.createElement` can't handle 2 components at once.
  But sometimes we do not need wrapping element (which is required). In this situation we use fragment which handles rendering multiple elements without creating a wrapping element in DOM.

## 6. Give 3 examples of the HOC pattern.

- add component additional styling
- perform additional logic computation and pass new values to component
- fetch external data and pass it to the component

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

- in promise errors are handled in `.catch(error)`
- in async...await errors are handled in `try {} catch ()` block
- in callback functions first argument is an error or undefined

## 8. How many arguments does setState take and why is it async.

- 2 arguments:

  - new state value (or function which returns new value and provides old value as an argument)
  - async callback function which is called when the state is fully updated.

- This required for batched updates when component state update happens in more optimized way to increase performance.

## 9. List the steps needed to migrate a Class to Function Component.

- remove construction
- replace render with return
- replace this.state with useState hook
- replace lifecycle methods with hooks

## 10. List a few ways styles can be used with components.

- import css files and use `className`
- inline styles via `style` prop
- css modules
- styled components
- jss

## 11. How to render an HTML string coming from the server.

- by using `dangerouslySetInnerHTML` prop

```jsx
<div dangerouslySetInnerHTML={{ __html: "<h1>string from the server</h1>" }} />
```
