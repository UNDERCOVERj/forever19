import * as React from 'react';
import {Form, Button, Input, Icon, Radio, message, Spin} from 'antd';
import { withRouter } from "react-router";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import axios from 'axios';

class AddForm extends React.Component<{}, {}> {
    state = {
        loading: false
    }
    constructor(props: any) {
        super(props);
    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {
                    userName,
                    phone,
                    professional,
                    sex,
                    address
                } = values;
                let params = {
                    userName,
                    phone,
                    professional,
                    sex,
                    address 
                }
                this.setState({loading: true});
                axios.post('/api/add', params)
                .then((res: any) => {
                    let data = res.data;
                    if (data.code == 200) {
                        message.success('添加成功');
                        this.setState({loading: false});
                        this.props.history.push('/lejunjie/result');
                    } else if (data.code == 500) {
                        message.error(data.msg);
                    }
                })
                .catch(e => this.setState({loading: false}))
            }
        })
    }
    render() {
        let {form: {getFieldDecorator}} = this.props;
        let {loading} = this.state;
        return (
            <Spin spinning={loading}>
                <div className="container">
                    <div className="add-form">
                        <h3 className='title'>19班丢失人口调查</h3>
                        <Form onSubmit={this.submit}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '姓名', whitespace: true }],
                                })(
                                    <Input
                                        placeholder='姓名'
                                        addonBefore={<Icon type="user" />}
                                        size='small'/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: '请输入手机号', whitespace: true}]
                                })(
                                    <Input
                                        placeholder='手机号'
                                        addonBefore={<Icon type="phone" />}
                                        size='small'/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('professional', {
                                    rules: [{required: true, message: '请输入职业', whitespace: true}]
                                })(
                                    <Input
                                        placeholder='职业'
                                        addonBefore={<Icon type="book" />}
                                        size='small'/>
                                )}
                            </FormItem>
                            <FormItem className='add-form-sex'>
                                {getFieldDecorator('sex', {
                                        rules: [{required: true, message: '请输入性别'}],
                                        initialValue: 'male'
                                })(
                                        <RadioGroup>
                                            <Icon className='sex-icon' type="man" />
                                            <Radio key='male' value='male'>
                                                <span>男</span>
                                            </Radio>
                                            <Radio key='female' value='female'>
                                                <span>女</span>
                                            </Radio>
                                        </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('address', {
                                    rules: [{required: true, message: '请输入联系住址', whitespace: true}]
                                })(
                                    <Input
                                        placeholder='联系住址'
                                        addonBefore={<Icon type="global" />}
                                        size='small'/>
                                )}
                            </FormItem>
                            <div className="bottom">
                                <Button type='primary' block ghost='true' htmlType="submit">添加</Button>
                            </div>
                            <div className="endnote">
                                <span>Copyright © 2018 lejunjie</span>
                            </div>
                        </Form>
                    </div>
                </div>
            </Spin>  
        )
    }
}

export default withRouter(Form.create<{}>()(AddForm))