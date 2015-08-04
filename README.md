# Habitica Client in Angular 2

It is a functioning app built using Angular 2 and Immutable JS.

*DISCLAIMER*

Don't take this as a recommendation of how to write Angular 2 apps. You know better what works for your and your team. The Angular 2 framework is malleable and enables a variety of different architectures.

## Stack

This app is written using:

* Angular 2
* Immutable.js
* RxJS

## Elm Architecture

The architecture of this app is inspired by the Elm architecture. Similar to Flux, it uses unidirectional data flow, but there are no stores. Instead, there is an observable of the application state, which is created by reducing an observable of actions.

```
const actions: Observable<Action> = ...;
const initState: AppState = ...;
const state: Observable<AppState> = actions.reduce(stateTransition, initState);
```

[Read more about the Elm architecture.](https://github.com/evancz/elm-architecture-tutorial)

TODO:

* Write about using observables to model the domain of the app.


### Immutable.js

The app's model is implemented using Immutable.js. All the state transitions happen inside the `stateTransition` function.

#### Efficient Change Detection

I take advantage of the fact that the models are immutable.

```
@Component({
  selector: 'habit', properties: ['m'], changeDetection: ON_PUSH
})
export class Habit {
}
```

The `changeDetection: ON_PUSH` option tells Angular that the view of this component has to be checked only if the `m` property has been replaced. This is similar to the `shouldComponentUpdate` technique used in React.

TODO:

* Write about managing input handling when using immutable data
