export type item = {
    id: number;
    body: string;
    author: string;
    dialogue?: boolean;
    private?: boolean;
    tags?: string[]
    url?: string;
    favorites_count?: number;
    upvotes_count?: number;
    downvotes_count?: number;
    author_permalink?: string;
    source?: string;
}
    
