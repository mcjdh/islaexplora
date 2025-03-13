class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridWidth = 20;
        this.gridHeight = 15;
        this.setupGame();
        this.setupInputs();
        this.lastTime = 0;
        this.gameLoop();
    }

    setupGame() {
        this.island = new Island(this.gridWidth, this.gridHeight);
        this.player = new Player(this.island);
        
        // Adjust canvas size to fit the grid
        this.canvas.width = this.island.width * this.island.tileSize;
        this.canvas.height = this.island.height * this.island.tileSize;
    }

    setupInputs() {
        document.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                    this.player.move(0, -1);
                    break;
                case 'a':
                    this.player.move(-1, 0);
                    break;
                case 's':
                    this.player.move(0, 1);
                    break;
                case 'd':
                    this.player.move(1, 0);
                    break;
                case 'e':
                    this.player.interact();
                    break;
            }
        });
    }

    update(deltaTime) {
        // Update game state (currently handled by movement/interaction)
    }

    render() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render island
        this.island.render(this.ctx);
        
        // Render player
        this.player.render(this.ctx);
    }

    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
};
