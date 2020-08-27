import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../shared/dish' ;
import {switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl} from '@angular/forms';
import {Comment} from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
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
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility='hidden';
      return this.dishService.getDish(params['id']);
    } ))
    .subscribe(dish => { this.dish = dish; 
      this.dishcopy = dish;
      this.setPrevNext(dish.id);
      this.visibility = 'shown' ;
     },
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
    this.dishcopy.comments.push(this.comment);
this.dishService.putDish(this.dishcopy).subscribe(dish => {
this.dish = dish;
this.dishcopy = dish;
},
errmess => {
  this.dish = null;
  this.dishcopy = null;
  this.errMess = <any>errmess
});
    this.feedbackFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });
 }

 

}
