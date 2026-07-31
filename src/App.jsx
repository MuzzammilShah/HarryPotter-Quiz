import { useCallback } from 'react'
import { useSessionState } from './hooks/useSessionState'
import { lockNewQuiz } from './lib/quizSelection'
import questionsBank from './data/questions.json'
import AppShell from './components/layout/AppShell'
import Landing from './components/landing/Landing'
import Quiz from './components/quiz/Quiz'
import Results from './components/results/Results'
import Certificate from './components/certificate/Certificate'

function App() {
  const { state, updateState, updateQuiz, resetSession } = useSessionState()
  const { username, house, screen, quiz } = state
  const total = quiz.questionIds.length || 10

  const handleBegin = useCallback(() => {
    const locked = lockNewQuiz(questionsBank.questions)
    updateState({
      screen: 'quiz',
      quiz: { ...locked, currentIndex: 0, answers: {}, score: 0 },
    })
  }, [updateState])

  const handleQuizComplete = useCallback(() => {
    updateState({ screen: 'results', completedAt: new Date().toISOString() })
  }, [updateState])

  const handleViewCertificate = useCallback(() => {
    updateState({ screen: 'certificate' })
  }, [updateState])

  const handlePlayAgain = useCallback(() => {
    resetSession()
  }, [resetSession])

  const handleCertificateDownloaded = useCallback(() => {
    resetSession()
  }, [resetSession])

  return (
    <AppShell house={house}>
      {screen === 'landing' && (
        <Landing
          username={username}
          house={house}
          onUsernameChange={(value) => updateState({ username: value })}
          onHouseChange={(value) => updateState({ house: value })}
          onBegin={handleBegin}
        />
      )}

      {screen === 'quiz' && quiz.questionIds.length > 0 && (
        <Quiz quizState={quiz} updateQuiz={updateQuiz} onComplete={handleQuizComplete} />
      )}

      {screen === 'results' && (
        <Results
          score={quiz.score}
          total={total}
          onViewCertificate={handleViewCertificate}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {screen === 'certificate' && (
        <Certificate
          username={username}
          house={house}
          score={quiz.score}
          total={total}
          onPlayAgain={handlePlayAgain}
          onDownloaded={handleCertificateDownloaded}
        />
      )}
    </AppShell>
  )
}

export default App
