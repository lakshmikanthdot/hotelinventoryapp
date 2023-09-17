import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { comments } from './comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  // 1st way
  comments$ = this.commentService.getComments();

  // 2nd way
  // pluck the key from the stream
  // prefetch
  // data load with out the blank page
  // use comment$ in the html
  comment$ = this.activatedRouter.data.pipe(pluck('comments'));

  // 3rd way
  comments: comments[] = [];

  constructor(
    private commentService: CommentService,
    private activatedRouter: ActivatedRoute // anything related to data we can use activatedroutes(routes)
  ) {}

  ngOnInit(): void {
    // this.activatedRouter.data.subscribe((data) =>
    //   //  console.log(data) //  500 list will get because call is made by service
    //   // it was prefetch, not navigating to route getting data,
    //   console.log(data['comments'])
    // this.comments = data['comments'];
    // );
  }
}
