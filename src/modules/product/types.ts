export declare namespace IApi {
  export namespace List {
    export type Response = Product[];

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

  export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
  }
}

export declare namespace IEntity {
  export interface Meta {
    total: number;
    skip: number;
    limit: number;
  }

  export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Product[];
    meta: IEntity.Meta;
  }

  export interface Single {
    item: IEntity.Product;
  }

  export interface Delete {
    id: string;
  }
}

export declare namespace IForm {
  export interface Create {
    title: string;
    category: string;
  }

  export interface Update {
    category: string;
    title: string;
  }
}
