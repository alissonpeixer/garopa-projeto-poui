export interface LoginPage {
  login:string;
  password:string
}



export interface AuthDto {
  items: {
    token: string;
    refresh_token: string;
  };
}
