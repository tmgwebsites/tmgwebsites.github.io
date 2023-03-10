import React from 'react';
import {
    Container,
    Tabs,
    Tab,
    withStyles
} from '@material-ui/core';
import {
    Typography
} from '@material-ui/core';
import Members from './members';

import './styles/team.scss';

const StyledTab = withStyles(theme => ({
        root: {
            fontFamily: 'UniSans',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: "1.5rem",
        },
    }))(props => < Tab { ...props
        }
        />);

        function Team(props) {
            const [value, setValue] = React.useState(0);
            return ( <
                div className = "team" >
                <
                Container maxWidth = "lg" >
                <
                Typography variant = "h1"
                className = "team__header"
                color = "primary" > Meet our Team < /Typography> <
                div className = "team__container" >
                <
                Tabs indicatorColor = "primary"
                textColor = "primary"
                value = {
                    value
                }
                onChange = {
                    (event, newValue) => {
                        setValue(newValue)
                    }
                }
                aria - label = "Role Tabs"
                variant = "scrollable" >
                <
                StyledTab label = "President" / >
                <
                StyledTab label = "Vice Presidents" / >
                <
                StyledTab label = "Directors" / >
                <
                StyledTab label = "Board of Directors" / >
                <
                StyledTab label = "Associates" / >
                <
                /Tabs> <
                /div> <
                Members tab = {
                    value
                }
                /> <
                /Container> <
                /div>
            );
        }

        export default Team;