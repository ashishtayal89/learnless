# LESS and SASS FOR BEGINNERS

## INDEX

- [CSS Issues](#cssissues)
- [LESS](#less)

  - [Introduction](#lessintroduction)
  - [Variables](#variablesinless)
  - [Mixins](#mixinsinless)
  - [Nested Rules](#nestedrulesinless)
  - [Namespace/Scoping](#namespaceinless)

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

## LESS

<div id="lessintroduction"/>

### Introduction

- Its a css pre-precessor.
- Introduces programming features to css. Less compiles to css.
- Code Example

  - Add the less file in your html as below.
  - Add the less.min.js in your html as below. Its the role of this js file to compile the less files into css files. Notice we have provided the **rel="stylesheet/less"** for the less files. This is important because the less.min.js would only compile the files with this rel tag. The browser would ignore the processing of these files since it doesn't know what rel="stylesheet/less" means.
  - Also less is going to ignore the css/less files which are not in your domain ie the thrid party css and less files.
  - Flow :

    1. Html parsing starts.
    2. Parser comes to line `<link rel="stylesheet/less" href="css/init.less" />`. It skips this line since it is not aware about rel="stylesheet/less".
    3. It moves forward and reaches line `<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js"></script>`. It loads this script file.
    4. As soon as this file is loaded it looks for all the link tags with rel="stylesheet/less" and loads the resources. It compiles them and adds them to a style tag in the head section.

    ```html
    <html>
      <head>
        <link rel="stylesheet/less" href="css/init.less" />
      </head>
      <body>
        <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js"></script>
      </body>
    </html>
    ```

    > Note : All css files are also valid less so we can also have <link rel="stylesheet/   less" href="css/init.css" />

<div id="variablesinless"/>

### Variables, Operations and Functions

- Variables in less are constants with a specific value. Eg `@myColor: #ffeedd`. You can't update the value of a variable in less. So you can't do `@myColor: @myColor + 5%`.
- Thinks that can be assigned to a variable are :
  1. Colors : `@a: Black;`
  2. Units(All units in css can be stored in a variable) : `@b: 4px;`, `@c: 1.0em;`
  3. Strings : `@d: Helvectica, sans serif;`
  4. Complex Types : `@e: 1px #000 Solid 0 0;`
- Operations : You can use operators to compute a value that needs to be assigned to a varible or a property direcly.

  ```less
  // Operations

  font-size: 4px + 4; // 8px
  font-size: 20px * 0.8; // 16px
  color: #fff / 4; // #404040;
  width: (100%/2) + 25%; // 75%
  ```

- Functions : Less also have some inbuilt functions which can be used to calculate the values of a property as shown below.

  ```less
  // Function

  color: lighten(@color, 10%);
  color: darken(@color, 10%);
  color: fadein(@color, 10%);
  color: fadeout(@color, 10%);
  @hue: hue(@color);
  ```

<div id="mixininless">

### Mixins and Overloads

- Just like javascript less also provides support for functions which accept some arguments and return some value.
- Mixins are specialy helpful for repeated properties or repeated piece of css.

  ```less
  @default-radius: 10px;

  .rounded-corners(@size) {
    border-radius: @size;
    -webkit-border-radius: @size;
    -moz-border-radius: @size;
  }

  #div1 {
    h1 {
      .rounded-corners(@default-radius);
      font-size: 2rem;
      background: darken(@main-color, 10%);
    }
  }
  ```

- Mixins can have default values as well like below. In this case we can skip passing an argument to the mixins.

  ```less
  @default-radius: 10px;

  .rounded-corners(@size: @default-radius) {
    border-radius: @size;
    -webkit-border-radius: @size;
    -moz-border-radius: @size;
  }

  #div1 {
    h1 {
      .rounded-corners;
      font-size: 2rem;
      background: darken(@main-color, 10%);
    }
  }
  ```

- Overloads are nothing but creating an overload method for your mixins. The overload method will be called based on the number of arguments that you pass to the method. Make sure that the definition of the 2 mixins are non-conflicting.

  ```less
  @default-radius: 10px;

  .rounded-corners(@size: @default-radius) {
    border-radius: @size;
    -webkit-border-radius: @size;
    -moz-border-radius: @size;
  }

  .rounded-corners(@size, @background) {
    border-radius: @size;
    -webkit-border-radius: @size;
    -moz-border-radius: @size;
    background: @background;
  }

  #div1 {
    h1 {
      .rounded-corners;
      font-size: 2rem;
      background: darken(@main-color, 10%);
    }
    h2 {
      .rounded-corners(5px, black);
    }
  }
  ```

- Gurads : Less also supports the guard condition in mixins. See the example below.

  ```less
  @default-radius: 10px;

  .rounded-corners(@size: @default-radius) when (@size >= 15px) {
    border-radius: @size;
    -webkit-border-radius: @size;
    -moz-border-radius: @size;
  }
  .rounded-corners(@size: @default-radius) when (@size < 15px) {
    border-radius: 1.5 * @size;
    -webkit-border-radius: 1.5 * @size;
    -moz-border-radius: 1.5 * @size;
  }
  ```

  - Here it is saying that use the first mixin rounded-courers if the @size is greater than equal to 15px, otherwise use the second rounded-corners mixin.
  - Similarly we have guards based on types :

  ```less
  .rounded-corners(@size: @default-radius) when (isNumber(@size)) {
    border-radius: 1.5 * @size;
    -webkit-border-radius: 1.5 * @size;
    -moz-border-radius: 1.5 * @size;
  }
  ```

<div id="nestedrulesinless">

### Nesting

- Less provides us with a nesting mechanism to make our css rules more maintainable.
- Eg :
  ```less
  // How we write in less
  #div1 {
    h1 {
      .rounded-corners(@default-radius);
      font-size: 2rem;
      background: darken(@main-color, 10%);
    }
  }
  ```
  ```less
  // How it is compiled to css
  #div1 h1 {
    .rounded-corners(@default-radius);
    font-size: 2rem;
    background: darken(@main-color, 10%);
  }
  ```
- Combinators : We might have scenarios were we need create new class by concatinating some string to the existing class. In such a case we use the less combinator or `&` sign.

  ```less
  // Less
  .table {
    tr:nth-child(2n + 1) {
      background: grey;
    }
    tr:nth-child(2n) {
      background: white;
    }
    &__row {
      font-size: 2rem;
    }
  }
  ```

  ```less
  // Compiled Css
  .table tr:nth-child(2n + 1) {
    background: grey;
  }
  .table tr:nth-child(2n) {
    background: white;
  }
  .table__row {
    font-size: 2rem;
  }
  ```

- Multiple `&` :

  ```less
  // LESS
  .link {
    & + & {
      color: red;
    }
    & & {
      color: green;
    }
    && {
      color: blue;
    }
    &,
    &ish {
      color: cyan;
    }
  }
  ```

  ```less
  // CSS
  .link + .link {
    color: red;
  }
  .link .link {
    color: green;
  }
  .link.link {
    color: blue;
  }
  .link,
  .linkish {
    color: cyan;
  }
  ```

  ```less
  // LESS
  .grand {
    .parent {
      & > & {
        color: red;
      }

      & & {
        color: green;
      }

      && {
        color: blue;
      }

      &,
      &ish {
        color: cyan;
      }
    }
  }
  ```

  ```less
  .grand .parent > .grand .parent {
    color: red;
  }
  .grand .parent .grand .parent {
    color: green;
  }
  .grand .parent.grand .parent {
    color: blue;
  }
  .grand .parent,
  .grand .parentish {
    color: cyan;
  }
  ```

- Changing selector order using `&`:

  ```less
  // Less
  .header {
    .menu {
      border-radius: 5px;
      .no-borderradius & {
        background-image: url("images/button-background.png");
      }
    }
  }
  ```

  ```less
  // CSS
  .header .menu {
    border-radius: 5px;
  }
  .no-borderradius .header .menu {
    background-image: url("images/button-background.png");
  }
  ```

<div id="namespaceinless"/>

### Namespace and Scoping

- Namespace is done for organizational grouping of css rules. As you can see in the below example we have created a namespace my-forms and added some rule for styling a button. Now we can use the same rules just by providing the required namespace for the rules ie. `#my-forms > .set-button;`.

  ```less
  #my-forms {
    .set-button {
      font-size: 14px;
      text-align: center;
    }
  }

  #submit-button {
    #my-forms > .set-button; // > symbol says to find the rules inside set-button class which is inside my-forms id.
    > .set-button {
      font-size: 16px;
    }
  }
  ```

- Scoping is a mechinism to define the scope of variables and mixins. In the below example we define the variable @size in 2 scope. In the global scope and in the scope of #form. Namespace declares a new scope.

  ```less
  // Scoping
  @size: 24px;
  #form {
    @size: 18px;
    .button {
      font-size: @size; // 18px;
    }
  }
  ```

- String Interpolation is also there is less.

  ```less
  // Less
  @root: "/images/";

  #form {
    background: url("@{root}background.jpg");
  }
  ```

  ```less
  // Css
  #form {
    background: url("/images/background.jpg");
  }
  ```

- Using Javascript : We can also use javascript in css. To do this we need to wrap the expression we want to execute in backtick operators. Look at the below example.

  ```less
  // Less
  @root: "/images/";
  @app-root: ` @{root} .toUpperCase() `; // Wraped the javascript expression inside `` operators.

  #form {
    background: url("@{app-root}background.jpg");
  }
  ```

  ```less
  // Css

  #form {
    background: url("/IMAGES/background.jpg");
  }
  ```
