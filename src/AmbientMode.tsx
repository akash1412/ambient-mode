import React from "react";
import "./AmbientMode.css";
import useAmbientMode from "./hooks/useAmbientMode";
import { AmbientModeProps } from "./types/type";

export const AmbientMode = (props: AmbientModeProps) => {
	const { children } = props;
	const { canvasRef, videoRef } = useAmbientMode();
	return (
		<div className='wrapper'>
			{React.Children.map(children, child => {
				if (React.isValidElement(child) && child.type === "video") {
					return React.cloneElement(child, {
						className: "video",
						ref: (element: HTMLVideoElement | null) => {
							if (videoRef && element) {
								videoRef.current = element;
							}
						},
					} as unknown as React.DetailedReactHTMLElement<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>);
				}
				return child;
			})}
			<canvas
				width='10'
				height='6'
				aria-hidden='true'
				className='canvas'
				ref={canvasRef}></canvas>
		</div>
	);
};
