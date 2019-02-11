import * as React from 'react';
import AddForm from './AddForm'
import Result from './Result';
import {Button, message} from 'antd';
import { Route, Switch } from 'react-router-dom';
import BGParticle from '@src/utils/background.js';
import './index.scss';
import backgroundImage from '@src/assets/background.jpg';
import XLSX from 'xlsx';
// import FileSaver from 'file-saver';
// import axios from 'axios';
const styles = {
    backgroundBox:{
        position:'fixed',
        top:'0',
        left:'0',
        width:'100vw',
        height:'100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize:'100% 100%'
    }
}
export default class Login extends React.Component<{}, {}> {
    particle: any;
    constructor(props) {
        super(props);
    }
    // 绘制背景
    componentDidMount () {
        this.particle = new BGParticle('backgroundBox')
        this.particle.init()
    }
    export = () => {
        // let data = [];
        // axios.get('/api/info')
        //     .then((res) => {
        //         data = res.data.data.length && res.data.data;
        //         this.exportFile(data);
        //     })
        //     .catch(e => {
        //         message.error('出错啦');
        //     })
        window.location.href = '/api/info';
    }
    // exportFile = (data: any) => {
    //     let header = {
    //         oldBanzhuren: '原班主任',
    //         oldClass: '原班级',
    //         userName: '姓名',
    //         phone: '手机号',
    //         address: '联系地址',
    //         professional: '职业',
    //         sex: '性别'
    //     }
    //     data = data.map((item) => ({
    //         oldBanzhuren: '袁玉珍',
    //         oldClass: '19',
    //         userName: item.userName,
    //         phone: item.phone,
    //         address: item.address,
    //         professional: item.professional,
    //         sex: item.sex === 'male' ? '男' : '女'
    //     }))
    //     let ws = XLSX.utils.json_to_sheet(data);
    //     Object.keys(ws).forEach((key) => {
    //         if(header[ws[key].v]) {
    //             ws[key].v = header[ws[key].v];
    //         }
    //     })
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    //     const wbout = XLSX.write(wb, {type:"array", bookType:"xlsx"});
    //     FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), "sheetjs.xlsx");
    // }
    render() {
        return (
            <div className='home'>
                <div style={styles.backgroundBox} id='backgroundBox'/>
                <Button onClick={this.export} type='primary' size='small' style={{position: 'absolute', top: '.1rem', left: '.1rem', fontSize: '14px'}}>下载</Button>
                <Switch>
                    <Route path='/lejunjie/add' component={AddForm} />
                    <Route path='/lejunjie/result' component={Result} />
                </Switch>
            </div>
        )
    }
}