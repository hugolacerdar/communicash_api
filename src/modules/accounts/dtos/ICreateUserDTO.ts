interface ICreateUserDTO {
  full_name: string;
  password: string;
  email: string;
  id?: string;
  community_id?: string;
  birth_date: Date;
}

export { ICreateUserDTO };
