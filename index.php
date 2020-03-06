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
      <h1>APP</h1>

      <div>
        Perspective: <input type="range" value="0" step='100' min='0' max='2000' id="perspective-slider"/>
        <span id="perspective"></span> pixels.
      </div>

      <div>
        Rotation: <input type="range" value="0" step='10' min='0' max='90' id="angle-slider"/>
        <span id="angle"></span> degrees.
      </div>

      <div>
        Zoom: <input type="range" value="-100" step='100' min='-1000' max='2000' id="zoom-slider"/>
        <span id="zoom">-100</span> %.
      </div>

      <div id="app-container" class="app-instance"></div>
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
      const angleSpan = document.querySelector('#angle');
      const perspectiveSpan = document.querySelector('#perspective')
      const zoomSpan = document.querySelector('#zoom')

      document.querySelector('#angle-slider').onchange = (e) => {
        const selectedAngle = e.target.value
        appInstance.updateRotation(selectedAngle)
        angleSpan.innerText = selectedAngle
      }

      document.querySelector('#perspective-slider').onchange = (e) => {
        const selectedPerspective = e.target.value
        document.querySelector('#app-container').style.perspective = selectedPerspective + 'px'
        perspectiveSpan.innerText = selectedPerspective
      }

      document.querySelector('#zoom-slider').onchange = (e) => {
        const selectedZoomPct = e.target.value
        // document.querySelector('#app-container').style.translate = 
        appInstance.updateZoom(selectedZoomPct)
        zoomSpan.innerText = selectedZoomPct
      }


    </script>
  </body>
</html>
