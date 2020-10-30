const createElement = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.map(item => 
                typeof item === "object" ? item : createTextNode(item)   
            )
        }
    }
}

const createTextNode = (value) => {
    return {
        type: "TEXT",
        props: {
            nodeValue: value,
            children: []
        }
    }
}

const isEvent = (name) => name.startsWith("on");

const createDom = (element) => {
    const {type, props} = element;
    const {children} = props;
    const isDomElement = typeof type === "string";
    let dom;
    if(isDomElement) {
        const isTextElement = type === "TEXT";
        dom = isTextElement
            ? document.createTextNode(props.nodeValue)
            : document.createElement(type);
        Object.keys(props)
            .filter(isEvent)
            .forEach(name => {
                const eventType = name.toLowerCase().substring(2);
                dom.addEventListener(eventType, props[name]);
            })
        children.map(child => dom.appendChild(createDom(child)))
        return dom;
    } else {
        let element = type(props);
        return createDom(element)
    }
}

const render = (element, container) => {
    let dom = createDom(element);
    container.appendChild(dom);
}



const React = {
    createElement,
    stateArr: [],
    currentStateIndex: 0,

    useState(initialValue) {
        if(this.currentStateIndex === this.stateArr.length) { 
            const statePair = {
                value: initialValue,
                setState(newValue) {
                    statePair.value = newValue;
                    React.currentStateIndex = 0;
                    clean();
                    render(<App/>, document.getElementById("root"));
                }
            }
            this.stateArr.push(statePair);
        }
        const currentStatePair = this.stateArr[this.currentStateIndex]
        this.currentStateIndex += 1;
        return [currentStatePair.value, currentStatePair.setState];
    }
}

const Counter = () => {
    const [state, setState] = React.useState(0);
    const handleClick = (e) => {
        setState(state + 1);
    }
    return <h1 onClick={handleClick}>{state}</h1>
}
const App = () => {
    
    return <div><Counter /></div>
}

const clean = ()  => {
    document.getElementById("root").innerHTML = "";
}

render(<App/>, document.getElementById("root"));