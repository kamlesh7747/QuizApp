export default function Result({ result }) {
  return (
    <div className="result">
      <p>here is your result:</p>
      <div className="boxes">
        <div className="box">
          <div className="txt">correct</div>
          <div className="stats incorrect">{result.correct}</div>
        </div>
        <div className="box">
          <div className="txt">incorrect</div>
          <div className="stats incorrect">{result.incorrect}</div>
        </div>
        <div className="box">
          <div className="txt">total Qs</div>
          <div className="stats incorrect">{result.N}</div>
        </div>
        <div className="box">
          <div className="txt">accuracy</div>
          <div className="stats incorrect">
            {result.correct > 0
              ? (result.correct * 100) / (result.correct + result.incorrect)
              : 0}
            %
          </div>
        </div>
      </div>
    </div>
  );
}
