import {Stack} from "./stack";
import {Queue} from "./queue";

export class History {
    step = 0;
    expression;
    result;
    steps = [];

    constructor(expression) {
        this.expression = expression;
        this.add("Αρχή", new Queue(expression), new Stack(), new Stack());
    }

    add(message, infix, postfix, carry) {
        this.steps.push({
            step: ++this.step,
            message,
            infix: infix.clone(),
            postfix: postfix.clone(),
            carry: carry.clone()
        });
        this.result = postfix.items.join('');
    }

    get() {
        return this.steps;
    }

    length() {
        return this.step;
    }

    getMessagesTillStep(step) {
        let arr = [];
        for (let i = step; i >= 0; i--) {
            arr.push(this.steps[i].message)
        }
        return arr;
    }

    getResultedPostfix() {
        return this.result;
    }
}
