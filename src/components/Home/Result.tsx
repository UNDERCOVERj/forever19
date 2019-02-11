import * as React from 'react';
// import moment from 'moment';

export default class Result extends React.Component {
    state = {
        time: Date.now()
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: Date.now()
            })
        }, 1000)

    }
    render() {
        return (
            <div className="result">
                <iframe 
                    frameBorder='no'
                    width={330} 
                    height={86} 
                    src='//music.163.com/outchain/player?type=2&id=29932432&auto=0&height=66'/>
                <h2>祝：</h2>
                <h2>圣诞快乐</h2>
                <h2>元旦快乐</h2>
                <h2>除夕快乐</h2>
                <h2>情人节快乐</h2>
                {/* <h3>{moment(new Date(this.state.time)).format('YYYY-MM-DD HH:mm:ss')}</h3> */}
            </div>
        )
    }
}