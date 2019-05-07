export class User {
    public name: string;
    public email: string;
    public phone: string;
    public uid: string;

    constructor(obj: DataObj) {
        this.name = obj && obj.name || null;
        this.uid = obj && obj.uid || null;
        this.email = obj && obj.email || null;
        this.phone = obj && obj.phone || null;
    }
}

interface DataObj {
    uid: string;
    email: string;
    name: string;
    phone: string;
}
