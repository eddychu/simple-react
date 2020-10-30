const tokenizer = (jsx) => {
    let current = 0;
    let tokens = [];
    while(current < jsx.length) {
        let tokenized = false;
        
    }
}


const tokenizeChar = (type, value, input, current) => {
    return value === input[current]? {length: 1, type, value} : null
}

const tokenizeBracketOpen = (input, current) => {
    tokenizeChar('TAG_OPEN', '<', input, current);
}

const tokenizeBracketClose = (input, current) => {
    tokenizeChar("TAG_CLOSE", ">", input, current);
}

const tokenizePattern = 