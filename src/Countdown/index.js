import React, { Component } from 'react';
import moment from 'moment';

class Countdown extends Component {
	constructor(){
		super();
		this.state = {
			days: null,
			hours: null,
			minutes: null,
			seconds: null
		};
	}
	componentDidMount(){
		this.interval = setInterval(() => {
			const { timeTilDate, timeFormat } = this.props;
			const then = moment(timeTilDate, timeFormat);
			const now = moment();
			const countdown = moment(then - now);
			const days = countdown.format('DDD');
			const hours = countdown.format('HH');
			const minutes = countdown.format('mm');
			const seconds = countdown.format('ss');
			this.setState({ days, hours, minutes, seconds });
		}, 1000);
	}
	componentWillUnmount(){
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	render() {
		const { days, hours, minutes, seconds } = this.state;

        const daysRadius = mapNumber(days, 280, 0, 360, 0);
        const hoursRadius = mapNumber(hours, 24, 0, 360, 0);
        const minutesRadius = mapNumber(minutes, 60, 0, 360, 0);
        const secondsRadius = mapNumber(seconds, 60, 0, 360, 0);
        
        if (!seconds) {
            return null;
        }

		return(
			<div>
				<div className="countdown-wrapper">
					{days && (
						<div className="countdown-item">
							<SVGCircle  radius={daysRadius} />
							{days}
							<span>days</span>
						</div>
					)}
					{hours && (
						<div className="countdown-item">
						<SVGCircle radius={hoursRadius} />
	                        {hours}
	                        <span>hours</span>
	                    </div>
					)}
					{minutes && (
	                    <div className="countdown-item">
	                    <SVGCircle radius={minutesRadius} />
	                        {minutes}
	                        <span>minutes</span>
	                    </div>
					)}
					{seconds && (
	                    <div className="countdown-item">
	                    <SVGCircle radius={secondsRadius} />
	                        {seconds}
	                        <span>seconds</span>
	                    </div>
					)}
				</div>
			</div>
			)
	}
}

const SVGCircle = ({ radius }) => (
	<svg className="countdown-svg">
		<path
			fill="none"
			stroke="#333"
			strokeWidth="4"
			d={describeArc(50, 50, 48, 0, radius)}
		/>
	</svg>
	);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');
    
    return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}


export default Countdown;