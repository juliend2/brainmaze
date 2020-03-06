
// Don't care about the standard types' prototypes in this project:
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};


class App {
  constructor(container, data) {
    this.container = container
    this.data = data
    this.angleDegrees = 0 // default
    this.zoomPct = 100
    // do it:
    this.initialize()
  }
  initialize() {
    // instantiate the data cells:
    this.drawMatrix(this.angleDegrees)
  }
  drawMatrix(angleDegrees) {
    this.container.innerHTML = ''; // empty out the container before drawing
    // get matrix width:
    const maxWidth = this.data.map(d=>d.x).max()
    // get matrix height:
    const maxHeight = this.data.map(d=>d.y).max()
    // get matrix depth:
    const maxDepth = this.data.map(d=>d.z).max()
    const columns = Array.from({length: maxWidth+1}, (v, i) => i)
    const rows = Array.from({length: maxHeight+1}, (v, i) => {
      return columns
    })
    const box = Array.from({length: maxDepth+1}, (v, i) => {
      return rows
    })

    // Draw it:
    box.forEach((rows, i) => {
      const table = new Table2d(rows, i, angleDegrees, this.zoomPct)
      this.container.insertAdjacentHTML('beforeend', table.toString());
    })

    this.data.forEach(datum => {
      const id = `#x${datum.x}-y${datum.y}-z${datum.z}`
      console.log(id)
      const el = this.container.querySelector(id)
      el.innerText = datum.content
    })

    this.container.querySelectorAll('.table2D__cell').forEach((cell)=>{
      cell.addEventListener('click', (e)=>{
        const clickedCell = e.target
        clickedCell.classList.add('focused')
        const coordinates = clickedCell.id.split(/-/).map(s => {return parseInt(s.slice(1), 10)})
        console.log(coordinates)
        const foundCell = this.data.find(datum => {
          return datum.x == coordinates[0] && datum.y == coordinates[1] && datum.z == coordinates[2]
        })
        if (foundCell) {
          console.log(foundCell)
          clickedCell.innerHTML = `
            <form method="post" action=".">
              <textarea rows="3" style="width:100%;">${foundCell.content}</textarea>
            </form>
          `;
          clickedCell.querySelector('textarea').focus()
          clickedCell.querySelector('textarea').addEventListener('blur', (e)=>{
            console.log(clickedCell, e.target.value, 'is the new value')
            clickedCell.innerText = e.target.value
            clickedCell.classList.remove('focused')
          })
        }
      })
    })

  }

  updateRotation(angleDegrees) {
    this.angleDegrees = angleDegrees
    this.drawMatrix(angleDegrees)
  }

  updateZoom(zoomPct) {
    this.zoomPct = zoomPct
    this.drawMatrix(this.angleDegrees)
  }
}

function getXTranslationPx(fromDegrees) {
  const magicMultiplicator = 6.7
  const maxAngleThresholdBeforeReturning = 45
  return fromDegrees < maxAngleThresholdBeforeReturning ?
    (fromDegrees * magicMultiplicator) :
    ((90 - fromDegrees) * magicMultiplicator)
}


class Table2d {

  constructor(rows, depth, yRotationDegrees = 0, zoomPct = 100) {
    this.rows = rows
    this.depth = depth
    this.yRotationDegrees = yRotationDegrees
    this.zoomPct = zoomPct
    this.zoomFraction = this.zoomPct / 100
    // const angles = [
    //   0, 10, 20, 30, 45, 50, 60, 70, 80, 90
    // ];
    // for (let i = 0; i < angles.length; i++) {
    //   console.log('Table2d toString', angles[i], getXTranslationPx(angles[i]))
    // }
  }

  // Returns an HTML String:
  toString() {
    const x = getXTranslationPx(this.yRotationDegrees) * (this.depth + 1)
    const z = this.depth * 100 * this.zoomFraction
    const saturationPct = (this.depth + 1) * 9;
    return `
      <table id="z${this.depth}" class="table2D"
        style="
          transform: translate3d(${x}px, 0, ${z}px)
            rotate3d(0, 1, 0, ${this.yRotationDegrees}deg);
          --saturation-pct: ${saturationPct}%;
      ">
        <tbody>${
          this.rows.map((rowCells, y_i) => {
            return `
              <tr class="table2D__row">
                ${
                  rowCells.map((cell, x_i) => {
                    return `<td
                      id="x${x_i}-y${y_i}-z${this.depth}"
                      class="table2D__cell"
                      style="width: calc(100% / ${rowCells.length});">&nbsp;
                    </td>`
                  }).join('')
                }
              </tr>
            `
          }).join('')
        }
        </tbody>
      </table>
    `
  }

}

