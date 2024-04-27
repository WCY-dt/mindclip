function hexToRgb(color: string) {
    return {
        r: parseInt(color.substring(1, 3), 16),
        g: parseInt(color.substring(3, 5), 16),
        b: parseInt(color.substring(5, 7), 16)
    };
}

function calculateBrightness({ r, g, b }: { r: number, g: number, b: number }) {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function generateRandomColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 6) {
        color = '0' + color;
    }
    return '#' + color;
}

export function getRandomColor(category: string) {
    let colorMap = JSON.parse(localStorage.getItem('colorMap') ?? '{}') || { 'default': '#d1ecf1' };

    if (!colorMap[category]) {
        let randomColor;
        do {
            randomColor = generateRandomColor();
        } while (calculateBrightness(hexToRgb(randomColor)) > 200);
        colorMap[category] = randomColor;
        localStorage.setItem('colorMap', JSON.stringify(colorMap));
    }

    return colorMap[category] || colorMap['default'];
}

export function getContrastColor(color: string) {
    const rgb = hexToRgb(color);
    const brightness = calculateBrightness(rgb);
    return (brightness >= 100) ? 'black' : 'white';
}