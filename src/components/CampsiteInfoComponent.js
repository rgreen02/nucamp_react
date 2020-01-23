import React, {Component} from 'react'; 
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Row, Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props){
        //alert("Got here: constructor");
        super(props);
        
        this.state = {
            isModalOpen: false,
            author: "",
            rating: "",
            text: "",
            touched: {
                author: false,
                rating: false,
                text: false
            }
        };
    
        this.toggleModal  = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        
    }

    render() {
        return(
            <React.Fragment>
                <Button outline type="submit" color="primary" onClick={this.toggleModal}> 
                    <i className="fa fa-pencil"/>{' '}
                    Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>                 
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                
                            <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" id="rating" name="rating"  className="form-control" 
                                                validators={{ required }} >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>            
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                
                            <Row className="form-group">
                                    <Label htmlFor="author" md={2}>Author</Label>
                                    <Col md={10}>
                                        <Control.text  model=".author" id="author" name="author" 
                                        placeholder="Your name" 
                                        className="form-control" 
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required' ,
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="text" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".text" id="text" name="text" 
                                            className="form-control"  rows="6"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".text"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>
                            
                                <Row className="form-group">
                                    <Col md={{size: 10, offest: 2}}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
        </React.Fragment>
        );
    }
}

function RenderCampsite ({campsite}) {
        return(
            <div className="col-md-5 m-1">
                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name}></CardImg>
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
            </div>           
        )
    };

    function RenderComments({comments, addComment, campsiteId}) {
        if (comments){
            return(
                <div class="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.text}<br/> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </div>
                            )
                        })
                    }
                    <CommentForm  campsiteId={campsiteId} addComment={addComment} />            
                </div>
            )
        }
        return <div></div>;
    };
    
    function CampsiteInfo(props) {

        if (props.campsite) {
            if (props.isLoading){
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }

            if (props.errMess){
                return(
                    <div className="container">
                        <div className="row">
                            <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                        </div>
                    </div>
                );
            }

            return ( 
                <div className="container">
                    <div className = "row" > 
                        <div className = "col" > 
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                            comments={props.comments} 
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            )
        } 
        return <div></div>;
    }



export default CampsiteInfo;