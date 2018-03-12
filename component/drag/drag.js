class Drag {
  constructor(options) {
    this.targetEl = options.targetEl
    this.moveEl = options.moveEl
    this.overflow = options.overflow
    this.cursor = options.cursor || 'default'
    this.onlyX = options.onlyX
    this.onlyY = options.onlyY

    this.init()
  }

  init() {
    const pos = window.getComputedStyle(this.targetEl).position
    if (pos !== 'absolute' || pos != 'fixed' || pos === '') {
      this.targetEl.style.position = 'fixed'
    }

    if (this.cursor) {
      this.moveEl.style.cursor = this.cursor
    }

    this.moveEl.addEventListener('mousedown', (event) => {
      this.mousedown(event, this)
    })
  }

  mousedown(event, _this) {
    const nodeName = event.target.nodeName
    const disX = event.clientX - _this.targetEl.offsetLeft
    const disY = event.clientY - _this.targetEl.offsetTop
    document.onmousemove = (event) => {
      _this.move(event, disX, disY)
    }
    if (nodeName !== 'DIV') {
      document.onmousemove = null
      document.onmouseup = null
    }

    document.onmouseup = function() {
      document.onmousemove = null
      document.onmouseup = null
    }
  }

  move(e, posX, posY) {
    const winW = document.documentElement.clientWidth
    const winH = document.documentElement.clientHeight
    const maxW = winW - this.targetEl.offsetWidth
    const maxH = winH - this.targetEl.offsetHeight
    let l = e.clientX - posX
    let t = e.clientY - posY
    e.stopPropagation()

    if (this.overflow) {
      if (l <= 0) {
        l = 0
      }
      if (l > maxW) {
        l = maxW
      }
      if (t < 0) {
        t = 0
      }
      if (t > maxH) {
        t = maxH
      }
    }

    if (this.onlyX) {
      this.targetEl.style.left = l + 'px'
    } else if (this.onlyY) {
      this.targetEl.style.top = t + 'px'
    } else {
      this.targetEl.style.left = l + 'px'
      this.targetEl.style.top = t + 'px'
    }
  }
}

export default Drag