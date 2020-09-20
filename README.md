# React State History Tree

Included in this package:
* a hook that extends React useState and stores state history, providing multiple-choice, customizable undo/redo functionality to states of any type (not just text)
* a text input React component that uses the aforementioned hook and provides forked redo functionality for the user in the form of a popup widget near the text caret

![Example of ForkedRedoTextField](https://github.com/joshuatso/react-state-history-tree/blob/master/public/demonstration.gif?raw=true)

## Installation

This package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-state-history-tree --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-state-history-tree
```

React must be installed separately, as it is not included in the dependencies. The hook and component can be imported as follows:

```js
import { useStateHistoryTree, ForkedRedoTextField } from "react-state-history-tree";
```

## Background

React states do not store a history of their previous values. This must be implemented by the developer. The redux docs suggest one way to implement undo history: https://redux.js.org/recipes/implementing-undo-history. **Note:** "History" as mentioned in this document has no relation to the react router history.

Traditionally, the undo/redo functionality provides a single thread of history. If one undos and then rewrites the state, the former redo history is lost. This package therefore provides a solution that retains all redo histories no matter how many undos and rewrites are created.

Additionally, undo/redo functionality is usually associated with text-based input. However, extending this functionality to non-text-based inputs is a logical and useful abstraction. Graphics editors such as Adobe Photoshop have been implementing this functionality for a while.

## Documentation

### useStateHistoryTree

The useStateHistoryTree hook can be used as follows:

```js
const [state, setState, utilities] = useStateHistoryTree(initialState)
```

The first two return values follow the `[state, setState]` return convention from React's useState hook. 

useStateHistoryTree's second return value, named `setState` above has the following signature:
`setState(State | State => State, Boolean=true) => void`

**Update: (version 1.1.1)** Support for conditional committing to the history tree is now supported. Inspiration for this functionality is from ayc0's https://www.npmjs.com/package/use-history-state.

`setState` supports functional state updates. The second argument (defaulted to `true`) commits the state update to the history tree if `true` and updates state without committing to the history tree if `false`. Therefore, if one wishes to create a state that can be rolled back to in the future, leave this value as `true`. If one wants a normal state update (also saving memory), set this value to `false`.

Utilities is an object that has the following fields:

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| undo | `(toClosestFork: boolean) => void` | If `toClosestFork=false`, the state is set to the previous state. If `toClosestFork=true`, the state is set to the closest state in the past that had more than one redo branch. `toClosestFork` defaults to `false`. |
| redo | `(pathIndex: number, toClosestFork: boolean) => void` | If `pathIndex` is set to a valid index of the current redo branches, the state is set to the redo state with that index. If it is not, the default redo path is used (either decided by the most recent rewrite or the most recent redo, whichever one came last). If `toClosestFork=false`, the state is set to the previous state. If `toClosestFork=true`, the state is set to the closest state in the past that had more than one redo branch. `pathIndex` defaults to `null` and `toClosestFork` defaults to `false`. |
| getCurrentBranches | `() => [branch: {index: number, value}]` | Returns the redo branches of the current state. |
| getCurrentSubtree | `() => [node: {index: number, value, children: [node]}]` | Returns the same redo branches as `getCurrentBranches`, but includes nested children for deeper navigation. |
| defaultKeyDownHandler | `(keydown event) => void` | This callback implements the default behavior for undo/redo: <kbd>Ctrl</kbd> + <kbd>z</kbd> for undo and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>z</kbd> for redo (<kbd>command</kbd> instead of <kbd>Ctrl</kbd> is used for Mac users). **IMPORTANT NOTE:** When `defaultKeyDownHandler` is applied to certain tags (including div), the `tabindex` attribute must be set to `"0"` for the handler to work properly.|
| atRoot | boolean | `true` if current state is the initial state, `false` otherwise.|
| atLeaf | boolean | `true` if current state has no redo branches, `false` otherwise.|

### ForkedRedoTextField

ForkedRedoTextField is a React component that applies the useStateHistoryTree hook to an input or textarea. The component uses the defaultKeyHandler in conjunction with a listener that opens a widget near the text caret cursor for selecting the desired redo branch when the user enters <kbd>Ctrl</kbd> + <kbd>y</kbd> (<kbd>command</kbd> instead of <kbd>Ctrl</kbd> is used for Mac users). The component allows for several stylistic customizations.

Props for ForkedRedoTextField:

| Prop | Type | Default | Description |
| ----------- | ----------- | ----------- | ----------- |
| multiline | boolean | false | Uses `<textarea/>` if `true`, `<input/>` otherwise. |
| rows | number | 3 | The number of rows if multiline. |
| inputStyles | jsx style object | N/A | Override styles applied to the input element. |
| unSelectedCellStyles | jsx style object | N/A | Override styles applied to the unselected widget cells. |
| selectedCellStyles | jsx style object | N/A | Override styles applied to the selected widget cell. |
| cellAreaStyles | jsx style object | N/A | Override styles applied to the cell area in the widget. |
| doButtonStyles | jsx style object | N/A | Override styles applied to the undo/redo to closest fork buttons in the widget. |
| widgetContainerStyles | jsx style object | N/A | Override styles applied to the widget container. |

#### Navigating the ForkedRedoTextField widget

The widget/popup can be used to select the desired redo branch to set as the state:
* <kbd>Ctrl</kbd> + <kbd>y</kbd> (<kbd>command</kbd> + <kbd>y</kbd> for Mac users) opens the widget.
* Clicking the corresponding cell will expand the cell if needed to see the entire value. 
* Clicking on a selected cell submits the selection. 
* The <kbd>Left</kbd> and <kbd>Right</kbd> keyboard arrows can be used to cycle through the cells.
* <kbd>Enter</kbd> key can be used to submit a selection.
* The left bracket and right bracket buttons in the widget can be used to trigger, respectively, undo or redo to the closest fork (described above).

## Compatibility

### React

This package uses hooks, so React 16.8 or newer is required.

## Implementation

Certain text editors may implement undo/redo functionality by building diff histories, which saves immensely on memory for large files. Other implementations store a reversible action for every forward action. Finally, in the case of editors that support irreversible or computationally-expensive-to-reverse actions, especially those of graphics editors, there may be no other choice but to save entire states. Still other implementations use a hybrid approach of the aforementioned implementations. This package is oblivious to the types of states being saved; therefore, it opts for the universal (though storage-intensive for large states) implementation of saving entire states to the tree. 

Under the hood, the useStateHistoryTree hook stores each iteration of the state as a node in a tree data structure. The initial state is stored at the root. When the state is updated, a node representing the new state is added as a child of the previous state. Each node has access to its parent (its undo state) and its children (its redo states). Each node stores its default redo path, which is either decided by the most recent rewrite or the most recent redo (whichever one comes later has priority). Therefore, at any given time, there always exists a default path from the root (initial state) to a leaf. This default path can be navigated on by traditional the <kbd>Ctrl</kbd> + <kbd>z</kbd> for undo and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>z</kbd> for redo, as is familiar to most users (the defaultKeyDownHandler callback provides this functionality). The default path is only changed when the user rewrites or redos to a specific branch, as discussed before.

Redos are only interesting when there are multiple options. These are represented as nodes in the tree with more than one child. Throughout the docs, this situation is called a "fork".

## Example

Below is an example of using the useStateHistoryTree hook on a non-text state and applying the defaultKeyDownHandler to the window to control the background color of a div. Note that the state updates that do not change the color are not committed to the history tree. Use of a ForkedRedoTextField component is also demonstrated.

```js
import React, {useState, useEffect} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import ForkedRedoTextField from "./ForkedRedoTextField"

export default function Test() {
    const [color, setColor, 
              {
                  undo, 
                  redo, 
                  getCurrentBranches, 
                  getCurrentSubtree, 
                  defaultKeyDownHandler, 
                  atRoot, 
                  atLeaf
              }
        ] = useStateHistoryTree("blue")

    const ColorButton = ({buttonColor}) => 
        <button onClick={() => setColor(buttonColor, color != buttonColor)}>
            {buttonColor}
        </button>

    useEffect(() => {
        window.addEventListener("keydown", defaultKeyDownHandler)
        return () => {
            window.removeEventListener("keydown", defaultKeyDownHandler)
        }
    })

    return (
        <>
            <div style={{backgroundColor: color, color: "white"}}>{color}</div>
            <ColorButton buttonColor="yellow"></ColorButton>
            <ColorButton buttonColor="blue"></ColorButton>
            <ColorButton buttonColor="red"></ColorButton>
            <ColorButton buttonColor="green"></ColorButton>
            <ForkedRedoTextField multiline></ForkedRedoTextField>
        </>
    );
};
```

## Issues

This package is in early development. Thank you for taking the time to read about, use, and make suggestions for this package. All issues and inquiries can be directed to GitHub.