Certo, puoi modificare il codice per cambiare i cuoricini in stelle azzurre e adattare l'albero a un'altra forma. Segui questi passaggi per realizzare le modifiche:

1. **Aggiungi una funzione per disegnare le stelle**:
   Inserisci una funzione che disegna le stelle nel contesto del canvas.

2. **Modifica la classe `Bloom` per disegnare le stelle**:
   Adatta la classe `Bloom` in modo che utilizzi la nuova funzione per disegnare le stelle invece dei cuori.

3. **Modifica l'albero in un'altra forma (opzionale)**:
   Puoi cambiare la forma dell'albero in qualsiasi altra forma desideri, ad esempio un triangolo o un rettangolo.

Ecco il codice modificato:

### Aggiungi la funzione `drawStar`

```javascript
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (var i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}
```

### Modifica la classe `Bloom`

Modifica la classe `Bloom` per utilizzare la funzione `drawStar`:

```javascript
Bloom = function(tree, point, scale, color) {
    this.tree = tree;

    var scale = scale || 1;
    var color = color || 'blue';

    this.star = {
        point  : point,
        scale  : scale,
        color  : color,
    }
}
Bloom.prototype = {
    draw: function() {
        var ctx = this.tree.ctx;
        var star = this.star;
        var point = star.point;
        var color = star.color;
        var scale = star.scale;
        
        // Chiamata alla funzione che disegna le stelle
        drawStar(ctx, point.x, point.y, 5, 10 * scale, 5 * scale, color);
    },
    // Altri metodi rimangono invariati...
}
```

### Modifica la classe `Seed` (opzionale)

Se vuoi cambiare anche la forma dell'albero, puoi modificare la classe `Seed`. Ad esempio, per disegnare un triangolo:

```javascript
Seed = function(tree, point, scale, color) {
    this.tree = tree;

    var scale = scale || 1;
    var color = color || '#FF0000';

    this.triangle = {
        point  : point,
        scale  : scale,
        color  : color,
    }

    this.circle = {
        point  : point,
        scale  : scale,
        color  : color,
        radius : 5,
    }
}
Seed.prototype = {
    draw: function() {
        this.drawTriangle();
        this.drawText();
    },
    drawTriangle: function() {
        var ctx = this.tree.ctx;
        var triangle = this.triangle;
        var point = triangle.point;
        var color = triangle.color;
        var scale = triangle.scale;

        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(point.x, point.y);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(15, 30);
        ctx.lineTo(-15, 30);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },
    // Altri metodi rimangono invariati...
}
```

### Codice Completo Integrato

```javascript
(function(window){

    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function bezier(cp, t) {  
        var p1 = cp[0].mul((1 - t) * (1 - t));
        var p2 = cp[1].mul(2 * t * (1 - t));
        var p3 = cp[2].mul(t * t); 
        return p1.add(p2).add(p3);
    }  

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (var i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype = {
        clone: function() {
            return new Point(this.x, this.y);
        },
        add: function(o) {
            var p = this.clone();
            p.x += o.x;
            p.y += o.y;
            return p;
        },
        sub: function(o) {
            var p = this.clone();
            p.x -= o.x;
            p.y -= o.y;
            return p;
        },
        div: function(n) {
            var p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        },
        mul: function(n) {
            var p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    }

    Heart = function() {
        var points = [], x, y, t;
        for (var i = 10; i < 30; i += 0.2) {
            t = i / Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push(new Point(x, y));
        }
        this.points = points;
        this.length = points.length;
    }
    Heart.prototype = {
        get: function(i, scale) {
            return this.points[i].mul(scale || 1);
        }
    }

    Seed = function(tree, point, scale, color) {
        this.tree = tree;

        var scale = scale || 1;
        var color = color || '#FF0000';

        this.triangle = {
            point  : point,
            scale  : scale,
            color  : color,
        }

        this.circle = {
            point  : point,
            scale  : scale,
            color  : color,
            radius : 5,
        }
    }
    Seed.prototype = {
        draw: function() {
            this.drawTriangle();
            this.drawText();
        },
        drawTriangle: function() {
            var ctx = this.tree.ctx;
            var triangle = this.triangle;
            var point = triangle.point;
            var color = triangle.color;
            var scale = triangle.scale;

            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(15, 30);
            ctx.lineTo(-15, 30);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        addPosition: function(x, y) {
            this.circle.point = this.circle.point.add(new Point(x, y));
        },
        canMove: function() {
            return this.circle.point.y < (this.tree.height + 20); 
        },
        move: function(x, y) {
            this.clear();
            this.drawCircle();
            this.addPosition(x, y);
        },
        canScale: function() {
            return this.triangle.scale > 0.2;
        },
        setHeartScale: function(scale) {
            this.triangle.scale *= scale;
        },
        scale: function(scale) {
            this.clear();
            this.drawCircle();
            this.drawTriangle();
            this.setHeartScale(scale);
        },
        drawCircle: function() {
            var ctx = this.tree.ctx, circle = this.circle;
            var point = circle.point, color = circle.color, 
                scale = circle.scale, radius = circle.radius;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, 0, 2
