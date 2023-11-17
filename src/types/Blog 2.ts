
export interface TextBlock {
  type: 'text' | 'sectionTitle';
  content: string;
}
  
export interface ImageBlock {
  type: 'image' | 'video';
  file: File | null;
}
  
export type ContentBlock = TextBlock | ImageBlock;

export interface Blog {
  id: number | null;
  profilePic: File | null;
  firstName: string;
  lastName: string;
  title: string;
  mainImage: File | null;
  profile_pic_preview: string;
  main_image_preview: string;
  body: ContentBlock[];
  // attributes: any | null;
}
