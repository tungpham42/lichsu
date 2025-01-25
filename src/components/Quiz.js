import React, { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import questions from "../data/questions.json";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const currentQuestionData = questions[currentQuestion];

  // Shuffle options only once when the question is loaded
  useEffect(() => {
    setShuffledOptions(shuffleArray(currentQuestionData.options));
  }, [currentQuestionData]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentQuestionData.answer) {
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
              <Card.Title>{currentQuestionData.question}</Card.Title>
              {shuffledOptions.map((option, index) => (
                <Button
                  key={index}
                  className="m-2"
                  variant={
                    answered && option === currentQuestionData.answer
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
                      selectedAnswer === currentQuestionData.answer
                        ? "success"
                        : "danger"
                    }
                    className="mt-3"
                  >
                    {selectedAnswer === currentQuestionData.answer
                      ? "Chính xác!"
                      : `Sai rồi! Đáp án đúng là: ${currentQuestionData.answer}`}
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
