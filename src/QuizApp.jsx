import { useState, useEffect } from "react";
import "./styles.css";

export default function QuizApp({
  data2,
  setData2,
  onSubmit,
  result,
  setResult,
}) {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data2[index]);

  function handlePrev() {
    if (index > 0) {
      setIndex(() => index - 1);
    }
  }

  function handleNext(len) {
    if (index < len - 1) {
      setIndex(() => index + 1);
    }
  }

  function handleOnClick(e, option_idx) {
    if (!(question.is_saved === true)) {
      // Create a new question object with all updates
      const updatedQuestion = {
        ...question,
        is_saved: true,
        options: question.options.map((option, i) =>
          i === option_idx ? { ...option, unanswered: true } : option
        ),
      };

      // Update the question state
      setQuestion(updatedQuestion);

      // Update question array in data2
      setData2((data2) =>
        data2.map((que) =>
          que.id === updatedQuestion.id ? updatedQuestion : que
        )
      );

      // update result
      if (question.options[option_idx].is_correct === true) {
        setResult((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setResult((prev) => ({
          ...prev,
          incorrect: prev.incorrect + 1,
        }));

        // update Option UI
        console.log(
          "question id : ",
          updatedQuestion.id,
          "option idx: ",
          option_idx,
          "updated unanswered: ",
          updatedQuestion.options[option_idx].unanswered
        );
      }
    }
  }

  useEffect(() => {
    setQuestion(data2[index]);
  }, [index, data2]);

  return (
    <div className="QuizApp">
      <h2>QuizApp</h2>
      <hr />

      <h5 className="question">{question.description}</h5>
      <ul>
        {question.options.map((option, idx) => {
          const optionClass =
            question.is_saved && option.is_correct
              ? "correct"
              : option.unanswered && !option.is_correct
              ? "wrong"
              : "";

          return (
            <li
              key={idx}
              onClick={(e) => handleOnClick(e, idx)}
              className={optionClass}
            >
              {option.description}
            </li>
          );
        })}
      </ul>

      <div className="buttons">
        {index > 0 && (
          <button className="prev" onClick={handlePrev}>
            Prev
          </button>
        )}
        <span className="Q_no">
          {index + 1}/{data2.length}
        </span>
        {index < data2.length - 1 && (
          <button className="next" onClick={() => handleNext(data2.length)}>
            Next
          </button>
        )}
        {index === data2.length - 1 && (
          <button className="submit" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
