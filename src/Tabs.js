import React, { useState } from 'react';

function TabItem({ active, onSelect, item }) {
    return (
        <li
            className="nav-item"
            onClick={onSelect}>
            <a className={ active ? "nav-link active" : "nav-link" } href="#">
                {item.label}
            </a>
        </li>
    )
}

function Tabs(props) {
    const {data} = props
    const [activeIndex, setActiveIndex] = useState(0)

    if (data.length === 0) {
        return <p>No tab content defined</p>
    }

    return (
        <div>
            <ul className="nav nav-tabs">
                {data.map((item, index) => (
                    <TabItem
                        active={activeIndex === index}
                        onSelect={() => setActiveIndex(index)}
                        item={item}
                        key={index}
                    />
                ))}
            </ul>
            <div>{data[activeIndex].content}</div>
        </div>
    )
}

export default Tabs;
