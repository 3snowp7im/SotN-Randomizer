(function() {
  let isNode
  try {
    isNode = !!module
  } catch (e) {}

  let sjcl

  if (isNode) {
    sjcl = require('sjcl')
  } else {
    sjcl = window.sjcl
  }

  function bufToHex(buf) {
    return Array.from(buf).map(function(byte) {
      return ('00' + byte.toString(16)).slice(-2)
    }).join('')
  }

  function numToHex(num, width) {
    const zeros = Array(width).fill('0').join('')
    const hex = (zeros + num.toString(16)).slice(-width)
    return '0x' + hex
  }

  function checked(data) {
    this.data = data
    this.writes = {}
  }

  checked.prototype.readByte = function readByte(address) {
    return this.data[address]
  }

  checked.prototype.readShort = function readShort(address) {
    return (this.readByte(address + 1) << 8) + (this.readByte(address + 0))
  }

  checked.prototype.writeByte = function writeByte(address, val) {
    this.data[address] = val
    this.writes[address] = val
  }

  checked.prototype.writeShort = function writeShort(address, val) {
    this.writeByte(address + 0, val & 0xff)
    this.writeByte(address + 1, val >>> 8)
  }

  checked.prototype.sum = function sum() {
    const state = JSON.stringify(this.writes)
    let hex = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(state))
    let zeros = 0
    while (hex.length > 3 && hex[zeros] === '0') {
      zeros++
    }
    return parseInt(hex.slice(zeros, zeros + 3), 16)
  }

  const exports = {
    bufToHex: bufToHex,
    numToHex: numToHex,
    checked: checked,
  }

  if (isNode) {
    module.exports = exports
  } else {
    window.sotnRandoUtils = Object.assign(
      window.sotnRandoUtils || {},
      exports,
    )
  }
})()
