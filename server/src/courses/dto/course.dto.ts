import { Expose } from "class-transformer";

export class CategoryGroupDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  icon?: string;
}
