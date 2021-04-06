import  React, { Component } from  'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import  djangoService  from  '../api/djangoapi';
import {MDBCol, MDBContainer, MDBTreeview, MDBTreeviewList, MDBTreeviewItem, MDBRow} from "mdbreact";

var django =  new  djangoService();
var a=[];

export default class CreateCourse extends Component {
    constructor(props) {
    super(props);
        this.state = {
            KPs: [],
            courses: [],
            course_info: [],
            isRedirect:false
            
        };
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
      var  self  =  this;
      django.getKP().then(function (result) {
        console.log(result);
          self.setState({ KPs:  result})
      });
    }

    // componentDidMount(){
    //     const { match: { params } } = this.props;
    //     if(params && params.id)
    //     {
    //       django.getcourse(params.id).then((c)=>{
    //         this.ref.name.value = c.name;
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
        console.log(this.state.course);
        django.createcourse(
          {
            "name": this.ref.name.value,
            //this.ref.KP.value = c.corr_KPs.name;
            "price": this.ref.price.value,
            "duration": this.ref.duration.value,
            "room": this.state.room,
            "teacher_id": this.state.teacher,
            "start_time": this.state.time,
            //this.refs.start_time.value = c.description;
        }
        ).then((result)=>{
          alert("Course created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
       
       console.log( django);

    }


    isChange=(event)=>{
    const ten=event.target.name;
    const giatri=event.target.value;
    this.setState({[ten]:giatri});
    console.log(this.state);
}



addA(items,key){
  a.push(items);
  this.setState({course_info:a});
}

addB(key){
  this.state.course_info[key]="";
  var a=[];
   a=this.state.course_info;
  this.setState({course_info:a});
}

showData(){
  for (var i = this.state.course_info.length - 1; i >= 0; i--) {
        return (this.state.course_info[i]+"/");
  }
}

submitForm=(event)=>{
  event.preventDefault();
   console.log(this.state.course);
        django.createcourse(
          {
            "name": this.state.course,
            //this.ref.KP.value = c.corr_KPs.name;
            "price": this.state.price,
            "duration": this.state.duration,
            "room": this.state.room,
            "teacher_id": this.state.teacher,
            "start_time": this.state.time,
            //this.refs.start_time.value = c.description;
        }
        ).then((result)=>{
          alert("Course created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
       
       console.log( django);
   
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
                      ref='name'
                      onChange={(event)=>this.isChange(event)}
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
                                           {d.subset.map((e,key)  =>
                                             <MDBTreeviewItem  title={e.name} far onClick={() =>this.addA(e.name,key)}/>
                                           )}s
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
                          {this.state.course_info.map((vl,key)=>{
                                  if(vl!=""){
                                  return(
                                   <MDBRow>
                                  <MDBCol md={6}>
                                  <div>{vl}</div>
                                  </MDBCol>
                                   <MDBCol md={6}>
                                  <div onClick={() =>this.addB(key)}>xoa</div>
                                  </MDBCol>
                                  </MDBRow>
                                  );
                         } })}
                          
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
                      onChange={(event)=>this.isChange(event)}
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
                      onChange={(event)=>this.isChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="room">Type</Label>
                  <Input type="select" name="room" ref='room' onChange={(event)=>this.isChange(event)}>
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
                      onChange={(event)=>this.isChange(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="Start_time">Start time</Label>
                  <Input
                    type="time"
                    name="time"
                    placeholder="time placeholder"
                    ref='start_time'
                    onChange={(event)=>this.isChange(event)}
                  />
                  </FormGroup>
                  <button type="submit" className="btn btn-primary" onClick={(event)=>this.submitForm(event)}>
                    Submit
                  </button>
                </Form>
        );
    }
}