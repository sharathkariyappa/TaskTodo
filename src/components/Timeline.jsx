import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

const Timeline = (props) => {
	return (
		<VerticalTimeline>
			<VerticalTimelineElement
				className={`vertical-timeline-element--work font-bold ${props.animate}`}
				contentStyle={{ background: `${props.color || 'rgb(33, 150, 243)'}`, color: '#fff' }}
				contentArrowStyle={{ borderRight: `${props.color || 'rgb(33, 150, 243)'}` }}
				date={props.date}
				iconStyle={{ background: `${props.color || 'rgb(33, 150, 243)'}`, color: '#fff' }}
				icon={props.icon}
				position={props.position || 'left'}
			>
				<h3 className="vertical-timeline-element-title">{props.title}</h3>

				<p>{props.text}</p>
			</VerticalTimelineElement>
		</VerticalTimeline>
	)
}

export default Timeline
