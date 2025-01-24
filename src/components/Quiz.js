import React, { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import questionsData from "../data/questions.json";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Shuffle the questions when the component mounts
  useEffect(() => {
    const shuffledQuestions = [...questionsData].sort(
      () => Math.random() - 0.5
    );
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <>
      <h2 className="mb-4">Câu Đố Lịch Sử</h2>
      {showResult ? (
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title>Kết quả</Card.Title>
            <Card.Text>
              Bạn đã trả lời đúng {score}/{questions.length} câu.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        questions.length > 0 && (
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>{questions[currentQuestion].question}</Card.Title>
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  className="m-2"
                  variant={
                    answered && option === questions[currentQuestion].answer
                      ? "success"
                      : "primary"
                  }
                  disabled={answered}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}

              {answered && (
                <>
                  <Alert
                    variant={
                      selectedAnswer === questions[currentQuestion].answer
                        ? "success"
                        : "danger"
                    }
                    className="mt-3"
                  >
                    {selectedAnswer === questions[currentQuestion].answer
                      ? "Chính xác!"
                      : `Sai rồi! Đáp án đúng là: ${questions[currentQuestion].answer}`}
                  </Alert>
                  <Button
                    className="mt-3"
                    variant="secondary"
                    onClick={handleNextQuestion}
                  >
                    Câu tiếp theo
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        )
      )}
    </>
  );
};

export default Quiz;
