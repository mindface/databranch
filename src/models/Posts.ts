export interface Posts {
  id: number;
  title: string;
  body: string;
  sub: string;
  accout?: string;
}

export interface SendPosts {
  title: string;
  body: string;
  sub: string;
  accout?: string;
}

export interface ItemPost {
  title: string;
  body: string;
  sub: string;
  accout?: string;
}
