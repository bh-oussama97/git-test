import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../shared/dish' ;
import {switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl} from '@angular/forms';
import { DISHES} from '../shared/dishes';
import { MatSliderChange } from '@angular/material';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


rating:number;
   CommentForm : FormGroup;
   comment : Comment;  
   dish: Dish;
   errMess: string;
   dishIds: string[];
   prev: string;
   next : string ;
   dishcopy :Dish;
   visibility = 'shown' ;
  

   @ViewChild('fform1') feedbackFormDirective; 

   updateSlider(event) {
    this.rating = event.value;
    console.log("slider value :"+ this.rating);
  }

  formatLabel(value: number) {
    if (value >= 5) {
      return Math.round(value) ;
    }

    return value;
  }


  formErrors = {
   'author' : '',
   'rating' : '',
   'comment' :''
  };


  validationMessages = {
    'author': {
      'required':      'Name of author is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'rating' :{
      'required' :' You should chosse rating'
    },
    'comment': {
      'required':      'comment is required.',
    }
  };

  constructor(private dishService : DishService,private location : Location,
    private route : ActivatedRoute,private fb: FormBuilder,
    
    @Inject('BaseURL')
    private BaseURL) { 
      this.createForm();
  }

  ngOnInit() {

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
    errmess=> this.errMess = <any>errmess
    );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() : void {
    this.location.back();
  }

  createForm() : void {
    this.CommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: ['', [Validators.required ] ],
      comment: ['', [Validators.required] ],
    });
    this.CommentForm.valueChanges
  .subscribe(data=>this.onValueChanged(data));
  this.onValueChanged();//re set 
  }

  onValueChanged(data?: any) {
    if (!this.CommentForm) { return; }
    const form = this.CommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  

  onSubmit () 
  {
    this.comment = this.CommentForm.value;
    const date = new Date();
    this.comment.date = date.toISOString()
    this.CommentForm.reset({
      author: '',
      rating: '',
      comment: '',
     
    });
    
    //this.dish.comments.push(this.feedback1); //push after submit
    this.dish.comments.push(this.comment);

    this.feedbackFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });
 }

 

}
