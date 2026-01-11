import {
  ICoursesListResponse,
  ICourseDetailsResponse,
  IMarkQuestionResponse,
} from "@/common/types";

import { $apiMain } from "@/api";

export class CoursesService {
  static getCoursesList() {
    return $apiMain.get<ICoursesListResponse>("/courses");
  }

  static getCourse(courseSlug: string) {
    return $apiMain.get<ICourseDetailsResponse>(`/courses/${courseSlug}`);
  }

  static toggleQuestionAsRepeat(questionId: string) {
    return $apiMain.patch<IMarkQuestionResponse>(
      `/courses/mark-question-as-repeat/${questionId}`,
    );
  }

  static toggleQuestionAsLearned(questionId: string) {
    return $apiMain.patch<IMarkQuestionResponse>(
      `/courses/mark-question-as-learned/${questionId}`,
    );
  }
}
