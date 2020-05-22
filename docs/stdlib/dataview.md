---
description: An interface for working with a raw binary buffer.
---

# DataView

An interface for working with a raw binary buffer.

The DataView API is exactly as in JavaScript \([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)\).

## Constructor

* ```ts
  new DataView(buffer: ArrayBuffer, byteOffset?: i32, byteLength?: i32)
  ```
  Constructs a new DataView on the specified buffer and region.

## Instance members

### Fields

* ```ts
  readonly DataView#buffer: ArrayBuffer
  ```
  The backing buffer.

* ```ts
  readonly DataView#byteLength: i32
  ```
  The length of this view from the start of its buffer.

* ```ts
  readonly DataView#byteOffset: i32
  ```
  The offset of this view from the start of its buffer.

### Methods

* ```ts
  function DataView#getFloat32(byteOffset: i32, littleEndian?: bool): f32
  ```
  Gets the 32-bit float value at the specified offset from the start of the view.

* ```ts
  function DataView#getFloat64(byteOffset: i32, littleEndian?: bool): f64
  ```
  Gets the 64-bit float value at the specified offset from the start of the view.

* ```ts
  function DataView#getInt8(byteOffset: i32): i8
  ```
  Gets the signed 8-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getInt16(byteOffset: i32, littleEndian?: bool): i16
  ```
  Gets the signed 16-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getInt32(byteOffset: i32, littleEndian?: bool): i32
  ```
  Gets the signed 32-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getInt64(byteOffset: i32, littleEndian?: bool): i64
  ```
  Gets the signed 64-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getUint8(byteOffset: i32, littleEndian?: bool): u8
  ```
  Gets the unsigned 8-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getUint16(byteOffset: i32, littleEndian?: bool): u16
  ```
  Gets the unsigned 16-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getUint32(byteOffset: i32, littleEndian?: bool): u32
  ```
  Gets the unsigned 32-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#getUint64(byteOffset: i32, littleEndian?: bool): u64
  ```
  Gets the unsigned 64-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setFloat32(byteOffset: i32, value: f32, littleEndian?: bool): void
  ```
  Sets the 32-bit float value at the specified offset from the start of the view.

* ```ts
  function DataView#setFloat64(byteOffset: i32, value: f64, littleEndian?: bool): void
  ```
  Sets the 64-bit float value at the specified offset from the start of the view.

* ```ts
  function DataView#setInt8(byteOffset: i32, value: i8): void
  ```
  Sets the signed 8-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setInt16(byteOffset: i32, value: i16, littleEndian?: bool): void
  ```
  Sets the signed 16-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setInt32(byteOffset: i32, value: i32, littleEndian?: bool): void
  ```
  Sets the signed 32-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setInt64(byteOffset: i32, value: i64, littleEndian?: bool): void
  ```
  Sets the signed 64-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setUint8(byteOffset: i32, value: u8, littleEndian?: bool): void
  ```
  Sets the unsigned 8-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setUint16(byteOffset: i32, value: u16, littleEndian?: bool): void
  ```
  Sets the unsigned 16-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setUint32(byteOffset: i32, value: u32, littleEndian?: bool): void
  ```
  Sets the unsigned 32-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#setUint64(byteOffset: i32, value: u64, littleEndian?: bool): void
  ```
  Sets the unsigned 64-bit integer value at the specified offset from the start of the view.

* ```ts
  function DataView#toString(): string
  ```
  Returns a string representation of this object.

Endianness defaults to `littleEndian = false`.
