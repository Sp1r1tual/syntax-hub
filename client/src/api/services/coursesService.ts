import { ICoursesListResponse, ICourseDetailsResponse } from "@/common/types";

import { $apiMain } from "@/api";

export class CoursesService {
  static getCoursesList() {
    return $apiMain.get<ICoursesListResponse>("/courses");
  }

  static getCourse(courseSlug: string) {
    return $apiMain.get<ICourseDetailsResponse>(`/courses/${courseSlug}`);
  }
}
