import { PermMedia } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';

const ImageUploads = (props: { uploaded: (url: string) => void }) => {
	const setFile = async (files: FileList | null) => {
		if (files === null) return;

		const formData = new FormData();
		formData.append('image', files[0]);

		const { data } = await axios.post('upload', formData);
		console.log(data);
		props.uploaded(data.url);
	};
	return (
		<div>
			<label htmlFor="file" className="post-option">
				<PermMedia htmlColor="tomato" className="post_icons" />
				<span className="post_option-text">Photos</span>
				<input
					style={{ display: 'none' }}
					type="file"
					id="file"
					hidden
					accept=".png, .jpg, .jpeg"
					onChange={(e) => setFile(e.target.files)}
				/>
			</label>
		</div>
	);
};

export default ImageUploads;
