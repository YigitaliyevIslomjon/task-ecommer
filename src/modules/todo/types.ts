export declare namespace IApi {
  export namespace List {
    export type Response = Todo[];

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

  export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }
}

export declare namespace IEntity {
  export interface Meta {
    total: number;
    skip: number;
    limit: number;
  }

  export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Todo[];
    meta: IEntity.Meta;
  }

  export interface Single {
    item: IEntity.Todo;
  }

  export interface Delete {
    id: string;
  }
}

export declare namespace IForm {
  export interface Create {
    todo: string;
  }

  export interface Update {
    todo: string;
  }
}
