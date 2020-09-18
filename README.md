# React State History Tree

Included in this package:
* a hook that extends React useState and tracks state history, providing multiple-choice, customizable undo/redo functionality to states of any type (not just text)
* a text field input React component that ships with aforementioned hook

[Skip to Installation](##Installation)

## Introduction

React states do not keep a history of their previous values. This must be implemented by the developer. The redux docs suggest one way to implement undo history: https://redux.js.org/recipes/implementing-undo-history.

Traditionally, the undo/redo functionality has provided a single thread of history. If one undos and then rewrites the state, the former redo history is lost. This package therefore provides a solution that retains all redo histories no matter how many undos and rewrites are created.

Additionally, undo/redo functionality is usually associated with text-based input. However, extending this functionality to non-text-based inputs is a logical and not-too-far-fetched abstraction. Graphics editors such as Adobe Photoshop have been implementing this functionality for a while.

One final note; certain text editors may implement undo/redo functionality by building diff histories, which saves immensely on memory for large files. Other implementations store a reversible action for every forward action. Finally, in the case of editors that support irreversible or computationally-expensive-to-reverse actions, especially those of graphics editors, states may have to be saved. Still other implementations use a hybrid approach of the aforementioned implementations. This package is oblivious to the types of states being saved; therefore, it opts for the universal (though storage-intensive for large states) implementation of saving entire states to the tree.

## Installation

This package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-state-history-tree --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-state-history-tree
```

React must be installed separately, as it is not included in the dependencies.

```js
import React, { useState } from "react";
import { useStateHistoryTree } from "react-state-history-tree";
import ForkedRedoTextField from "react-state-history-tree/ForkedRedoTextField"

const Test = () => {
  const [value, setValue, 
            {
                undo, 
                redo, 
                getCurrentBranches, 
                getCurrentSubtree, 
                defaultKeyDownHandler, 
                atRoot, 
                atLeaf
            }
        ] = useStateHistoryTree("")
  return (
    <input value={value} onChange={e => setValue(e.target.value)}/>
    <ForkedRedoTextField multiline></ForkedRedoTextField>
  );
};
```

## Documentation

### useStateHistoryTree

useStateHistoryTree can be used as follows:

```
const [state, setState, utilities] = useStateHistoryTree(initialState)
```

The first two return values follow the `[state, setState]` return convention from React's useState hook. However, useStateHistoryTree's second argument, `setState` commits the state change to the state history tree, creating a state that can be rolled backed to in the future. If one does not want to commit to the tree on every state change, then another state must be used to track all the changes and `setState` can be invoked on a conditional basis.

Utilities is an object that has the following fields:

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| undo | `(toClosestFork: boolean) => void` | If `toClosestFork` is set as `false`, the state is set to the previous state. If `toClosestFork` is set as `true`, the state is set to the closest state in the past that had more than one redo branch. `toClosestFork` defaults to `false`.
| redo | `(pathIndex: number, toClosestFork: boolean) => void` | If `pathIndex` is set to a valid index of the current redo branches, the state is set to the redo state with that index. If `toClosestFork` is set as `false`, the state is set to the previous state. If `toClosestFork` is set as `true`, the state is set to the closest state in the past that had more than one redo branch. `toClosestFork` defaults to `false`.
| getCurrentBranches | `() => [branch: {index: number, value}]` | Returns the redo branches of the current state.
| getCurrentSubtree | `() => [node: {index: number, value, children: [node]}]` | Returns the same redo branches as `getCurrentBranches`, but includes nested children for deeper navigation.
| defaultKeyDownHandler | `(keydown event) => void` | This callback implements the default behavior for undo/redo: Ctrl + 'z' for undo and Ctrl + Shift + 'z' for redo (Command is used for Mac users).
| atRoot | boolean | `true` if current state is the initial state, `false` otherwise.
| atLeaf | boolean | `true` if current state has no redo branches, `false` otherwise.


## Compatibility

### React

This package uses hooks, so React 16.8 or newer is required.