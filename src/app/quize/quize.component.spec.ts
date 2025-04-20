import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})
export class QuizeComponent implements OnInit {

  questions: any[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  score = 0;
  showNextButton = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      this.loadQuestions(categoryId);
    });
  }

  loadQuestions(categoryId: number) {
    const apiURL = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`;
    this.http.get<any>(apiURL).subscribe(res => {
      this.questions = res.results.map((q: any) => {
        const answers = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (answers.length + 1));
        answers.splice(randomIndex, 0, q.correct_answer);
        return {
          ...q,
          answers
        };
      });
    });
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.showNextButton = true;
    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.score += 1;
    }
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.showNextButton = false;
    this.currentQuestionIndex += 1;
  }

  getProgress() {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
