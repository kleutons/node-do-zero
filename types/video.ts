export type TypeVideo = {
    id?: string;
    title: string;
    description: string;
    duration: number;
}

export interface idRouteParams {
    id: string;
  }

export interface searchQueryParams {
    search?: string;
  }