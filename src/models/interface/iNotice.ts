export interface INotice {
  // interface 네이밍 할때 앞에 I붙이면 좋다
  noticeIdx: number;
  title: string;
  content: string;
  author: string;
  createdDate: string;
}

export interface IPostResponse {
  result: string;
}

export interface INoticeDetail extends INotice {
  content: string;
  fileExt: string | null;
  fileName: string | null;
  fileSze: number;
  logicalPath: string | null;
  phsycalPath: string | null;
}

export interface IDetailResponse {
  detail: INoticeDetail;
}

export interface INoticeListResponse {
  noticeCnt: number;
  notice: INotice[];
}
