interface ICreateCommunityDTO {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  creator_id: string;
}

export { ICreateCommunityDTO };
