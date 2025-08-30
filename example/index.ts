import { type Mutable, mutable } from "../src/index";

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

console.log("Original example:", example);
// Inline example usage
(example as Mutable<Example>).a = 2;

// Using Mutable<T> to get a fully writable type
const writableExample = example as Mutable<Example>;

writableExample.a = 2;
writableExample.b = "world";
// writableExample.nested.c = false; // Error: Cannot assign to 'c' because it remains a read-only property.

console.log("Example after mutation:", example);


// Using mutable(this) inside a class to get a writable view
class MyClass {
	readonly x: number = 5; // Always apply type to literal values
	readonly name: string = "Alice"; // Always apply type to literal values

	update() {
		(this as Mutable<this>).x = 20;

		// or using mutable helper function
		mutable(this).name = "Bob";
	}
}

const myInstance = new MyClass();
console.log("Before update:", myInstance);
myInstance.update();
console.log("After update:", myInstance);
