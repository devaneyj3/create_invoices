export const drawText = (page, title, x, y, size, font, color) => {
	const { width, height } = page.getSize();
	page.drawText(title, {
		x: x,
		y: height - y * size,
		size: size,
		font: font,
		color: color,
	});
};
