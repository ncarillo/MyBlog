export class Post {
    
    public image: string;
    public loveIts: number;
    public created_at: number;
    
    constructor(public title: string, public content: string) {
        this.created_at = new Date().getTime();
        this.loveIts = 0;
    }
}

