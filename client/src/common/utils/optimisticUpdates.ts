import { AxiosResponse } from "axios";

import {
  INewsResponse,
  ICommentData,
  IQuestionDetail,
  QuestionStatusType,
  IMarkQuestionResponse,
} from "@/common/types";

export const optimisticToggleLikeNews = async (
  itemId: string,
  items: INewsResponse[],
  updateFn: (items: INewsResponse[]) => void,
  apiCall: () => Promise<INewsResponse>,
  onError?: (error: unknown) => void,
): Promise<void> => {
  const previousItems = items;

  const optimisticItems = items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
        }
      : item,
  );

  updateFn(optimisticItems);

  try {
    const updatedItem = await apiCall();

    const serverItems = items.map((item) =>
      item.id === itemId ? updatedItem : item,
    );

    updateFn(serverItems);
  } catch (error) {
    updateFn(previousItems);
    onError?.(error);
  }
};

export const optimisticToggleLikeComments = async (
  itemId: string,
  items: ICommentData[],
  updateFn: (items: ICommentData[]) => void,
  apiCall: () => Promise<ICommentData>,
  onError?: (error: unknown) => void,
): Promise<void> => {
  const previousItems = items;

  const updateLike = (list: ICommentData[]): ICommentData[] =>
    list.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
        };
      }
      return {
        ...item,
        replies: updateLike(item.replies),
      };
    });

  updateFn(updateLike(items));

  try {
    const updated = await apiCall();

    const updateFromServer = (list: ICommentData[]): ICommentData[] =>
      list.map((item) =>
        item.id === itemId
          ? updated
          : {
              ...item,
              replies: updateFromServer(item.replies),
            },
      );

    updateFn(updateFromServer(items));
  } catch (error) {
    updateFn(previousItems);
    onError?.(error);
  }
};

export const optimisticToggleQuestionStatus = async (
  itemId: string,
  targetStatus: QuestionStatusType,
  items: Map<string, IQuestionDetail>,
  updateFn: (itemId: string, status: QuestionStatusType | undefined) => void,
  apiCall: () => Promise<AxiosResponse<IMarkQuestionResponse>>,
  onError?: (error: unknown) => void,
): Promise<void> => {
  const item = items.get(itemId);
  const previousStatus = item?.status;

  const newStatus = previousStatus === targetStatus ? undefined : targetStatus;

  updateFn(itemId, newStatus);

  try {
    await apiCall();
  } catch (error) {
    updateFn(itemId, previousStatus);
    onError?.(error);
  }
};
