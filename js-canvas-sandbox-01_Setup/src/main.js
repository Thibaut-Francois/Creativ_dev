const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

console.log(context);
























/*

const size = 100;
context.fillStyle = 'red';
context.beginPath();

context.translate(100, 100);

//context.resetTransform();

context.rotate(Math.PI / 4);

context.save(); // sauvegarde le contexte
context.restore(); // restaure le contexte

context.rect(-size/2, -size/2, size, size); // pour prendre le milieu du carré

context.rect(0, 0, size, size);
context.fill();

context.closePath();

*/




/*

// RECTANGLES (shortcut)

context.fillStyle = 'greenyellow';
context.strokeStyle = 'red';
context.lineWidth = 5;
context.fillRect(100, 100, 100, 100);
context.strokeRect(100, 100, 100, 100);

// RECTANGLES (path)

context.fillStyle = 'red';
context.strokeStyle = 'greenyellow';
context.beginPath();
context.rect(300, 200, 100, 100);
context.fill();
context.stroke();

context.closePath();


// CERCLES ET ARCS

// TEMA LE PRODUIT EN CROIX
const deg2rad = (deg) => deg * Math.PI / 180;

context.beginPath();
context.arc(100, 300, 50, 0, deg2rad(180));
context.fillStyle = 'lightblue';
context.fill();

context.closePath();


// FREE PATH (ligne droite)


context.beginPath();
context.strokeStyle = 'lightcoral';
context.moveTo(200, 350);
context.lineTo(500, 350);
context.lineTo(350, 500);
context.lineTo(350, 350);
context.stroke();

context.closePath();


// COURDES DE BEZIER

context.beginPath();
context.moveTo(200, 350);
context.bezierCurveTo(550, 30, -50, 200, 300, 600);
context.bezierCurveTo(300, 600, 50, 100, 200, 200);
context.stroke();

context.closePath();

*/