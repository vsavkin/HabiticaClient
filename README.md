# Habitica Client in Angular 2

It is a functioning app built using Angular 2 and Immutable JS.

This is not a typical Angular 2 application: All the models are immutable. It is written using the Elm architecture. Similar to Flux, it uses unidirectional data flow, but there are not stores. Instead, there is an obervable of the applicaiton state, which is created by reducing an observable of actions.

Write about:

* Using observables
* Managing input handling using immutable data
* Efficient dirty-checking
