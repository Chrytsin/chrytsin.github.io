import React from 'react';
import {isLetter, isNumber, isOperator, isClosingParenthesis, isOpeningParenthesis, operPriority } from './functions';
import Column from './Column';
import {Button, Container, Divider, Grid, Header, Input, Message, Segment} from 'semantic-ui-react';

//infix: (a+b/c*(d+e)-f)
//postfix: abc/de+*+f-
 
class Visualization extends React.Component {
 
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state = {
            inf: this.props.exp,
            car: [],
            post: [],
            msg: '',
            tog: this.props.toggle,
            isPlaying: false,
            playerCancellationHandler: null
        }
        console.log('VISUALIZATIONNEW CONSTRUCTOR', this.props, this.state);
    }

    play = () => {        
            let cancellationHandler = setTimeout(() => {
                this.play();
            }, this.state.speed);
            this.setState({
                playerCancellationHandler:cancellationHandler,
                isPlaying: true
            });
    }

    pause = () => {
        clearTimeout(this.state.playerCancellationHandler);
        this.setState({playerCancellationHandler: null, isPlaying: false});
    }

    togglePausePlay = () => {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    stop = () => {
        if (this.state.playerCancellationHandler) {
            clearTimeout(this.state.playerCancellationHandler);
        }
        this.setState({isPlaying: false, playerCancellationHandler: null});
    }

    clear() {
        this.props.onFinished();
        this.setState({
            inf: [],
            car: [],
            post: [],
            msg: '',
            tog: false
        });
    }
 
    render() {        
        console.log('RENDER on', this.props, this.state);
            const items =this.state.inf.map((item) => <li>{item}</li>);
            return (
                <div className="ui container">
                    <Column
                        spec='Specifications: '
                        infix={items}
                        carry={this.state.car}
                        postfix={this.state.post}
                        message={this.state.msg}
                        toggle={this.state.tog}
                    />
                </div>
            );
    }
    /** Play-Pause and Stop-Reset buttons 
    <div className="ui grid">
        <div className="two wide column buttons">   
            <Button icon={this.state.isPlaying ? "pause" : "play"}
                content={this.state.isPlaying ? "Pause" : "Play"}
                color={"blue"}
                onClick={() => this.togglePausePlay()}
            />               
            <Button icon={this.state.isPlaying ? "stop" : "undo"}
                content={this.state.isPlaying ? "Stop" : "Reset"}
                color={this.state.isPlaying ? "red" : "orange"}
                onClick={() => this.stop()}
            />
        </div>
    </div>*/

    componentDidUpdate() {
        if (this.props.toggle !== this.state.tog) {
            console.log('COMPONENTDIDUPDATE', this.props, this.state);
            this.setState({
                inf: this.props.exp, 
                tog: this.props.toggle
            });
            setTimeout(this.processState, 1); 
        }
    }
 
    processState = () => { 
        console.log('PROCESSSTATE', this.props, this.state);

        let c = this.state.inf[0],
            infix = [...this.state.inf],
            carry = [...this.state.car],
            postfix = [...this.state.post];


/********** An to TOGGLE=0 ******************************************************/ 
        if (!this.props.toggle) {        
            console.log('INF=0 & CLEAR ALL');
            this.clear();
            infix=[];
            carry=[];
            postfix=[];        
        }
/********** TELOS an to TOGGLE=0 ******************************************************/ 


        //-----Gia kathe stoixeio tou infix
        if (this.state.inf.length > 0) {
            console.log('INF>0');
            this.setState({isPlaying: true});

/********** An to c einai gramma h arithmos *********************************************************/
            if (isLetter(c) || isNumber(c)) {
                console.log('C=LETTER/NUMBER');
                this.setState({msg: 'The "' + c + '" is letter/number and goes to Postfix.' });

                postfix.push(c);
                setTimeout(2500);
            }
/********** TELOS An to c einai gramma h arithmos *********************************************************/


/********** An to c einai anoixti parenthesi ( ******************************************************/
            else if (isOpeningParenthesis(c)) {
                console.log('C=(');
                this.setState({msg: 'The character is opening parenthesis "' + c + '", so we push it directly to Carry.' });

                carry.push(c);
                setTimeout(2500);
            }
/********** TELOS An to c einai anoixti parenthesi ( ************************************************/


/********** An to c einai kleisti parenthesi ) ******************************************************/
            else if (isClosingParenthesis(c)) {
                console.log("C=)");

                if (!carry.length>0) {
                    console.log('INVALID: OPEN PARENTHESIS ( NOT FOUND AND CARRY=0');
                    this.setState({msg: 'Invalid expression: Found a closing parenthesis, but not an opening one. Operation failed.' });  
                    
                    setTimeout(5000);
                    this.setState({tog: false});
                
                } else {
                    while (carry.length>0 && !isOpeningParenthesis(carry[carry.length-1])) {
                        console.log('WHILE NOT (, CARRY POP -> POSTFIX');
                        this.setState({msg: 'The closing parenthesis "' + c + '" pops first and all the other elements in Carry are pushed directly to Postfix, one by one.' });
                        
                        postfix.push(carry.pop());
                        setTimeout(2500);

                        this.setState({ car: carry });
                        this.setState({ post: postfix });
                        setTimeout(2500);
                    }
                    
                    if (!carry.length>0 || !isOpeningParenthesis(carry[carry.length-1])){                            
                        console.log('INVALID: OPENING PARENTHESIS ( NOT FOUND OR CARRY=0');
                        this.setState({msg: 'Invalid expression: Found a closing parenthesis, but not an opening one. Operation failed.' });  
                        
                        setTimeout(5000);
                        this.setState({tog: false});

                    } else {
                        console.log('CARRY PEEK = (');
                        this.setState({msg: 'Carry pops the opening parenthesis "' + c + '", since we do not need it anymore.' });  
                        
                        carry.pop();
                        setTimeout(2500);
                    }
                }
            }
/********** TELOS An to c einai kleisti parenthesi ) ************************************************/


/********** An to c einai Operator +,-,/,*,^ ******************************************************/           
            else if (isOperator(c)) {
                console.log('C=OPERATOR');

                while (carry.length>0 && operPriority(c) <= operPriority(carry[carry.length - 1])) {
                    console.log('WHILE PRIORITY C <= CARRY & CARRY NOT EMPTY, CARRY POP -> POSTFIX');
                    this.setState({msg: 'Compare the "' + c + '" with the "' + carry[carry.length - 1] + '" and the one with the higher priority goes to Postfix.' });

                    postfix.push(carry.pop());
                    setTimeout(2500);

                    this.setState({ car: carry });
                    this.setState({ post: postfix });
                    setTimeout(2500);
                }

                if (!carry.length>0) {
                    console.log('CARRY=0, SO C -> CARRY');
                    this.setState({msg: 'The Carry is empty, so the "' + c + '" goes directly to Carry.' });
                    
                } else if (operPriority(c) <= operPriority(carry[carry.length - 1])) {
                    console.log('PRIORITY C > CARRY, SO C -> CARRY');
                    this.setState({msg: 'The "' + c + '" has higher priority than the "' + carry[carry.length - 1] + '" but still goes to Carry.' });
                
                } else if (isOpeningParenthesis(carry[carry.length-1])) {
                    console.log('CARRY.PEEK = (, SO C GOES TO CARRY');
                    this.setState({ msg: 'The last element of Carry is "(", so "' + c + '" also goes to Carry.' });
                }

                carry.push(c);
                setTimeout(2500);
            }
/********** TELOS an to c einai Operator +,-,/,*,^ ******************************************************/            

            infix.shift();   
            this.setState({ 
                inf: infix,
                car: carry,
                post: postfix
            });
            setTimeout(this.processState, 2500);
        }
/********** TELOS an to INF>0 ******************************************************/ 


/********** An to INF=0 ******************************************************/ 
        else {
            console.log('INF=0');
            
            if (carry.length > 0) {
                console.log('CARRY NOT 0');
                this.setState({ msg: 'Each element remained in Carry, now goes to Postfix.' });
    
                postfix.push(carry.pop());
                setTimeout(2500);
    
                this.setState({ car: carry });
                this.setState({ post: postfix });
                setTimeout(this.processState, 2500);
            
            } else if (postfix.length > 0) {
                console.log('POST>0, BUT INF=0 & CARRY=0');
                this.setState({
                    msg: 'The process completed successfully.',
                    isPlaying: false
                });
                
                setTimeout(10000);
                //this.setState({tog: false});
            
            } else {
                console.log('POST=0, BUT ALSO INF=0 & CARRY=0');
                this.setState({msg: "Please enter an infix expression first."});
            }
        }
/********** TELOS an to INF=0 ******************************************************/


    }
}
 
export default Visualization;