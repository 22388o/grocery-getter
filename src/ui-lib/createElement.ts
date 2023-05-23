interface CreateElementsParams {
    type: string;
    attr?: {readonly [key: string]: string}[];
}

export const createElements = ({type, attr}:CreateElementsParams):HTMLElement => {

    if (!type || type === '') {
        throw new Error('type is required');
    }
    const element = document.createElement(type);

    if (attr) {
        attr.forEach((attribute) => {
            if (attribute.name === 'class') {
                element.classList.add(attribute.value);
            }
            element.setAttribute(attribute.name, attribute.value);
        });
    }
    return element;
};