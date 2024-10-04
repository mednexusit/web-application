import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addnewsfeed',
  templateUrl: './addnewsfeed.component.html',
  styleUrl: './addnewsfeed.component.scss',
})
export class AddnewsfeedComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
