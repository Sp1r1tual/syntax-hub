import { useNewsQueries } from "@/hooks/queries/useNewsQueries";

import { NewsContent } from "@/components/sections/community/NewsContent";
import { NewsContentSkeleton } from "@/components/ui/skeletons/NewsContentSkeleton";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

import { sortByDate } from "@/common/utils/sortByDate";

export const NewsPage = () => {
  const { data: newsList, isLoading, error, isError } = useNewsQueries();

  if (isLoading) {
    return <NewsContentSkeleton cards={3} />;
  }

  if (isError) {
    return (
      <ErrorWrapper
        error={error?.message || "Не вдалося завантажити список новин"}
      />
    );
  }

  if (!newsList) {
    return null;
  }

  const sortedNews = sortByDate(newsList, (news) => news.createdAt);

  return (
    <>
      {sortedNews.map((newsItem) => (
        <NewsContent key={newsItem.id} news={newsItem} />
      ))}
    </>
  );
};
