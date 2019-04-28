export class XMLElement {

    readonly data: any;

    constructor(element: any) {
        this.data = element;
    }

    getAttribute(name: string): string | undefined {
        if(!this.data.$) {
            return undefined;
        }
        return this.data.$[name];
    }

    getText(field?: string): string | undefined {
        if(field === undefined) {
            return XMLElement.tryGetTextArray(this.data);
        }
        return XMLElement.tryGetTextArray(this.data[field]);
    }

    private static tryGetTextArray(arr?: any): string | undefined {
        if(arr instanceof Array && arr.length > 0) {
            return this.tryGetTextObject(arr[0]);
        }
        return XMLElement.tryGetTextObject(arr);
    }

    private static tryGetTextObject(obj?: any): string | undefined {
        if(typeof obj === 'object') {
            return obj._;
        }
        return XMLElement.tryGetTextString(obj);
    }

    private static tryGetTextString(str?: any): string | undefined {
        if(typeof str === 'string') {
            return str;
        }
        return undefined;
    }

    hasAttribute(attribute: string): boolean {
        if(!this.data.$) {
            return false;
        }
        return this.data.$[attribute] !== undefined;
    }

    hasAttributes(attributes: string[]): boolean {
        if(!this.data.$) {
            return false;
        }
        for(const attr of attributes) {
            if(this.data.$[attr] === undefined) {
                return false;
            }
        }
        return true;
    }

    hasChild(child: string): boolean {
        return typeof this.data[child] === 'object'
    }

    hasChildren(children: string[]): boolean {
        for(const child of children) {
            if(typeof this.data[child] !== 'object') {
                return false;
            }
        }
        return true;
    }

    getChild(name: string): XMLElement | undefined {
        const value = this.data[name];
        if(!value) {
            return undefined;
        }
        if(value instanceof  Array) {
            if(value.length > 0) {
                return new XMLElement(value[0]);
            }
            return undefined;
        }
        return new XMLElement(value);
    }

    getList(name: string): XMLElement[] {
        const value = this.data[name];
        if(!(value instanceof Array)) {
            return [];
        }
        return value.map((v) => new XMLElement(v));
    }
}