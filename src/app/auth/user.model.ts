export class User {
    public name: string;
    public email: string;
    public phone: string;
    public location: string;
    public avatar: string;
    public uid: string;
    public description: string;
    public gender: string;
    public languages: string;

    constructor(obj: DataObj) {
        this.name = obj && obj.name || null;
        this.uid = obj && obj.uid || null;
        this.email = obj && obj.email || null;
        this.phone = obj && obj.phone || null;
        this.location = obj && obj.location || null;
        this.avatar = obj && obj.avatar || null;
    }
}

interface DataObj {
    uid: string;
    email: string;
    name: string;
    phone: string;
    location: string;
    avatar: string;
}
