export interface Comment {
    id: string;
    created: string;
    text: string;
    user: {
      id: string;
      name: string;
      displayName: string;
    }
}