import React from 'react';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import Topbar from '../../components/Topbar/Topbar';
import './PostList.css';

function PostList() {
	return (
		<>
			<Topbar />
			<div className="post_list">
				<DashSidebar />
				PostList
			</div>
			;
		</>
	);
}

export default PostList;
