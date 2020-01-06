import React, { Component } from 'react'; 
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends React.Component{
    //add a method named renderCampsite(), above the render() method
    renderCampsite(campsite){
        return(
            //add a jsx div element with the classes col-md-5 and m1
            <div class="col-md-5 m-1">
                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name}></CardImg>
                        <CardBody>
                            <CardTitle>{campsite.name}</CardTitle>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
            </div>           
        )
    };

    renderComments(comments) {
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
                </div>
            )
        }
        return <div></div>;
    };
    
    render() {
        if (this.props.campsite) {
            return ( 
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            )
        } 
        return <div></div>;
    }
}


export default CampsiteInfo;