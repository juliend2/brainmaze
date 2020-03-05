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
    // do it:
    this.initialize()
  }
  initialize() {
    // get matrix width:
    const maxWidth = this.data.map(d=>d.x).max()
    // get matrix height:
    const maxHeight = this.data.map(d=>d.y).max()
    // get matrix depth:
    const maxDepth = this.data.map(d=>d.z).max()
    const columns = Array.from({length: maxWidth}, (v, i) => i)
    const rows = Array.from({length: maxHeight}, (v, i) => {
      return columns
    })
    console.log('rows', rows)

    // Draw it:
    const table = new Table2d(rows, 0)
    this.container.innerHTML = table.toString();
  }
}


class Table2d {
  constructor(rows, depth) {
    this.rows = rows
    this.depth = depth
  }
  // Returns an HTML String:
  toString() {
    return `
      <table id="z${this.depth}">
        <tbody>${
          this.rows.map((row, y_i) => {
            return `
              <tr>
                ${
                  row.map((cell, x_i) => {
                    return `<td id="x${x_i}-y${y_i}-z${this.depth}"></td>`
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

