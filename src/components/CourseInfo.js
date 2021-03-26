import  React, { Component } from  'react';
import  djangoService  from  '../api/djangoapi';
import {Table} from 'reactstrap';

const  django =  new  djangoService();

export default class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_info: [],
        };
    }

    componentDidMount() {
        var self = this;
        django.getcourse().then(function (result) {
            console.log(result);
            self.setState({course_info: result})
        });
    }
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>price</th>
                      <th>room</th>
                      <th>schedule</th>
                      <th>start_time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.state.course_info.map((a) =>
                            <>
                            <th scope="row">{a._id}</th>
                            <td>{a.name}</td>
                            <td>{a.price}</td>
                            <td>{a.room}</td>
                            <td>{a.schedule}</td>
                            <td>{a.start_time}</td>
                            </>
                            )
                        }
                    </tr>
                </tbody>
            </Table>
        )
    }
}