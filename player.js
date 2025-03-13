class Player {
    constructor(island) {
        this.island = island;
        this.tileSize = island.tileSize;
        // Start player on a land tile
        this.findStartPosition();
        this.message = "Use WASD to move around the island!";
        this.messageTimer = 100;
    }

    findStartPosition() {
        // Start in the middle and find the nearest land tile
        let x = Math.floor(this.island.width / 2);
        let y = Math.floor(this.island.height / 2);
        
        // If the center is not land, search outwards
        let radius = 0;
        while (!this.island.isWalkable(x, y) && radius < Math.max(this.island.width, this.island.height)) {
            radius++;
            for (let offY = -radius; offY <= radius; offY++) {
                for (let offX = -radius; offX <= radius; offX++) {
                    if (Math.abs(offX) === radius || Math.abs(offY) === radius) {
                        const testX = x + offX;
                        const testY = y + offY;
                        if (testX >= 0 && testX < this.island.width && 
                            testY >= 0 && testY < this.island.height &&
                            this.island.isWalkable(testX, testY)) {
                            this.x = testX;
                            this.y = testY;
                            return;
                        }
                    }
                }
            }
        }
        
        // If we found a land tile at the center
        if (this.island.isWalkable(x, y)) {
            this.x = x;
            this.y = y;
        } else {
            // Fallback to 0,0 if no land was found
            this.x = 0;
            this.y = 0;
        }
    }

    move(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;
        
        if (this.island.isWalkable(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.message = "";
        } else {
            this.showMessage("You can't move there!");
        }
    }

    interact() {
        const interactable = this.island.getInteractableAt(this.x, this.y);
        if (interactable) {
            this.showMessage(interactable.message);
        } else {
            this.showMessage("Nothing to interact with here.");
        }
    }

    showMessage(text) {
        this.message = text;
        this.messageTimer = 100; // Message will display for 100 frames
    }

    render(ctx) {
        // Draw player
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(
            this.x * this.tileSize + this.tileSize / 4,
            this.y * this.tileSize + this.tileSize / 4,
            this.tileSize / 2,
            this.tileSize / 2
        );

        // Draw message if there is one
        if (this.message && this.messageTimer > 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(10, 10, ctx.canvas.width - 20, 30);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.message, ctx.canvas.width / 2, 30);
            
            this.messageTimer--;
        }
    }
}
