[![npm version](https://img.shields.io/npm/v/remutable-ts.svg)](https://www.npmjs.com/package/remutable-ts)

# remutable-ts

remutable-ts provides a simple and **type-safe** way to remove readonly
modifiers from types in TypeScript.

This is useful when you:

- Need to **mutate objects** that are defined as **readonly** (e.g. libraries,
  framework types).
- Prefer solutions with **no runtime** overhead.

### ⚡ Why not just remove readonly?

Keeping `readonly` by default is safer as it prevents unintended mutations.
`remutable-ts` allows controlled mutation, even in external modules where
needed, giving you flexibility without sacrificing type safety.

## Installation

For **usage as a devDependency with zero runtime**:

```bash
npm install --save-dev remutable-ts
```

## Usage

### 1. Make any type mutable

```typescript
type Example = {
	readonly a: number;
	readonly b: string;
	readonly nested: {
		readonly c: boolean; // Note nested properties will remain readonly
	};
};

const example: Example = {
	a: 1,
	b: "hello",
	nested: {
		c: true
	},
};

// Inline example usage
(example as Mutable<Example>).a = 2; ✅ allowed now

// Using Mutable<T> to get a fully writable type
const writableExample = example as Mutable<Example>;

writableExample.a = 2; ✅ allowed now
writableExample.b = "world"; ✅ allowed now
// writableExample.nested.c = false; // Error: Cannot assign to 'c' because it remains a read-only property.

console.log("Original example:", example);
console.log("Writable example before mutation:", writableExample);
```

### 2. Using inside a class to get a writable view

```typescript
// 
class MyClass {
	readonly x: number = 5; // Always apply type to literal values
	readonly name: string = "Alice"; // Always apply type to literal values

	update() {
		(this as Mutable<this>).x = 20;  ✅ allowed now

		// or using mutable helper function
		mutable(this).name = "Bob";  ✅ allowed now
	}
}

const myInstance = new MyClass();
console.log("Before update:", myInstance);
myInstance.update();
console.log("After update:", myInstance);
```

#### ⚠️ Gotcha: literal types

When you initialize a readonly property with a literal value (e.g.,
`readonly score = 0`), TypeScript infers a literal type (`0`), not the broader
type (`number`). This can cause assignment errors when using `Mutable<T>` or
`mutable<T>()`, since you can't assign, say, `1` to a property of type `0`.

**Recommendation:** Explicitly type such properties to avoid this issue:

```typescript
const score: Mutable<{ readonly score: number }> = { score: 0 }; // ✅ Use an explicit type
```

This ensures `Mutable<T>` and `mutable<T>()` work as expected for assignments.

## License

MIT
