import React, { useState, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button,
  Paper,
  AppBar,
  Toolbar,
  MobileStepper,
  Snackbar,
  Alert
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import html2canvas from 'html2canvas';

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
  const [mbtiResult, setMbtiResult] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      question: "친구와 함께 놀이공원에 갔을 때, 친구는 어떤 놀이기구를 먼저 타고 싶어할까요?",
      options: ["롤러코스터처럼 스릴 넘치는 놀이기구", "회전목마처럼 평화로운 놀이기구"],
      type: "E/I"
    },
    {
      question: "친구가 여행 계획을 세울 때 어떤 스타일일까요?",
      options: ["시간별로 세세하게 계획을 짜는 편", "대충 가고 싶은 곳만 정해두고 즉흥적으로 다니는 편"],
      type: "J/P"
    },
    {
      question: "친구가 영화를 볼 때 어떤 부분에 더 집중할까요?",
      options: ["스토리의 논리성과 전개", "캐릭터의 감정과 분위기"],
      type: "T/F"
    },
    {
      question: "친구가 과제나 일을 할 때 어떤 스타일일까요?",
      options: ["마감일보다 훨씬 일찍 시작해서 여유있게 끝내는 편", "마감 직전에 몰아서 하는 편"],
      type: "J/P"
    },
    {
      question: "친구가 새로운 카페에 갔을 때 어떤 음료를 주문할까요?",
      options: ["메뉴판에 없는 시그니처 음료", "항상 마시던 익숙한 음료"],
      type: "S/N"
    },
    {
      question: "친구가 구름을 볼 때 어떤 생각을 할까요?",
      options: ["'저 구름은 뭔가 동물 모양 같아'라고 상상하는 편", "오늘 날씨가 어떤지 생각하는 편"],
      type: "S/N"
    },
    {
      question: "친구가 다른 사람과 의견이 다를 때 어떻게 할까요?",
      options: ["자신의 의견을 직접적으로 말하는 편", "상대방의 기분을 고려하며 조심스럽게 말하는 편"],
      type: "T/F"
    },
    {
      question: "친구가 주말을 보내는 방식은?",
      options: ["집에서 혼자 영화보거나 게임하는 편", "친구들과 만나서 놀거나 외출하는 편"],
      type: "E/I"
    },
    {
      question: "친구가 미래에 대해 이야기할 때 어떤 얘기를 할까요?",
      options: ["10년 후의 꿈과 비전에 대해", "다음 주에 할 일에 대해"],
      type: "S/N"
    },
    {
      question: "친구가 점심 메뉴를 고를 때 어떤 스타일일까요?",
      options: ["메뉴판을 꼼꼼히 읽고 신중하게 고르는 편", "첫 눈에 반한 메뉴를 바로 고르는 편"],
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

  const mbtiResultTexts = {
    'ISTJ': '꼼꼼하고 믿음직한 친구',
    'ISFJ': '따뜻하고 배려심 많은 친구',
    'INFJ': '이해심 많고 영감 있는 친구',
    'INTJ': '똑똑하고 계획적인 친구',
    'ISTP': '손재주 좋고 실용적인 친구',
    'ISFP': '감성적이고 자유로운 친구',
    'INFP': '이상적이고 따뜻한 친구',
    'INTP': '호기심 많고 논리적인 친구',
    'ESTP': '모험심 많고 활발한 친구',
    'ESFP': '즐겁고 사교적인 친구',
    'ENFP': '열정적이고 창의적인 친구',
    'ENTP': '도전적이고 재치있는 친구',
    'ESTJ': '책임감 있고 조직적인 친구',
    'ESFJ': '친절하고 배려심 많은 친구',
    'ENFJ': '리더십 있고 배려심 많은 친구',
    'ENTJ': '목표의식 있고 결단력 있는 친구'
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

  const handleShare = async () => {
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current);
        const image = canvas.toDataURL('image/png');
        
        if (navigator.share) {
          const blob = await (await fetch(image)).blob();
          const file = new File([blob], `mbti-result-${mbtiResult}.png`, { type: 'image/png' });
          
          try {
            await navigator.share({
              title: '내 MBTI 결과',
              text: `내 친구가 생각하는 나는 ${mbtiResult} 타입이야!\n${mbtiResultTexts[mbtiResult as keyof typeof mbtiResultTexts]}라고 생각한대!`,
              files: [file]
            });
          } catch (error) {
            console.log('공유 취소됨');
          }
        } else {
          const link = document.createElement('a');
          link.download = `mbti-result-${mbtiResult}.png`;
          link.href = image;
          link.click();
        }
        
        const text = `내 친구가 생각하는 나는 ${mbtiResult} 타입이야!\n${mbtiResultTexts[mbtiResult as keyof typeof mbtiResultTexts]}라고 생각한대!`;
        await navigator.clipboard.writeText(text);
        
        setSnackbarOpen(true);
      } catch (error) {
        console.error('공유하기 실패:', error);
      }
    }
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

          {currentStep === questions.length + 1 && (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }} ref={resultRef}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                친구가 보는 나의 MBTI
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                친구야, 내가 볼 때 넌 {mbtiResult} 타입이야!
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                {mbtiResultTexts[mbtiResult as keyof typeof mbtiResultTexts]} 같아!
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleShare}
                size="large"
                sx={{ mt: 2 }}
              >
                결과 공유하기
              </Button>
            </Paper>
          )}
        </Container>

        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={3000} 
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success"
            sx={{ width: '100%' }}
          >
            클립보드에 복사되었습니다!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
