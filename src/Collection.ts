export class Collection<T> {
    items: T[] = [];
    link = (): string => '';

    constructor(items: T[] = [], link = () => '') {
        this.items = items;
        this.link = link;
    }

    public toJSON() {
        return {
            items: this.items,
            link: this.link(),
        };
    }
}