export class Post {
    
    private image: string;
    private nbLike: number;
    private nbUnLike: number;
    
    constructor(public title: string, public text: string) {
        
    }
}