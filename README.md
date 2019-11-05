# LESS and SASS FOR BEGINNERS

## INDEX

- [CSS Issues](#cssissues)
- [LESS](#less)

  - [Variables in less](#variablesinless)
  - [Mixins in less](#mixinsinless)
  - [Nested Rules in less](#nestedrulesinless)
  - [Namespace/Scoping in less](#namespaceinless)

- [SASS](#sass)

<div id="cssissues"/>

## CSS Issues

- **Duplicate Values Problem** : Generally we repeat the same color at mutiple place in different class as in the below case. This makes the colors, font redundant and makes our css error prone. We can have duplicate values in the form of color, font size, font weight etc.

  **Code Eg**

  ```css
  .container {
    background: #000;
  }
  .details {
    color: #000;
  }
  ```

- **Duplication Properties Problem** : As we can see below we have have multiple properties to implement the same functionality like border-radius. This is to provide multiple browser support for properties which are fairly new. Also we can have a need to used these propeties again and again in our css. This gives rise to multiple lines of code in css. Rather there should be a method which accespts the values and return the properties/rules in return.

  **Code Eg**

  ```css
  .container {
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }

  #form {
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }
  ```

- **Cascade Problem** : In css we generally have a lot of nested rules. It becomes an issue is there is some change in the classes of parent element. For instance if we update the **forms** class is the below scenario we will have the make changes to all the css rules which use forms as the parent class.

  **Code Eg**

  ```css
  .form {
  }
  .form textarea {
  }
  .form input[type="text"] {
  }
  .form input[type="password"] {
  }
  ```

- **Calculation Problem** : There is no mechanism through which we can do any calculations in the css. There may be times when we need to do some calculation and assign the computed results to the properties.

  **Code Eg**

  ```css
  body {
    font-size: x + 8px; // Here x is a variable
  }
  ```

- **Importing Problem** : In simple css we don't have a mechanism to add the rules specified in 1 css file into another css file. LESS provides us with a mechanism were we can segrigate our changes in different less files and them compile them into one file before serving to the server using the **@import** keyword.
