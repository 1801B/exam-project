import { RouteComponentProps } from "react-router-dom";

export interface Props extends RouteComponentProps {}

export interface AntdForm {
  [key: string]: any;
}

export interface User {
  user_name: string;
  user_pwd: string;
  identity_id: string | number;
}

export interface UpUser extends User {
  user_id: string | number;
}

export interface IdentityEdit {
  params: {
    identity_text: string;
  };
}

export interface AuthorityApiEdit {
  params: {
    api_authority_method: string;
    api_authority_url: string;
    api_authority_text: string;
  };
}

export interface OnsetIdentityApi {
  api_authority_id: string;
  identity_id: string;
}

export interface OnsetIdentityView {
  identity_id: string;
  view_authority_id: string;
}

export interface AuthorityApiView {
  view_authority_text: string;
  view_id: string;
}

export interface UserViewListId {
  user_id: string;
}
