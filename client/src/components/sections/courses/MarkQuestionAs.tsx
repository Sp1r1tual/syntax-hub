import { Info, RefreshCcw, Check } from "lucide-react";

import {
  useMarkQuestionAsLearned,
  useMarkQuestionAsRepeat,
} from "@/hooks/queries/useCoursesQueries";

import { useCoursesStore } from "@/store/courses/useCoursesStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import styles from "./styles/MarkQuestionAs.module.css";

interface MarkQuestionAsProps {
  questionId: string;
}

export const MarkQuestionAs = ({ questionId }: MarkQuestionAsProps) => {
  const repeatMutation = useMarkQuestionAsRepeat();
  const learnedMutation = useMarkQuestionAsLearned();
  const { getQuestionDetail } = useCoursesStore();
  const { user } = useAuthStore();
  const { openAuthModal } = useModalsStore();

  const isMarkingQuestion =
    repeatMutation.isPending || learnedMutation.isPending;

  const question = getQuestionDetail(questionId);
  const currentStatus = question?.status;

  const handleRepeatClick = () => {
    if (!user) return openAuthModal();
    repeatMutation.mutate(questionId);
  };

  const handleLearnedClick = () => {
    if (!user) return openAuthModal();
    learnedMutation.mutate(questionId);
  };

  return (
    <div className={styles.markButtonsWrapper}>
      <Info size={20} />
      <p>Відмітити як:</p>

      <div className={styles.buttonsWrapper}>
        <button
          title="Повторити"
          onClick={handleRepeatClick}
          disabled={isMarkingQuestion}
          className={currentStatus === "repeat" ? styles.active : ""}
        >
          <RefreshCcw size={20} />
        </button>

        <button
          title="Вивчено"
          onClick={handleLearnedClick}
          disabled={isMarkingQuestion}
          className={currentStatus === "learned" ? styles.active : ""}
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};
