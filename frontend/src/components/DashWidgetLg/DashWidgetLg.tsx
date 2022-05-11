import React from 'react';
import './DashWidgetLg.css';

function DashWidgetLg() {
	const Button: React.FC<{ type: string }> = (props) => {
		return (
			<button className={'widget-lg-btn ' + props.type}>
				{props.type}
			</button>
		);
	};
	return (
		<div className="widget_lg">
			<h3 className="dash_widget-title">Dernières publications</h3>
			<table className="dash_widget-table">
				<thead>
					<tr className="widget_dash-tr">
						<th className="dash_widget-th">Posts</th>
						<th className="dash_widget-th">Date</th>
						<th className="dash_widget-th">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr className="dash_widget-tr">
						<td className="dash_widget-post">
							<img
								src="/assets/meet.png"
								alt="Utilisateur"
								className="dash_widget-img"
							/>
							<span className="dash_widget-name">
								Réunion préparation projet
							</span>
						</td>
						<td className="dash_widget-date">05 Mars 2022</td>
						<td className="dash_widget-status">
							<Button type="conforme"></Button>
						</td>
					</tr>
					<tr className="dash_widget-tr">
						<td className="dash_widget-post">
							<img
								src="/assets/meet.png"
								alt="Utilisateur"
								className="dash_widget-img"
							/>
							<span className="dash_widget-name">
								Réunion préparation projet
							</span>
						</td>
						<td className="dash_widget-date">05 Mars 2022</td>
						<td className="dash_widget-status">
							<Button type="conforme"></Button>
						</td>
					</tr>
					<tr className="dash_widget-tr">
						<td className="dash_widget-post">
							<img
								src="/assets/meet.png"
								alt="Utilisateur"
								className="dash_widget-img"
							/>
							<span className="dash_widget-name">
								Réunion préparation projet
							</span>
						</td>
						<td className="dash_widget-date">05 Mars 2022</td>
						<td className="dash_widget-status">
							<Button type="signalé"></Button>
						</td>
					</tr>
					<tr className="dash_widget-tr">
						<td className="dash_widget-post">
							<img
								src="/assets/meet.png"
								alt="Utilisateur"
								className="dash_widget-img"
							/>
							<span className="dash_widget-name">
								Réunion préparation projet
							</span>
						</td>
						<td className="dash_widget-date">05 Mars 2022</td>
						<td className="dash_widget-status">
							<Button type="conforme"></Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default DashWidgetLg;
