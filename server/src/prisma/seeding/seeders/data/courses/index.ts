import { ICourseSeed } from "./types/types";
import { htmlCourse } from "./html";
import { cssCourse } from "./css";
import { javascriptCourse } from "./javascript";
import { reactCourse } from "./react";

export const coursesData: ICourseSeed[] = [
  htmlCourse,
  cssCourse,
  javascriptCourse,
  reactCourse,
];

export * from "./types/types";
