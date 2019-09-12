class MockDrawingContext {
  methodCalls = {}

  constructor() {
    this.methodCalls = {}
    const methodList = [
      'addInteractions',
      'addInteractionsWithoutModify',
      'getStyle',
      'remakeInteractions',
      'removeInteractions',
      'removeListeners',
      'setDrawInteraction',
      'setEvent',
      'updateBufferFeature',
      'updateFeature',
      'removeFeature',
    ]
    methodList.forEach(functionName => {
      this.methodCalls[functionName] = []
      this[functionName] = function() {
        this.methodCalls[functionName].push(arguments)
      }
    })
    const callCounter = this.getStyle.bind(this)
    this.getStyle = () => {
      callCounter()
      return []
    }
  }

  getMethodCalls() {
    return this.methodCalls
  }

  circleRadiusToMeters(radius: number): number {
    return radius
  }
}

export default MockDrawingContext
