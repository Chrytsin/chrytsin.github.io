export function arrEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function arrDiff(a, b) {
    if (a.length > b.length)
        while (b.length < a.length)
            b.push('');
    if (a.length < b.length)
        while (b.length > a.length)
            a.push('');

    let diff = [];
    for (let i = 0; i < a.length; i++) {
        let same = a[i] === b[i];
        diff[i] = {prevValue: a[i], value: same ? a[i] : b[i], same, index: i}
    }
    return diff;
}

export function objDiff(a,b) {
    let diff = {};
    let keys = Object.keys(a);
    for (let i = 0; i < keys.length; i++) {
        let same = a[keys[i]] === b[keys[i]];
        diff[keys[i]] = {prevValue: a[keys[i]], value: same ? a[keys[i]] : b[keys[i]], same, key: keys[i]}
    }
    return diff;
}


export function isLetter(c) {
    return (/[A-Za-z]/i.test(c));
}

export function isNumber(c) {
    return (/[0-9]/i.test(c));
}

export function isOperator(c) {
    return ["+","-","*","/","^"].includes(c);
}

export function isOpeningParenthesis(c) {
    return ["("].includes(c);
}

export function isClosingParenthesis(c) {
    return [")"].includes(c);
}

export function operPriority(c) {
    switch (c) {            
        default:
            return -1;

        case '+':
        case '-':
            return 1;

        case '*':
        case '/':
            return 2;

        case '^':
            return 3;
    }
}

/*
export function calculate(exp) {
    let stack = [];
            
    for(let i=0; i < exp.length; i++) { 
        let c = exp.charAt(i); 
        
        if (exp.length === 0){
            break;
        }
        
        else if (isLetter(exp)) {
            stack.push("Characters can not be calculated.");
            break;
        }
 
        else if (isNumber(c)) {
            stack.push(c - '0');         
        } 
        
        else { 
            let val1 = stack.pop(); 
            let val2 = stack.pop(); 
            
            switch(c) { 
                case '+': 
                    stack.push(val2 + val1); 
                break; 
                
                case '-': 
                    stack.push(val2 - val1); 
                break; 
                
                case '/': 
                    stack.push(val2 / val1); 
                break; 
                
                case '*': 
                    stack.push(val2 * val1); 
                break;

                case '^': 
                    let count = val2;
                    for (let i = 1; i < val1; i++) {
                        count = count * val2;
                    }
                    stack.push(count); 
                break; 
            } 
        } 
    }
    return stack.pop();
}
*/