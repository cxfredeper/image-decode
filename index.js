"use strict";


async function generateFile() {
	let image = document.getElementById("in").files[0];
	let buffer = decodeImage(await image.arrayBuffer());

	let length = parseHeader(buffer);
	let payload = buffer.slice(4, 4+length);

	let blob = new Blob([payload], {type: "application/octet-stream"});
	out.download = "thing";
	out.href = URL.createObjectURL(blob);
	out.style.display = "inherit";
}


function parseHeader(buffer) {
	return (buffer[0] << 24) + (buffer[1] << 16) + (buffer[2] << 8) + buffer[3];
}


function decodeImage(buffer) {
	let img = UPNG.decode(buffer);
	return new Uint8Array(UPNG.toRGBA8(img)[0]);
}
