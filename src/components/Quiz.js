import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import questions from "../data/questions.json";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Container className="mt-4">
      {showResult ? (
        <Card>
          <Card.Body>
            <Card.Title>Kết quả</Card.Title>
            <Card.Text>
              Bạn đã trả lời đúng {score}/{questions.length} câu.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>{questions[currentQuestion].question}</Card.Title>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                className="m-2"
                variant="primary"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Quiz;
