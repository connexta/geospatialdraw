const { testHook } = require('./lib/react-tests')
const { expect } = require('chai')
const useNumberInput = require('../distribution/coordinates/react-hooks/number')
  .default

describe('useNumberInput', () => {
  it('no constraints', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(100)
    })
    const [value, text, setText, formattedText] = instance
    expect(value).to.equal(100)
    expect(text).to.equal('100')
    expect(setText).to.be.instanceOf(Function)
    expect(formattedText).to.equal('100')
  })
  it('decimal places obeyed', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(100, { decimalPlaces: 3 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(100)
    expect(text).to.equal('100.000')
    expect(formattedText).to.equal('100.000')
  })
  it('decimal places exceeded', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(100.123456, { decimalPlaces: 3 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(100.123)
    expect(text).to.equal('100.123')
    expect(formattedText).to.equal('100.123')
  })
  it('min value obeyed', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(100, { minValue: 3 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(100)
    expect(text).to.equal('100')
    expect(formattedText).to.equal('100')
  })
  it('min value disobeyed', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(-100, { minValue: 3 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(3)
    expect(text).to.equal('3')
    expect(formattedText).to.equal('3')
  })
  it('max value obeyed', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(100, { maxValue: 300 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(100)
    expect(text).to.equal('100')
    expect(formattedText).to.equal('100')
  })
  it('max value disobeyed', () => {
    let instance
    testHook(() => {
      instance = useNumberInput(500, { maxValue: 300 })
    })
    const [value, text, , formattedText] = instance
    expect(value).to.equal(300)
    expect(text).to.equal('300')
    expect(formattedText).to.equal('300')
  })
  describe('setText', () => {
    let instance
    beforeEach(() => {
      testHook(() => {
        instance = useNumberInput(0, {
          minValue: -5,
          maxValue: 5,
          decimalPlaces: 3,
        })
      })
    })
    it('updates value', () => {
      instance[2]('3')
      const [value, text, setText, formattedText] = instance
      expect(value).to.equal(3)
      expect(text).to.equal('3')
      expect(formattedText).to.equal('3.000')
    })
    it('applies min boundary', () => {
      instance[2]('-300')
      const [value, text, , formattedText] = instance
      expect(value).to.equal(-5)
      expect(text).to.equal('-300')
      expect(formattedText).to.equal('-5.000')
    })
    it('applies max boundary', () => {
      instance[2]('300')
      const [value, text, , formattedText] = instance
      expect(value).to.equal(5)
      expect(text).to.equal('300')
      expect(formattedText).to.equal('5.000')
    })
    it('rejects non-numeric input', () => {
      instance[2]('apple')
      const [value, text, , formattedText] = instance
      expect(value).to.equal(null)
      expect(text).to.equal('apple')
      expect(formattedText).to.equal('')
    })
    it('accepts numeric input', () => {
      instance[2]('1')
      const [value, text, , formattedText] = instance
      expect(value).to.equal(1)
      expect(text).to.equal('1')
      expect(formattedText).to.equal('1.000')
    })
  })
})
