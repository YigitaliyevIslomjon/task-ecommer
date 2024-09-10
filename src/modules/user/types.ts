export declare namespace IApi {
  export namespace List {
    export type Response = User[];

    export interface Params {
      skip?: number;
      limit?: number;
      sortBy?: string;
      order?: string;
      q?: string;
      key?: string;
      value?: string | number;
    }
  }

  export namespace Single {
    export interface Response {}
  }

  export interface User {}
}

export declare namespace IEntity {
  export interface Meta {
    total: number;
    skip: number;
    limit: number;
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.User[];
    meta: IEntity.Meta;
  }

  export interface Single {
    item: IEntity.User;
  }

  export interface Delete {
    id: string;
  }
}

export declare namespace IForm {
  export interface Create {
    firstName: string;
    lastName: string;
  }

  export interface Update {
    firstName: string;
    lastName: string;
  }
}
