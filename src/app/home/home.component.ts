import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { UserComponent } from './user/user.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NavSidebarComponent,
    NavbarComponent,
    UserComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    QuestionComponent,
    ClassComponent,
    SubjectComponent
  ],
})
export class HomeComponent {}
