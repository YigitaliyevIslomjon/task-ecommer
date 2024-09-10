export declare namespace IContext {
  export interface Props {}
  export interface Value {
    methods: {
      setIsAuthenticated: (value: boolean) => void;
      setIsFetched: (value: boolean) => void;
      setProfile: (profile: IEntity.Profile) => void;
      setTheme: (theme: 'dark' | 'light') => void;
      setTokens: (tokens: IEntity.Tokens) => void;
    };
    state: State;
  }

  export interface State {
    isAuthenticated: boolean;
    isFetched: boolean;
    profile: IEntity.Profile;
    theme: IEntity.Theme;
    tokens: IEntity.Tokens;
  }
}

export declare namespace IApi {
  export namespace Profile {
    export interface Request {}

    export interface Response {}
  }

  export interface Role {
    created_at: number;
    description: string;
    id: string;
    modified_at: number;
    name: string;
    permissions: string[];
  }
}

export declare namespace IEntity {
  export interface Profile {
    id: string;
  }

  export type Theme = 'dark' | 'light';

  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }

  export interface Role {
    id: string;
    name: string;
    permissions: string[];
  }

  export interface ClientInfo {
    url: string;
  }

  export interface Account {
    success: boolean;
    tokens: Tokens;
    profile: Profile;
  }

  export interface Login {
    multipleOrg: boolean;
    accounts: Account[];
  }

  export interface Select {
    code: string;
    name: string;
  }

  export interface AdditionalRole {
    code: string;
    name: string;
    roleGroup: string;
  }
}

export declare namespace IQuery {
  export interface Login {
    item: IEntity.Login;
  }

  export interface CanActions {
    items: {
      [key: string]: IEntity.Select;
    };
  }

  export interface CheckExecutor {
    isMainExecutor: boolean;
    isAdditionalExecutor: boolean;
  }
}

export declare namespace IMutation {
  export interface ClientInfo {}
}

export declare namespace IForm {
  export interface Login {
    username: string;
    password: string;
  }
}
