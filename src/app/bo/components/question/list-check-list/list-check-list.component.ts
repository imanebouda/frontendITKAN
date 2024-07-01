import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/AuditServices/question.service';
import { Modal } from 'bootstrap';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-check-list',
  templateUrl: './list-check-list.component.html',
  styleUrls: ['./list-check-list.component.scss']
})
export class ListCheckListComponent implements OnInit {
    showDialog: boolean = false; // Propriété pour contrôler l'affichage du dialogue


    options: any[] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];
    selectedOption: string;


    //
  questions: QuestionModel[] = [];
  is_loading: boolean = true;
  formulaireRecherche: FormGroup;
  typeQuestion: { label: string; value: number }[] = [];
  selectedCheckList: QuestionModel;
  addChecklist : QuestionModel;

  @ViewChild('updateModal') updateModal: ElementRef;
  @ViewChild('addModal') addModal: ElementRef;

  constructor(private questionService: QuestionService,private http: HttpClient) {}
  ngOnInit(): void {
    this.initializeForm();
    this.loadquestions();
    this.loadTypequestions();
      this.http.get<string[]>('https://localhost:44305/Dropdown/options')
          .subscribe(options => this.options = options);
  }

  initializeForm(): void {
    this.formulaireRecherche = new FormGroup({
      typeChecklist: new FormControl('')
    });
  }

  loadquestions(): void {
    this.questionService.getQuestion().subscribe(
      questions => {
        this.questions = questions;
        this.is_loading = false;
      },
      error => {
        console.error('Error fetching questions:', error);
        this.is_loading = false;
      }
    );
  }

  loadTypequestions(): void {
    this.questionService.getTypeQuestions().subscribe(
      typeQuestions => {
        this.typeQuestion = typeQuestions.map(tc => ({ label: tc.type, value: tc.id }));
      },
      error => {
        console.error('Error fetching type questions:', error);
      }
    );
  }

  searchQuestions(): void {
    const typeQuestionId = this.formulaireRecherche.get('typeChecklist')?.value;
    if (typeQuestionId) {
      this.is_loading = true;
      this.questionService.searchQuestionsByType(typeQuestionId).subscribe(
        questions => {
          this.questions = questions;
          this.is_loading = false;
        },
        error => {
          console.error('Error searching questions:', error);
          this.is_loading = false;
        }
      );
    } else {
      this.loadquestions();
    }
  }

  clearSearch(): void {
    this.formulaireRecherche.reset();
    this.loadquestions();
  }

  deleteCheckList(checkListData: QuestionModel): void {
    this.questionService.deleteQuestion(checkListData.id).subscribe(
      response => {
        console.log('Question deleted successfully', response);
        this.loadquestions(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting Question', error);
      }
    );
  }

  openUpdateDialog(checkList: QuestionModel): void {
    console.log('Selected Question:', checkList);
    this.selectedCheckList = checkList;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }
  openAddCheckListModal(): void {
    console.log('add Question:');
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }

  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedCheckList = null;
  }
  closeAddDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
  }
}