import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button,
  Paper,
  AppBar,
  Toolbar,
  MobileStepper
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 모바일 친화적인 테마 설정
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
});

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "친구는 새로운 사람들과 쉽게 친해지나요?",
      options: ["네, 매우 활발하게 대화를 나눕니다", "아니요, 조금 소극적인 편입니다"],
      type: "E/I"
    },
    {
      question: "친구는 계획을 세우는 것을 좋아하나요?",
      options: ["네, 모든 것을 계획적으로 합니다", "아니요, 즉흥적인 것을 좋아합니다"],
      type: "J/P"
    },
    {
      question: "친구는 논리적인 판단을 하나요?",
      options: ["네, 이성적으로 판단합니다", "아니요, 감정적으로 판단합니다"],
      type: "T/F"
    },
    {
      question: "친구는 마감일을 잘 지키나요?",
      options: ["네, 항상 시간을 잘 지킵니다", "아니요, 유연하게 대처합니다"],
      type: "J/P"
    },
    {
      question: "친구는 새로운 경험을 좋아하나요?",
      options: ["네, 새로운 것을 시도하는 것을 좋아합니다", "아니요, 익숙한 것을 선호합니다"],
      type: "S/N"
    },
    {
      question: "친구는 상상력이 풍부한 편인가요?",
      options: ["네, 창의적인 생각을 많이 합니다", "아니요, 현실적인 생각을 합니다"],
      type: "S/N"
    },
    {
      question: "친구는 갈등 상황에서 어떻게 대처하나요?",
      options: ["직접적으로 해결하려고 합니다", "조화롭게 해결하려고 합니다"],
      type: "T/F"
    },
    {
      question: "친구는 휴식 시간을 어떻게 보내나요?",
      options: ["혼자 있는 시간이 필요합니다", "사람들과 함께 있는 것을 좋아합니다"],
      type: "E/I"
    },
    {
      question: "친구는 미래에 대해 어떻게 생각하나요?",
      options: ["미래의 가능성을 많이 생각합니다", "현재의 상황을 중시합니다"],
      type: "S/N"
    },
    {
      question: "친구는 결정을 내릴 때 어떻게 하나요?",
      options: ["신중하게 생각한 후 결정합니다", "직관적으로 빠르게 결정합니다"],
      type: "J/P"
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMBTI();
    }
  };

  const calculateMBTI = () => {
    const mbtiTypes = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    answers.forEach((answer, index) => {
      const question = questions[index];
      const type = question.type;
      const isFirstOption = answer === question.options[0];
      
      if (type === "E/I") {
        isFirstOption ? mbtiTypes.E++ : mbtiTypes.I++;
      } else if (type === "S/N") {
        isFirstOption ? mbtiTypes.S++ : mbtiTypes.N++;
      } else if (type === "T/F") {
        isFirstOption ? mbtiTypes.T++ : mbtiTypes.F++;
      } else if (type === "J/P") {
        isFirstOption ? mbtiTypes.J++ : mbtiTypes.P++;
      }
    });

    const mbti = [
      mbtiTypes.E > mbtiTypes.I ? 'E' : 'I',
      mbtiTypes.S > mbtiTypes.N ? 'S' : 'N',
      mbtiTypes.T > mbtiTypes.F ? 'T' : 'F',
      mbtiTypes.J > mbtiTypes.P ? 'J' : 'P'
    ].join('');

    setCurrentStep(questions.length + 1);
    setMbtiResult(mbti);
  };

  const [mbtiResult, setMbtiResult] = useState('');

  const mbtiDescriptions = {
    'ISTJ': '신뢰할 수 있는 현실주의자',
    'ISFJ': '용감한 수호자',
    'INFJ': '선의의 옹호자',
    'INTJ': '용의주도한 전략가',
    'ISTP': '만능 재주꾼',
    'ISFP': '호기심 많은 예술가',
    'INFP': '열정적인 중재자',
    'INTP': '논리적인 사색가',
    'ESTP': '모험을 즐기는 사업가',
    'ESFP': '자유로운 영혼의 연예인',
    'ENFP': '재기발랄한 활동가',
    'ENTP': '논쟁을 즐기는 변론가',
    'ESTJ': '엄격한 관리자',
    'ESFJ': '사교적인 외교관',
    'ENFJ': '정의로운 사회운동가',
    'ENTJ': '대담한 통솔자'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              친구가 보는 나의 MBTI
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
          {currentStep === 0 && (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                친구가 보는 나의 MBTI
              </Typography>
              <Typography variant="body1" paragraph>
                당신의 친구는 당신을 어떻게 볼까요?
              </Typography>
              <Typography variant="body1" paragraph>
                친구의 시선으로 바라본 당신의 MBTI를 알아보세요!
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setCurrentStep(1)}
                size="large"
                sx={{ mt: 2 }}
              >
                테스트 시작하기
              </Button>
            </Paper>
          )}

          {currentStep > 0 && currentStep <= questions.length && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <MobileStepper
                variant="dots"
                steps={questions.length}
                position="static"
                activeStep={currentStep - 1}
                backButton={null}
                nextButton={null}
                sx={{ maxWidth: 400, flexGrow: 1, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                {questions[currentStep - 1].question}
              </Typography>
              {questions[currentStep - 1].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  fullWidth
                  onClick={() => handleAnswer(option)}
                  sx={{ mb: 1 }}
                >
                  {option}
                </Button>
              ))}
            </Paper>
          )}

          {currentStep > questions.length && (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                당신의 MBTI는...
              </Typography>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {mbtiResult}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {mbtiDescriptions[mbtiResult as keyof typeof mbtiDescriptions]}
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `내 친구가 생각하는 나의 MBTI는 ${mbtiResult} (${mbtiDescriptions[mbtiResult as keyof typeof mbtiDescriptions]}) 입니다!`
                  );
                }}
              >
                결과 공유하기
              </Button>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
