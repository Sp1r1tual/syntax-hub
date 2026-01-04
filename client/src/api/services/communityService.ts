import { INewsResponse } from "@/common/types";

import { $apiMain } from "@/api";

export class CommunityService {
  static getNews() {
    return $apiMain.get<INewsResponse[]>("/community/news");
  }

  static toggleLike(newsId: string) {
    return $apiMain.patch<INewsResponse>(`/community/news/${newsId}`);
  }
}
