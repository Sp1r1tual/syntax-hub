import { useEffect } from "react";

import { useNewsStore } from "@/store/news/useNewsStore";

import { NewsContent } from "@/components/ui/sections/community/NewsContent";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

import { sortByDate } from "@/common/utils/sortByDate";

export const NewsPage = () => {
  const { error, fetchNews, isLoadingNews, newsList } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (isLoadingNews) {
    return <div style={{ minHeight: "100dvh" }} />;
  }

  if (error) return <ErrorWrapper error={error} />;

  const sortedNews = sortByDate(newsList, (news) => news.createdAt);

  return (
    <>
      {sortedNews.map((newsItem) => (
        <NewsContent key={newsItem.id} news={newsItem} />
      ))}
    </>
  );
};
