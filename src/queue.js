export class Queue {
    items = [];

    constructor(items = []) {
        if (typeof items === "string") {
            this.items = items.split('');
        } else if (Array.isArray(items))
            this.items = items;
        else
            throw new Error("Error unrecognized type");
    }

    push(elem) {
        this.items.push(elem);
    }

    pop() {
        if (this.items.length === 0)
            return "Underflow";
        return this.items.shift();
    }

    peek(index = null) {
        if (index === null)
            return this.items[0];
        return this.items[index];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    get(index) {
        return this.items[index];
    }

    length() {
        return this.items.length
    }

    clone() {
        return new Queue([...this.items]);
    }
}
