import React, { useRef } from "react";
import { FiImage } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx'

export default function ImagePicker({file,setFile}) {
	
	const [fileLink, setFileLink] = React.useState("");
	
	const fileInputRef = useRef(null);

	function handleChange(e) {
		const selectedFile = e.target.files[0];

		if (selectedFile && selectedFile.type.startsWith("image/")) {
			setFile(selectedFile);
			setFileLink(URL.createObjectURL(selectedFile));
		}
	}

	function handleIconClick() {
		fileInputRef.current.click();
	}

	function handleRemoveClick() {
		setFile(null);
	}

	return (
		<div className="App">
			<FiImage className='hover:cursor-pointer' color='#1D9BF0' onClick={handleIconClick} />
			<input type="file" ref={fileInputRef} onChange={handleChange} style={{ display: "none" }} accept="image/*" />
			
			{file && (
				<div style={{ position: "relative" }}>
					<div
						style={{
							position: "absolute",
							top: "5px",
							right: "5px",
							cursor: "pointer",
							fontSize: "20px",
							color: "#f00",
							backgroundColor:"#222222",
							borderRadius : "50%",
							padding : "2px 2px 2px 2px"
						}}
						onClick={handleRemoveClick}
					>
						<RxCross2 color='white' size={20}/>
					</div>
					<img src={fileLink} alt="Uploaded" />
				</div>
			)}

		</div>
	);
};
