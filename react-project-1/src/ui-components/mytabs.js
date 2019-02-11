import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    render() {
        const title = this.state.posts.map((x) => {
            return (<Tab key={x.id}>{x.id}</Tab>)

        });
        const text = this.state.posts.map((x) => {
            return (<TabPanel key={x.id}>{x.title}</TabPanel>)
        });
        const displayTab = (
            <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                <TabList>
                    {title}
                </TabList>
                {text}
            </Tabs >
        );
        return(
            <div>
                <h2>My Tabs</h2>
                {displayTab}
            </div>

        );
    }
}


export default MyTabs;