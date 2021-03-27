import  React, { Component } from  'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import  djangoService  from  '../api/djangoapi';
import {MDBCol, MDBContainer, MDBTreeview, MDBTreeviewList, MDBTreeviewItem, MDBRow} from "mdbreact";
import axios from "axios"
const  django =  new  djangoService();

export default class CreateCourse extends Component {
    constructor(props) {
    super(props);
        this.state = {
            KPs: [],
            courses: '',
            price:'',
            duration:'',
            start_time:'',
            room:'',
            teacherid:'',
            course_info: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var  self  =  this;
      django.getKP().then(function (result) {
        console.log(result);
          self.setState({ KPs:  result})
      });
    }



    handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: this.state.courses,
      price: this.state.price,
      duration: this.state.duration,
      corr_KPs:[{
                "tree_id": "1.9.1.1.1",
                "name": "Căn bậc hai",
            }],
      room: this.state.room,
      teacher_id: this.state.teacherid,
      start_time: this.state.start_time,
      schedule: "['monday_morning', 'tuesday_afternoon', 'wednesday_evening']",
    };

    axios.post(`https://45.64.126.93:8000/api/courses/`, {
      "name": this.state.courses,
      "price": this.state.price,
      "duration": this.state.duration,
      "corr_KPs":[{
                "tree_id": "1.9.1.1.1",
                "name": "Căn bậc hai",
            }],
      "room": this.state.room,
      "teacher_id": this.state.teacherid,
      "start_time": this.state.start_time,
      "schedule": "['monday_morning', 'tuesday_afternoon', 'wednesday_evening']",
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

    render(){

        return (
            <Form
                >
                  <FormGroup>
                    <Label for="Course">Course</Label>
                    <Input
                      type="text"
                      name="course"
                      placeholder="with a placeholder"
                      onChange={(event) => this.setState({courses: `${event.target.value}`})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="KP">KP</Label>
                    <MDBContainer header='Animated'>
                        <MDBRow>
                        <MDBCol md='6'>
                          <MDBTreeview
                            theme='animated'
                            header='Folders'
                            className='w-20'
                            style={{
                            maxHeight: '400px',
                            overflowY: 'auto'}}
                          >
                            {this.state.KPs.map((a)  =>
                              <MDBTreeviewList title={a.name}  far open>
                                {a.subset.map((b)  =>
                                  <MDBTreeviewList title={b.name} far open>
                                    {b.subset.map((c)  =>
                                      <MDBTreeviewList title={c.name} far open>
                                        {c.subset.map((d)  =>
                                          <MDBTreeviewList title={d.name} far open>
                                            {d.subset.map((e)  =>
                                              <MDBTreeviewItem  title={e.name} far onClick={() =>this.setState({courseinfo : e.name})}/>
                                            )}
                                          </MDBTreeviewList>
                                        )}
                                      </MDBTreeviewList>
                                    )}
                                  </MDBTreeviewList>
                                )}
                              </MDBTreeviewList>
                            )}
                          </MDBTreeview>
                        </MDBCol>
                        <MDBCol md='6'>
                            <div ref='KP'>{this.state.courseinfo}</div>
                        </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      placeholder="price placeholder"
                      onChange={(event) => this.setState({price: `${event.target.value}`})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Duration">Duration</Label>
                    <Input
                      type="number"
                      name="duration"
                      placeholder="duration placeholder"
                      onChange={(event) => this.setState({duration: `${event.target.value}`})}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="room">Type</Label>
                  <Input type="select" name="type" onChange={(event) => this.setState({room: `${event.target.value}`})}>
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
                      onChange={(event) => this.setState({teacherid: `${event.target.value}`})}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="Start_time">Start time</Label>
                  <Input
                    type="time"
                    name="time"
                    placeholder="time placeholder"
                    onChange={(event) => this.setState({start_time: `${event.target.value}`})}
                  />
                  </FormGroup>
                <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
        );
    }
}