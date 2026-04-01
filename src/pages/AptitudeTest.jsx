import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

const AptitudeTest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  
  // Update dashboard stats when taking aptitude test
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('dashboardStats');
      const stats = savedStats ? JSON.parse(savedStats) : {
        collegesMatched: 0,
        applicationsSaved: 0,
        careerMatches: 0
      };
      
      // Increment career matches counter when taking aptitude test
      stats.careerMatches = Math.max(0, (stats.careerMatches || 0) + 2);
      localStorage.setItem('dashboardStats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating dashboard stats:', error);
    }
  }, []);

  // Comprehensive aptitude test questions database with detailed explanations
  const questions = [
    // Logical Reasoning (10 questions)
    {
      id: 1,
      category: 'logical',
      question: "If all Bloops are Razzies and all Razzies are Loppies, then all Bloops are definitely Loppies.",
      type: 'truefalse',
      options: ['True', 'False'],
      correct: 'True',
      explanation: "This is a classic syllogism. If A→B (all Bloops are Razzies) and B→C (all Razzies are Loppies), then by transitive property, A→C (all Bloops are Loppies). This is logically valid."
    },
    {
      id: 2,
      category: 'logical',
      question: "Choose the word that best completes the analogy: BRITTLE is to FRAGILE as STRONG is to:",
      type: 'multiple',
      options: ['Powerful', 'Weak', 'Sturdy', 'Feeble'],
      correct: 'Sturdy',
      explanation: "BRITTLE and FRAGILE are synonyms (both mean easily broken). Similarly, STRONG and STURDY are synonyms (both mean robust and well-built). Weak and Feeble are antonyms of strong."
    },
    {
      id: 3,
      category: 'logical',
      question: "What number comes next in this sequence: 2, 6, 12, 20, 30, ?",
      type: 'numerical',
      options: ['40', '42', '44', '46'],
      correct: 42,
      explanation: "The pattern adds consecutive even numbers: +4, +6, +8, +10, +12. So 2+4=6, 6+6=12, 12+8=20, 20+10=30, 30+12=42. Alternatively, the formula is n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42."
    },
    {
      id: 4,
      category: 'logical',
      question: "If today is Wednesday, what day will it be 15 days from now?",
      type: 'multiple',
      options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      correct: 'Thursday',
      explanation: "Days repeat every 7 days. 15 ÷ 7 = 2 weeks with remainder 1 day. So 15 days from Wednesday = 2 full weeks (back to Wednesday) + 1 day = Thursday."
    },
    {
      id: 5,
      category: 'logical',
      question: "Which shape completes the pattern: Circle, Square, Triangle, Circle, Square, ?",
      type: 'multiple',
      options: ['Circle', 'Square', 'Triangle', 'Pentagon'],
      correct: 'Triangle',
      explanation: "The pattern repeats every three shapes: Circle → Square → Triangle. After Circle, Square, the next in the sequence is Triangle."
    },
    {
      id: 6,
      category: 'logical',
      question: "A train travels 120 km in 2 hours. How far will it travel in 5 hours at the same speed?",
      type: 'numerical',
      options: ['280 km', '300 km', '320 km', '340 km'],
      correct: 300,
      explanation: "Speed = Distance/Time = 120km/2hr = 60 km/hr. At 60 km/hr for 5 hours: Distance = Speed × Time = 60 × 5 = 300 km."
    },
    {
      id: 7,
      category: 'logical',
      question: "If A = 1, B = 2, C = 3, what does F + K equal?",
      type: 'numerical',
      options: ['15', '16', '17', '18'],
      correct: 17,
      explanation: "Following the alphabet pattern: A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11. Therefore, F(6) + K(11) = 17."
    },
    {
      id: 8,
      category: 'logical',
      question: "Which conclusion follows logically: All cats are animals. Some animals are pets.",
      type: 'multiple',
      options: [
        'All pets are cats',
        'Some pets are cats',
        'No pets are cats',
        'Cannot be determined'
      ],
      correct: 'Cannot be determined',
      explanation: "From 'All cats are animals' and 'Some animals are pets', we cannot conclude anything definite about the relationship between cats and pets. The animals that are pets might or might not include cats."
    },
    {
      id: 9,
      category: 'logical',
      question: "Complete the series: AZ, BY, CX, ?",
      type: 'multiple',
      options: ['DW', 'EV', 'DU', 'FT'],
      correct: 'DW',
      explanation: "Two alternating patterns: First letter advances +1 (A→B→C→D), second letter goes backward -1 (Z→Y→X→W). So the next pair is D+W = DW."
    },
    {
      id: 10,
      category: 'logical',
      question: "If you rearrange the letters 'CIFAIPC' you would have the name of a:",
      type: 'multiple',
      options: ['City', 'Animal', 'Ocean', 'Country'],
      correct: 'Ocean',
      explanation: "Rearranging 'CIFAIPC' gives you 'PACIFIC', which is the name of an ocean (Pacific Ocean). This tests anagram-solving skills."
    },

    // Interests (10 questions)
    {
      id: 11,
      category: 'interests',
      question: "Which activity excites you most?",
      type: 'multiple',
      options: [
        'Solving complex problems',
        'Creating art or design',
        'Helping people directly',
        'Working with numbers and data'
      ],
      explanation: "This reveals your core interest area: analytical/problem-solving, creative/arts, social/helping, or data/analytical work."
    },
    {
      id: 12,
      category: 'interests',
      question: "What type of books do you prefer?",
      type: 'multiple',
      options: [
        'Science and technology',
        'Fiction and creative writing',
        'Biographies and self-help',
        'Business and economics'
      ],
      explanation: "Reading preferences indicate intellectual curiosity direction: technical/scientific, creative/artistic, personal growth/social, or business/entrepreneurial."
    },
    {
      id: 13,
      category: 'interests',
      question: "Which work environment appeals to you most?",
      type: 'multiple',
      options: [
        'Laboratory or research facility',
        'Creative studio or design space',
        'Hospital or community center',
        'Corporate office or business setting'
      ],
      explanation: "Work environment preference shows whether you thrive in research/analytical, creative, healthcare/social services, or business/corporate settings."
    },
    {
      id: 14,
      category: 'interests',
      question: "What do you enjoy doing in your free time?",
      type: 'multiple',
      options: [
        'Building or fixing things',
        'Painting or crafting',
        'Volunteering or mentoring',
        'Analyzing data or trends'
      ],
      explanation: "Leisure activities reveal natural inclinations: hands-on/technical, creative/artistic, social/helping, or analytical/research interests."
    },
    {
      id: 15,
      category: 'interests',
      question: "Which subject did you enjoy most in school?",
      type: 'multiple',
      options: [
        'Mathematics or Physics',
        'Art or Literature',
        'Psychology or Social Studies',
        'Economics or Business'
      ],
      explanation: "Academic preferences indicate career alignment: STEM fields, creative arts/humanities, social sciences/helping professions, or business/commerce."
    },
    {
      id: 16,
      category: 'interests',
      question: "What type of career would fulfill you most?",
      type: 'multiple',
      options: [
        'Innovating new technologies',
        'Creating beautiful experiences',
        'Making a social impact',
        'Building successful enterprises'
      ],
      explanation: "Career fulfillment sources reveal core values: innovation/technology, creativity/beauty, social impact/service, or business success/achievement."
    },
    {
      id: 17,
      category: 'interests',
      question: "Which project type energizes you?",
      type: 'multiple',
      options: [
        'Technical research project',
        'Creative design project',
        'Community service project',
        'Business strategy project'
      ],
      explanation: "Project preferences show what motivates you: technical challenges, creative expression, community service, or strategic business thinking."
    },
    {
      id: 18,
      category: 'interests',
      question: "What skills would you most like to develop?",
      type: 'multiple',
      options: [
        'Analytical and problem-solving',
        'Creative and artistic',
        'Interpersonal and communication',
        'Leadership and management'
      ],
      explanation: "Skill development goals indicate career aspirations: analytical/technical expert, creative professional, people-focused roles, or leadership/management."
    },
    {
      id: 19,
      category: 'interests',
      question: "Which work schedule do you prefer?",
      type: 'multiple',
      options: [
        'Flexible research hours',
        'Creative project deadlines',
        'Regular service hours',
        'Structured business hours'
      ],
      explanation: "Schedule preferences reflect work style: flexible/research-oriented, project-based/creative, structured service roles, or traditional business schedules."
    },
    {
      id: 20,
      category: 'interests',
      question: "What motivates you most in work?",
      type: 'multiple',
      options: [
        'Solving challenging problems',
        'Creating something beautiful',
        'Helping others succeed',
        'Achieving measurable results'
      ],
      explanation: "Core motivators reveal career satisfaction drivers: intellectual challenge, creative expression, helping others, or achievement/results."
    },

    // Personality (10 questions)
    {
      id: 21,
      category: 'personality',
      question: "In group situations, you usually:",
      type: 'multiple',
      options: [
        'Prefer to observe and analyze',
        'Express creative ideas freely',
        'Focus on helping others connect',
        'Take charge and organize'
      ],
      explanation: "Group behavior reveals personality type: analytical/observational, creative/expressive, social/facilitative, or leadership/organizational."
    },
    {
      id: 22,
      category: 'personality',
      question: "When facing a problem, you typically:",
      type: 'multiple',
      options: [
        'Analyze all possible solutions logically',
        'Look for creative and innovative approaches',
        'Consider how it affects people involved',
        'Focus on practical and efficient solutions'
      ],
      explanation: "Problem-solving approach shows cognitive style: analytical/logical, creative/innovative, empathetic/people-focused, or practical/efficient."
    },
    {
      id: 23,
      category: 'personality',
      question: "Your approach to learning new skills:",
      type: 'multiple',
      options: [
        'Systematic step-by-step method',
        'Experimental and hands-on exploration',
        'Through collaboration and discussion',
        'Goal-oriented and results-focused'
      ],
      explanation: "Learning style indicates personality: systematic/structured, experimental/hands-on, collaborative/social, or goal-oriented/driven."
    },
    {
      id: 24,
      category: 'personality',
      question: "In your ideal workspace, you prefer:",
      type: 'multiple',
      options: [
        'Quiet, organized environment',
        'Flexible, inspiring space',
        'Collaborative, people-centered area',
        'Structured, professional setting'
      ],
      explanation: "Workspace preference reflects personality: introverted/organized, creative/flexible, extroverted/collaborative, or professional/structured."
    },
    {
      id: 25,
      category: 'personality',
      question: "When making decisions, you rely more on:",
      type: 'multiple',
      options: [
        'Logical analysis and facts',
        'Intuition and creative insight',
        'Empathy and social impact',
        'Practical outcomes and benefits'
      ],
      explanation: "Decision-making style reveals: thinking/logical, intuitive/creative, feeling/empathetic, or pragmatic/practical orientation."
    },
    {
      id: 26,
      category: 'personality',
      question: "Your communication style tends to be:",
      type: 'multiple',
      options: [
        'Precise and analytical',
        'Expressive and imaginative',
        'Supportive and encouraging',
        'Direct and results-oriented'
      ],
      explanation: "Communication style indicates: analytical/precise, creative/expressive, supportive/empathetic, or direct/results-driven personality."
    },
    {
      id: 27,
      category: 'personality',
      question: "How do you handle stress?",
      type: 'multiple',
      options: [
        'Analyze the problem systematically',
        'Seek creative outlets and inspiration',
        'Talk through feelings with others',
        'Focus on actionable solutions'
      ],
      explanation: "Stress response shows coping style: analytical/systematic, creative/expressive, social/emotional, or action-oriented/practical."
    },
    {
      id: 28,
      category: 'personality',
      question: "Your ideal team role would be:",
      type: 'multiple',
      options: [
        'Researcher/Analyst',
        'Creative/Ideator',
        'Supporter/Facilitator',
        'Leader/Coordinator'
      ],
      explanation: "Team role preference reveals natural strengths: analytical/research, creative/innovation, supportive/collaborative, or leadership/coordination."
    },
    {
      id: 29,
      category: 'personality',
      question: "What energizes you most?",
      type: 'multiple',
      options: [
        'Solving complex technical challenges',
        'Creating innovative solutions',
        'Building meaningful relationships',
        'Achieving ambitious goals'
      ],
      explanation: "Energy sources indicate motivation: intellectual/technical, creative/innovative, social/relational, or achievement/goal-oriented."
    },
    {
      id: 30,
      category: 'personality',
      question: "Your long-term vision focuses on:",
      type: 'multiple',
      options: [
        'Advancing knowledge and understanding',
        'Creating beauty and meaningful experiences',
        'Improving lives and communities',
        'Building successful systems and organizations'
      ],
      explanation: "Long-term vision reveals core values: knowledge/truth, beauty/meaning, service/impact, or success/achievement."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmitTest();
    }
  }, [timeLeft, testCompleted]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0 && !showSubmitConfirm) {
      setShowSubmitConfirm(true);
      window.scrollTo(0, 0);
      return;
    }
    
    // Calculate results based on answers
    const logicalScore = calculateCategoryScore('logical');
    const interestsScore = calculateCategoryScore('interests');
    const personalityScore = calculateCategoryScore('personality');
    
    const careerSuggestions = generateCareerSuggestions(logicalScore, interestsScore, personalityScore);
    
    // Create detailed answer review
    const detailedReview = questions.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = q.correct ? (userAnswer === q.correct) : null; // For subjective questions, no right/wrong
      return {
        questionId: q.id,
        question: q.question,
        category: q.category,
        userAnswer: userAnswer || 'Not answered',
        correctAnswer: q.correct,
        isCorrect: isCorrect,
        explanation: q.explanation,
        options: q.options
      };
    });
    
    setResults({
      scores: {
        logical: logicalScore,
        interests: interestsScore,
        personality: personalityScore
      },
      careerSuggestions,
      totalQuestions: questions.length,
      answeredQuestions: Object.keys(answers).length,
      unansweredQuestions: unansweredCount,
      detailedReview,
      categoryBreakdown: {
        logical: questions.filter(q => q.category === 'logical'),
        interests: questions.filter(q => q.category === 'interests'),
        personality: questions.filter(q => q.category === 'personality')
      }
    });
    
    // Track analytics
    if (analytics && user) {
      logEvent(analytics, 'aptitude_test_complete', {
        user_id: user.id,
        logical_score: logicalScore,
        interests_score: interestsScore,
        personality_score: personalityScore,
        total_questions: questions.length,
        answered_questions: Object.keys(answers).length,
        time_taken: 1800 - timeLeft
      });
    }
    
    // Save to localStorage for history
    try {
      const testHistory = JSON.parse(localStorage.getItem(`testHistory_${user?.id}`) || '[]');
      testHistory.unshift({
        date: new Date().toISOString(),
        scores: {
          logical: logicalScore,
          interests: interestsScore,
          personality: personalityScore
        },
        careerSuggestions: careerSuggestions.slice(0, 2)
      });
      localStorage.setItem(`testHistory_${user?.id}`, JSON.stringify(testHistory));
    } catch (error) {
      console.error('Error saving test history:', error);
    }
    
    setTestCompleted(true);
    window.scrollTo(0, 0);
  };

  const calculateCategoryScore = (category) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const answered = categoryQuestions.filter(q => answers[q.id] !== undefined);
    const correct = answered.filter(q => answers[q.id] === questions.find(x => x.id === q.id)?.correct);
    return Math.round((correct.length / categoryQuestions.length) * 100);
  };

  const generateCareerSuggestions = (logical, interests, personality) => {
    // Simple career matching algorithm
    const suggestions = [];
    
    if (logical > 70) {
      suggestions.push({
        career: 'Data Scientist',
        match: 92,
        description: 'Perfect for analytical minds who love working with data and solving complex problems.'
      });
    }
    
    if (interests > 60 && personality > 50) {
      suggestions.push({
        career: 'UX Designer',
        match: 87,
        description: 'Ideal for creative problem-solvers who care about user experience and design thinking.'
      });
    }
    
    if (personality > 70) {
      suggestions.push({
        career: 'Clinical Psychologist',
        match: 85,
        description: 'Great for empathetic individuals who want to help others and understand human behavior.'
      });
    }
    
    if (logical > 60 && interests > 50) {
      suggestions.push({
        career: 'Software Engineer',
        match: 83,
        description: 'Excellent for logical thinkers who enjoy building innovative technology solutions.'
      });
    }
    
    return suggestions;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (testCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-white mb-8">
                {showSubmitConfirm && (
                  <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-yellow-800 mb-1">Some questions are unanswered</h3>
                        <p className="text-yellow-700 text-sm mb-3">
                          You have {questions.length - Object.keys(answers).length} unanswered question(s). Would you like to submit anyway?
                        </p>
                        <div className="flex gap-3">
                          <Button
                            variant="primary"
                            onClick={() => setShowSubmitConfirm(false)}
                            size="sm"
                          >
                            Go Back to Questions
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleSubmitTest}
                            size="sm"
                          >
                            Submit Anyway
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                            
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
                  <p className="text-gray-600">Your aptitude and interest assessment is complete!</p>
                </div>
                
                {/* Score Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {results.scores.logical}%
                    </div>
                    <div className="text-blue-800 font-semibold">Logical Reasoning</div>
                    <div className="text-sm text-blue-600 mt-2">
                      Score based on correct answers
                    </div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {results.scores.interests}%
                    </div>
                    <div className="text-green-800 font-semibold">Interests Alignment</div>
                    <div className="text-sm text-green-600 mt-2">
                      Based on your choices
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {results.scores.personality}%
                    </div>
                    <div className="text-purple-800 font-semibold">Personality Fit</div>
                    <div className="text-sm text-purple-600 mt-2">
                      Complete assessment
                    </div>
                  </div>
                </div>
                
                {/* Career Suggestions */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Careers</h2>
                  <div className="space-y-4">
                    {results.careerSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{suggestion.career}</h3>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                            {suggestion.match}% Match
                          </span>
                        </div>
                        <p className="text-gray-700">{suggestion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/recommendations')}
                    className="flex-1"
                  >
                    🎓 View College Recommendations
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/course-roadmap')}
                    className="flex-1"
                  >
                    🗺️ View Career Roadmap
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => window.location.reload()}
                    className="flex-1"
                  >
                    🔄 Retake Test
                  </Button>
                </div>
                              
                {/* Test Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Questions</div>
                    <div className="text-2xl font-bold text-gray-900">{results.totalQuestions}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Answered</div>
                    <div className="text-2xl font-bold text-green-600">{results.answeredQuestions}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Unanswered</div>
                    <div className="text-2xl font-bold text-orange-600">{results.unansweredQuestions || 0}</div>
                  </div>
                </div>
              </Card>
              
              {/* Detailed Answer Review Section */}
              <Card className="bg-white mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Answer Review</h2>
                <p className="text-gray-600 mb-6">Review your answers with detailed explanations for each question.</p>
                
                {/* Logical Reasoning Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
                    Logical Reasoning Questions
                  </h3>
                  <div className="space-y-6">
                    {results.detailedReview.filter(r => r.category === 'logical').map((review, idx) => (
                      <div key={review.questionId} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                              Q{idx + 1}
                            </span>
                            {review.isCorrect === true ? (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                ✓ Correct
                              </span>
                            ) : review.isCorrect === false ? (
                              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                                ✗ Incorrect
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                ⚠ Subjective
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-4">{review.question}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className={`p-4 rounded-lg border-2 ${
                            review.isCorrect === true 
                              ? 'bg-green-50 border-green-300' 
                              : review.isCorrect === false
                              ? 'bg-red-50 border-red-300'
                              : 'bg-blue-50 border-blue-300'
                          }`}>
                            <div className="text-sm text-gray-600 mb-1">Your Answer:</div>
                            <div className="font-semibold text-gray-900">{review.userAnswer}</div>
                          </div>
                          
                          {review.correctAnswer && (
                            <div className="p-4 rounded-lg border-2 bg-green-50 border-green-300">
                              <div className="text-sm text-gray-600 mb-1">Correct Answer:</div>
                              <div className="font-semibold text-gray-900">{review.correctAnswer}</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-600 text-xl font-bold">💡</span>
                            <div>
                              <div className="font-semibold text-indigo-900 mb-1">Explanation:</div>
                              <p className="text-gray-700 leading-relaxed">{review.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Interests Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-green-800 mb-4 pb-2 border-b-2 border-green-200">
                    Interest Assessment Questions
                  </h3>
                  <div className="space-y-6">
                    {results.detailedReview.filter(r => r.category === 'interests').map((review, idx) => (
                      <div key={review.questionId} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                              Q{idx + 11}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              ⭐ Personal Choice
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-4">{review.question}</p>
                        
                        <div className="p-4 rounded-lg border-2 bg-blue-50 border-blue-300 mb-4">
                          <div className="text-sm text-gray-600 mb-1">Your Choice:</div>
                          <div className="font-semibold text-gray-900">{review.userAnswer}</div>
                        </div>
                        
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-600 text-xl font-bold">💡</span>
                            <div>
                              <div className="font-semibold text-indigo-900 mb-1">What This Reveals:</div>
                              <p className="text-gray-700 leading-relaxed">{review.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Personality Section */}
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b-2 border-purple-200">
                    Personality Assessment Questions
                  </h3>
                  <div className="space-y-6">
                    {results.detailedReview.filter(r => r.category === 'personality').map((review, idx) => (
                      <div key={review.questionId} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                              Q{idx + 21}
                            </span>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                              🎯 Personality Trait
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-4">{review.question}</p>
                        
                        <div className="p-4 rounded-lg border-2 bg-purple-50 border-purple-300 mb-4">
                          <div className="text-sm text-gray-600 mb-1">Your Response:</div>
                          <div className="font-semibold text-gray-900">{review.userAnswer}</div>
                        </div>
                        
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-600 text-xl font-bold">💡</span>
                            <div>
                              <div className="font-semibold text-indigo-900 mb-1">Personality Insight:</div>
                              <p className="text-gray-700 leading-relaxed">{review.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Test Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Aptitude & Interest Assessment</h1>
                <p className="text-gray-600">Discover your strengths and ideal career paths</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Question Card */}
            <Card className="bg-white mb-8">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                  {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)} Section
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h2>
                
                <div className="space-y-3">
                  {currentQ.type === 'multiple' && currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQ.id, option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        answers[currentQ.id] === option
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                  
                  {currentQ.type === 'truefalse' && currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQ.id, option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        answers[currentQ.id] === option
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                  
                  {currentQ.type === 'numerical' && (
                    <div className="space-y-3">
                      {currentQ.options && currentQ.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentQ.id, option)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            answers[currentQ.id] === option
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                      {!currentQ.options && (
                        <input
                          type="number"
                          value={answers[currentQ.id] || ''}
                          onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                          placeholder="Enter your answer"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmitTest}
                    disabled={Object.keys(answers).length < 1}
                  >
                    Submit Test ({Object.keys(answers).length}/{questions.length} Answered)
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={nextQuestion}
                    disabled={!answers[currentQ.id]}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Card>
            
            {/* Instructions */}
            <Card className="bg-indigo-50 border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">Test Instructions:</h3>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>• Answer honestly based on your natural preferences</li>
                <li>• You have 30 minutes to complete the test</li>
                <li>• You can navigate between questions using Previous/Next buttons</li>
                <li>• Your results will help suggest suitable career paths</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AptitudeTest;