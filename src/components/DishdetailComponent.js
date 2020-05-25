import React,{Component} from 'react';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Card, CardImg,CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText , Button, Modal , ModalHeader, ModalBody, Col,Row, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
  
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


	class CommentForm extends Component {

    constructor(props) {
      super(props);
      this.state={
        isModalOpen:false
      };
 this.toggleModal=this.toggleModal.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState ({
        isModalOpen: !this.state.isModalOpen
      });
    }
   
   handleSubmit(values) {
    this.toggleModal();
    
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
   }
    render() {

      return (
         <React.Fragment>
         <div>
        <Button onClick={this.toggleModal} className="btn btn-outline-secondary">
                       <span className="fa fa-pencil"></span> Submit Comment
                     </Button>
        <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="justify-self-center">
           <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
           <ModalBody >
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label forHtml="rating" className="ml-3"><strong>Rating</strong></Label>
                  <Col md={12}>
                  <Control.select model=".rating" name="rating" id='rating' className="col-12 form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>  
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label forHtml="author" className="ml-3"><strong>Your Name</strong></Label>
                  <Col md={12}>
                    <Control.text model=".author" name="author" id="author" placeholder="Your Name" className="col-12 form-control"
                    validators={{ required,maxLength:maxLength(15),minLength:minLength(3)}} />
                    <Errors  className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label forHtml="comment" className="ml-3"><strong>Comment</strong></Label>
                  <Col md={12}>
                  <Control.textarea model=".comment" name="comment" id="comment" className="form-control" rows="6" />
                  </Col>
                </Row>
                 <Row className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
              </LocalForm>
           </ModalBody>   
        </Modal>
        </div>
        </React.Fragment>
        );
    }
  }

	
		
        function RenderComments({comments,postComment,dishId})  {
        	
        	if(comments !=null) 
        	{	 return (
             <Stagger in>
            {comments.map((dish) => {
          	return (
               <Fade in>
                <li><div paddingTop="3px">{dish.comment}</div>
                
                  <div>--{dish.author},{new Intl.DateTimeFormat('en-US',{year:'numeric' , month:'short' , day:'2-digit'}).format(new Date(Date.parse(dish.date)))}</div>
                  
                </li>
             </Fade>
          		);
          })}
            </Stagger>
          );
      }
          else {
          	return (<div></div>);
          }
         
         
        }


		const DishDetail=(props) => {
      if(props.isLoading) {
        return(
           <div className="container">
             <div className="row">
               <Loading />
             </div>
           </div>     
         );
      }
      else if (props.errMess) {
         return(
           <div className="container">
             <div className="row">
               <h4>{props.errMess}</h4>
             </div>
           </div>     
         );
      }
           if(props.dish!=null) {
              return(
          		<div className="container">
               <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
          		<div className="row">
                   <div className="col-12 col-md-5 m-1">
                    <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                      <CardImg width="100%" src={baseUrl+props.dish.image} alt={props.dish.name} />
                      <CardBody>
                          <CardTitle>{props.dish.name}</CardTitle>
                          <CardText>{props.dish.description}</CardText>
                      </CardBody>
                    </Card>
                  </FadeTransform>  
                   </div>
                   <div className="col-12 col-md-5 m-1" >
                      <h4>Comments</h4>
                      <ul className="list-unstyled">
                         
                          <RenderComments comments={props.comments} postComment={props.postComment}
                          dishId={props.dish.id}
                             />
                      </ul>
                    <CommentForm dishId={props.dishId} postComment={props.postComment} />
                   </div>
                </div>
              </div>  
                );

          	}
          	else {
          		return(
                   <div></div>
          			);
          	}

		}
		
    
          
          
         
          	
          	
		

export default DishDetail;