export declare namespace IApi {
  export interface Request extends Filter {
    orderBy?: string;
    page?: number;
    search?: string;
    size?: number;
    sortOrder?: 'asc' | 'desc';
  }

  export interface Response<T> extends Meta {
    content: T[];
  }

  export interface Meta {
    total: number;
    skip: number;
    limit: number;
  }

  export interface Filter {
    [key: string]: boolean | null | number | string | undefined;
  }
}

export declare namespace IEntity {
  export interface Filter {
    [key: string]: boolean | null | number | string | undefined;
  }

  export interface Sort {
    direction?: 'asc' | 'desc';
    key: string;
  }

  export interface Params {
    filter?: Filter;
    page?: number;
    perPage?: number;
    sort?: Sort;
  }

  export interface Meta {
    current: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }
}
