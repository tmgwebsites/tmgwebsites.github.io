import React from 'react';
import {
    Typography
} from '@material-ui/core';
import {
    withStyles
} from '@material-ui/core';
import withMediaQuery from 'common/common.js';
import './styles/banner.scss';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId1 = {};
        this.intervalId2 = {};
        this.state = {
            text: '',
            count: 0,
            textCount: 0
        }
    }
    componentDidMount() {
        this.typeWriter();
    }


    componentWillUnmount() {
        clearInterval(this.intervalId1);
        clearInterval(this.intervalId2);
    }

    typeWriter() {
        const texts = ["THE HERD", "THE HOME OF MARKETING", "THE MARKETING GROUP"]
        this.intervalId1 = setInterval(() => {
            this.setState(prevState => ({
                count: (prevState.count === texts.length - 1 ? 0 : prevState.count + 1),
                textCount: 1
            }));
        }, 5000);
        this.intervalId2 = setInterval(() => {
            const {
                count,
                textCount
            } = this.state;
            if (textCount !== texts[count].length + 1) {
                this.setState(prevState => ({
                    text: texts[count].substring(0, textCount),
                    textCount: prevState.textCount + 1
                }));
            }
        }, 125);
    }

    render() {
        const {
            text
        } = this.state;
        const StyledFont = withStyles({
            h2: {
                fontSize: this.props.mediaQuery ? "4rem" : "2.5rem",
            }
        })(Typography);
        return ( <
            div className = "banner" >
            <
            span >
            <
            StyledFont variant = "h2"
            className = "banner__text" > {
                `Welcome to ${text}_`
            } < /StyledFont> <
            /span> <
            /div>
        );
    }
}

export default (withMediaQuery('(min-width:75rem)')(Banner));