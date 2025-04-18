import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})
export class QuizeComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer: string | null = null;
  showNextButton = false;

  constructor() {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  async loadQuestions() {
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
      console.log(res);
      const data = await res.json();

      this.questions = data.results.map((q: any) => {
        const answers = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        answers.splice(randomIndex, 0, q.correct_answer); 
        return {
          question: q.question,
          answers,
          correct_answer: q.correct_answer
        };
      });
    } catch (error) {
      console.error('Erreur lors du chargement des questions:', error);
    }
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.showNextButton = true;
    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.score++;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
    this.showNextButton = false;
  }

  getProgress() {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
