import {Stack} from "./stack";
import {isLetter, isNumber, operPriority} from  './functions';

// Μετατρέπει το infix σε postfix
function infixToPostfix(exp) {

    if (exp.length === 0) {        
        console.log("INF=0");
        return '';
    }

    else {
        let result = "";
        let stack = new Stack();

        for (let i = 0; i < exp.length; i++) {
            let c = exp.charAt(i);

            // if letter or digit -> result
            if (isLetter(c) || isNumber(c)) { 
                result += c;
            
            // if ( -> stack
            } else if (c === '(') {
                stack.push(c);

            } else {
                // if ) + while: stack>0 & stack.peek.not( -> pop & result
                if (c === ')') {
                    while (!stack.isEmpty() && stack.peek() !== '(') {
                        result += stack.pop();
                    }
                    
                    // if ) + if: stack>0 & stack.peek.not( -> Invalid
                    if (!stack.isEmpty() && stack.peek() !== '(') {
                        return "Invalid Expression";

                    // if ) + if: stack=0 & stack.top.is( -> pop
                    } else {
                        stack.pop();
                    }
                
                // if not: letter/digit OR ) OR ( + while: stack>0 & c<=stack.top -> pop & result
                } else {
                    while (!stack.isEmpty() && operPriority(c) <= operPriority(stack.peek())) {
                        result += stack.pop();
                    }
                
                // if not: letter/digit OR ) OR ( + stack=0 OR c>stack.top -> stack
                    stack.push(c);
                }
            }
        }

        // infix completed + while: stack>0 -> pop & result
        while (!stack.isEmpty()) {
            result += stack.pop();
        }

        console.log('INFIX CALCULATED. POSTFIX= ', result);
        return result;
    }  
}

export default infixToPostfix;