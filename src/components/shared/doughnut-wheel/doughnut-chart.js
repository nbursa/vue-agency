import * as WheelMath from "./wheel-math"
import * as WheelUtils from "./dataFormater"
import {
  rangeChecker
} from "@/utils/validation.js"
import {
  colorModulator
} from "./colorModulator"
import {
  colorGenerator
} from "./randomColorGen"

const timeconst = WheelMath.Tau / 48

export default class DoughnutChart {
  constructor(config, canvas, data, tool, $vm) {
    this._config = config
    this._canvas = canvas
    this._context = this._canvas.getContext("2d")
    this._data = JSON.parse(JSON.stringify(data))
    this._tool = tool
    this.draggedSlice = null
    this.targetSlice = null
    this.hoveredIndex = -1
    this.radius = config.radius
    this.collapsing = config.collapsing
    this.minAngle = config.minAngle
    this.mergeStartSegment = null
    this.vue = $vm
  }

  initMouseEvents() {
    if (isTouch()) {
      window.addEventListener("touchend", event => this.touchEnd(event))
      this._canvas.addEventListener("touchmove", event => this.touchMove(event))
      this._canvas.addEventListener("touchstart", event =>
        this.touchStart(event)
      )
    } else {
      window.addEventListener("mouseup", event => this.touchEnd(event), { passive: false })
      this._canvas.addEventListener("mousemove", event => this.touchMove(event) , { passive: false } )
      this._canvas.addEventListener("mousedown", event =>
        this.touchStart(event) , { passive: false }
      )
    }
  }

  initCanvas() {
    this.initMouseEvents()
    this.draw()
  }
  updateCanvas(data) {
    this._data = JSON.parse(JSON.stringify(data))
    this.draw()
  }
  changeTool(tool) {
    this._tool = tool
    console.log(this._tool)
  }
  draw() {
    //this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    let context = this._context
    context.clearRect(0, 0, this._canvas.width, this._canvas.height)

    let geometry = this.getGeometry()

    let visibleSegments = this.getVisibleSegments()

    // Flags to get arc sizes and index of largest arc, for drawing order
    let largestArcSize = 0
    let indexLargestArcSize = -1

    // Get the largeset arcsize
    for (let i = 0; i < visibleSegments.length; i += 1) {
      if (visibleSegments[i].arcSize > largestArcSize) {
        largestArcSize = visibleSegments[i].arcSize
        indexLargestArcSize = i
      }
    }

    // Need to draw in correct order
    for (let i = 0; i < visibleSegments.length; i += 1) {
      // Start with one *after* largest
      let index = WheelMath.mod(
        i + indexLargestArcSize + 1,
        visibleSegments.length
      )

      this.drawSegment(
        this._context,
        geometry.centerX,
        geometry.centerY,
        geometry.radius,
        visibleSegments[index].angle,
        visibleSegments[index].arcSize,
        visibleSegments[index].format,
        false,
        index
      )
    }

    // Now draw invisible segments
    let invisibleSegments = this.getInvisibleSegments()
    for (let i = 0; i < invisibleSegments.length; i += 1) {
      this.drawSegment(
        this._context,
        geometry.centerX,
        geometry.centerY,
        geometry.radius,
        0,
        0,
        invisibleSegments[i].format,
        true,
        0
      )
    }

    // Finally draw drag nodes on top (order not important)
    for (let i = 0; i < visibleSegments.length; i += 1) {
      let location = WheelMath.polarToCartesian(
        visibleSegments[i].angle,
        geometry.radius
      )
      this.drawNode(
        this._context,
        location.x,
        location.y,
        geometry.centerX,
        geometry.centerY,
        i == this.hoveredIndex
      )
    }
    //this.onchange(piechart)
    this.drawNumbers(this._context, this.radius)
    this.convertAngleToTime()
  }
  drawNumbers(context) {
    const geometry = this.getGeometry()
    let ang = null
    context.save()

    context.translate(geometry.centerX, geometry.centerY)
    for (let n = 1; n <= 24; n++) {
      ang = n * Math.PI / 12
      context.rotate(ang)
      context.translate(0, -geometry.radius * 1.2)
      context.rotate(-ang)
      this.renderNumberToTime(n, context)
      // context.globalAlpha = 0.4
      // context.fillText(this.convertNumberToTime(n), 0, 0)
      context.rotate(ang)
      context.translate(0, geometry.radius * 1.2)
      context.rotate(-ang)
    }
    context.restore()
  }
  drawSegment(
    context,
    centerX,
    centerY,
    radius,
    startAngle,
    arcSize,
    format,
    collapsed,
    segmentIndex
  ) {
    if (collapsed) {
      return
    }
    // Draw coloured segment
    context.save()
    let endingAngle = startAngle + arcSize
    context.beginPath()
    context.moveTo(centerX, centerY)
    context.arc(centerX, centerY, radius, startAngle, endingAngle, false)
    context.closePath()
    this.segmentColorFiller(context, format, segmentIndex)
    //draws slice strokes
    context.lineWidth = 4
    context.strokeStyle = "#FFFFFF"
    context.stroke()
    context.restore()

    // Draw name on top
    context.save()
    context.translate(centerX, centerY)
    context.rotate(startAngle)

    let fontSize = Math.floor(context.canvas.height / 25)
    let dx = radius - fontSize
    let dy = centerY / 10

    context.textAlign = "right"
    context.font = fontSize + "pt Helvetica"
    // if (format.name) {
    //   context.fillText(format.name, dx, dy)
    // }
    context.restore()
  }

  segmentColorFiller(context, format, segmentIndex) {
    context.fillStyle = format.color
    context.globalAlpha = 0.80

    if (this.mergeStartSegment !== null) {
      context.fillStyle = '#DEE5EB'

      if (this.mergeStartSegment === segmentIndex || this.mergeValidator(segmentIndex)) {
        context.fillStyle = format.color
        context.globalAlpha = (this.mergeStartSegment === segmentIndex) ? 1 : 0.4
      }
    }

    // if (this.mergeStartSegment !== null) {
    //   if (this.mergeStartSegment !== segmentIndex) context.fillStyle = '#DEE5EB'

    //   if (this.mergeStartSegment === segmentIndex) context.globalAlpha = 1
    // }

    context.fill()
  }



  drawNode(context, x, y, centerX, centerY, hover) {
    return false
    context.save()
    context.translate(centerX, centerY)
    context.fillStyle = "#FFFFFF"
    //const rad = hover ? 7 : 5
    const rad = 5
    context.beginPath()
    context.arc(x, y, rad, 0, WheelMath.Tau, true)
    context.shadowColor = "black"
    context.shadowBlur = 10
    context.fill()
    context.stroke()
    context.restore()
  }

  getInvisibleSegments = function () {
    // Collect data for visible segments
    let invisibleSegments = []
    for (let i = 0; i < this._data.length; i += 1) {
      if (this._data[i].collapsed) {
        invisibleSegments.push({
          index: i,
          format: this._data[i].format
        })
      }
    }

    return invisibleSegments
  }

  getVisibleSegments() {
    // Gets visible segment data
    let visibleSegments = []
    for (let i = 0; i < this._data.length; i += 1) {
      if (!this._data[i].collapsed) {
        let startAngle = this._data[i].angle

        // Get arcSize
        let foundNextAngle = false
        for (let j = 1; j < this._data.length; j += 1) {
          let nextAngleIndex = (i + j) % this._data.length

          if (!this._data[nextAngleIndex].collapsed) {
            let arcSize = this._data[nextAngleIndex].angle - startAngle
            if (arcSize <= 0) {
              arcSize += WheelMath.Tau
            }
            visibleSegments.push({
              arcSize: arcSize,
              angle: startAngle,
              format: this._data[i].format,
              index: i
            })
            this._data[i].arcSize = arcSize
            foundNextAngle = true
            break
          }
        }

        // Only one segment
        if (!foundNextAngle) {
          visibleSegments.push({
            arcSize: WheelMath.Tau,
            angle: startAngle,
            format: this._data[i].format,
            index: i
          })
          this._data[i].arcSize = WheelMath.Tau
          break
        }
      }
    }
    return visibleSegments
  }
  shiftSelectedAngle(newAngle) {
    if (!this.draggedSlice) {
      return
    }
    const draggedSlice = this.draggedSlice

    // Target start angle
    let startAngle = draggedSlice.startAngles[draggedSlice.index]

    // Target previous angle
    let previousAngle = this._data[draggedSlice.index].angle

    // Diff from target to start (-pi to +pi)
    let angleDragRange = WheelMath.minSigAngle(newAngle, startAngle)

    // Diff from previous
    let previousDragRange = draggedSlice.angleDragRange

    // Determine allowed rotation (clockwise/anticlockwise)
    let rotationDirection = previousDragRange > 0 ? 1 : -1

    // Reverse rotation if passed 180
    let sameDirection = previousDragRange > 0 == angleDragRange > 0
    let greaterThanHalf = Math.abs(previousDragRange - angleDragRange) > Math.PI

    if (greaterThanHalf && !sameDirection) {
      // Angle reverse
      angleDragRange =
        (WheelMath.Tau - Math.abs(angleDragRange)) * rotationDirection
    } else {
      rotationDirection = angleDragRange > 0 ? 1 : -1
    }

    draggedSlice.angleDragRange = angleDragRange

    // Init new angle
    this._data[draggedSlice.index].angle = WheelMath.normaliseAngle(
      startAngle + angleDragRange
    )

    // Collapse reset
    this._data[draggedSlice.index].collapsed =
      draggedSlice.collapsed[draggedSlice.index]

    // Find other angles
    let collapsed = false
    let shifting = true
    let numberOfAnglesShifted = 0
    let minAngle = this.minAngle

    for (let i = 1; i < this._data.length; i += 1) {
      // Testing slices in order with indexing
      let index = WheelMath.mod(
        draggedSlice.index + i * rotationDirection,
        this._data.length
      )

      // Get angle from target start to this angle
      let startAngleToNonDragged = WheelMath.minSigAngle(
        draggedSlice.startAngles[index],
        startAngle
      )

      // If angle is in the wrong direction then it should actually be OVER 180
      if (startAngleToNonDragged * rotationDirection < 0) {
        startAngleToNonDragged =
          (startAngleToNonDragged * rotationDirection + WheelMath.Tau) *
          rotationDirection
      }

      if (this.collapsing) {
        // *Collapsing behaviour* when smallest angle encountered

        // Reset collapse
        this._data[index].collapsed = draggedSlice.collapsed[index]

        let checkForSnap = !collapsed && !this._data[index].collapsed

        // Snap node to collapse, and prevent going any further
        if (
          checkForSnap &&
          startAngleToNonDragged > 0 &&
          angleDragRange > startAngleToNonDragged - minAngle
        ) {
          this._data[draggedSlice.index].angle = this._data[index].angle
          this._data[draggedSlice.index].collapsed = true
          collapsed = true
        } else if (
          checkForSnap &&
          startAngleToNonDragged < 0 &&
          angleDragRange < startAngleToNonDragged + minAngle
        ) {
          this._data[draggedSlice.index].angle = this._data[index].angle
          this._data[index].collapsed = true
          collapsed = true
        } else {
          this._data[index].angle = draggedSlice.startAngles[index]
        }
      } else {
        // *Shifting behaviour* when smallest angle encountered

        // Shift all other angles along
        let shift = (numberOfAnglesShifted + 1) * minAngle
        ////console.log(numberOfAnglesShifted)
        if (
          shifting &&
          startAngleToNonDragged > 0 &&
          angleDragRange > startAngleToNonDragged - shift
        ) {
          this._data[index].angle = WheelMath.normaliseAngle(
            draggedSlice.startAngles[index] +
            (angleDragRange - startAngleToNonDragged) +
            shift
          )

          numberOfAnglesShifted += 1
        } else if (
          shifting &&
          startAngleToNonDragged < 0 &&
          angleDragRange < startAngleToNonDragged + shift
        ) {
          this._data[index].angle = WheelMath.normaliseAngle(
            draggedSlice.startAngles[index] -
            (startAngleToNonDragged - angleDragRange) -
            shift
          )
          numberOfAnglesShifted += 1
        } else {
          shifting = false
          this._data[index].angle = draggedSlice.startAngles[index]
        }
      }
    }
  }
  getGeometry() {
    const centerX = Math.floor(this._canvas.width / 2)
    const centerY = Math.floor(this._canvas.height / 2)
    return {
      centerX: centerX,
      centerY: centerY,
      radius: Math.min(centerX, centerY) * this.radius
    }
  }
  renderNumberToTime(n, context) {
    const nStr = n.toString()
    const fontSize = 10
    const fontSizeLarge = 13

    let timestamp = nStr.length == 1 ? `0${nStr}` : `${nStr}`

    context.textBaseline = "middle"
    context.textAlign = "center"
    if (["16", "08", "24"].includes(timestamp)) {
      context.globalAlpha = 1
      context.font = `${fontSizeLarge}px 'Nunito Sans', sans-serif`
      let timestampExt =
        timestamp === "24" ? `00/${timestamp}` : `${timestamp}:00`
      context.fillText(timestampExt, 0, 0)
    } else {
      context.globalAlpha = 0.4
      context.font = `${fontSize}px 'Nunito Sans', sans-serif`
      context.fillText(timestamp, 0, 0)
    }
  }
  convertAngleToTime() {
    const visibleSegments = this.getVisibleSegments()
    // 48 30 minute intervals in 24h
    // 48 == Tau == 6.28318530718
    // 30 minutes == 0.1308996939
    const timeConst = 7.5 // deg
    let time = []
    for (let i = 0; i < this._data.length; i += 1) {
      if (this._data[i].collapsed) {
        time[i] = 0
      } else {
        for (let j = 0; j < visibleSegments.length; j += 1) {
          if (visibleSegments[j].index == i) {
            // just do from 0 to pi and offset 12 for negative
            // angle 0 - 6 units = 00:00
            let startTime = visibleSegments[j].angle
            let endTime = visibleSegments[j].arcSize
            this._data[i].computedTime = WheelUtils.angleToTimeConverter(
              startTime,
              endTime,
              timeconst
            )
          }
        }
      }
    }

    return time
  }

  mergeSegment() {
    let mergeSegment = null
    if (this.mergeStartSegment === null) {
      this.mergeStartSegment = this.targetSlice
    } else {
      mergeSegment = this.targetSlice

      if (!this.mergeValidator(mergeSegment)) {
        this.mergeStartSegment = mergeSegment
        return
      }

      let nextIndex = this.mergeStartSegment === this._data.length - 1 ? 0 : this.mergeStartSegment + 1
      if (this.mergeStartSegment > mergeSegment) {
        if (!((this.mergeStartSegment === this._data.length - 1) && mergeSegment === 0)) {

          this._data[this.mergeStartSegment].angle = this._data[mergeSegment].angle

        }
        if (this._data[this.mergeStartSegment].id)
          this._data[this.mergeStartSegment].inherit_id = this._data[this.mergeStartSegment].id
        this._data.splice(mergeSegment, 1)
      } else {
        if (this.mergeStartSegment === 0 && (mergeSegment === this._data.length - 1)) {

          this._data[this.mergeStartSegment].angle = this._data[mergeSegment].angle
        }
        if (this._data[this.mergeStartSegment].id)
          this._data[this.mergeStartSegment].inherit_id = this._data[this.mergeStartSegment].id
        this._data.splice(mergeSegment, 1)

      }


      //multisplit on or off
      this.mergeStartSegment = null

    }
  }

  mergeValidator(mergeSegment) {
    const validation = mergeSegment !== this.mergeStartSegment &&
      (
        mergeSegment === this.mergeStartSegment + 1 ||
        mergeSegment === this.mergeStartSegment - 1 ||
        (mergeSegment === Math.abs(this.mergeStartSegment - (this._data.length - 1)) && (this.mergeStartSegment === this._data.length - 1 || this.mergeStartSegment === 0))
      )
    console.log("MERGE SEGMENT", mergeSegment)
    console.log(this.mergeStartSegment, Math.abs(this.mergeStartSegment - (this._data.length - 1)))
    console.log(mergeSegment === this.mergeStartSegment + 1, mergeSegment === this.mergeStartSegment - 1, mergeSegment === Math.abs(this.mergeStartSegment - (this._data.length - 1)))
    console.log("validation", validation)
    return validation
  }

  splitSegment() {
    let targetSegment = this._data[this.targetSlice],
      targetAngle = targetSegment.angle,
      targetArcSize = targetSegment.arcSize

    // delete targetSegment.id

    if (WheelMath.roundTo(targetArcSize, 3) <= WheelMath.roundTo(timeconst, 3)) return

    let newAngle = targetAngle + targetArcSize / 2,
      newAngleCorrected =
      newAngle > Math.PI ? newAngle - 2 * Math.PI : newAngle,
      newColor = colorGenerator(24, this._data.length)

    let checkIsValid = WheelMath.roundTo(Math.abs(newAngleCorrected / timeconst), 3) % 1 === 0 ? true : false

    if (!checkIsValid) {
      newAngleCorrected = newAngleCorrected + Math.sign(newAngleCorrected) * timeconst / 2
    }

    let newSlice = {
      angle: newAngleCorrected,
      name: "",
      format: {
        name: "",
        color: newColor
      }
    }

    targetSegment.inherit_id = targetSegment.id ? targetSegment.id : targetSegment.inherit_id
    newSlice.inherit_id = targetSegment.id ? targetSegment.id : targetSegment.inherit_id


    this._data.splice(this.targetSlice + 1, 0, newSlice)

    this.targetSlice = null
  }

  updateEmiter() {
    this.vue.$emit("doughnut-wheel:update", this._data)
  }

  touchStart(event) {
    this.stopDefaultEvents(event)
    if (this._tool !== "move") return
    this.draggedSlice = this.getTarget(this.getMouseCoord(event))
    if (this.draggedSlice) {
      this.hoveredIndex = this.draggedSlice.index
    }
  }

  touchEnd(event) {
    this.stopDefaultEvents(event)
    if (
      this._tool === "split" &&
      this.isWithinCanvas(this.getMouseCoord(event))
    ) {
      this.targetSlice = this.getSegmentTarget(this.getMouseCoord(event))
      this.splitSegment()
    }

    if (
      this._tool === "merge" &&
      this.isWithinCanvas(this.getMouseCoord(event))
    ) {
      this.targetSlice = this.getSegmentTarget(this.getMouseCoord(event))
      this.mergeSegment()
    } else {
      this.mergeStartSegment = null
    }
    if (this._tool === "move") {
      this.draggedSlice = null
    }
    this.targetSlice = null
    this.draw()
    this.updateEmiter()
  }

  touchMove(event) {
    if (this._tool !== "move") return
    let dragLocation = this.getMouseCoord(event)

    if (!this.draggedSlice) {
      const hoveredTarget = this.getTarget(dragLocation)
      if (hoveredTarget) {
        this.hoveredIndex = hoveredTarget.index
        this.draw()
      } else if (this.hoveredIndex != -1) {
        this.hoveredIndex = -1
        this.draw()
      }
      return
    }

    const draggedSlice = this.draggedSlice

    let dx = dragLocation.x - draggedSlice.centerX
    let dy = dragLocation.y - draggedSlice.centerY

    //move by Tau/48 (30min) increments
    let newAngle = Math.atan2(dy, dx) - draggedSlice.angleOffset
    let stepBreakpoint = Math.abs(newAngle % timeconst)
    if (stepBreakpoint % timeconst != timeconst / 2) {
      newAngle =
        newAngle <= 0 ? newAngle + stepBreakpoint : newAngle - stepBreakpoint
      this.shiftSelectedAngle(newAngle)
      this.draw()
    }
  }
  getMouseCoord(evt) {
    const rect = this._canvas.getBoundingClientRect()
    if (evt.clientX) {
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
    } else {
      return {
        x: evt.targetTouches[0] ? evt.targetTouches[0].clientX - rect.left : evt.changedTouches[0].clientX - rect.left,
        y: evt.targetTouches[0] ? evt.targetTouches[0].clientY - rect.top : evt.changedTouches[0].clientY - rect.top
      }
    }
  }

  isWithinCanvas(mouse) {
    let geometry = this.getGeometry()
    let canvasBorderX = (geometry.centerX * 2 + 45) * this.radius,
      canvasBorderY = (geometry.centerY * 2 + 45) * this.radius

    return canvasBorderX >= mouse.x &&
      canvasBorderY >= mouse.y &&
      mouse.x >= 0 &&
      mouse.y >= 0 ?
      true :
      false
  }

  getSegmentTarget(target) {
    let geometry = this.getGeometry()
    let startAngles = []

    let dx = target.x - geometry.centerX
    let dy = target.y - geometry.centerY
    let trueGrabbedAngle = WheelMath.radiansToDegrees(Math.atan2(dy, dx))

    let segmentIndex = 0

    for (let i = 0; i < this._data.length; i += 1) {
      startAngles.push(WheelMath.radiansToDegrees(this._data[i].angle))

      let currentAngle = WheelMath.radiansToDegrees(this._data[i].angle)

      let nextIndex = i === this._data.length - 1 ? 0 : i + 1

      let nextAngle = WheelMath.radiansToDegrees(this._data[nextIndex].angle)
      let nextAngleCorrect =
        nextAngle < currentAngle ? nextAngle + 360 : nextAngle

      let trueGrabbedAngleCorrect =
        nextAngle < currentAngle && trueGrabbedAngle < nextAngle ?
        trueGrabbedAngle + 360 :
        trueGrabbedAngle

      // console.log("INDEX OPERATING", i)
      // console.log(parseInt(nextAngleCorrect))
      // console.log("NEXT ANGLE", nextAngleCorrect)
      // console.log("GOT ANGLE", parseInt(trueGrabbedAngleCorrect))
      if (
        rangeChecker({
          min: currentAngle,
          max: nextAngleCorrect,
          val: trueGrabbedAngleCorrect
        })
      ) {
        segmentIndex = i
      }
    }
    return segmentIndex
    // console.log(startAngles)
    // console.log(WheelMath.radiansToDegrees(trueGrabbedAngle))
    // console.log("SEGMENT INDEX ", segmentIndex)
    //
    //console.log(WheelMath.findClosestNumber(startAngles, trueGrabbedAngle))
  }

  stopDefaultEvents(event) {
    if(isTouch() && event.srcElement.tagName === "CANVAS") {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  getTarget(target) {
    let geometry = this.getGeometry()
    let startAngles = []
    let collapsed = []

    let closest = {
      index: -1,
      Range: 9999999,
      angle: null
    }

    for (let i = 0; i < this._data.length; i += 1) {
      startAngles.push(this._data[i].angle)
      collapsed.push(this._data[i].collapsed)

      if (this._data[i].collapsed) {
        continue
      }

      let dx = target.x - geometry.centerX
      let dy = target.y - geometry.centerY
      let trueGrabbedAngle = Math.atan2(dy, dx)

      let Range = Math.abs(
        WheelMath.minSigAngle(trueGrabbedAngle, this._data[i].angle)
      )

      if (Range < closest.Range) {
        closest.index = i
        closest.Range = Range
        closest.angle = trueGrabbedAngle
      }
    }

    if (closest.Range < 0.1) {
      return {
        index: closest.index,
        angleOffset: WheelMath.minSigAngle(
          closest.angle,
          startAngles[closest.index]
        ),
        centerX: geometry.centerX,
        centerY: geometry.centerY,
        startAngles: startAngles,
        collapsed: collapsed,
        angleDragRange: 0
      }
    } else {
      return null
    }
  }
}



export const isTouch = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

