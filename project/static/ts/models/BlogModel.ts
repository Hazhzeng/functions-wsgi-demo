export interface IBlogPreview {
  title: string,
  tags: string[],
  text: string,
  update: Date,
};

export interface IBlogFetch extends IBlogPreview {
  id: number
}

export interface IBlogPush extends IBlogPreview {
  isAmended: boolean
}