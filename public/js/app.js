console.log(window.location.pathname);
switch (window.location.pathname) {
	case "/":
		let carousel = 
			new Splide('.splide', {
				type: 'loop',
				autoWidth: true,
				gap: '1rem',
				pagination: false,
			}).mount();
		break;
	default:
		break;
}


(function setHeight() {
	const getInt = (element, property) => {
		const style = window.getComputedStyle(element);
		return parseInt(style.getPropertyValue(property)) || 0;
	}
	const header = document.querySelector('.header');
	const main = document.querySelector('.main');
	const footer = document.querySelector('.footer');
	const height = window.innerHeight -
		(getInt(header, 'height') + getInt(header, 'margin-top') + getInt(header, 'margin-bottom')) -
		(getInt(footer, 'height') + getInt(footer, 'margin-top') + getInt(footer, 'margin-bottom'));
	main.style.minHeight = `${height}px`;
})()
