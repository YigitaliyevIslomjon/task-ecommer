export declare namespace IApi {
  export namespace List {
    export type Response = Post[];

    export interface Params {
      skip?: number;
      limit?: number;
      sortBy?: string;
      order?: string;
      q?: string;
    }
  }

  export namespace Single {
    export interface Response {}
  }

  export interface Post {
    id: string;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  }
}

export declare namespace IEntity {

  export interface Meta {
    total: number;
    skip: number;
    limit: number;
  }

  export interface Post {
    id: string;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Post[];
    meta: IEntity.Meta;
  }

  export interface Single {
    item: IEntity.Post;
  }

  export interface Delete {
    id: string;
  }
}

export declare namespace IForm {
  export interface Create {
    body: string;
    title: string;
  }

  export interface Update {
    body: string;
    title: string;
  }
}
