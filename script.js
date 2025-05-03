const questions = [
    {
      id: 1,
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars',
    },
    {
      id: 3,
      questionText: 'Who wrote "Hamlet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Leo Tolstoy', 'Mark Twain'],
      correctAnswer: 'William Shakespeare',
    },
    {
      id: 4,
      questionText: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 'Pacific Ocean',
    },
      {
      id: 5,
      questionText: 'What is H2O commonly known as?',
      options: ['Salt', 'Sugar', 'Water', 'Oxygen'],
      correctAnswer: 'Water',
    },
     {
      id: 6,
      questionText: 'In which year did the Titanic sink?',
      options: ['1905', '1912', '1918', '1923'],
      correctAnswer: '1912',
    },
    {
      id: 7,
      questionText: 'What is the tallest mountain in the world?',
      options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Makalu'],
      correctAnswer: 'Mount Everest',
    },
     {
      id: 8,
      questionText: 'Which country is the largest by area?',
      options: ['China', 'USA', 'Canada', 'Russia'],
      correctAnswer: 'Russia',
    },
    {
      id: 9,
      questionText: 'What is the main ingredient in guacamole?',
      options: ['Tomato', 'Avocado', 'Onion', 'Lime'],
      correctAnswer: 'Avocado',
    },
     {
      id: 10,
      questionText: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '7',
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let shuffledQuestions = [];
  let selectedAnswer = null; // To prevent multiple clicks
  
  // DOM Elements
  const questionContainer = document.getElementById('question-container');
  const resultsContainer = document.getElementById('results-container');
  const questionTextElement = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const feedbackContainer = document.getElementById('feedback-container');
  const progressTextElement = document.getElementById('progress-text');
  const progressBarElement = document.getElementById('progress-bar');
  const scoreElement = document.getElementById('score');
  const percentageElement = document.getElementById('percentage');
  const performanceMessageElement = document.getElementById('performance-message');
  const restartButton = document.getElementById('restart-button');
  
  // Utility Functions
  function shuffleArray(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
      }
      return array;
  }
  
  // Quiz Logic Functions
  function startQuiz() {
      shuffledQuestions = shuffleArray([...questions]);
      currentQuestionIndex = 0;
      score = 0;
      selectedAnswer = null;
      questionContainer.style.display = 'block';
      resultsContainer.style.display = 'none';
      loadQuestion();
      updateProgress();
  }
  
  function loadQuestion() {
      selectedAnswer = null; // Reset selected answer for the new question
      feedbackContainer.textContent = ''; // Clear previous feedback
      feedbackContainer.className = 'feedback-container'; // Reset feedback class
  
      if (currentQuestionIndex >= shuffledQuestions.length) {
          showResults();
          return;
      }
  
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      questionTextElement.textContent = currentQuestion.questionText;
  
      optionsContainer.innerHTML = ''; // Clear previous options
      currentQuestion.options.forEach(option => {
          const button = document.createElement('button');
          button.textContent = option;
          button.classList.add('option-button');
          button.addEventListener('click', () => handleAnswerSelect(option, button));
          optionsContainer.appendChild(button);
      });
  
      updateProgress();
  }
  
  function handleAnswerSelect(answer, button) {
       if (selectedAnswer !== null) return; // Prevent clicking again if already answered
  
      selectedAnswer = answer; // Mark that an answer has been selected
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;
  
      // Disable all buttons
      const optionButtons = optionsContainer.querySelectorAll('.option-button');
      optionButtons.forEach(btn => {
          btn.disabled = true;
          // Dim other buttons
          if (btn !== button && btn.textContent !== currentQuestion.correctAnswer) {
              btn.classList.add('dimmed');
          }
          // Highlight correct answer if user was wrong
          if (!isCorrect && btn.textContent === currentQuestion.correctAnswer) {
               btn.classList.add('correct');
          }
      });
  
  
      if (isCorrect) {
          score++;
          button.classList.add('correct');
          feedbackContainer.textContent = 'Correct!';
          feedbackContainer.classList.add('correct');
      } else {
          button.classList.add('incorrect');
          feedbackContainer.textContent = `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`;
          feedbackContainer.classList.add('incorrect');
      }
  
       // Update progress bar immediately after answering
      updateProgress(true); // Pass true to indicate an answer was selected
  
      // Wait a bit before loading the next question
      setTimeout(() => {
          currentQuestionIndex++;
          loadQuestion();
      }, 1500); // Delay for 1.5 seconds
  }
  
  function updateProgress(answered = false) {
      const totalQuestions = shuffledQuestions.length;
      // If answered, count the current question as 'completed' for progress bar
      const completedQuestions = currentQuestionIndex + (answered ? 1 : 0);
      const progressPercentage = (completedQuestions / totalQuestions) * 100;
  
      progressTextElement.textContent = `Question ${Math.min(currentQuestionIndex + 1, totalQuestions)} of ${totalQuestions}`;
      progressBarElement.style.width = `${progressPercentage}%`;
  }
  
  function showResults() {
      questionContainer.style.display = 'none';
      resultsContainer.style.display = 'flex'; // Use flex for centering
  
      const totalQuestions = shuffledQuestions.length;
      const percentage = Math.round((score / totalQuestions) * 100);
  
      scoreElement.textContent = `${score} / ${totalQuestions}`;
      percentageElement.textContent = `${percentage}%`;
  
      let message = '';
      let messageClass = '';
      if (percentage >= 80) {
          message = "Excellent work! You're a QuizMaster!";
          messageClass = 'excellent';
      } else if (percentage >= 50) {
          message = 'Good job! You know your stuff.';
          messageClass = 'good';
      } else {
          message = 'Keep practicing to improve your score!';
          messageClass = 'practice';
      }
      performanceMessageElement.textContent = message;
      // Reset previous classes and add the new one
      performanceMessageElement.className = 'performance-message';
      performanceMessageElement.classList.add(messageClass);
  
      // Ensure score colors match message color logic
      scoreElement.className = 'score-value'; // Reset class
      percentageElement.className = 'score-value'; // Reset class
      scoreElement.classList.add(messageClass);
      percentageElement.classList.add(messageClass);
  
  }
  
  // Event Listeners
  restartButton.addEventListener('click', startQuiz);
  
  // Initial Load
  document.addEventListener('DOMContentLoaded', startQuiz);
  
