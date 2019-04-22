export class Resource {
    get link(): string {
        return ''
    }

    public toJSON(): any {
        return {
            ...Object.assign({}, this),
            ...{
                link: this.link,
            },
        }
    }
}