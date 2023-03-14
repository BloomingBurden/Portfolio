const throttling = (func, ms = 300) => {
    let timer = false;

    return (...arg) => {
        if (timer === true) {
            return;
        } 
        timer = true;
        func(...arg);
        
        setTimeout(() => timer = false, ms);
    }
}

const debounce = (func, ms = 300) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, ms);
    };
}

export { debounce, throttling }