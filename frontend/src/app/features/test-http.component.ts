import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-http',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Test HTTP: {{ result }}</div>`
})
export class TestHttpComponent implements OnInit {
  result = '';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: (data) => this.result = JSON.stringify(data),
      error: (err) => this.result = 'ERROR: ' + err
    });
  }
}
