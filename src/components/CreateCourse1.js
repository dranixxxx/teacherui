import  React, { useState, useEffect } from  'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import  djangoService  from  '../api/djangoapi';
import {MDBCol, MDBContainer, MDBTreeview, MDBTreeviewList, MDBTreeviewItem, MDBRow} from "mdbreact";
import axios from 'axios';


export default function CreateCourse1() {

    const  django =  new  djangoService();
    const [KPs, setKPs] = useState();


    console.log(django.getKP())

    useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://45.64.126.93:8000/api/KPs-nested/',
      );
      setKPs(result.data);
    };
    fetchData();
  }, []);

console.log(KPs);
        return (
            <div>a</div>
            // <Form
            //     //onSubmit={this.handleSubmit}
            //     >
            //       <FormGroup>
            //         <Label for="Course">Course</Label>
            //         <Input
            //           type="text"
            //           name="course"
            //           placeholder="with a placeholder"
            //           ref='name'
            //         />
            //       </FormGroup>
            //       <FormGroup>
            //         <Label for="KP">KP</Label>
            //         {/*<MDBContainer header='Animated'>*/}
            //         {/*    <MDBRow>*/}
            //         {/*    <MDBCol md='6'>*/}
            //         {/*      <MDBTreeview*/}
            //         {/*        theme='animated'*/}
            //         {/*        header='Folders'*/}
            //         {/*        className='w-20'*/}
            //         {/*        style={{*/}
            //         {/*        maxHeight: '400px',*/}
            //         {/*        overflowY: 'auto'}}*/}
            //         {/*      >*/}
            //                 {/*{KPs.map((a, id1)  =>*/}
            //                 {/*  <MDBTreeviewList title={a.name} key={{id1}} far open>*/}
            //                 {/*    {a.subset.map((b, id2)  =>*/}
            //                 {/*      <MDBTreeviewList title={b.name} key={{id2}}far open>*/}
            //                 {/*        {b.subset.map((c, id3)  =>*/}
            //                 {/*          <MDBTreeviewList title={c.name} key={{id3}}far open>*/}
            //                 {/*            {c.subset.map((d, id4)  =>*/}
            //                 {/*              <MDBTreeviewList title={d.name} key={{id4}}far open>*/}
            //                 {/*                {d.subset.map((e, id5)  =>*/}
            //                 {/*                  <MDBTreeviewItem  title={e.name} key={{id5}} far onClick={() =>this.setState({courseinfo : e.name})}/>*/}
            //                 {/*                )}*/}
            //                 {/*              </MDBTreeviewList>*/}
            //                 {/*            )}*/}
            //                 {/*          </MDBTreeviewList>*/}
            //                 {/*        )}*/}
            //                 {/*      </MDBTreeviewList>*/}
            //                 {/*    )}*/}
            //                 {/*  </MDBTreeviewList>*/}
            //                 {/*)}*/}
            //         {/*      </MDBTreeview>*/}
            //         {/*    </MDBCol>*/}
            //         {/*    <MDBCol md='6'>*/}
            //         {/*        /!*<div>{this.state.courseinfo}</div>*!/*/}
            //         {/*    </MDBCol>*/}
            //         {/*    </MDBRow>*/}
            //         {/*</MDBContainer>*/}
            //       </FormGroup>
            //       <FormGroup>
            //       <Label for="Duration">Duration</Label>
            //       <Input
            //         type="time"
            //         name="time"
            //         id="exampleTime"
            //         placeholder="time placeholder"
            //         ref='Duration'
            //       />
            //       </FormGroup>
            //       <FormGroup>
            //       <Label for="Type">Type</Label>
            //       <Input type="select" name="type" ref='Type'>
            //         <option>VCP</option>
            //         <option>Zoom</option>
            //         <option>Moodle</option>
            //       </Input>
            //     </FormGroup>
            //       <FormGroup>
            //         <Label for="Price">Price</Label>
            //         <Input
            //           type="number"
            //           name="price"
            //           placeholder="price placeholder"
            //           ref='price'
            //         />
            //       </FormGroup>
            //       <button type="submit" className="btn btn-primary">
            //         Submit
            //       </button>
            //     </Form>
        );
    }