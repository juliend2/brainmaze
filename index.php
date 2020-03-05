<?php

?>

<!DOCTYPE html>
<html>
  <head>
    <title>Brain maze</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <section class="main">
      <div id="app-container"></div>
    </section>
    <script src="js/app.js"></script>
    <script>
      const data = [
        {x: 1, y: 1, z: 1, type: 'text', content: "J'aime le chocolat"},
        {x: 1, y: 2, z: 2, type: 'text', content: "deuxieme noeud"},
        {x: 1, y: 2, z: 3, type: 'text', content: "3e noeud"},
        {x: 2, y: 1, z: 1, type: 'text', content: "4e"},
        {x: 2, y: 1, z: 2, type: 'text', content: "5e"},
        {x: 2, y: 2, z: 3, type: 'text', content: "6th"},
        {x: 2, y: 3, z: 1, type: 'text', content: "7th"},
        {x: 3, y: 3, z: 3, type: 'text', content: "8th"},
        {x: 4, y: 4, z: 4, type: 'text', content: "9th"},
        {x: 5, y: 5, z: 5, type: 'text', content: "10th"},
        {x: 6, y: 7, z: 1, type: 'text', content: "11th"},
      ];
      const appInstance = new App(document.querySelector('#app-container'), data);
    </script>
  </body>
</html>
