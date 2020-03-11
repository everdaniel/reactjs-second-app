import React from 'react';

function TabItem(props) {
  const {tabData} = props

  return (
    <li className="nav-item">
        <button className="nav-link">{tabData.label}</button>
    </li>
    )
}

function Tabs(props) {
    const {data} = props

    if (data.length === 0) {
      return <p>No tab content defined</p>
    }

    return (
        <ul className="nav nav-tabs">
          { data.map((item) => <TabItem tabData={item} />)}
        </ul>
    );
}

export default Tabs;
