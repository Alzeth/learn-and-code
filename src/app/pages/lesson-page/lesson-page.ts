import { Component } from '@angular/core';
import { CodeEditor } from '@app/components/code-editor/code-editor';

@Component({
  selector: 'app-lesson-page',
  imports: [
    CodeEditor
  ],
  templateUrl: './lesson-page.html',
  styleUrl: './lesson-page.css',
})
export class LessonPage {

}
