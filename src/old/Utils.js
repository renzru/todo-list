function newElement(tag, ...classes) {
    const element = document.createElement(tag);
    classes.forEach(e => {
        element.classList.add(e);
    })

    return element;
}

export {
    newElement
};