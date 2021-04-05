import React,{Component} from 'react';
import dl from '../components/data1.json'
import CreateCourse from '../components/CreateCourse';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";

 class TeacherPage extends Component{

	render() {

    console.log(dl);
		return (
		    <>
            <Row>
          <Col md="8" sm="12" xs="12">
            <Card>
              <CardHeader>Tạo khóa học</CardHeader>
              <CardBody>
                <CreateCourse/>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
          </Col>
            </Row>
</>
		);
	}
};

export default TeacherPage;