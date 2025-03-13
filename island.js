class Island {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 40;
        this.grid = [];
        this.interactables = [];
        this.generateIsland();
    }

    generateIsland() {
        // Initialize grid with water (0)
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = 0; // 0 represents water
            }
        }

        // Create the main island landmass (1)
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);
        const islandRadius = Math.min(this.width, this.height) / 3;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                // Add some noise to the island shape
                const noise = Math.random() * 2;
                
                if (distance < islandRadius + noise) {
                    this.grid[y][x] = 1; // 1 represents land
                }
            }
        }

        // Add some interesting features to the island
        this.addInteractables();
    }

    addInteractables() {
        // Add some interactable objects (trees, rocks, treasures)
        const numInteractables = Math.floor(Math.random() * 5) + 5;
        
        for (let i = 0; i < numInteractables; i++) {
            let x, y;
            // Make sure interactables are placed on land
            do {
                x = Math.floor(Math.random() * this.width);
                y = Math.floor(Math.random() * this.height);
            } while (this.grid[y][x] !== 1);

            const types = ['tree', 'rock', 'treasure'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            this.interactables.push({
                x: x,
                y: y,
                type: type,
                message: `You found a ${type}!`
            });
            
            // Mark the tile as having an interactable (2)
            this.grid[y][x] = 2;
        }
    }

    render(ctx) {
        // Draw the island tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                switch (this.grid[y][x]) {
                    case 0: // Water
                        ctx.fillStyle = '#1e90ff';
                        break;
                    case 1: // Land
                        ctx.fillStyle = '#90ee90';
                        break;
                    case 2: // Interactable
                        // Draw the base land tile
                        ctx.fillStyle = '#90ee90';
                        ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        
                        // Draw the interactable on top
                        const interactable = this.interactables.find(item => item.x === x && item.y === y);
                        if (interactable) {
                            switch (interactable.type) {
                                case 'tree':
                                    ctx.fillStyle = '#228b22';
                                    break;
                                case 'rock':
                                    ctx.fillStyle = '#808080';
                                    break;
                                case 'treasure':
                                    ctx.fillStyle = '#ffd700';
                                    break;
                            }
                            // Draw a smaller shape to represent the interactable
                            ctx.fillRect(
                                x * this.tileSize + this.tileSize / 4, 
                                y * this.tileSize + this.tileSize / 4, 
                                this.tileSize / 2, 
                                this.tileSize / 2
                            );
                        }
                        continue;
                }
                ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    getInteractableAt(x, y) {
        return this.interactables.find(item => item.x === x && item.y === y);
    }

    isWalkable(x, y) {
        // Check if the position is within bounds
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        // Check if the position is land (1) or has an interactable (2)
        return this.grid[y][x] > 0;
    }
}
