import  React, { Component } from  'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import  djangoService  from  '../api/djangoapi';
import {MDBCol, MDBContainer, MDBTreeview, MDBTreeviewList, MDBTreeviewItem, MDBRow} from "mdbreact";

const  django =  new  djangoService();

export default class CreateCourse extends Component {
    constructor(props) {
    super(props);
        this.state = {
            KPs: [],
            courses: [],
            course_info: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //   var  self  =  this;
    //   django.getKP().then(function (result) {
    //     console.log(result);
    //       self.setState({ KPs:  result})
    //   });
    // }

    // componentDidMount(){
    //     const { match: { params } } = this.props;
    //     if(params && params.id)
    //     {
    //       django.getcourse(params.id).then((c)=>{
    //         this.refs.name.value = c.name;
    //         //this.refs.KP.value = c.corr_KPs.name;
    //         this.refs.duration.value = c.duration;
    //         this.refs.room.value = c.room;
    //         this.refs.teacherid.value = c.teacherid;
    //         this.refs.start_time.value = c.start_time;
    //         //this.refs.start_time.value = c.description;
    //       })
    //     }
    //   }

    handleCreate(){
        console.log(this.ref.name.value)
        django.createcourse(
          {
            "name": this.ref.name.value,
            //this.refs.KP.value = c.corr_KPs.name;
            "price": this.ref.price.value,
            "duration": this.ref.duration.value,
            "room": this.ref.room.value,
            "teacher_id": this.ref.teacher_id.value,
            "start_time": this.ref.start_time.value,
            //this.refs.start_time.value = c.description;
        }
        ).then((result)=>{
          alert("Course created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
            this.handleCreate();
        event.preventDefault();
    }

    render(){

        return (
            <Form onSubmit={this.handleSubmit}
                >
                  <FormGroup>
                    <Label for="Course">Course</Label>
                    <Input
                      type="text"
                      name="course"
                      placeholder="with a placeholder"
                      ref='name'
                    />
                  </FormGroup>
                  {/*<FormGroup>*/}
                  {/*  <Label for="KP">KP</Label>*/}
                  {/*  <MDBContainer header='Animated'>*/}
                  {/*      <MDBRow>*/}
                  {/*      <MDBCol md='6'>*/}
                  {/*        <MDBTreeview*/}
                  {/*          theme='animated'*/}
                  {/*          header='Folders'*/}
                  {/*          className='w-20'*/}
                  {/*          style={{*/}
                  {/*          maxHeight: '400px',*/}
                  {/*          overflowY: 'auto'}}*/}
                  {/*        >*/}
                  {/*          {this.state.KPs.map((a)  =>*/}
                  {/*            <MDBTreeviewList title={a.name}  far open>*/}
                  {/*              {a.subset.map((b)  =>*/}
                  {/*                <MDBTreeviewList title={b.name} far open>*/}
                  {/*                  {b.subset.map((c)  =>*/}
                  {/*                    <MDBTreeviewList title={c.name} far open>*/}
                  {/*                      {c.subset.map((d)  =>*/}
                  {/*                        <MDBTreeviewList title={d.name} far open>*/}
                  {/*                          {d.subset.map((e)  =>*/}
                  {/*                            <MDBTreeviewItem  title={e.name} far onClick={() =>this.setState({courseinfo : e.name})}/>*/}
                  {/*                          )}*/}
                  {/*                        </MDBTreeviewList>*/}
                  {/*                      )}*/}
                  {/*                    </MDBTreeviewList>*/}
                  {/*                  )}*/}
                  {/*                </MDBTreeviewList>*/}
                  {/*              )}*/}
                  {/*            </MDBTreeviewList>*/}
                  {/*          )}*/}
                  {/*        </MDBTreeview>*/}
                  {/*      </MDBCol>*/}
                  {/*      <MDBCol md='6'>*/}
                  {/*          <div ref='KP'>{this.state.courseinfo}</div>*/}
                  {/*      </MDBCol>*/}
                  {/*      </MDBRow>*/}
                  {/*  </MDBContainer>*/}
                  {/*</FormGroup>*/}
                  <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      placeholder="price placeholder"
                      ref='price'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Duration">Duration</Label>
                    <Input
                      type="number"
                      name="duration"
                      placeholder="duration placeholder"
                      ref='duration'
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="room">Type</Label>
                  <Input type="select" name="type" ref='room'>
                    <option>VCP</option>
                    <option>Zoom</option>
                    <option>Moodle</option>
                  </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="teacherid">teacher</Label>
                    <Input
                      type="text"
                      name="teacher"
                      placeholder="price placeholder"
                      ref='teacherid'
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="Start_time">Start time</Label>
                  <Input
                    type="time"
                    name="time"
                    placeholder="time placeholder"
                    ref='start_time'
                  />
                  </FormGroup>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Form>
        );
    }
}