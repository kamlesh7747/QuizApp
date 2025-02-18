import { useState } from "react";
import QuizApp from "./QuizApp";
import Result from "./assets/Result";
export default function App() {
  const [isStart, setIsStart] = useState(false);
  const [data2, setData2] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
    N: 0,
  });

  function handleSubmit() {
    setIsSubmitted(!isSubmitted);
  }

  const getData = async () => {
    try {
      const response = await fetch("/api");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  async function handleStart() {
    let jsonData = await getData();
    await setData2(jsonData.questions);
    await setIsStart(() => true);

    setResult((prev) => ({
      ...prev,
      N: jsonData.questions.length,
    }));
  }

  return isStart ? (
    <>
      {!isSubmitted ? (
        <QuizApp
          data2={data2}
          setData2={setData2}
          onSubmit={handleSubmit}
          result={result}
          setResult={setResult}
        />
      ) : (
        <Result result={result}></Result>
      )}
    </>
  ) : (
    <>
      <h1 color="white">Welcome to Tesline!</h1>
      <button className="start" onClick={handleStart}>
        Click here to Start
      </button>
    </>
  );
}
