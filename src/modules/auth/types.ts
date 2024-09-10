export declare namespace IContext {
  export interface Props {}
  export interface Value {
    methods: {
      setIsAuthenticated: (value: boolean) => void;
      setIsFetched: (value: boolean) => void;
      setProfile: (profile: IEntity.Profile) => void;
      setTokens: (tokens: IEntity.Tokens) => void;
    };
    state: State;
  }

  export interface State {
    isAuthenticated: boolean;
    isFetched: boolean;
    profile: IEntity.Profile;
    tokens: IEntity.Tokens;
  }
}

export declare namespace IApi {
  export namespace Profile {
    export interface Request {}

    export interface Response {}
  }
}

export declare namespace IEntity {
  export interface Profile {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    image: string;
    accessToken: string;
    refreshToken: string;
  }

  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }

  export interface Login {}
}

export declare namespace IQuery {
  export interface Login {
    item: IEntity.Login;
  }
}

export declare namespace IForm {
  export interface Login {
    username: string;
    password: string;
  }
}
