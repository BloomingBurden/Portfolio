const debounce = (func, ms) => {
    let timer = false;

    return function (...arg) {
        if (timer === true) {
            return;
        } 
        timer = true;
        func(arg);
        
        setTimeout(() => timer = false, ms);
    }
}

export { debounce }