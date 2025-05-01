export interface SignupRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface SignupResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  