import { useState, useEffect } from "react";
import YouTube from "react-youtube";

// Define types for the video questions
interface Question {
  type: string;
  question: string;
  options: string[];
}

// Define types for the video data
interface VideoData {
  id: string;
  url: string;
  questions: Question[];
}

// Define the shape of the answers state
interface Answers {
  [videoId: string]: {
    [questionId: string]: string | null;
  };
}
interface Question {
  type: string;
  question: string;
  options: string[];
}

interface VideoData {
  id: string;
  title:string;
  url: string;
  questions: Question[];
}

const dummyData: VideoData[] = [
  {
    id: "1",
    title: "HTML",
    url: "BsDoLVMnmZs",
    questions: [
      {
        type: "mcq",
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HyperTool Markup Language", "HomeTool Markup Language", "HyperText Management Language"],
      },
      {
        type: "mcq",
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<hyperlink>", "<href>"],
      },
      {
        type: "mcq",
        question: "What is the correct syntax for embedding a JavaScript file in HTML?",
        options: ["<script src='file.js'>", "<js src='file.js'>", "<script file='file.js'>", "<javascript src='file.js'>"],
      },
      {
        type: "mcq",
        question: "Which HTML tag is used to define an image?",
        options: ["<img>", "<image>", "<src>", "<picture>"],
      },
      {
        type: "mcq",
        question: "Which HTML tag is used to define a table?",
        options: ["<table>", "<tab>", "<grid>", "<div>"],
      },
    ],
  },
  {
    id: "2",
    title: "CSS",
    url: "Edsxf_NBFrw",
    questions: [
      {
        type: "mcq",
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Cascading Script Sheets"],
      },
      {
        type: "mcq",
        question: "Which property is used to change the background color in CSS?",
        options: ["background-color", "color-background", "bg-color", "background"],
      },
      {
        type: "mcq",
        question: "Which CSS property is used to change the font of an element?",
        options: ["font-family", "font-style", "text-font", "typeface"],
      },
      {
        type: "mcq",
        question: "How do you add a comment in CSS?",
        options: ["/* comment */", "// comment", "/* comment", "<comment>"],
      },
      {
        type: "mcq",
        question: "Which CSS property is used to change the text color?",
        options: ["color", "font-color", "text-color", "background-color"],
      },
    ],
  },
  {
    id: "3",
    title: "JavaScript",
    url: "ER9SspLe4Hg",
    questions: [
      {
        type: "mcq",
        question: "What is the correct syntax for creating a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "create function myFunction()", "myFunction() = function"],
      },
      {
        type: "mcq",
        question: "Which symbol is used to comment in JavaScript?",
        options: ["//", "#", "/*", "// /*"],
      },
      {
        type: "mcq",
        question: "Which method is used to write text to the console in JavaScript?",
        options: ["console.log()", "log.console()", "console.write()", "log.write()"],
      },
      {
        type: "mcq",
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: ["=", "==", "===", ":="],
      },
      {
        type: "mcq",
        question: "Which of these is NOT a valid JavaScript data type?",
        options: ["integer", "boolean", "string", "undefined"],
      },
    ],
  },
  {
    id: "4",
    title: "React",
    url: "RGKi6LSPDLU",
    questions: [
      {
        type: "mcq",
        question: "What is React?",
        options: ["A JavaScript library for building user interfaces", "A JavaScript framework", "A JavaScript tool for mobile apps", "None of the above"],
      },
      {
        type: "mcq",
        question: "Which of the following is used to create a component in React?",
        options: ["function component()", "React.createComponent()", "React.Component()", "class component()"],
      },
      {
        type: "mcq",
        question: "What is JSX in React?",
        options: ["A syntax extension for JavaScript", "A JavaScript library", "A styling method", "A tool for debugging"],
      },
      {
        type: "mcq",
        question: "How do you pass data to a component in React?",
        options: ["Using props", "Using states", "Using variables", "Using functions"],
      },
      {
        type: "mcq",
        question: "Which hook is used to handle state in functional components in React?",
        options: ["useState", "useEffect", "useReducer", "useContext"],
      },
    ],
  },
];


function LMSPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitted, setIsSubmitted] = useState<{ [videoId: string]: boolean }>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState<{ [videoId: string]: boolean }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const currentVideoId = dummyData[currentVideoIndex].id;
    if (!answers[currentVideoId]) {
      setAnswers((prev) => ({
        ...prev,
        [currentVideoId]: {},
      }));
    }
  }, [currentVideoIndex, answers]);

  const handleAnswerChange = (videoId: string, questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        [`${videoId}-${questionIndex}`]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const video = dummyData[currentVideoIndex];
    const videoAnswers = answers[video.id];

    const unansweredQuestions = video.questions.some(
      (_, qIndex) => !videoAnswers[`${video.id}-${qIndex}`]
    );
    if (unansweredQuestions) {
      setErrorMessage("Please fill in all the answers before submitting.");
      return;
    }

    setIsSubmitted((prev) => ({
      ...prev,
      [video.id]: true,
    }));
    setIsAssessmentStarted((prev) => ({
      ...prev,
      [video.id]: false,
    }));
    setAnswers((prev) => ({
      ...prev,
      [video.id]: {},
    }));

    setSuccessMessage(`Assessment submitted for Video ${video.id}`);
    setErrorMessage("");
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < dummyData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsSubmitted((prev) => ({
        ...prev,
        [dummyData[currentVideoIndex].id]: false,
      }));
      setSuccessMessage("");
      setErrorMessage("");
      setIsAssessmentStarted((prev) => ({
        ...prev,
        [dummyData[currentVideoIndex].id]: false,
      }));
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsSubmitted((prev) => ({
        ...prev,
        [dummyData[currentVideoIndex].id]: false,
      }));
      setSuccessMessage("");
      setErrorMessage("");
      setIsAssessmentStarted((prev) => ({
        ...prev,
        [dummyData[currentVideoIndex].id]: false,
      }));
    }
  };

  const video = dummyData[currentVideoIndex];
  const videoAnswers = answers[video.id] || {};
  const videoAssessmentCompleted = isSubmitted[video.id];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Lecture's Assessments</h1>

        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <YouTube
              videoId={video.url}
              opts={{
                width: "640",
                height: "360",
                playerVars: {
                  modestbranding: 1,
                  controls: 1,
                  showinfo: 0,
                  rel: 0,
                  autoplay: 0,
                },
              }}
              className="rounded-lg shadow-lg"
            />
          </div>

          {!isAssessmentStarted[video.id] && !videoAssessmentCompleted ? (
            <div className="text-center mb-6">
              <button
                onClick={() => {
                  setIsAssessmentStarted((prev) => ({
                    ...prev,
                    [video.id]: true,
                  }));
                }}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-6"
              >
                Start Assessment
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Questions for Lecture of :  {video.title}</h3>
              {video.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-6">
                  <p className="text-lg font-medium mb-2">{question.question}</p>
                  {question.type === "mcq" && (
                    <div className="space-y-2">
                      {question.options?.map((option, oIndex) => (
                        <label key={oIndex} className="block">
                          <input
                            type="radio"
                            name={`question-${video.id}-${qIndex}`}
                            value={option}
                            checked={videoAnswers[`${video.id}-${qIndex}`] === option}
                            onChange={() => handleAnswerChange(video.id, qIndex, option)}
                            disabled={videoAssessmentCompleted}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {errorMessage && (
                <div className="text-center text-red-600 mb-6">
                  <p>{errorMessage}</p>
                </div>
              )}

              {successMessage && !errorMessage && (
                <div className="text-center text-green-600 mb-6">
                  <p>{successMessage}</p>
                </div>
              )}

              {!videoAssessmentCompleted ? (
                <div className="text-center mb-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-6"
                  >
                    Submit Assessment
                  </button>
                </div>
              ) : (
                <div className="text-center mt-6">
                  <p className="text-lg font-semibold text-green-600">Assessment completed for Video {video.id}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousVideo}
            disabled={currentVideoIndex === 0}
            className="bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Previous Task
          </button>
          <button
            onClick={handleNextVideo}
            disabled={currentVideoIndex === dummyData.length - 1}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Next Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default LMSPage;
